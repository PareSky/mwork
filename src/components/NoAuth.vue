<template>
<div v-show="show">未取到用户信息！

    <Loading></Loading>
    </div>
</template>
<script>
  import webServer from '../webServer'
  export default {
    data () {
      return {
        show: false
        }
      },
      computed: {
        user () {
          return this.$store.state.user
        }
      },
      methods:{
        GetQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var query = location.href.indexOf('?');
         var r = location.href.substr(query+1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
         },
        fetchUser: function(){
          var code = this.GetQueryString('code');
          var param = {weixinCode: code};
          webServer.getUserDetail(param).then((res)=>{
            var user = res.data||{};
            this.$store.commit('setUser',user);
            if (this.user.userid)this.$router.push('/');
          })
        }
      },
      created: function() {
        this.fetchUser();
        var count = 0;
        var getid = setInterval(()=>{
          if (!this.user.userid && count<20) {
            count++
            this.fetchUser();
          }else{
            clearInterval(getid);
          }
          this.show = true;
        },500)
      }
    }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>