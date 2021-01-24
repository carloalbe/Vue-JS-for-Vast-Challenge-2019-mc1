<template>
  <div id="background">
    <b-overlay :show="mounting" rounded="sm">
    <b-container>

      <!------------------------SIDEBAR------------------->
    <b-sidebar id="sidebar" :measures="measures" :aggregations="aggregations" :title="state.id" shadow v-model="sidebar_show">
    <Sidebar :measures="measures.slice(1)" :aggregations="aggregations.slice(1)" :state="state" :mounted="mounted" />
    </b-sidebar>


    <b-row style="padding-top: 4vh;padding-bottom: 4vh;" >
      <!------------------PLOTLY GRAPHS----------------->
      <b-col>
        <b-card no-body>
        <b-tabs id="plotlyTabs" variant="dark" card>
          <b-tab active>
            <template v-slot:title><b-icon icon="smartwatch"></b-icon>    Time Series</template>
      <PlotTS ref="plot_ts" :states="selection" :aggr_measure="aggr_measure" :dragged="dragged" @cleanplotly="cleanPlotly" />
        </b-tab>
          <b-tab><template v-slot:title><b-icon icon="pentagon-half"/>    Radar Chart</template>
          <RadarChart ref="radar_chart" :mounted="mounted" :aggr="aggr" :selection='selection' :states="states" :aggr_measure="aggr_measure" :dragged="dragged" @cleanplotly="cleanPlotly" />
        </b-tab>
        </b-tabs>
        </b-card>
    </b-col>
      <!----------------------MAP E DISTRICTS LIST--------------->
      <b-col>
<b-card no-body>
  <b-tabs card>  <b-tab active>
    <template v-slot:title><b-icon icon="map"></b-icon>    Choropleth Map</template>
    <Map  @showSidebar="showSidebar" :sidebar_show="sidebar_show" :dragged="dragged" :aggr_measure="aggr_measure"  :states="states" :mounted="mounted" @defaultZone="defaultZone" @emitDragged="newDragged" @emitSelected="newSelected" @selectedState="lastSelected" @emitState="newState"/>
    </b-tab><b-tab><template v-slot:title><b-icon icon="list"></b-icon>    Districts List</template>
    <div v-if="mounted">
    <DistrictsList :measure="measure" :aggr="aggr" @cleanPlotly="cleanPlotly" @showSidebar="showSidebar"  :states="states.slice(1)" :aggr_measure="aggr_measure" :selection="selection" @addtrace="drawTrace"/></div></b-tab>
  </b-tabs></b-card></b-col>
    </b-row>
     <!-------------------------------PARETO & SCATTER PLOT----------------------------->
     <b-row><b-col>
    <b-card no-body><b-tabs card>
      <b-tab ><template v-slot:title><b-icon icon="bar-chart-line-fill">ciao</b-icon>    Pareto Plot</template>
    <b-row>
      <b-col ><Pareto @defaultZone="defaultZone" @showSidebar="showSidebar" :sidebar_show="sidebar_show"  :mounted="mounted" :values="states.slice(1)" :aggr_measure="aggr_measure" :selected="selected" @emitState="newState" @selectedState="lastSelected"/>
      </b-col></b-row>
      </b-tab>
      <b-tab ><template v-slot:title><b-icon icon="graph-up"></b-icon>    Scatter Plots</template>
      <b-row >

        <b-col><ScatterPlot @defaultZone="defaultZone" :sidebar_show="sidebar_show"  @showSidebar="showSidebar" @emitState="newState" @selectedState="lastSelected" :i="0" :selected="selected" :mounting="mounting" :x_label="aggr_measure" :y_label="this.aggr+' '+this.measures[1].value" :states="states.slice(1)"/></b-col>
        <b-col><ScatterPlot @defaultZone="defaultZone" :sidebar_show="sidebar_show"  @showSidebar="showSidebar" @emitState="newState" @selectedState="lastSelected" :i="1" :selected="selected" :mounting="mounting" :x_label="aggr_measure" :y_label="this.aggr+' '+this.measures[2].value" :states="states.slice(1)"/></b-col>
          <b-col><ScatterPlot @defaultZone="defaultZone" :sidebar_show="sidebar_show"  @showSidebar="showSidebar" @emitState="newState" @selectedState="lastSelected" :i="2" :selected="selected" :mounting="mounting" :x_label="aggr_measure" :y_label="this.aggr+' '+this.measures[3].value" :states="states.slice(1)"/></b-col>
      </b-row>
        <b-row>
          <b-col><ScatterPlot @defaultZone="defaultZone" :sidebar_show="sidebar_show"  @showSidebar="showSidebar" @emitState="newState" @selectedState="lastSelected" :i="3" :selected="selected" :mounting="mounting" :x_label="aggr_measure" :y_label="this.aggr+' '+this.measures[4].value" :states="states.slice(1)"/></b-col>
          <b-col><ScatterPlot @defaultZone="defaultZone" :sidebar_show="sidebar_show"  @showSidebar="showSidebar" @emitState="newState" @selectedState="lastSelected" :i="4" :selected="selected" :mounting="mounting" :x_label="aggr_measure" :y_label="this.aggr+' '+this.measures[5].value" :states="states.slice(1)"/></b-col>
          <b-col><ScatterPlot @defaultZone="defaultZone" :sidebar_show="sidebar_show"  @showSidebar="showSidebar" @emitState="newState" @selectedState="lastSelected" :i="5" :selected="selected" :mounting="mounting" :x_label="aggr_measure" :y_label="this.aggr+' '+this.measures[6].value" :states="states.slice(1)"/></b-col>
        </b-row></b-tab></b-tabs>
      </b-card></b-col>
      </b-row>

    <!--b-row>
      <GeoMap/>
    </b-row-->
  <!--b-row><TableauRace/></b-row-->

    </b-container>
    </b-overlay>
  </div>
