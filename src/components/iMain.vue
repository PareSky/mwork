<template>
  <div class="imain">
    <div class='header'><img src="../assets/header.png"></div>

    <div class='menuBox'>
      <div class='menu' @click='routeToStudy'>
       <img src='../assets/study.jpg'></img>
       <span>
         业务培训
       </span>
     </div>
     <div class='menu' @click='routeToTech'>
       <img src='../assets/tech.jpg'></img>
       <span>技术资源</span>
     </div>
     <div class='menu' @click='routeCRM'>
       <Icon class='iconM' type="stats-bars"></Icon>
       <span>智能报表</span>
     </div>
     <div class='menu' @click='routeReport'>
       <Icon class='iconM iconReport' type="ios-paper-outline"></Icon>
       <span>使用分析</span>
     </div>
     <div v-for='n in menu' class='menu dark'>
       <Icon class='plus' type="ios-help-outline"></Icon>
       <span>{{n}}</span>
     </div>
   </div>

   <Spin v-if='showLoading' size="large" fix>
    <Icon type="load-c"  class="demo-spin-icon-load"></Icon>
  </Spin>

  <div class="notice">
    <div class="head">
      <Icon class='social' type="social-rss"></Icon>
      公告
      <Icon class='arrow' type="ios-arrow-forward"></Icon>
    </div>
    <div class="contentBox">
      <div v-for='n in 5' class="content">
        <div class="text">
          关于调整临近交割月合约持仓的通知
        </div>
        <div class="date">
          1个月前
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
  import webServer from '../webServer'
  export default {
    name: 'imain',
    data () {
      return {
        menu: ['项目进度报告','期权开户预约'],
        showLoading: false
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods:{
      routeToTech : function() {
       this.$router.push('techSource');
     },
     routeToStudy : function() {
      this.$router.push('study');
    },
    routeCRM : function() {
      if (!this.user.userid) {
        this.Loading();
        return;
      }
      var param = {userid: this.user.userid}
      webServer.toSmartbi(param);
    },
    routeReport : function(){
      if (!this.user.userid) {
        this.Loading();
        this.fetchUser();
        return;
      }
      var param = {userId: this.user.userid, applicationId:'appreport'}
      webServer.getPermission(param).then(res=>{
        if (!res.data) {
          alert('你没有权限');
          return
        }
        this.$router.push('report');
      })
    },
    GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var query = location.href.indexOf('?');
     var r = location.href.substr(query+1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
   },
   Loading: function(){
    this.showLoading = true;
    setTimeout(()=>{
      this.showLoading = false;
    },1000)
  },
  fetchUser: function(){
    var code = this.GetQueryString('code');
    var param = {weixinCode: code};
    webServer.getUserDetail(param).then((res)=>{
      var user = res.data||{};
      this.$store.commit('setUser',user);
    })
  }
},
created: function() {
  var count = 0;
  var getid = setInterval(()=>{
    if (!this.user.userid && count<20) {
      count++
      this.fetchUser();
    }else{
      clearInterval(getid);
    }
  },500)
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .header{
   text-align: center;
   width:100%;
   background: #fff;
   font-size: 0;
 }
 .header img{
   width:100%
 }

 .menuBox{box-sizing: border-box;
  width: 100%;
  margin-top: 0.3rem;
  background: #fff;
  font-size: 0;
  text-align: left;
}
.menu{
  display: inline-block;
  box-sizing: border-box;
  width: 33.33333%;
  height: 3rem;
  border: solid 0.01rem #eee;
  text-align: center;
}
.menuBox img{
  height: 0.7rem;
  display: block;
  position: relative;
  margin: 0 auto;
  top: 25%;
}
.menuBox .iconM{
  height: 0.7rem;
  display: block;
  position: relative;
  margin: 0 auto;
  top: 21%;
  font-size: 1rem;
  color: #f54a4a;;
}
.menuBox .iconReport{
  color: #33b38d;
}
.menuBox span{
  position: relative;
  display: block;
  font-size: 0.38rem;
  top: 30%;
  margin: 0 auto;
}

.plus{
  height: 0.7rem;
  display: block;
  position: relative;
  margin: 0 auto;
  top: 25%;
  font-size: 0.7rem;
  opacity: 0.1;
}

.notice{
  width: 100%;
  text-align: left;
  margin: 0.3rem 0;
  font-size: 0.4rem;
}
.notice .head{
  background: #fff;
  height: 1rem;
  line-height: 1rem;
  padding: 0 0.4rem;
}
.notice .social{
  color: #6380ab;
  transform: rotate(45deg);
}
.notice .arrow{
  float: right;
  line-height: 1rem;
  color: #a0a0a0;
}
.notice .content{
  background: #fff;
  height: 1rem;
  line-height: 1rem;
  padding: 0 0.4rem;
  margin: 0.05rem 0;
}
.content .text{
  display: inline-block;
  width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.content .date{
  display: inline-block;
  color:#acb2c4;
  font-size: 0.3rem;
  float: right;
}

.news img{
  width: 100%;
  margin-top: 0.3rem;
}
.dark{
  background-image: url('../assets/looking.png');
  background-size: 64%;
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 27%;
  font-weight: bold;
}

.ivu-spin-fix {
  background-color: rgba(0,0,0,0);
}

.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
  font-size: 1rem;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
</style>
