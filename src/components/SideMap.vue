<template>
    <b-row><b-col><h3>{{state.id}}</h3></b-col>
      <b-col>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g id="transformer" :transform="d_transform()"><path :d="state.d"  id="minimap"></path></g></svg>
    </b-col>
    </b-row>
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
      let bounds = this.getBounds();
      let dim =Math.max(bounds[1]-bounds[0],bounds[3] - bounds[2]);
      this.dime=dim;
      this.dx = String(1 - bounds[2]);
      this.dy = String(1 - bounds[0]);
      this.zoom = String((8/dim)**0.7);
      return "translate("+this.dx+" "+this.dy+") scale("+this.zoom+" "+this.zoom+")" ;
    }
  }
}
</script>

<style scoped>

</style>
