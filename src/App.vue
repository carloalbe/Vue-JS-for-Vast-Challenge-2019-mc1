<!--
- dividere il database per ore in json, e fare mappa. la mapa reagisce ad un doppio slider posto sotto plot ts,
  che condivide l 'asse coi ticks delle giornate
  (in questo caso in realta viene più comodo avere il databse giorno per giorno)

 - di sicuro aggiunge effetto hover visitando il pareto chart con selezione stato attraverso clic


-scrivere tutte le path stato con un v-for per usare poi v-btoggle-sidebar.
   oppure uscire il sidebar al click

-->
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
  margin-left:0;
  padding:0;
  padding-left:0;
}
b-row,b-col,b-container{
  margin:0;padding:0;
}


</style>
