<template>
  <table class="table" id="info">
    <thead class="thead-dark"><tr><th></th><th scope="col">Total</th><th scope="col">Average</th><th scope="col">Number</th></tr></thead>
    <b-tbody>
      <tr><th scope=row>Shake Intensity</th> <td>{{state.tot_shake_intensity}}</td><td>{{state.avg_shake_intensity.toFixed(2)}}</td><td>{{state.num_shake_intensity}}</td></tr>
      <tr><th scope=row>Power</th><td>{{state.tot_power}}</td><td>{{state.avg_power.toFixed(2)}}</td><td>{{state.num_power}}</td></tr>
      <tr><th scope=row>Buildings</th><td>{{state.tot_buildings}}</td><td>{{state.avg_buildings.toFixed(2)}}</td><td>{{state.num_buildings}}</td></tr>
      <tr><th scope=row>Sewer and Water</th><td>{{state.tot_sewer_and_water}}</td><td>{{state.avg_sewer_and_water.toFixed(2)}}</td><td>{{state.num_sewer_and_water}}</td></tr>
      <!-- medicals -->
    </b-tbody>

  </table>
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
  width: 400px;
  color: green;
  font-size: small;
}
tr{

}
td{
  width: border-box;
}
</style>
