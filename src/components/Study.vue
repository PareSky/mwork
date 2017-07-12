<template>
  <div class="study">
    <div class='search-bar'>
    <div class='back-btn' @click="goBack">
      <Icon type="ios-arrow-left" class='back-icon'></Icon>
    </div>
	  <input v-model='inputVal'></input>
	  <div class='search-btn' @click="search">
      <Icon type="ios-search" class='searchB'></Icon>
    </div>
	</div>


  <iMenu class='headMenu' mode="horizontal" :theme="theme1"  @on-select='selectMenu' :active-name="activeMenu">
    <Menu-item v-for="(item,index) in menuList" v-if='index<3' :key="index" :name="item.id">
        {{item.name}}
    </Menu-item>
    <Submenu v-if='menuList.length >3' name="other">
        <template slot="title">
            其他
        </template>
        <Menu-group title="部门">
            <Menu-item v-for="(item,index) in menuList" v-if='index >=3' :key="index" :name="item.id">
              {{item.name}}
            </Menu-item>
        </Menu-group>
    </Submenu>
  </iMenu>

  <div v-for="(item,index) in artList"  class='artCard' :key="index">
    <Row >
      <iCol span="3">
        <div class='cardImg' :class="item.type" ></div>
      </iCol>
      <iCol span="21">
        <div class="artTitle" >
          <a class='artUrl' @click='toArticle(item.url+"?file="+Math.random())'>{{item.name}}</a>
        </div>
      </iCol>
    </Row>
  </div>
  </div>
</template>

<script>
import router from '../router'
import webServer from '../webServer'
export default {
  name: 'study',
  data () {
    return {
      inputVal:'',
      activeMenu: '',
      menuList: [
        // {  "id": "1",  "name": "name1"},
        // {"id": "2",  "name": "name2"  }
               ],
      artList:[
        // {name:'运营培训',url:'art2'},
        // {name:'入职培训',url:'art3'},
        // {name:'技术培训',url:'art1'}
      ],
  	  theme1: 'light'
    }
  },
  computed: {
  },
  methods:{
    goBack: function(){
      router.push('/');
    },
    search: function(){
      var param = {value:this.inputVal,menu:this.activeMenu};
      this.getArticleList(param);
    },
    insertFileType: function(art){
      var title = art.name;
      var name = title.substr(0,title.lastIndexOf("."));
      art.name = name;
      var suffix=title.substring(title.lastIndexOf(".")+1).toLowerCase();
      if (suffix=='doc'||suffix=='docx') {
        art.type = 'word';
      }else if(['pptx', 'ppt'].indexOf(suffix)!=-1){
        art.type = 'ppt';
      }else if(suffix == 'xls'||suffix == 'xlsx'){
        art.type = 'excel';
      }else if(suffix == 'pdf'){
        art.type = 'pdf';
      }else if(['mpg', 'mp4','mpeg', 'avi', 'rm', 'rmvb', 'mov', 'wmv', 'asf'].indexOf(suffix)!=-1){
        art.type = 'video';
      }
    },
    selectMenu: function(n){
      this.activeMenu =n;
      var param = {parentNodeId:this.activeMenu};
      this.getArticleList(param);
    },
    getArticleList: function(param){
      this.callArtList(param).then((res)=>{
        this.artList = res.data;
        for (let i in res.data) {
          var art = res.data[i];
          this.insertFileType(art);
        }
      })
    },
    callArtList: function(param){
      return webServer.getArticleList(param);
    },
    toArticle : (n)=> {
      console.log('toArticle',n);
      // window.location = n;
	    router.push({name:'Article', params: { src: n ,prePage:"study"}});
    },
	  setList: function(list){
        this.menuList = list;
	  }
  },
  created: function() {
    console.log('ready');
    webServer.getArticleMenuList().then((res)=>{
     this.setList(res.data);
     var param = {
       parentNodeId: this.menuList[0].id,
       keyWords: 'wakaka'
     }
     this.callArtList(param).then((res)=>{
       this.artList = res.data;
       for (let i in res.data) {
         var art = res.data[i];
         this.insertFileType(art);
       }
       this.activeMenu = this.menuList[0].id;
     })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.study{
  margin-bottom: 0.1rem;
}
.back-btn{
  display: inline-block;
  width: 1rem;
  position: relative;
  left: -0.5rem;
  height: 1rem;
  vertical-align: middle;
}
.back-icon{
  font-size: 1rem;
}
.searchB{
  font-size: 1rem;
}
.search-bar{
	background:#29a9fd;
	font-size:0;
}
.search-bar img{
    margin: 0.2rem;
    vertical-align: middle;
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

.ivu-menu-item, .ivu-menu {
    font-size: 0.5rem;
}
.ivu-menu-horizontal{
    height: 1.5rem;
    line-height: 1.5rem;
}
.artCard{width: 100%;margin: 0.1rem 0;
    background: #fff;}
.cardImg{
  width: 100%;
  height: 1.4rem;
  background-image: url("../assets/txt.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.word{
  background-image:url("../assets/word.png");
}
.ppt{
  background-image:url("../assets/ppt.png");
}
.excel{
  background-image:url("../assets/excel.png");
}
.pdf{
  background-image:url("../assets/pdf.png");
}
.video{
  background-image:url("../assets/video.png");
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
</style>
