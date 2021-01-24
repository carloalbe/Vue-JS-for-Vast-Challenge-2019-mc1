<template>
  <div style="padding-top:30px">
    <b-row><div id="radarDiv"></div></b-row>
  <b-row style="padding-left:100px;padding-right: 50px">
    <b-col><b-button variant="outline-primary" @click="cleanplotly">CLEAN</b-button></b-col>
    <b-col><b-form-checkbox  v-model="show_avg" button-variant="danger" name="avgOnOff" switch>
      Show average
    </b-form-checkbox></b-col>
    <b-col>
      <b-button pill variant="outline-primary" id="radar_info" >
        <span style="color:rgba(0,0,0,0)">.</span>i<span style="color: rgba(0,0,0,0)">.</span>
      </b-button>
    </b-col>
    <b-popover triggers="click" target="radar_info" title="Plot a district">
      Drag a district from the map and drop it inside this plot to visualize its time series. You can also add it from the districts list.
    </b-popover>


  </b-row>
</div>
</template>

<script>
import Plotly from'plotly.js-dist';

export default {
  name: "RadarChart",
  data(){
    return{
      theta: ['power','buildings','sewer & water','medical','shake intensity','roads & bridges','power'],
      state: null,
      traces:[],
      r:null,
      path:'/data/states_ts/',
      show_avg: true,
      pos_avg: 0,
      layout : {
        legend:{"orientation": "h",y:1.2},
        //title: {text:this.aggr,} ,
        radialaxis:{visible:true},
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        width:480,
        height: 400,
        margin:{l:40,r:20,t:0,b:20},
        colorscale:'sequential',
        showlegend:true},
    }
  },
  props: {
    mounted: Boolean,
    selection: Array,
    states:Array,
    aggr: String,
    dragged: String,
  },
  computed: {
    aggr_measures: function(){return this.theta.map((row) => {return this.aggr+' '+row})},
  },
  watch: {
    mounted: function(){this.drawPlot()},

    show_avg: function(){
      if (this.show_avg){
        Plotly.restyle('radarDiv', {visible : true}, 0);
      }
      else {
        Plotly.restyle('radarDiv', {visible : "legendonly"}, 0);
      }
    },
    aggr: function(){this.redrawPlot();},
  },


  methods: {

    drawPlot(){
      Plotly.newPlot('radarDiv', this.traces, this.layout);
      this.drawTrace('St.Himark');

    },

    cleanPlot(){
      Plotly.deleteTraces('radarDiv',Array.from({length: this.traces.length - 1}, (_, i) => i + 1 ));
    },
    cleanplotly(){
      this.$emit('cleanplotly');
    },

    drawTrace(stateid){
      let state = this.states.filter(function(s){return s.id == stateid})[0];
      function unpack(state, am) {
        return am.map(function(attr){
          if (state.id=='St.Himark' && !attr.includes('average')){
            return state[attr]/19
          }
          else{return state[attr]}
        })
      }
        let trace = {
          type: "scatterpolar",
          name: state.id,
          theta: this.theta,
          r: unpack(state,this.aggr_measures)

        };

        Plotly.addTraces('radarDiv', trace);
    },

    redrawPlot(){  //laench when aggregation or measure changes
      let i;
      for (i=0;i<this.selection.length;i++){
        this.redrawTrace(this.selection[i],i)
      }
      //Plotly.relayout('radarDiv',{radialaxis:{}});

    },

    redrawTrace(stateid,pos){
      let state = this.states.filter(function(s){return s.id == stateid})[0];

      function unpack(state, theta) {
        return theta.map(function(attr){
          if (state.id=='St.Himark' && !attr.includes('average')){
            return state[attr]/19
          }
          else{return state[attr]}
        })
      }

        Plotly.animate('radarDiv',{
          data: [{r: unpack(state,this.aggr_measures)}],
              traces: [pos],

        }, {
          transition: {
            duration: 500,
                easing: 'cubic-in-out'
          },frame: {
            duration: 500
          }});

    },


  }

}


</script>

<style scoped>




#radarDiv{

}
</style>
