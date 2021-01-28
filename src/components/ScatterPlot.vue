<template>
<div ref="scatterDiv" class="scatterDiv">
  <div v-if="mounted">
  <b-popover triggers="hover" placement="top" v-for="stateid in this.states" :key="stateid.id +String(i)" :target="stateid.id +String(i)">
    <template #title>{{stateid.id}}</template>
    <div style=" text-align: center;">
      <table>
        <tr><th>{{x_label}}</th><th>{{y_label}}</th></tr>
        <tr><td>{{Intl.NumberFormat().format(stateid[x_label])}} </td><td>{{Intl.NumberFormat().format(stateid[y_label])}}</td></tr>
      </table>  </div>
    <hr style="margin-bottom: 0">
    <div style="text-align: right;color:#5bc0de;font-size: 0.7em">
      <span v-if="sidebar_show && stateid.id == selected">click to hide</span>
      <span v-else-if="sidebar_show">click to select</span>
      <span v-else>click to see more</span></div>


        </b-popover>
  </div>
</div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "ScatterPlot",
  data() {
    return {
      margin: {top: 20, bottom: 50, right: 40, left: 40},
      width:178,
      height: 178,
      mounted: false,
    }
  },
  props: {
    i: Number,
    x_label: String,
    mounting:Boolean,
    y_label:String,
    states: Array,
    selected: String,
    sidebar_show:Boolean,

  },
  computed:{
    a: function(){return(
           (d3.sum(this.states, d => d[this.y_label]) * d3.sum(this.states, d => d[this.x_label]*d[this.x_label]) -
            d3.sum(this.states, d => d[this.x_label])*d3.sum(this.states, d => d[this.x_label]*d[this.y_label]) )   /
           (d3.sum(this.states, d => d[this.x_label]*d[this.x_label])*this.states.length  -
            d3.sum(this.states, d => d[this.x_label])*d3.sum(this.states, d => d[this.x_label])));},
    b: function(){return (
          (d3.sum(this.states, d => d[this.x_label]*d[this.y_label])*this.states.length -
          d3.sum(this.states, d => d[this.x_label]) * d3.sum(this.states, d => d[this.y_label])) /
          (d3.sum(this.states, d => d[this.x_label]*d[this.x_label])*this.states.length -
              d3.sum(this.states, d => d[this.x_label])*d3.sum(this.states, d => d[this.x_label])))  ;},

    x1: function(){ return d3.min(this.states, d => d[this.x_label])},
    x2: function(){ return d3.max(this.states, d => d[this.x_label])},

    y1: function(){ return (this.a + this.b * this.x1)},
    y2: function(){ return (this.a + this.b * this.x2)},

  },
  watch: {
    mounting: function(){this.drawScatter()},
    x_label: function(){this.updateScatter()},
    //aggr_measure: function(){ this.updateScatter()},
  },
  methods:{
    drawScatter(){
      let margin = this.margin; let width = this.width; let height = this.height;

      // append the svg object to the body of the page
      let svg = d3.select(this.$refs.scatterDiv)
          .append("svg")
          .on('click',this.defaultZone)
          .classed('btn',true)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")")
      // Add Y axis
      let y = d3.scaleLinear()
          .domain([0, d3.max(this.states, d => d[this.y_label])])
          .range([ height, 0]);
      svg.append("g").attr('class','y_ax')
          .call(d3.axisLeft(y));
      svg.append("text")
          .attr("class", "label_y")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(this.y_label)
      // Add X axis
      let x = d3.scaleLinear()
          .domain([0, d3.max(this.states, d => d[this.x_label])])
          .range([ 0, width ]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .attr("class",'x_ax')
          .call(d3.axisBottom(x))
          .selectAll('text').attr('transform','translate(-7 7) rotate(-25)');
      svg.append("text")
          .attr('class','label_x')
          .attr("x", width)
          .attr("y", height - 6)
          .style("text-anchor", "end")
          .text(this.x_label);



      // Add dots
      svg.append('g')
          .selectAll("circle")
          .data(this.states )
          .enter()
          .append("circle")
          .on('click', this.handleClick)
          .on('mouseenter', this.handleMouseEnter)
          .on('mouseleave', this.handleMouseLeave)
          .attr('id',d => d.id + String(this.i))
          .attr("cx", d => x(d[this.x_label]) )
          .attr("cy", d => y(d[this.y_label]))
          .attr("r", 5)
          .style("fill", "steelblue")
          .attr('aria-controls', 'sidebar').attr('aria-expanded', false);

      svg.append("line")
          .attr("class", "regression")
          .style("stroke",'rgb(255,0,0)')
          .style("stroke-width",0.5)
          .attr("x1", x(this.x1))
          .attr("y1", y(this.y1))
          .attr("x2", x(this.x2))
          .attr("y2", y(this.y2));

       this.mounted=true;

    },


    updateScatter(){
      let height = this.height; let width=this.width;

      let y = d3.scaleLinear()
          .domain([0, d3.max(this.states, d => d[this.y_label])])
          .range([ height, 0]);
      let x = d3.scaleLinear()
          .domain([0, d3.max(this.states, d => d[this.x_label])])
          .range([ 0, width ]);

      let svg = d3.select(this.$refs.scatterDiv);
      svg.selectAll('circle').transition()
          .attr("cy", d => y(d[this.y_label]))
          .attr("cx", d => x(d[this.x_label]));

      svg.select(".regression").transition()
          .attr("x1", x(this.x1))
          .attr("y1", y(this.y1))
          .attr("x2", x(this.x2))
          .attr("y2", y(this.y2));

      let y_ax = svg.select('.y_ax');
      y_ax.transition().call(d3.axisLeft(y));
      let label_y = svg.select('.label_y');
      label_y.transition().text(this.y_label);

      let x_ax = svg.select('.x_ax');
      x_ax.transition().call(d3.axisBottom(x));
      if (!this.x_label.includes('average')){ x_ax.selectAll('text').attr('transform','translate(-7 7) rotate(-25)')}
      let label_x = svg.select('.label_x');
      label_x.transition().text(this.x_label);

    },

    handleClick(e){
      let state = e.target.__data__.id;
      this.$emit('showSidebar',state);
      e.stopPropagation();
    },
    defaultZone(){
      this.$emit('defaultZone');
    },
    handleMouseEnter(e){
      let state = e.target.__data__.id;
      this.$emit('emitState',state);
      d3.select(e.target).attr('r',10);
      d3.select(e.target).style('opacity',0.5);
    },
    handleMouseLeave(e){
      this.$emit('selectedState');
      d3.select(e.target).attr('r',5);
      d3.select(e.target).style('opacity',1);
    },



  },



}
</script>

<style scoped>

</style>
