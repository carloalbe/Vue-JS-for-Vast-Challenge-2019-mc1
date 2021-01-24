<template>
<div id="navBarDiv">
  <b-navbar id="navigationBar" toggleable="lg" type="dark" variant="primary">
<!--router-link :to="{name: 'dashboard',params:{aggr:this.aggr, measure:this.measure}}" -->
    <b-navbar-brand style="padding-left: 1%" href="/">  <img style="height: 30px;" src="../assets/StHimark_logo_white.png" class="d-inline-block align-top" alt="Kitten">
      St.Himark hearthquake map</b-navbar-brand>
    <!--/router-link-->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <!--b-button v-b-toggle.sidebar>Show sidebar</b-button-->
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item style="color:white"><!--router-link  :to="{name:'tableaurace'}" >Bar Chart Race</router-link--> </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav style="padding-right: 3%" class="ml-auto">


        <b-nav-form>
         <b-form-select class="btn" style="border:0;color:white;background-color: #007bff;margin-left: 5px;margin-right: 7px;" :options="aggregations"  id="aggregation-select" v-model="aggr" @change="changeAggr"></b-form-select>
         <b-form-select class="btn"  style="border:0;color:white;background-color: #007bff;margin-left: 5px;margin-right: 7px;" :options="measures"  id="measure-select" v-model="measure" @change="changeMeasure"></b-form-select>
        </b-nav-form>

      </b-navbar-nav >
    </b-collapse>
    <b-button id="nav_info" v-b-modal.use-info style="border:0;color:white;background-color: #007bff;margin-left: 7px;margin-right: 7px;" pill variant="dark" @click="$bvToast.show('info_toast')" > 𝕚𝕟𝕗𝕠 </b-button>
  </b-navbar>

  <b-modal id="use-info" hide-footer title="Usage">
    <h4>Intro</h4>This web app is based on (categorical) individual reports of shaking/damage by neighborhood over time.
      <h4>Reports</h4>Reports are made by citizens at any time, and indicates six different categorical values of how violent the shaking was/how bad the damage was (0 - lowest, 10 - highest; missing data allowed).
      <h4>Aggregations</h4>The app allow to select different aggregation metric (total, average, number) to analyze the six measure.

  </b-modal>
</div>
</template>

<script>
export default {
name: "NavBar",
  data(){
    return{
      aggr:'total',
      measure:'power',
    }
  },
  props: {
    measures:Array,
    aggregations:Array,
  },
  methods: {
  changeMeasure(){
    this.$emit('changeMeasure',this.measure);
  },
    changeAggr(){
    this.$emit('changeAggr',this.aggr);
    }
  }

}
</script>

<style >
  #navigationBar{

    position: fixed;
    width: 100%;
    height:9vmin;
    z-index: 99;
    margin: 0;
    padding: 0;
    border:0;
    left:0;
    top:0;
    box-shadow: 0.7vmin 0.7vmin 0.7vmin 0.7vmin rgba(9,129,104,0.3);
  }
  #navBarDiv{
    margin:0;
    border:0;
  }
  .bformselect{
    border:1px solid white;color:white;background-color: #007bff;margin-left: 5px;margin-right: 5px;
  }


</style>
