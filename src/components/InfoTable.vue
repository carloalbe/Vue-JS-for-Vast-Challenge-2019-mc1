<template><div  v-if="state" style="padding:0">
  <table class="table" id="info">
    <thead class="thead-dark"><tr><th></th><th scope="col">Total</th><th scope="col">Average</th><th scope="col">Number</th></tr></thead>
    <b-tbody>
      <tr><th scope=row>Shake <br> Intensity</th> <td>{{state.tot_shake_intensity}}</td><td>{{state.avg_shake_intensity.toFixed(2)}}</td><td>{{state.num_shake_intensity}}</td></tr>
      <tr><th scope=row>Power</th><td>{{state.tot_power}}</td><td>{{state.avg_power.toFixed(2)}}</td><td>{{state.num_power}}</td></tr>
      <tr><th scope=row>Buildings</th><td>{{state.tot_buildings}}</td><td>{{state.avg_buildings.toFixed(2)}}</td><td>{{state.num_buildings}}</td></tr>
      <tr><th scope=row>Sewer & Water</th><td>{{state.tot_sewer_and_water}}</td><td>{{state.avg_sewer_and_water.toFixed(2)}}</td><td>{{state.num_sewer_and_water}}</td></tr>
      <tr><th scope=row>Medical</th><td>{{state.tot_medical}}</td><td>{{state.avg_medical.toFixed(2)}}</td><td>{{state.num_medical}}</td></tr>

    </b-tbody>

  </table></div>
</template>

<script>
export default {
name: "InfoTable",
  props: {
    state: Object,
  },

}
</script>

<style >
#info{
  position: absolute ;
  width: content-box;
  color: green;
  font-size:  1vw;
  margin:0;
  border: 0;
  padding:0;
  right:0;
}
tr{
  border: 0;
  width: 100%;
 margin:0;
  padding:0;

}
td,th{
  position:relative;
  width: 20%;
  padding:0;
  margin:0;
  border: 0;
  vertical-align: middle;
}
</style>
