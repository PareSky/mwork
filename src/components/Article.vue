<template>

  <div class="article">
    <div class='back-icon' @click="goBack">
      <Icon type="reply" ></Icon>
    </div>
    <iframe class='h5page' :src="src"></iframe>
  </div>
</template>

<script>
  import router from '../router'
  export default {
    name: 'article',
    data () {
      return {
        prePage:''
      }
    },
    methods:{
      goBack : function(){
        if(this.prePage){
          router.push('/'+this.prePage);
        }else {
          router.go(-1);
        }
      }
    },
    created:function(){
      this.src = this.$route.params.src;
      this.prePage = this.$route.params.prePage;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img{
    width:100%;
  }

  .back-icon{
    font-size: 0.9rem;
    position: fixed;
    top: -0.1rem;
    left: 0;
    z-index: 1000;
    color:#fbc800;
    width: 2rem;
  }
  .h5page{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
  }
</style>
