<template>
  <div style="height:477px" id = MapComponent>
  <b-container>
    <b-row>
      <b-col>
        <div id="legendDiv"></div>
      </b-col>
      <b-col>
      <b-row>
        <b-form-checkbox v-model="nuclear.show" name="nuclearOnOff" switch>
          Show Nuclear <img  alt="nuclear" src="../assets/nuclear.svg" height="15px">
        </b-form-checkbox>
      </b-row>
      <b-row>

        <b-form-checkbox v-model="hospitals.show" name="hospitalsOnOff" switch>
          Show hospitals <img alt="hospital" src="../assets/pharmacy.svg" height="15px">
        </b-form-checkbox>
    </b-row>
    </b-col>

    </b-row>
    <!--svg id="mapSvg" width="600" height="400" role="button" tabindex="0" class="collapsed" aria-expanded="false" aria-controls="sidebar-variant" style="overflow-anchor: none;"><g id="gmap" transform="scale(1.5) translate(100 50)"><path d="m 49.751109,87.303032 -7.255256,1.224232 -1.202711,1.269532 -0.53454,1.469983 -4.744032,2.338607 -2.138157,6.214017 -2.873147,11.358957 -7.817635,-0.20045 1.937704,-8.15172 5.211755,-0.13364 1.269532,-2.07134 2.00452,-9.822154 -1.055944,-2.858172 -2.645833,-2.787576 -0.826823,-1.559149 -0.09449,-1.511906 -1.015809,-2.244233 -1.443739,-0.431327 -10.891233,-0.801809 -0.03341,-2.53906 9.554885,0.400904 -4.698783,-17.22841 -0.188988,-2.834822 3.284154,-8.801878 5.311983,-2.438834 0.334087,-2.53906 5.412205,-1.637025 3.044476,-2.773307 5.149924,-1.41741 3.543527,-0.803201 3.779764,-0.04725 3.732514,0.897694 0.472469,0.330729 1.795388,-0.850448 -0.04725,18.993305 0.03543,19.619325 -0.342548,0.05905 -6.236607,-0.02363 z" id="Palace Hills" draggable="true" class="zone" style="fill: rgb(251, 127, 96);"></path><path d="m 56.129464,36.323505 3.538458,-1.784683 2.539061,1.469982 0,3.407685 4.677214,1.069078 2.939966,-1.670433 0.53454,0.200451 2.071338,-1.46998 0.06682,-2.271792 6.815373,-0.400905 -1.00226,3.875408 5.211754,-1.202711 -0.267269,-3.87541 2.004521,-0.200451 0.200453,3.741771 12.828937,-3.54132 1.670434,3.140419 0.252136,26.727184 -6.56734,1.08668 -3.165549,-0.755951 -5.686793,-1.934578 -6.748556,0.267269 -3.942225,3.80859 -0.133633,4.142679 -5.879931,6.748555 -12.264554,-1.173525 -0.04726,-0.732333 0.342548,-0.05905 z" id="Northwest" draggable="true" class="zone" style="fill: rgb(254, 218, 203);"></path><path d="m 98.288368,33.670195 1.072123,-3.701407 -1.110305,-0.519719 0.04725,-1.063059 1.488281,-0.354351 -0.07087,-0.4016 -1.015809,-0.850448 0,-2.126115 2.504092,-2.834821 2.88207,-0.803199 0.85045,0.992187 4.20498,-0.755952 4.25224,-3.685268 5.00818,-2.078869 2.88207,-0.897694 1.13393,-1.275669 4.63021,-1.464658 1.74814,10.299851 4.86644,1.417411 2.17336,-1.417411 0.99219,0.850447 2.83482,-1.795387 4.27586,4.323102 0.18897,3.638021 3.16556,1.488281 0.54334,3.708892 2.69309,1.700892 1.29929,-0.968562 2.05524,-0.141743 1.39379,-1.039434 0.14174,-2.905691 0.16537,-3.236423 -3.11832,-3.212797 -0.11811,-0.708705 1.79538,-2.315104 0.0709,-3.779762 -1.18117,-2.929315 0.94494,-0.188989 3.26004,1.417411 1.03944,-1.795387 5.14993,-0.04725 0.23624,5.858631 1.65364,0.330729 2.74033,2.598587 -1.37016,0.377976 -1.65365,1.606398 -1.13393,-0.283482 -0.61421,0.141742 -0.61422,0.614211 -0.47246,0.992187 0.37798,1.039436 1.22842,-0.141743 1.98437,0.236236 1.74815,-0.377976 1.27567,-3.543527 0.9036,0.640787 -5.77006,19.958912 -0.18899,3.685267 -11.10306,18.095613 -12.61495,-0.188986 -7.84301,2.50409 -4.48847,-1.322916 -8.88244,-0.236236 -6.42559,-2.504091 -5.90586,0.897694 -6.28385,-1.653645 -0.252143,-26.727184 z" id="Old Town" draggable="true" class="zone" style="fill: rgb(255, 241, 234);"></path><path d="m 152.65511,66.041888 -4.53571,8.173736 -7.03981,7.323288 -0.0281,12.333743 61.82723,0.753642 10.97031,-1.872872 -0.67046,-3.418753 3.77976,-1.700895 0.18899,-0.850445 -3.2128,-1.511906 -3.1183,0 -3.87426,-6.803569 0.94494,0.188986 -3.40178,-5.102677 1.41741,-3.496281 -4.72471,-11.055802 2.45685,0.661458 -5.66964,-5.953125 -1.79539,0.09449 -1.88988,-2.267857 0.85045,-1.795386 1.6064,1.039434 1.03943,0.188989 2.45685,2.173362 2.55133,-1.511903 0.18899,-0.944941 -4.7247,-4.346726 7.27604,-9.165923 -1.70089,-1.13393 -10.29985,9.921875 -7.74851,0.283482 -2.55134,-1.795386 0.37797,-2.078868 -0.75595,-1.039437 0.28348,-1.133927 0.75595,-0.188989 0.56697,0.188989 0,0.944941 -0.18899,0.944941 1.70089,0 -0.0945,-1.228424 -2.74033,-3.685267 -0.66146,-1.889882 -3.1183,-2.078868 -1.70089,-3.307292 -5.29167,-3.874256 -0.94494,-4.724702 0.94494,-2.456845 -1.03943,-0.472471 -5.00819,18.42634 -2.36235,7.465028 -0.18899,3.685268 z" id="Safe Town" draggable="true" class="zone" style="fill: rgb(254, 232, 222); opacity: 1;"></path><path d="m 90.570959,103.02664 -22.110022,0.0569 -0.283483,-9.543895 -2.882069,-0.330729 0.118118,-16.701822 -9.591146,-0.779577 -0.04725,-0.732327 -6.236608,-0.02363 0.212611,12.331472 3.307292,0.283483 -0.64017,14.371035 -1.403165,0.7684 4.04245,9.18739 10.048877,6.47824 9.165924,7.55952 6.000371,0.33073 8.409969,5.38616 9.827382,4.96094 15.54427,2.12611 0.73795,2.09022 3.70837,-0.46772 -3.14042,-5.14492 -2.8178,-3.89534 -9.37637,-13.07629 -12.628491,-13.43029 z" id="Southwest" draggable="true" class="zone" style="fill: rgb(253, 193, 169); opacity: 1;"></path><path d="m 65.413503,76.507093 2.673408,0.393949 5.879931,-6.748555 0.133633,-4.142679 3.942225,-3.80859 6.748558,-0.267269 5.686793,1.934578 0.09291,39.158113 -22.110022,0.0569 -0.283483,-9.543895 -2.882069,-0.330729 z" id="Downtown" draggable="true" class="zone" style="fill: rgb(252, 156, 126);"></path><path d="m 246.91295,168.04821 16.25298,0.47247 0.0591,-78.808032 -1.16721,-0.350165 -2.33861,2.00452 -3.14042,-0.100224 -1.33634,3.441094 -2.70611,-1.57021 7.45014,-5.746292 -1.67043,-2.873147 -11.05828,7.416728 z" id="Wilson Forest" draggable="true" class="zone" style="fill: rgb(253, 203, 183);"></path><path d="m 178.68824,205.18437 39.97098,-19.0878 44.41221,-15.40252 0.0945,-2.17337 -16.25298,-0.47247 0.28349,-3.2128 -8.78795,-0.0945 -2.26786,5.85863 -3.49628,0.0945 -30.52158,17.57589 -4.15773,0 -11.33929,8.03199 -9.4494,0.0945 z" id="Scenic Vista" draggable="true" class="zone" style="fill: rgb(254, 231, 221);"></path><path d="m 163.83626,154.27557 -21.81171,0.071 -0.28348,-8.69345 -23.52902,-0.66146 -2.17336,2.26786 1.88988,6.70908 -1.98437,9.4494 3.49627,4.53572 5.29167,2.17336 11.90625,13.41816 5.76414,14.36309 7.18154,3.59077 8.22099,0.47247 0,0.85045 8.59896,4.63021 5.95312,1.13393 5.38616,-0.28349 0.94494,-3.1183 -1.51189,-8.78795 0.66145,-14.07961 10.39434,-4.25223 1.41741,-1.55915 4e-5,-22.34784 z" id="Broadview" draggable="true" class="zone" style="fill: rgb(103, 0, 13);"></path><path d="m 189.74409,141.96786 -0.0945,12.18973 -4e-5,22.34784 -1.41741,1.55915 -10.39434,4.25223 -0.66145,14.07961 9.4494,-0.0945 11.33929,-8.03199 4.15773,0 7.15792,-4.09867 -0.54334,-42.39243 z" id="Chapparal" draggable="true" class="zone" style="fill: rgb(255, 235, 226);"></path><path d="m 208.73735,141.77883 0.54334,42.39243 23.36366,-13.47722 3.49628,-0.0945 2.26786,-5.85863 8.78795,0.0945 -0.17719,-22.99748 z" id="Terrapin Springs" draggable="true" class="zone" style="fill: rgb(253, 213, 195);"></path><path d="m 247.01925,141.83793 -38.2819,-0.0591 -0.37798,-40.34896 -5.48065,-6.803571 10.97031,-1.872874 12.93668,20.771685 3.59078,-3.68527 3.49627,0.28348 0.47248,2.74033 7.9375,-2.17336 2.64583,-4.06325 -0.75595,-3.96875 3.02381,-5.681454 z" id="Peppermill" draggable="true" class="zone" style="fill: rgb(254, 227, 215);"></path><path d="m 202.87872,94.626297 -26.88174,-0.419556 -0.0668,12.762119 -5.74629,9.55489 -0.0668,26.39286 0.53454,2.20498 -6.81537,3.27405 0,5.87993 25.81333,-0.11798 0.0945,-12.18973 18.9933,-0.18903 -0.37798,-40.34896 z" id="Cheddarford" draggable="true" class="zone" style="fill: rgb(149, 11, 19);"></path><path d="m 112.7314,94.012146 28.32009,-0.139491 0.0281,-12.333743 7.03981,-7.323288 4.53571,-8.173736 -12.61495,-0.188986 -7.84301,2.50409 -4.48847,-1.322916 -8.88244,-0.236236 -6.42559,-2.504091 0.33073,29.718397 z" id="Easton" draggable="true" class="zone" style="fill: rgb(254, 229, 218);"></path><path d="m 90.537553,93.739022 -0.0595,-29.870495 3.165549,0.755951 6.567338,-1.08668 6.28385,1.653645 5.90588,-0.897694 0.33073,29.718397 -22.193845,-0.273124 z" id="Weston" draggable="true" class="zone" style="fill: rgb(254, 234, 224);"></path><path d="m 90.537553,93.739022 0,11.091688 12.628487,13.43029 9.37637,13.0763 0,-37.598278 -22.004857,0 z" id="Southton" draggable="true" class="zone" style="fill: rgb(253, 207, 187); opacity: 1;"></path><path d="m 118.21205,144.99166 -0.68028,-3.4448 -2.73951,-0.70159 3.70837,-0.46772 -3.14042,-5.14494 28.4642,0.0334 8.38559,-5.57925 12.62848,-3.27405 1.60362,1.80407 3.70329,0.42002 -0.0283,14.2798 0.53454,2.20498 -6.81537,3.27405 0,5.87993 -21.81171,0.071 -0.28348,-8.69345 z" id="Oakwillow" draggable="true" class="zone" style="fill: rgb(255, 240, 233);"></path><path d="m 141.05149,93.872655 34.94549,0.334084 -0.0668,12.762121 -5.74629,9.55489 -0.0385,12.11305 -3.70329,-0.42002 -1.60362,-1.80407 -12.62848,3.27405 -8.38559,5.57925 -2.87314,0.0167 z" id="East Parton" draggable="true" class="zone" style="fill: rgb(254, 223, 209); opacity: 1;"></path><path d="m 141.05149,93.872655 -0.10022,41.410075 -25.59106,-0.0501 -2.8178,-3.89533 0.18899,-37.325153 z" id="West Parton" draggable="true" class="zone" style="fill: rgb(255, 245, 240); opacity: 1;"></path></g><g r="3" cx="190" cy="70" xmlns="http://www.w3.org/2000/svg" transform="translate(450 150) scale(0.02)" style="display: none;"><circle r="250" fill="black"></circle><circle r="50"></circle><path fill="black" d="M75,0A75,75 0 0,0 37.5-64.951905L125-216.50635A250,250 0 0,1 250,0Z" id="bld"></path><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bld" transform="rotate(120)"></use><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bld" transform="rotate(240)"></use></g><g transform=" scale(1.5) translate(100 50)" fill="red"><circle r="3" cx="33" cy="53"></circle><circle r="3" cx="80" cy="78"></circle><circle r="3" cx="160" cy="175"></circle><circle r="3" cx="88" cy="110"></circle><circle r="3" cx="105" cy="97"></circle><circle r="3" cx="230" cy="155"></circle><circle r="3" cx="130" cy="50"></circle></g></svg-->
