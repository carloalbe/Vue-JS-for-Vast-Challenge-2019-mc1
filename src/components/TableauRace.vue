<template>
  <div id="mydiv">
    <Tableau
        :url ="url" :height="1000"
        :width="1000"
        ref="tableau">
    </Tableau>
  </div>
</template>

<script>

export default {
  name: "TableauRace",
  data(){
    return{
      url: 'https://public.tableau.com/views/MC1_16027903908960/Foglio1?:language=it&:display_count=y&:origin=viz_share_link',
    }
  },

}
</script>


<style scoped>

</style>
