<template>

  <div id="app"  >
    <b-row>
    <NavBar :aggregations="aggregations" :measures="measures" :aggr="aggr" :measure="measure" @changeMeasure="changemeasure" @changeAggr="changeaggr" />
    </b-row>

    <b-row>
      <!--router-view></router-view-->
    <Dashboard :aggregations="aggregations" :measures="measures" :aggr="aggr" :measure="measure"/>
    </b-row>
    <b-row>
    <Footer/>
    </b-row>

  </div>

</template>

<script>
import Dashboard from './components/Dashboard.vue'
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
export default {
  name: 'App',
  components: {
    Dashboard,
    NavBar,
    Footer,
  },
  data(){
    return{
      aggr: 'total',
      measure:'power',
      aggregations: [{text:'Select an aggregation',value:null,disabled:true},{text:'Average',value:'average'},{text:'Total',value:'total'},{text:'Number of',value:'number of'}],
      measures: [{text:'Select a category',value:null, disabled:true},{text:'Power',value:'power'},{text:'Buildings',value:'buildings'},{text:'Sewer and Water',value:'sewer & water'},{text:'Roads and Bridges',value:'roads & bridges'},{text:'Shake Intensity',value:'shake intensity'},{text:'Medical',value:'medical'}],


    }
  },



  methods: {

    changemeasure(m){
      this.measure = m;
    },
    changeaggr(a){
      this.aggr = a;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  margin-left:0;
  padding:0;
  overflow-x: hidden;
}
b-row,b-col,b-container{
  margin:0;padding:0;
}


</style>
