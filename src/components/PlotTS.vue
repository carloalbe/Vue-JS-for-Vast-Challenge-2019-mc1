<template>
  <div>
<div id="plotDiv" >
  <b-row>
    <b-col><button type="button" class="btn btn-primary" @click="cleanPlot">CLEAN</button></b-col>
    <b-col><b-form-checkbox v-model="show_avg" name="avgOnOff" switch>
      Show average
    </b-form-checkbox></b-col>
  </b-row>
</div>
  </div>
</template>

<script>
import Plotly from'plotly.js-dist';
import * as d3 from'd3';
export default {
  name: "PlotTS",
  data(){
    return{
      traces:[],
      path:'/data/states_ts/',
      states:[],
      show_avg: true,
      pos_avg: 0
    }
  },
  props: {
    aggr: String,
    measure: String,
    dragged: String,
  },
  watch: {
    //traces: function(){this.drawPlot()},
    //aggr: function(){this.drawPlot()},
    show_avg: function(){
      if (this.show_avg){
        Plotly.restyle('plotDiv', {visible : true}, 0);
      }
      else {
        Plotly.restyle('plotDiv', {visible : "legendonly"}, 0);
      }
    },
    measure: function(){this.redrawPlot();},
  },
  mounted() {
    this.drawPlot();
  },

  methods: {

    drawPlot(){
      let layout = {
        yaxis:{title: this.aggr + ' ' + this.measure},
        xaxis:{
          tickvals:['2020-04-06', '2020-04-07','2020-04-08','2020-04-09','2020-04-10'],
          tickformat: '%b %e',
        },
        width:500,
        height:300,
        margin:{l:80,r:50,t:25,b:50},
        colorscale:'sequential',
        showlegend:true};
      Plotly.newPlot('plotDiv', this.traces, layout);
      d3.select('#plotDiv')
          .on('dragover',function(event){event.preventDefault()})
          .on('drop', ()=>{ if (!this.states.includes(this.dragged)){this.drawTrace(this.dragged)}});
      this.drawTrace('St. Himark');

    },

    cleanPlot(){
      Plotly.deleteTraces('plotDiv',Array.from({length: this.traces.length - 1}, (_, i) => i + 1 ));
      this.states = ['St. Himark'];
    },

    drawTrace(state){
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key];
        });
      }
      Plotly.d3.csv(this.path+state+'.csv', (err, rows) => {
        let aggr_measure = this.aggr+'_'+this.measure;
        let trace = {
          type: "scatter",
          mode: "lines",
          name: state,
          x: unpack(rows, 'time'),
          y: unpack(rows, aggr_measure),
        };
        this.states.push(state);
        Plotly.addTraces('plotDiv', trace);

      });
    },
    redrawPlot(){  //laench when aggregation or measure changes
      let i;
      for (i=0;i<this.states.length;i++){
        this.redrawTrace(this.states[i],i)
      }
      Plotly.relayout('plotDiv',{yaxis:{title:this.aggr+' '+this.measure}});
    },

    redrawTrace(state,pos){
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key];
        });
      }
      Plotly.d3.csv(this.path+state+'.csv', (err, rows) => {
        let aggr_measure = this.aggr+'_'+this.measure;
        let y =  unpack(rows, aggr_measure);
        Plotly.animate('plotDiv',{
          data: [{y: y}],
              traces: [pos],

        }, {
          transition: {
            duration: 500,
                easing: 'cubic-in-out'
          },frame: {
            duration: 500
          }});

      });
    },
  }

}


</script>

<style scoped>
</style>
