<template>
  <div id="app"  >
    <b-row>
    <NavBar :aggr="aggr" :measure="measure" @changeMeasure="changemeasure" @changeAggr="changeaggr" />
    </b-row>
    <b-row>
      <!--router-view></router-view-->
    <Dashboard :aggr="aggr" :measure="measure"/>
    </b-row>

  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
import NavBar from "@/components/NavBar"
export default {
  name: 'App',
  components: {
    Dashboard,
    NavBar,
  },
  data(){
    return{

      aggr: 'tot',
      measure:'power',

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
}



</style>
