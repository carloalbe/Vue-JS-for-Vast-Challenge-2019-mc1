<template>
  <div id="donutDiv">

  </div>

</template>

<script>
export default {
name: "Donut",
  props:{
  states: Object,
    aggr: String,
    measure:String,
  },
  mounted(){
  window.addEventListener('load', () => {
    this.createDonut();
  })
  }

}
</script>

<style scoped>

</style>
