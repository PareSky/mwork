<template>
  <div>
   <ul class="bigMenu">
     <li v-for="(item,index) in artList" @click="select(item.id)" :key="index">
       <img src="../assets/file.png"><span>{{item.name}}</span>
     </li>
   </ul>
 </div>
</template>



<script>
  export default {
    name: 'bigMenu',
    props: ['artList'],
    data () {
      return {
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    select: function(id){
      this.$emit("selected", id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bigMenu {
    font-size: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 97%;
    margin: auto;
  }
  .bigMenu li{
   box-sizing: border-box;
    margin: 0.11rem;
    height: 2.8rem;
    width: 3rem;
    background: #fff;
 }
 .bigMenu li img{
   position: relative;
   display:inline-block;
   width: 70%;
 }
 .bigMenu li span{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  position: relative;
  font-size: 0.3rem;
  color: #555;
  top: -0.5rem;
  text-align: left;
  margin: 0.1rem;
}
</style>
