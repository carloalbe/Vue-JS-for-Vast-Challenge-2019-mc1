<template>
<footer class="b">
 <b-container>
   <b-row style="left:0" >
     <b-col cols="3" style="left:0" >
       <a href="https://www.unipi.it/"><img alt="logo unipi" src="../assets/logo_unipi.jpg" id="logo_unipi"></a>
     </b-col>
     <b-col cols="6">
       <div style="margin-top:20%">
       Project based on Vast Challenge 2019 <br> developed for the course in <br> <b>Visual Analytics</b>
       </div>
     </b-col>
     <b-col cols="3">
       <div style="text-align: left;margin-top:50px">
       <h4>Contacts</h4>
         <p style="margin-left:15px">
       <a href="https://github.com/alberts96?tab=repositories">My GitHub</a><br>
       <a href="mailto:carloalbertocarrucciu@gmail.com">carloalbertocarrucciu@gmail.com</a><br>
       <a href="http://didawiki.di.unipi.it/doku.php/magistraleinformaticaeconomia/va/start">Visual Analytics (602AA)</a><br>
       <a href="https://vast-challenge.github.io/2019/">Vast Challege 2019</a>
         </p></div>
     </b-col>
   </b-row>
 </b-container>
</footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
 footer{
   padding-top:50px;
   margin-top:5%;
  height: 300px;
   width:100%;
   left:0;
   right:0;
   background-color: #014479 ;
  color:white;
   bottom:0;
   vertical-align: middle;
 }

 #logo_unipi{
   left:0;
   object-fit: contain;
   max-height: 200px;
   width: auto;
   margin-left:0;
   padding-left:0;
 }
</style>
