<template>
  <div @click="changeSide" v-if="mounted">

  <div id="minimapDiv" >
    <svg id="minimap"  xmlns="http://www.w3.org/2000/svg" width="200" height="200" :viewBox="view" preserveAspectRatio="xMinYMin"><path  v-if="state" :d="state.d" id="minipath" ></path></svg>
  </div>

  <div  id="infoDiv" style="padding:0">
  <table class="table" id="info" >
    <thead class="thead-dark"><tr><th></th><th scope="col">Average</th><th scope="col">Total</th><th scope="col">N° of</th></tr></thead>
    <b-tbody>
      <tr v-for="m in measures" :key="m.text"><th scope="row">{{m.value}}</th><td v-for="a in aggregations" :key="a.text">
        <span v-if="a.text=='Average'">{{state[a.value + ' ' + m.value].toFixed(2)}}</span>
      <span v-else>{{state[a.value + ' ' + m.value]}}</span></td></tr>

      </b-tbody>
  </table>
  </div>

</div>
</template>

<script>

import * as d3 from "d3";
export default {
  name: "Sidebar",

  props: {
    state: Object,
    mounted:Boolean,
    measures: Array,
    aggregations:Array,
  },
  data(){
    return{
      color:'#000000',
      dx: '0',
      dy: '0',
      zoom: '1',
      dime: 0,
      view: "0 0 200 200",
      t:0,
    }
  },
  watch: {
    state(){this.d_transform()}
  },
  methods:{
    getBounds() {
      let d = this.state.d.substring(2,this.state.d.search('z')).split(' ');
      let [b, r] = d[0].split(',');
      let [t, l] = d[0].split(',');
      let [x, y] = d[0].split(',');

      t = Number(t);
      b = Number(b);
      r = Number(r);
      l = Number(l);
      x = Number(x);
      y = Number(y);
      for (let i = 1; i < d.length; i++) {
        x += Number(d[i].split(',')[0]);
        if (x < l) {
          l = x
        }
        if (x > r) {
          r = x
        }
        y += Number(d[i].split(',')[1]);
        if (y < t) {
          t = y
        }
        if (y > b) {
          b = y
        }
      }

      return [t, b, l, r]   //top, bottom, left ,right
    },

    d_transform(){
      let [t, b, l, r]  = this.getBounds();
      //if (this.state.id=="St.Himark"){        [t,b,l,r] = this.getBoundsStH()}
      let dim =Math.max(b - t, r - l);
      this.dime=dim;
      this.dx = String( l-10);
      this.dy = String(t-20);
      this.zoom = String((270/dim)**0.7);
      this.view = this.dx+" "+this.dy+" "+String(dim +40 )+" "+String(dim +40);

    },

    changeSide(){
      let cl = d3.select('#sidebar').attr('class');
      let sb = d3.select('#sidebar');
      if (cl.includes('right')){
        sb.attr('class','b-sidebar shadow bg-light text-dark');
      }
      else {
        sb.attr('class','b-sidebar shadow b-sidebar-right bg-light text-dark');
      }
    },
  },

}
</script>

<style >
#minimapDiv{
  background-color: #343a40;
}
#minimap{
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 30px;
  background-color: white;
}

#infoDiv{
  width: 100%;
  margin:0;
  border:0;
  padding:0;
  bottom:0;
}
#info{
  font-size: 12px;
  width: 100%;
  bottom:0;
  padding-bottom: 0;
  margin-bottom:0;
  margin-left: auto;
  margin-right: auto;
  border-top: 2px solid #343a40 ;

}
tr{
  border: 0;
  width: 100%;
  margin:0;
  padding:0;

}
td,th{width:20%}
#minipath{
  fill: #343a40;
  stroke-width:1px ;
}
</style>
