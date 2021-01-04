<template>
  <div id="paretoDiv" >
    <div v-if="mounted">
      <b-popover triggers="hover" placement="top" v-for="stateid in this.values" :key="stateid.id + 'p'" :target="stateid.id +'p'">
        <template #title>{{stateid.id}}</template>
        <div style=" text-align: center;"> <b>{{aggr_measure}}</b>:  {{Intl.NumberFormat().format(stateid[aggr_measure])}}</div>
        <hr style="margin-bottom: 0">
        <div style="text-align: right;color:#5bc0de;font-size: 0.7em">
          <span v-if="sidebar_show">click to select</span>
          <span v-else>click to see more</span></div>


      </b-popover>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3"

export default {
  name: 'Pareto',
  data(){
    return{
      margin : {top: 40, right: 80, bottom: 150, left: 80},
      height: 580,
      width: 900,
      color: 'steelblue',
      lorenz: [],
      sel: 'St.Himark',
    }
  },
  props: {
    selected: Object,
    values: Array,
    aggr_measure: String,
    mounted:Boolean,
    sidebar_show:Boolean,
  },
  watch: {
    mounted: function(){this.drawPareto()},
    aggr_measure: function(){ this.updatePareto()},
  },

  methods: {

    scales(){

      let yhist =  d3.scaleLinear()
          .domain([0, d3.max(this.values, d => d[this.aggr_measure])]).nice()
          .range([this.height - this.margin.bottom, this.margin.top])

      let x = d3.scaleBand()
          .domain(this.values.map(d => d.id))
          .range([this.margin.left, this.width - this.margin.right])
          .padding(0.1)

      let xl = (d,i) => {return this.margin.left + i * this.width/19}

      let yl = d3.scaleLinear()   //scale for the lorenz curve
          .domain([0,1])
          .range([this.height - this.margin.bottom, this.margin.top])

      return [x, yhist, xl, yl]
    },

    xAxis(g){ g
        .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
        .attr("id", "xAxis")
        .call(d3.axisBottom(this.scales()[0]).tickSizeOuter(0))
  },
    yAxis(g){ g
        .attr("transform", `translate(${this.margin.left},0)`)
        .attr("id","yAxis")
        .call(d3.axisLeft(this.scales()[1]))
        .call(g => g.select(".domain").remove());
    },
    yAxis2(g){ g
        .attr("transform", `translate(${this.width - this.margin.right},0)`)
        .attr("id","yAxis2")
        .call(d3.axisRight(this.scales()[3]).tickFormat(d3.format(".0%")))
        .call(g => g.select(".domain").remove())
    },

    orderValues(values){
      values.sort((a, b) => d3.descending(a[this.aggr_measure], b[this.aggr_measure]));
    },

    getLorenz(){
      let total = d3.sum(this.values, d => d[this.aggr_measure])
      this.lorenz = this.values.map((d,i) => {
        const item = {};
        item.id = d.id;
        item[this.aggr_measure] = d[this.aggr_measure];
        item.p = d3.sum(this.values.slice(0,i+1), d => d[this.aggr_measure]) / total;
        return item;
      });
    },

    drawPareto: function () {
      //DATA
      this.orderValues(this.values);
      this.getLorenz();
      //DIMENSIONS
      let height = this.height, width = this.width;


//Axes and scales
      let scales = this.scales();
      let x = scales[0], yhist = scales[1], yl = scales[3];

      let line = d3.line()
          .x(d => x(d.id) + 0.5 * x.bandwidth())
          .y(d => yl(d.p))
//Draw svg

      let svg = d3.select("#paretoDiv").append("svg")
          .attr("viewBox",'0 0 '+String(width) +' '+String(height));

      svg.append("g")
          .call(this.xAxis)
          .selectAll('text')
          .style("text-anchor", "end")
          .style('font-size','15px')
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");

      svg.append("g")
          .call(this.yAxis);

      svg.append("g")
          .call(this.yAxis2);

      svg.append("g")
          .attr("fill", "steelblue")
          .attr("id", "grect")
          .selectAll("rect")
          .data(this.values)
          .enter().append('rect')
          .style("mix-blend-mode", "multiply")
          .attr('id',d => d.id + 'p')
          .attr("x", d => x(d.id))
          .attr("y", d => yhist(d[this.aggr_measure]))
          .attr("height", d => yhist(0) - yhist(d[this.aggr_measure]))
          .attr("width", x.bandwidth())
          .attr('aria-controls', 'sidebar').attr('aria-expanded', false)
          .on('click', this.handleClick)
          .on('mouseover', this.handleMouseOver)
          .on('mouseleave', this.handleMouseLeave);


      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr('id','pareto_y_label')
          .attr("y", -100- this.margin.left)
          .attr("x", 0- (this.height / 2))
          .attr("dy", "200px")
          .style('font-size','30px')
          .style("text-anchor", "middle")
          .style('color','grey')
          .text(this.aggr_measure);


      svg.append("path")
          .attr("id", "lorenzCurve")
          .datum(this.lorenz)
          .style("fill", "none")
          .style("stroke", "red")
          .style("stroke-width", 1.5)
          .style("stroke-linejoin", "round")
          .style("stroke-linecap", "round")
          .attr("d", line);
    },


    updatePareto(){

      let t = d3.transition().duration(750);
      this.orderValues(this.values);
      this.getLorenz();
      let scales = this.scales();
      let x = scales[0], yhist = scales[1];

      d3.select("#grect").selectAll("rect")
          .transition(t)
          .attr("x", d => x(d.id))
          .attr("y", d => yhist(d[this.aggr_measure]))
          .attr("height", d => yhist(0) - yhist(d[this.aggr_measure]));

      d3.select("#xAxis").transition(t)
          .call(this.xAxis)
          .selectAll(".tick")
          .delay((d, i) => i * 20);

      d3.select("#yAxis").transition(t)
          .call(this.yAxis);

      d3.select('#pareto_y_label').text(this.aggr_measure);

      scales = this.scales();
      let yl = scales[3];
      let line = d3.line()
          .x(d => x(d.id) + 0.5*x.bandwidth())
          .y(d => yl(d.p));

      let lc =  d3.select("#lorenzCurve");
      lc.datum(this.lorenz)
      lc.transition(t)
        .attr("d",line);
    },

    handleClick(e){
       let state = e.target.__data__.id;
       this.$emit('showSidebar',state)
    },
    handleMouseOver(e,d){
      this.$emit('emitState',d.id);
      d3.select(e.target).style('opacity', 0.5);
    },
    handleMouseLeave(e){
      this.$emit('selectedState');
      d3.select(e.target).style('opacity',1);
    },


  }
}
</script>


<style>

#paretoDiv{
  margin-left: auto;
  margin-right: auto;
width:70%;
  height: 70%;

}
@media only screen and (max-width: 600px) {

  #paretoDiv{
    margin-left: auto;
    margin-right: auto;
    width:100%;
    height: 70%;
  }
}
</style>
