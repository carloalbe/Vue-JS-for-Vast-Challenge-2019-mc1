<template>
  <div style="height:477px" id=MapComponent>
    <b-container>
      <b-row>
        <!-- - - -  - - LEGENDA - -  - - - -->
        <b-col>
          <div id="legendDiv"></div>
        </b-col>

        <!-- - - -  - - CHECKBOXES - -  - - - -->
        <b-col>
          <b-row>
            <b-form-checkbox v-model="nuclear.show" name="nuclearOnOff" switch>
              Show Nuclear <img alt="nuclear" src="../assets/nuclear.svg" height="15px">
            </b-form-checkbox>
          </b-row>
          <b-row>
            <b-form-checkbox v-model="hospitals.show" name="hospitalsOnOff" switch>
              Show hospitals <img alt="hospital" src="../assets/pharmacy.svg" height="15px">
            </b-form-checkbox>
          </b-row>
        </b-col>
        <!-- - - -  - - MAP- -  - - - -->
      </b-row>
      <b-row>
        <div id="mapDiv">
          <svg class="btn" id="mapSvg" @click="defaultZone" width="450" height="400">
            <g id="scaler" transform="scale(1.1) translate(10 0)">
              <g id="gmap" transform="scale(1.5) translate(-15 0)"></g>
              <use xlink:href="../assets/nuclear.svg#nuclear_g" v-show="nuclear.show" xmlns="http://www.w3.org/2000/svg"
                   transform="translate(250 80) scale(0.03)"></use>
              <g transform=" scale(0.03) translate(-1100 0)">
                <use xlink:href="../assets/pharmacy.svg#hospital_g" :x="hospital.cx*50" :y="hospital.cy*50"
                     v-for="hospital in hospitals.coords" :key="hospital.id" v-show="hospitals.show"></use>
              </g>
            </g>
          </svg>
        </div>
      </b-row>

      <!-- POPOVERS -->
      <b-row v-if="mounted">
        <b-popover triggers="hover" placement="top" v-for="stateid in this.states.slice(1)" :key="stateid.description"
                   :target="stateid.id">
          <template #title>{{ stateid.id }}</template>
          <div style=" text-align: center;"><b>{{ aggr_measure }}</b>:
            {{ Intl.NumberFormat().format(stateid[aggr_measure]) }}
          </div>
          <hr style="margin-bottom: 0">
          <div style="text-align: right;color:#5bc0de;font-size: 0.7em">
            <span v-if="sidebar_show && stateid.id == selected">click to hide</span>
            <span v-else-if="sidebar_show">click to select</span>
            <span v-else>click to see more</span></div>
        </b-popover>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import * as d3 from "d3";

//import * as d3g from 'd3-geo';


