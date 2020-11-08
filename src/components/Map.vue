<template>
  <div>
  <b-container>
      <b-row>
        <b-form-checkbox v-model="nuclear.show" name="nuclearOnOff" switch>
          Show Nuclear
        </b-form-checkbox>
      </b-row>
      <b-row>
        <b-form-checkbox v-model="hospitals.show" name="hospitalsOnOff" switch>
          Show hospitals
        </b-form-checkbox>
    </b-row>
<b-row><div id="mapDiv" >
  <svg  @click="defaultZone"  id="mapSvg" width="700" height="450">
    <g id="gmap" transform="scale(2)"></g>
    <g v-show="nuclear.show" :r="nuclear.r" :cx="nuclear.cx" :cy="nuclear.cy" xmlns="http://www.w3.org/2000/svg"  transform="translate(390 140) scale(0.03)">
      <circle r="250" fill="black"/>
      <circle r="50"/>
      <path fill="black" d="M75,0A75,75 0 0,0 37.5-64.951905L125-216.50635A250,250 0 0,1 250,0Z" id="bld"/>
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bld" transform="rotate(120)"/>
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bld" transform="rotate(240)"/>
    </g>
    <g transform="scale(2)" fill="red">
      <circle v-for="hospital in hospitals.coords" :key="hospital.id" v-show="hospitals.show" :r="hospital.r" :cx="hospital.cx" :cy="hospital.cy"></circle>
    </g>
  </svg>

</div></b-row></b-container></div>
</template>

<script>
import * as d3 from "d3";

//import * as d3g from 'd3-geo';



export default {
  name: "Map",
  data(){
    return {
      hospitals: {coords: [{id:'ph',
          cx:33,
        cy:53,
        r:3},
          {id:'dt',
            cx:80,
            cy:78,
            r:3},
          {id:'bv',
            cx:160,
            cy:175,
            r:3},
          {id:'sw',
            cx:88,
            cy:110,
            r:3},
          {id:'s',
            cx:105,
        cy:97,
        r:3},
        {id:'ts',
          cx:230,
        cy:155,
        r:3},
          {id:'ot',
            cx:130,
            cy:50,
            r:3}],
        show: true},
      nuclear: {cx:190,
      cy:70,
      r:3,
      show: false},
    }
  },
  props: {
    dragged: String,
    states: Array,
    selected: Object,
    aggr: String,
    measure: String,

  },
  watch: {
    aggr: function(){this.colourMap()},
    measure: function(){this.colourMap()},
  },
  mounted(){
    window.addEventListener('load', () => {
      this.drawMap();
      this.colourMap();

    });
  },
  methods: {
    drawMap(){
      //var dataset = d3.json('/data/states.geojson');
      //d3.json('/data/states.geojson').then((geo) => {

      //let projection =  d3g.geoProjection(function(x,y){return [x,y]});
      //let path = d3g.geoPath();
      //const width = 700, height = 450;

      d3.select('#gmap').on('click',this.defaultZone).selectAll('path').data(this.states).enter().append('path')
        .attr('d', d => d.d).attr('id',d => d.id).attr('draggable','true').attr('class','zone')
        .on('mouseover', this.handleMouseOver)
        .on('mouseleave', this.handleMouseLeave)
        .on('click',this.handleClick)
        .on('dragover',function(event){event.preventDefault()})
        .on('drag', this.handleDrag)
        },



    colourMap(){
      let aggr_measure = this.aggr+'_'+this.measure;
      let ext = d3.extent(this.states.map(d => d[aggr_measure]));
      d3.selectAll('.zone').style("fill",  d => d3.interpolateReds((d[aggr_measure] - ext[1])/(ext[0] - ext[1])));

    },

    handleMouseOver(event){
      this.$emit('emitState',event.target.id);
      d3.select(event.target).style('opacity', 0.5);
    },
    handleMouseLeave(event){
      this.$emit('emitState',this.selected.id);
      d3.select(event.target).style('opacity',1);
    },
    handleClick(event) {
      this.$emit('emitSelected', event.target.id);
      event.stopPropagation();
    },
    handleDrag(event){
      this.$emit('emitDragged', event.target.id)
    },
    defaultZone(){
      this.$emit('defaultZone');
      this.$emit('emitState', "St. Himark");
    },


  },

}
</script>

<style>
[draggable] {
  /* Required to make elements draggable in old WebKit */
  -webkit-user-drag: element;
}

path{fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1}
</style>
