<template>
  <div id="background">
    <b-row>

    <b-col cols="3">

    <div  id="sideCol"><h3>{{state.id}}</h3></div>
      <div id="sideScroll" >
        <b-row><SideMap :state="state" /></b-row>
        <b-row><InfoTable :state="state" /></b-row>
      </div>

    </b-col>


      <b-col  cols="9">
    <b-row >

      <b-col >
        <Map  :dragged="dragged" :aggr_measure="aggr_measure"  :states="states" :selected="selected" @defaultZone="defaultZone" @emitDragged="newDragged" @emitSelected="newSelected" @selectedState="lastSelected" @emitState="newState"/>
      </b-col>

      <b-col >
       <PlotTS :aggr_measure="aggr_measure" :dragged="dragged"/>

      </b-col>

    </b-row>
    <b-row><Pareto :defaultState="defaultState" :values="states.slice(1)" :aggr_measure="aggr_measure" :selected="selected" @emitState="newState" /></b-row>
      </b-col>

    <!--b-row>
      <GeoMap/>
    </b-row-->
  <!--b-row><TableauRace/></b-row-->
    </b-row>

  </div>
</template>

<script>

//import json from "../../public/data/states_id.json";
import Map from "./Map.vue";
import SideMap from "@/components/SideMap";
import InfoTable from "@/components/InfoTable";
import PlotTS from "@/components/PlotTS";
import Pareto from "@/components/Pareto";
//import NavBar from "@/components/NavBar";
//import GeoMap from "@/components/GeoMap";
//import TableauRace from "@/components/TableauRace";

export default {
  name: 'Home',

  components: {
    PlotTS,
    Pareto,
    InfoTable,
    SideMap,
    Map,
   // NavBar,
    //GeoMap,
    //TableauRace,
  },
  data(){
    return {
      //aggr: 'tot',
      aggregations: [{text:'Select an aggregation',value:null,disable:true},{text:'Average',value:'avg'},{text:'Total',value:'tot'},{text:'number',value:'num'}],
      //measure: 'power',
      measures: [{text:'Select a measure',value:null, disabled:true},{text:'Power',value:'power'},{text:'Buildings',value:'buildings'},{text:'Sewer and Water',value:'sewer_and_water'},{text:'Roads and Bridges',value:'roads_and_bridges'},{text:'Shake Intensity',value:'shake_intensity'},{text:'Medical',value:'medical'}],
      states: [],
      dragged: null,
      defaultState: null,
      state:  {
        "id": "St.Himark",
      },
      selected: null,

    };
  },
  computed:{
    aggr_measure: function(){return this.aggr + '_' + this.measure},
  },
  props: {

    aggr: {
      type:String,
      default:'tot',
    },
    measure: {
      type:String,
      default:'power',
    },

  },

  mounted(){
      this.dataFetch();
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

          }) ;

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
      this.selected = this.defaultState;
      this.state = this.defaultState;
    }


  }


}
</script>

<style>


#sideCol {
  position: fixed;
  width: 23%;
  height: 10%;
  font-size: 10px;
  margin-top:4%;
  padding-top:2%;
  padding-left:0;
  padding-right: 0;
  border:0;
  right:0;
  left:0;
  top: 0;
  bottom: 0;
  background-color:#96C5BB;
}
#sideScroll{

  position: fixed;
  width: 23%;
  font-size: 10px;
  overflow-y: auto;
  margin-top:10%;
  padding-top:0;
  padding-left:0;
  padding-right: 0;
  margin-right:0;
  border:0;
  right:0;
  left:0;
  top: 0;
  bottom: 0;
  background-color: #96C5BB;
  overflow-x: hidden;
}
#background{
  width: 100%;
  height:100%;
  padding-top:5%;
  margin-left: 0 ;
  margin-right:0;
  padding-left:0;
  padding-right:0;
  overflow-x: hidden;
}


</style>
