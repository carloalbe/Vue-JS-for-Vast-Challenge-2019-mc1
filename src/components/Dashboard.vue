<template>
  <div id="background">
  <b-container >
    <!--b-row>
      <NavBar/>
    </b-row-->
    <b-row>
      <b-col>
        <!--b-row><b-form-select :options="aggregations"  id="aggregation-select" v-model="aggr"></b-form-select></b-row>
        <b-row><b-form-select :options="measures"  id="measure-select" v-model="measure"></b-form-select></b-row-->
        <b-row><div><Map :dragged="dragged" :aggr_measure="aggr_measure"  :states="states" :selected="selected" @defaultZone="defaultZone" @emitDragged="newDragged" @emitSelected="newSelected" @selectedState="lastSelected" @emitState="newState"/></div></b-row>
      </b-col>
      <b-col>
        <div class="roundedDiv">
          <b-row><div><SideMap :state="state" /></div></b-row>
        <b-row><div><InfoTable :state="state" /></div></b-row>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col><div>
        <PlotTS :aggr_measure="aggr_measure" :dragged="dragged"/>
        </div></b-col>
      <b-col><div><Pareto :defaultState="defaultState" :values="states.slice(1)" :aggr_measure="aggr_measure"/></div></b-col>
    </b-row>
    <!--b-row>

      <GeoMap/>
    </b-row>
  <b-row><TableauRace/></b-row-->
  </b-container>
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
   // GeoMap,
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
      state: null,
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
            const states = data.paths;
            this.states = states;
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
    }


  }


}
</script>

<style>
.roundedDiv{
  border: 1px solid purple;
  border-radius: 30px 30px 30px 30px  ;
}
#background{width: 100%;height:100%; padding-top:5%; background: hsla(49, 78%, 40%, 1);

  background: linear-gradient(45deg, hsla(49, 78%, 40%, 1) 0%, hsla(34, 82%, 60%, 1) 27%, hsla(48, 37%, 58%, 1) 50%, hsla(236, 100%, 72%, 1) 100%);

  background: -moz-linear-gradient(45deg, hsla(49, 78%, 40%, 1) 0%, hsla(34, 82%, 60%, 1) 27%, hsla(48, 37%, 58%, 1) 50%, hsla(236, 100%, 72%, 1) 100%);

  background: -webkit-linear-gradient(45deg, hsla(49, 78%, 40%, 1) 0%, hsla(34, 82%, 60%, 1) 27%, hsla(48, 37%, 58%, 1) 50%, hsla(236, 100%, 72%, 1) 100%);

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#B69917", endColorstr="#EDA546", GradientType=1 );}
</style>
