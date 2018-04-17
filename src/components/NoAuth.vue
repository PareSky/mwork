<template>
<div v-show="show">未取到用户信息！

    <Loading></Loading>
    </div>
</template>
<script>
  import webServer from '../webServer'
  import axios from 'axios'
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
            // axios.get('http://192.168.8.18:8080/token_api/get_token_json', {
            axios.get('http://localhost:8090/mock/token_api/get_token_json.json', {
              params: {
                account:'0942',
                password: '6029054bcb76be7d401b0ecd263193f3'
              }
            })
            .then((response) =>{
              console.log('response.data',response.data);
              axios.defaults.headers.common['authorization'] = response.data.data;
              if (this.user.userid){
                let last = this.$store.state.lastRoute;
                this.$router.push(last.path || '/');
              }
            })
            .catch(function (error) {
              console.log(error);
            });
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