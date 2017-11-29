<template>
  <div class="techSource">

  <div class='search-bar'>
    <div class='back-btn' @click="goBack">
      <Icon type="home" class='back-icon'></Icon>
    </div>
    <search-bar @search='search'></search-bar>
    <div class='back' @click='getUpperMenu' >
      <Icon v-if='!showMenu' type="arrow-up-b"></Icon>
    </div>
  </div>

<big-menu class='content' v-if='showMenu' :artList='menuList' @selected='selectMenu'></big-menu>

<div v-if='!showMenu' class='content'>
  <div v-for="(item,index) in listData" v-if='item.parentNodeId==parentNodeId'  class='artCard' :key="index">
    <Row >
      <iCol span="3">
        <Icon class='file-icon' type="document-text"></Icon>
      </iCol>
      <iCol span="21">
        <div class="artTitle" >
          <a class='artUrl' @click='toArticle(item.url+"?file="+Math.random())'>{{item.name}}</a>
          <!--
          <span v-if='item.type!=0' class='artUrl' @click='getNextList(item.id, item.parentNodeId)'>{{item.name}}</span>
        -->
      </div>
    </iCol>
  </Row>
</div>
</div>


</div>
</template>

<script>
  import webServer from '../webServer'
  import bigMenu from './common/BigMenu'
  import searchBar from './common/searchBar'
  export default {
    name: 'techSource',
    components:{
      searchBar,
      bigMenu
    },
    data () {
      return {
        listData:[],
        parentNodeId : '',
        showMenu: true,
        theme2: 'light',
        accordion: true,
        imgflag: true
      }
    },
    methods:{
      search: function(e){
        console.log(e)
        var param = {value:e};
      // this.getArticleList(param);
    },
    toArticle : function(n){
      console.log('toArticle',n);
      this.$router.push({name:'Article', params: { src: n}});
    },
    switchImg: function(){
      this.imgflag = !this.imgflag;
    },
    goBack: function(){
      this.$router.push('/');
    },
    getNextList: function(id, parentNodeId){
      var param = {
        parentNodeId: id
      }
      this.getTechList(param);
      this.parentNodeId = parentNodeId;
    },
    getUpperMenu: function(){
      this.showMenu = true;
      // var param = {
      //   parentNodeId: this.parentNodeId
      // }
      // if (this.parentNodeId==null) {
      //   this.showMenu = true;
      // }
      // this.getTechList(param);
    },
    selectMenu: function(n){
      this.parentNodeId = n;
      this.showMenu = false;
    },
    getTechList: function(param){
      webServer.getTechAllList(param).then((res)=>{
        this.listData = res.data;
      })
    },
    getTechMenuList: function(param){
      webServer.getTechAllList(param).then((res)=>{
        this.listData = res.data;
      })
    }
  },
  computed: {
    menuList: function(){
      var list = [];
      for (var item in this.listData) {
        if (this.listData[item].type == 1) {
          list.push(this.listData[item]);
        }
      }
      return list;
    }
  },
  created: function() {
    console.log('ready');
    this.getTechMenuList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .techSource{
    background: #eee;
    font-size: 0;
  }
  .search-bar{
    background: #29a9fd;
    display: flex;
    align-items: center;
    height: 1.5rem;
 }
  .back{
    font-size: 1rem;
    width: 2rem; 
    color: #fbc800;
  }
  .back-btn{
    width: 2rem;
  }
  .back-icon{
    font-size: 1rem;
    color: #fbc800;
  }

.content{
  padding-bottom: 3rem;
  padding-top: 0.5rem;
}
.artCard{width: 100%;margin: 0.1rem 0;
  background: #fff;
}
.file-icon{
  font-size: 1.3rem;
  color: #29a9fd;
}
.artTitle{
  height: 1.3rem;
}
.artTitle .artUrl{
  width: 100%;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.3rem;
  font-size: 0.4rem;
  float: left;
  padding-left: 0.5rem;
  color: #555;
  padding-right: 0.1rem;
}

.demoImg{
  width: 100%;
}

</style>
