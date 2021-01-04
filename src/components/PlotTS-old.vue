<template>
  <div style="padding-top:30px">
    <b-row><div id="plotDiv"></div></b-row>
  <b-row style="padding-left:100px;padding-right: 50px">
    <b-col><b-button variant="outline-primary" @click="cleanPlot">CLEAN</b-button></b-col>
    <b-col><b-form-checkbox v-model="show_avg" name="avgOnOff" switch>
      Show average
    </b-form-checkbox></b-col>
    <b-col>
      <b-button pill variant="outline-info" @click="$bvToast.show('info_toast')" >  <span style="color:rgba(0,0,0,0)">.</span>i<span style="color: rgba(0,0,0,0)">.</span> </b-button>

    </b-col>
    <b-toast id="info_toast" title="Plot a state" static no-auto-hide>
      Drag a state from the map and drop it inside this plot to visualize its time series.
    </b-toast>
  </b-row>
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
      show_avg: true,
      pos_avg: 0,
      layout : {
        legend:{"orientation": "h",y:1.1},
        yaxis:{title: this.aggr_measure},
        xaxis:{
          tickvals:['2020-04-06', '2020-04-07','2020-04-08','2020-04-09','2020-04-10'],
          tickformat: '%b %e',
        },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        width:450,
        height: 400,
        margin:{l:60,r:20,t:20,b:40},
        colorscale:'sequential',
        showlegend:true},
    }
  },
  props: {
    states:Array,
    aggr_measure: String,
    dragged: String,
  },
  watch: {

    show_avg: function(){
      if (this.show_avg){
        Plotly.restyle('plotDiv', {visible : true}, 0);
      }
      else {
        Plotly.restyle('plotDiv', {visible : "legendonly"}, 0);
      }
    },
    aggr_measure: function(){this.redrawPlot();},
  },
  mounted() {
    this.drawPlot();
  },

  methods: {

    drawPlot(){
      Plotly.newPlot('plotDiv', this.traces, this.layout);
      d3.select('#plotDiv')
          .on('dragover',function(event){event.preventDefault()})
          .on('drop', ()=>{ if (!this.states.includes(this.dragged)){this.drawTrace(this.dragged)}})
          .on('touchend', ()=>{ if (!this.states.includes(this.dragged)){this.drawTrace(this.dragged)}});
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

        let trace = {
          type: "scatter",
          mode: "lines",
          name: state,
          x: unpack(rows, 'time'),
          y: unpack(rows, this.aggr_measure),
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
      Plotly.relayout('plotDiv',{yaxis:{title:this.aggr_measure}});
      Plotly.relayout('plotDiv', {
        'xaxis.autorange': true,
        'yaxis.autorange': true,
      });
    },

    redrawTrace(state,pos){
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key];
        });
      }
      Plotly.d3.csv(this.path+state+'.csv', (err, rows) => {
        let y =  unpack(rows, this.aggr_measure);
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


.btn-circle.btn-sm {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  font-size: 8px;
  text-align: center;
  font-size: large;
  font-style: italic;
}


#plotDiv{

}
</style>