export default {
  name: "Map",
  data() {
    return {
      hospitals: {
        coords: [{
          id: 'ph',
          cx: 33,
          cy: 53,
          r: 3
        },
          {
            id: 'dt',
            cx: 80,
            cy: 78,
            r: 3
          },
          {
            id: 'bv',
            cx: 160,
            cy: 175,
            r: 3
          },
          {
            id: 'sw',
            cx: 88,
            cy: 110,
            r: 3
          },
          {
            id: 's',
            cx: 105,
            cy: 97,
            r: 3
          },
          {
            id: 'ts',
            cx: 230,
            cy: 155,
            r: 3
          },
          {
            id: 'ot',
            cx: 130,
            cy: 50,
            r: 3
          }],
        show: false
      },
      nuclear: {
        cx: 190,
        cy: 70,
        r: 3,
        show: false
      },

    }
  },
  props: {
    selected: String,
    dragged: String,
    states: Array,
    aggr_measure: String,
    sidebar_show: Boolean,
    mounted: Boolean,
  },
  computed: {
    max: function () {
      return d3.max(this.states.slice(1), d => d[this.aggr_measure])
    },
    min: function () {
      return d3.min(this.states.slice(1), d => d[this.aggr_measure])
    },
  },
  watch: {
    aggr_measure: function () {
      this.colourMap();
      this.scaleLegend();
    },
    states: function () {
      this.drawMap();
      this.drawLegend();
      this.colourMap();
    }
  },


  methods: {

    drawMap() {
      d3.select('#gmap').on('click', this.defaultZone).selectAll('path').data(this.states.slice(1)).enter().append('path')
          .attr('d', d => d.d).attr('id', d => d.id).attr('draggable', 'true').attr('class', 'zone')
          .attr('aria-controls', 'sidebar').attr('aria-expanded', false)
          .on('mouseenter', this.handleMouseEnter)
          .on('mouseleave', this.handleMouseLeave)
          .on('click', this.handleClick)
          .on('dragover', function (event) {
            event.preventDefault()
          })
          .on('drag', this.handleDrag)
          .on('touchmove', this.handleDrag)
    },
    colourMap() {
      let color = d3.scaleSequential(d3.interpolateReds).domain([this.min, this.max]);
      d3.selectAll('.zone').transition().duration(1000)
          .style("fill", d => color(d[this.aggr_measure]));
    },

    drawLegend() {
      let barHeight = 10;
      let barWidth = 150;
      let colorScale = d3.scaleSequential(d3.interpolateReds).domain([this.min, this.max]);
      let axisScale = d3.scaleLinear().domain(colorScale.domain()).range([0, barWidth]);
      let axisBottom = g => g
          .attr("class", `x-axis`)
          .attr("transform", `translate(0 50)`)
          .call(d3.axisBottom(axisScale)
              .ticks(3)
              .tickSize(-barHeight));
      let svg = d3.select('#legendDiv').append('svg').attr('width', barWidth + 30).attr('height', 70);

      svg.append('defs').append("linearGradient").attr("id", "linear-gradient").selectAll("stop")
          .data(colorScale.ticks().map((t, i, n) => ({offset: `${100 * i / n.length}%`, color: colorScale(t)})))
          .enter().append("stop")
          .attr("offset", d => d.offset)
          .attr("stop-color", d => d.color);
      svg.append('g').attr('transform', 'translate(0 40)').append("rect").attr("width", 150)
          .attr("height", barHeight).style("fill", "url(#linear-gradient)");
      svg.append('g')
          .call(axisBottom);
      svg.append("text")
          .attr('id', 'legend_label')
          .attr("text-anchor", "middle")
          .attr('font-size', '10px')
          .attr("x", 75)
          .attr("y", 35)
          .text(this.aggr_measure);
    },
    scaleLegend() {
      let barWidth = 150;
      let barHeight = 10;
      let colorScale = d3.scaleSequential(d3.interpolateReds).domain([this.min, this.max]);
      let axisScale = d3.scaleLinear().domain(colorScale.domain()).range([0, barWidth]);
      let axisBottom = g => g
          .transition().duration(500)
          .attr("transform", `translate(0, 50)`)
          .call(d3.axisBottom(axisScale)
              .ticks(3)
              .tickSize(-barHeight));
      let svg = d3.select('#legendDiv').selectAll('svg');
      svg.selectAll('.x-axis').call(axisBottom);
      svg.select('#legend_label').transition().duration(500).text(this.aggr_measure);

    },


    handleMouseEnter(e, d) {
      this.$emit('emitState', d.id);
      d3.select(e.target).style('opacity', 0.5);
    },
    handleMouseLeave(e) {
      this.$emit('selectedState');
      d3.select(e.target).style('opacity', 1);
    },
    handleClick(e, d) {
      this.$emit('showSidebar', d.id);

      e.stopPropagation();
    },
    handleDrag(e) {
      this.$emit('emitDragged', e.target.id)
    },

    defaultZone() {
      this.$emit('defaultZone');
    },


  },

}
</script>

<style>
[draggable] {
  /* Required to make elements draggable in old WebKit */
  -webkit-user-drag: element;
}

.x-axis line, .x-axis path {
  stroke: #fff;
  fill-opacity: 0
}

path {
  fill: #ffffff;
  fill-opacity: 1;
  stroke: #000000;
  stroke-width: 1px;
  stroke-linecap: butt;
  stroke-linejoin: miter;
  stroke-opacity: 1
}
</style>
