<template>
  <b-container>
    <b-row>
      <b-col>
        <b-row><b-form-select :options="aggregations"  id="aggregation-select" v-model="aggr"></b-form-select></b-row>
        <b-row><b-form-select :options="measures"  id="measure-select" v-model="measure"></b-form-select></b-row>
        <b-row><div><Map :dragged="dragged" :aggr="aggr" :measure="measure"  :states="states" :selected="selected" @defaultZone="defaultZone" @emitDragged="newDragged" @emitSelected="newSelected" @emitState="newState"/></div></b-row>
      </b-col>
      <b-col>
          <b-row><div><SideMap :state="state" /></div></b-row>
        <b-row><div><InfoTable :state="state" /></div></b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col><div>
        <!--PlotTS :aggr="aggr" :measure="measure" :dragged="dragged"/-->
        </div></b-col>
      <b-col><div><Pareto/></div></b-col>
    </b-row>
  </b-container>
</template>

<script>

import json from "../../public/data/states_id.json";
import Map from "./Map.vue";
import SideMap from "@/components/SideMap";
import InfoTable from "@/components/InfoTable";
//import PlotTS from "@/components/PlotTS";
import Pareto from "@/components/Pareto";

export default {
  name: 'Home',

  components: {
   // PlotTS,
    Pareto,
    InfoTable,
    SideMap,
    Map,
  },
  data(){
    return {
      aggr: 'tot',
      aggregations: ['avg','tot','num'],
      measure: 'power',
      measures: [{text:'Select a measure',value:null, disabled:true},{text:'Power',value:'power'},{text:'Buildings',value:'buildings'},{text:'Sewer and Water',value:'sewer_and_water'},{text:'Roads and Bridges',value:'roads_and_bridges'},{text:'Shake Intensity',value:'shake_intensity'},{text:'Medical',value:'medical'}],
      states : [],
      defaultState: json.paths["St.Himark"],
      state: json.paths["St.Himark"],
      selected:json.paths["St.Himark"],
      dragged: null,

    };
  },
  created(){
    this.dataFetch();
  },

  methods: {
    dataFetch(){
      fetch("/data/states.json")
          .then(res => res.json())
          .then((data) => (this.states = data.paths.map((d) => {
            return {
              id: d.id,
              d: d.d,
              tot_sewer_and_water: +d.tot_sewer_and_water,
              avg_sewer_and_water: +d.avg_sewer_and_water,
              num_sewer_and_water: +d.num_sewer_and_water,
              tot_power: +d.tot_power,
              avg_power: +d.avg_power,
              num_power: +d.num_power,
              tot_roads_and_bridges: +d.tot_roads_and_bridges,
              avg_roads_and_bridges: +d.avg_roads_and_bridges,
              num_roads_and_bridges: +d.num_roads_and_bridges,
              tot_buildings: +d.tot_buildings,
              avg_buildings: +d.avg_buildings,
              num_buildings: +d.num_buildings,
              tot_shake_intensity: +d.tot_shake_intensity,
              avg_shake_intensity: +d.avg_shake_intensity,
              num_shake_intensity: +d.num_shake_intensity,
              tot_medical: +d.tot_medical,
              avg_medical: +d.avg_medical,
              num_medical: +d.num_medical,
            };
          })));
    },
    newState(id){
      this.state=json.paths[id];
    },
    newSelected(id){
      this.selected=json.paths[id];
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

<style scoped>

</style>