<b-row><div id="mapDiv" >
  <svg class="btn" id="mapSvg" @click="defaultZone" width="450" height="400">
    <g id="scaler" transform="scale(1.1) translate(10 0)">
    <g id="gmap" transform="scale(1.5) translate(-15 0)"></g>
    <use xlink:href="../assets/nuclear.svg#nuclear_g" v-show="nuclear.show"  xmlns="http://www.w3.org/2000/svg"  transform="translate(250 80) scale(0.03)"></use>
    <g transform=" scale(0.03) translate(-1100 0)" >
      <use xlink:href="../assets/pharmacy.svg#hospital_g"  :x="hospital.cx*50" :y="hospital.cy*50" v-for="hospital in hospitals.coords" :key="hospital.id" v-show="hospitals.show" ></use>
    </g>
  </g>
  </svg>

</div></b-row>

    <!-- POPOVERS -->
  <b-row v-if="mounted">
    <b-popover triggers="hover" placement="top" v-for="stateid in this.states.slice(1)" :key="stateid.description" :target="stateid.id">
      <template #title>{{stateid.id}}</template>
      <div style=" text-align: center;"> <b>{{aggr_measure}}</b>:  {{Intl.NumberFormat().format(stateid[aggr_measure])}}</div>
      <hr style="margin-bottom: 0">
      <div style="text-align: right;color:#5bc0de;font-size: 0.7em">
        <span v-if="sidebar_show">click to select</span>
        <span v-else>click to see more</span></div>
    </b-popover>

  </b-row>
  </b-container></div>
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
        show: false},
      nuclear: {cx:190,
      cy:70,
      r:3,
      show: false},

    }
  },
  props: {
    dragged: String,
    states: Array,
    aggr_measure: String,
    sidebar_show: Boolean,
    mounted: Boolean,
  },
  computed:{
    max: function(){return d3.max(this.states.slice(1), d => d[this.aggr_measure]) },
    min: function(){return d3.min(this.states.slice(1), d => d[this.aggr_measure]) },
  },
  watch: {
    aggr_measure: function(){
      this.colourMap();
      this.scaleLegend();
    },
    states: function(){
      this.drawMap();
      this.drawLegend();
      this.colourMap();
    }
  },



  methods: {

    drawMap(){
      d3.select('#gmap').on('click',this.defaultZone).selectAll('path').data(this.states.slice(1)).enter().append('path')
        .attr('d', d => d.d).attr('id',d => d.id).attr('draggable','true').attr('class','zone')
         .attr('aria-controls','sidebar').attr('aria-expanded',false)
        .on('mouseenter', this.handleMouseEnter)
        .on('mouseleave', this.handleMouseLeave)
        .on('click',this.handleClick)
        .on('dragover',function(event){event.preventDefault()})
        .on('drag', this.handleDrag)
        .on('touchmove',this.handleDrag)
    },
    colourMap(){
      let color = d3.scaleSequential(d3.interpolateReds).domain([this.min,this.max]);
      d3.selectAll('.zone').transition().duration(1000)
          .style("fill", d => color(d[this.aggr_measure]));
    },

    drawLegend(){
      let barHeight = 10;
      let barWidth = 150;
      let colorScale = d3.scaleSequential(d3.interpolateReds).domain([this.min,this.max]);
      let axisScale = d3.scaleLinear().domain(colorScale.domain()).range([0,barWidth]);
      let axisBottom = g => g
          .attr("class", `x-axis`)
          .attr("transform", `translate(0 50)`)
          .call(d3.axisBottom(axisScale)
              .ticks(3)
              .tickSize(-barHeight));
      let svg = d3.select('#legendDiv').append('svg').attr('width',barWidth+30).attr('height',70);

      svg.append('defs').append("linearGradient").attr("id", "linear-gradient").selectAll("stop")
          .data(colorScale.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colorScale(t) })))
          .enter().append("stop")
          .attr("offset", d => d.offset)
          .attr("stop-color", d => d.color);
      svg.append('g').attr('transform','translate(0 40)').append("rect").attr("width", 150)
          .attr("height", barHeight).style("fill", "url(#linear-gradient)");
      svg.append('g')
          .call(axisBottom);
      svg.append("text")
          .attr('id','legend_label')
          .attr("text-anchor", "middle")
          .attr('font-size','10px')
          .attr("x", 75)
          .attr("y", 35)
          .text(this.aggr_measure);
    },
    scaleLegend(){
      let barWidth = 150;
      let barHeight = 10;
      let colorScale = d3.scaleSequential(d3.interpolateReds).domain([this.min,this.max]);
      let axisScale = d3.scaleLinear().domain(colorScale.domain()).range([0,barWidth]);
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


    handleMouseEnter(e,d){
      this.$emit('emitState',d.id);
      d3.select(e.target).style('opacity', 0.5);
    },
    handleMouseLeave(e){
      this.$emit('selectedState');
      d3.select(e.target).style('opacity',1);
    },
    handleClick(e,d) {
        this.$emit('showSidebar',d.id);

      e.stopPropagation();
    },
    handleDrag(e){
      this.$emit('emitDragged', e.target.id)
    },

    defaultZone(){
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

.x-axis line, .x-axis path { stroke: #fff; fill-opacity:0}
path{fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1}
</style>
