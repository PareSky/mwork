<template>
  <div class="techSource">

    <div class='back-btn' @click="goBack">
      <Icon type="home" class='back-icon'></Icon>
    </div>

              <!--
<img v-if='imgflag' class='demoImg' @click="switchImg" src='../assets/tech1.png' />
<img v-if='!imgflag' class='demoImg' @click="switchImg" src='../assets/tech2.png' />

-->

<div class='back' @click='getUpperMenu' >
  <Icon v-if='!showMenu' type="arrow-up-b"></Icon>
</div>

  <div class='search-bar'>
  <input v-model='inputVal'></input>
  <div class='search-btn' @click="search">
    <Icon type="ios-search" class='searchB'></Icon>
  </div>
</div>

<BigMenu class='content' v-if='showMenu' :artList='menuList' @selected='selectMenu'></BigMenu>

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
import bigMenu from './BigMenu'
import router from '../router'
export default {
  name: 'techSource',
  data () {
    return {
      inputVal:'',
      listData:[],
      parentNodeId : '',
      showMenu: true,
      theme2: 'light',
      accordion: true,
      imgflag: true
    }
  },
  methods:{
    search: function(){
      var param = {value:this.inputVal};
      // this.getArticleList(param);
    },
    toArticle : (n)=> {
      console.log('toArticle',n);
	    router.push({name:'Article', params: { src: n, prePage: 'techSource' }});
    },
    switchImg: function(){
      this.imgflag = !this.imgflag;
    },
    goBack: function(){
      router.push('/');
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
      console.log(n);
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
.back{
    font-size: 1rem;
    position: absolute;
    right: 0.5rem;
    z-index: 5;
    top: 0;
    color: #fbc800;
}

.back-icon{
  font-size: 1rem;
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: 1rem;
    z-index: 5;
    color: #fbc800;
}

.search-bar{
	background:#29a9fd;
	font-size:0;
}
.search-bar .search-btn{
    display: inline-block;
    height: 1rem;
    width: 2rem;
    background: white;
    vertical-align: middle;
	  border-radius: 0 0.2rem 0.2rem 0 ;
    margin: 0.2rem 0;
}
.search-bar input{
    display: inline-block;
    width: 50%;
    vertical-align: middle;
    height: 1rem;
    margin: 0.2rem 0;
  	border-radius:  0.2rem 0 0 0.2rem;
  	box-sizing: border-box;
  	padding-left: 2%;
  	border: none;
  	outline: none;
  	font-size: 0.5rem;
}
.searchB{
  font-size: 1rem;
}

.content{
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