</template>

<script>

//import json from "../../public/data/states_id.json";
import Map from "./Map.vue";
import Sidebar from "@/components/Sidebar";
import PlotTS from "@/components/PlotTS";
import RadarChart from "@/components/RadarChart";
import Pareto from "@/components/Pareto";
import ScatterPlot from "@/components/ScatterPlot";
import DistrictsList from "@/components/DistrictsList";
import * as d3 from "d3";


export default {
  name: 'Home',

  components: {
    ScatterPlot,
    PlotTS,
    RadarChart,
    Pareto,
    Sidebar,
    Map,
    DistrictsList,
   // NavBar,
    //GeoMap,
    //TableauRace,
  },
  data(){
    return {
      changment: 'St.Himark',
      mounting: true,
      states: [],
      dragged: null,
      defaultState: null,
      state:  {
        "id": "St.Himark",
      },
      selected: null,
      sidebar_show:false,
      selection: [],
      selection_list: [],
    };
  },
  computed:{
    aggr_measure: function(){return this.aggr + ' ' + this.measure},
    mounted: function(){return !this.mounting}
    },
  props: {
    measures:Array,
    aggregations:Array,
    aggr:String,
    measure:String,
  },
  watch: {

  },


  mounted(){
      this.dataFetch();
      this.prepare_plotly();
  },

  methods: {
    dataFetch(){
      fetch("/data/states.json")
          .then(res => res.json())
          .then((data) => {
            this.states = data.paths;
            this.defaultState = this.states[0];
            this.state = this.states[0];
            this.selected = this.states[0];
            this.mounting = false;
          }) ;
    },
    prepare_plotly(){
      d3.select('#plotlyTabs')
          .on('dragover',function(event){event.preventDefault()})
          .on('drop', ()=>{ this.drawTrace(this.dragged)});
    },
    drawTrace(id){
      if (!this.selection.includes(id)){
        this.$refs.plot_ts.drawTrace(id);
        this.$refs.radar_chart.drawTrace(id);
        this.selection.push(id);
      }
},
    cleanPlotly(){
      this.$refs.radar_chart.cleanPlot();
      this.$refs.plot_ts.cleanPlot();
      this.selection = ['St.Himark'];
    },

    handleCheck(id){
      this.changment=id;
      this.drawTrace(id.slice(-1).pop());
    },

    newState(id){
      this.state=this.states[this.states.map(d => d.id).indexOf(id)]
    },
    newSelected(id){
      this.selected=this.states[this.states.map(d => d.id).indexOf(id)]
    },
    lastSelected(){
      this.state = this.selected;
    },
    newDragged(id){
      this.dragged=id;
    },
    defaultZone(){
      this.state = this.defaultState;
      this.showSidebar('St.Himark');
    },
    showSidebar(id){
      if (this.sidebar_show==false || this.selected.id == id){this.sidebar_show = !this.sidebar_show;}
      this.newSelected(id);
    }


  }


}
</script>

<style>



#background{
  width: 100%;
  height:100%;
  margin-top:8vmin;
  padding-top:5vh;
  margin-left: 0 ;
  margin-right:0;
  padding-left:0;
  padding-right:0;
  margin-bottom:0;
  overflow-x: hidden;
}



</style>
