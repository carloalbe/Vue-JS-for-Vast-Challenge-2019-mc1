<template>
<div style="height: 477px;overflow-y: scroll">
  <b-container>
  <b-list-group>
    <b-list-group-item v-for="state in states" :key="state.id">
      <b-row>
      <b-col >{{state.id}}</b-col>
      <b-col>
        <b-badge v-if="aggr_measure.includes('average')" style="margin-right:0;margin-left:auto;position:sticky">
        {{state[aggr_measure].toFixed(2)}}
      </b-badge>
      <b-badge v-else style="margin-right:0;margin-left:auto;position:sticky">{{state[aggr_measure]}}</b-badge>
      </b-col>
      <b-col><b-button v-if="!selection.includes(state.id)" variant="info" @click="addTrace(state.id)">add</b-button>
             <b-button v-else disabled variant="info" @click="addTrace(state.id)">add</b-button> </b-col>
      </b-row></b-list-group-item>
  </b-list-group>
    <!--table>
      <tr v-for="state in states" :key="state.id"><td>{{state.id}}</td><td>{{state[aggr_measure]}}</td></tr>
    </table-->
  </b-container>
</div>
</template>

<script>
export default {
name: "DistrictsList",
  props: {
    states: Array,
    aggr_measure: String,
    selection: Array,
  },
  computed: {
    sel : function(){return this.selection}
  },
  methods:{
  addTrace(id){
    this.$emit('addtrace',id);
  }
  }

}
</script>

<style scoped>

</style>
