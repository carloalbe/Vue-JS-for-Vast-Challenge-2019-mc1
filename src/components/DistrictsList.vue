<template>
<div style="height: 477px;overflow-y: scroll">
  <b-container>
  <b-list-group>
    <!----------------HEADER-------------->
    <b-list-group-item variant="secondary" >
      <b-row>
        <b-col >DISTRICTS</b-col>
        <b-col>
          <b-badge style="margin-right:0;margin-left:auto;position:sticky">{{ aggr.toUpperCase()}}<br>{{ measure.toUpperCase() }} </b-badge>
        </b-col>
        <b-col><b-button v-if="selection.length<2" disabled variant="info" @click="cleanPlotly">CLEAN</b-button>
          <b-button v-else variant="info" @click="cleanPlotly">CLEAN</b-button> </b-col>
           </b-row>
    </b-list-group-item>

    <!------------------one row fro each district ---------------------->
    <b-list-group-item  v-for="state in states" :key="state.id">
      <b-row>
        <b-col><span class="btn" @click="handleClick">{{state.id}}</span></b-col>
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
    aggr: String,
    measure: String,
  },
  computed: {
    sel : function(){return this.selection}
  },
  methods:{
  addTrace(id){
    this.$emit('addtrace',id);
  },
    handleClick(e){
      let state = e.target.innerHTML;
      this.$emit('showSidebar',state)
    },
    cleanPlotly(){
      this.$emit('cleanPlotly');
   },

  }

}
</script>

<style scoped>

</style>
