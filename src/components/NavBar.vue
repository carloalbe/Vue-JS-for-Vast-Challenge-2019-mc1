<template>
<div>
  <b-navbar id="navigationBar" toggleable="lg" type="dark" variant="primary">
<!--router-link :to="{name: 'dashboard',params:{aggr:this.aggr, measure:this.measure}}" -->
    <b-navbar-brand style="padding-left: 1%" href="/">St.Himark hearthquake map</b-navbar-brand>
    <!--/router-link-->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item style="color:white"><!--router-link  :to="{name:'tableaurace'}" >Bar Chart Race</router-link--> </b-nav-item>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav style="padding-right: 3%" class="ml-auto">

       <b-nav-form>
        <b-form-select style="color:white; background-color: #007bff; border: 0" :options="aggregations"  id="aggregation-select" v-model="aggr" @change="changeAggr"></b-form-select>
         <b-form-select style="color:white; background-color:rgba(0,0,0,0); border: 0" :options="measures"  id="measure-select" v-model="measure" @change="changeMeasure"></b-form-select>
        </b-nav-form>


      </b-navbar-nav >
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
name: "NavBar",
  data(){
    return{
      aggregations: [{text:'Select an aggregation',value:null,disabled:true},{text:'Average',value:'avg'},{text:'Total',value:'tot'},{text:'number',value:'num'}],
      measures: [{text:'Select a measure',value:null, disabled:true},{text:'Power',value:'power'},{text:'Buildings',value:'buildings'},{text:'Sewer and Water',value:'sewer_and_water'},{text:'Roads and Bridges',value:'roads_and_bridges'},{text:'Shake Intensity',value:'shake_intensity'},{text:'Medical',value:'medical'}],
      measure: 'power',
      aggr: 'tot',
    }
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
    height:10%;
    z-index: 99;
    margin: 0;
    padding: 0;
    border:0;
    left:0;
    right:5%;


  }


</style>
