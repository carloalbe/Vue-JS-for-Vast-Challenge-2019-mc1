<template>
  <div id="paretoDiv" >
  </div>
</template>

<script>
import * as d3 from "d3"

export default {
  name: 'Pareto',
  data(){
    return{
      margin : {top: 50, right: 50, bottom: 100, left: 50},
      height: 400,
      width: 600,
      color: 'steelblue',
      lorenz: [],
      sel: 'St. Himark',
    }
  },
  props: {
    selected: Object,
    values: Array,
    aggr_measure: String,
    defaultState: Object,
  },
  watch: {
    defaultState: function(){this.drawPareto()},
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
        .call(g => g.select(".domain").remove())
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

    drawPareto() {
      //DATA
      this.orderValues(this.values);
      this.getLorenz();
      //DIMENSIONS
      let height = this.height, width = this.width;


//Axes and scales
      let scales = this.scales();
      let x = scales[0], yhist = scales[1],  yl = scales[3];

      let line = d3.line()
          .x(d => x(d.id))
          .y(d => yl(d.p))
//Draw svg

      let svg = d3.select("#paretoDiv").append("svg")
          .attr("viewBox", [0, 0, width, height]);

      svg.append("g")
          .call(this.xAxis)
          .selectAll('text')
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)") ;

      svg.append("g")
          .call(this.yAxis);

      svg.append("g")
          .call(this.yAxis2);

      svg.append("g")
          .attr("fill", "steelblue")
          .attr("id","grect")
          .selectAll("rect")
          .data(this.values)
          .enter().append('rect')
          .style("mix-blend-mode", "multiply")
          .attr("x", d => x(d.id))
          .attr("y", d => yhist(d[this.aggr_measure]))
          .attr("height", d => yhist(0) - yhist(d[this.aggr_measure]))
          .attr("width", x.bandwidth())
          .attr('aria-controls','sidebar-variant')
          .on('click',this.handleClick)
          .on('mouseover',this.handleMouseOver)
          .on('mouseleave',this.handleMouseLeave);


      svg.append("path")
           .attr("id","lorenzCurve")
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

      scales = this.scales();
      let yl = scales[3];
      let line = d3.line()
          .x(d => x(d.id))
          .y(d => yl(d.p));

      let lc =  d3.select("#lorenzCurve");
      lc.datum(this.lorenz)
      lc.transition(t)
        .attr("d",line);
    },

    handleClick(e){
       let state = e.target.__data__.id;
      this.$emit('emitState', state);
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
  width: 800px;
  height: 600px;
  margin-left: 10%;
  margin-right: 10%;


}
</style>
