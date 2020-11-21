<template>
    <div v-if="state" style="padding-left: 100px"><b-row ><h3>{{state.id}}</h3></b-row>
      <b-row>
      <svg id="minimap" xmlns="http://www.w3.org/2000/svg" width="200" height="200" :viewBox="view" preserveAspectRatio="xMinYMin"><!--g id="transformer" :transform="d_transform()"--><path  v-if="state" :d="state.d"  ></path></svg>
    </b-row>
    </div>
</template>

<script>
//import * as d3 from "d3";

export default {
  name: "SideMap",
  props: {
    state: Object,
  },
  data(){
    return{
      dx: '0',
      dy: '0',
      zoom: '1',
      dime: 0,
      view: "0 0 300 300",
    }
  },
  watch: {
    state(){this.d_transform()}
  },
  methods: {
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
      let dim =Math.max(b - t, r - l);
      this.dime=dim;
      this.dx = String( l-20);
      this.dy = String(t-20);
      this.zoom = String((270/dim)**0.7);
      this.view = this.dx+" "+this.dy+" "+String(dim +40 )+" "+String(dim +40);
    }
  }
}
</script>

<style>

</style>
