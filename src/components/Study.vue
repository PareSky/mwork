<template>
  <div class="study">
    <div class='search-bar'>
      <div class='back-btn' @click="goBack">
        <Icon type="ios-arrow-left" class='back-icon'></Icon>
      </div>
      <search-bar @search='search'/>
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
  import webServer from '../webServer'
  import SearchBar from './common/SearchBar'
  export default {
    components: {
        SearchBar,
    },
    name: 'study',
    data () {
      return {
        activeMenu: '',
        menuList: [],
        artList:[],
        theme1: 'light',
        types:{
          word:'doc docx',
          ppt:'pptx ppt',
          excel:'xls xlsx',
          pdf:'pdf',
          video:'mpg mp4 mpeg avi rm rmvb mov wmv asf'
        }
      }
    },
    computed: {
    },
    methods:{
      goBack: function(){
        this.$router.push('/');
      },
      search: function(e){
        console.log('search',e);
        var param = {value:e, menu:this.activeMenu};
        this.getArticleList(param);
      },
      insertFileType: function(art){
        var title = art.name;
        var name = title.substr(0,title.lastIndexOf("."));
        art.name = name;
        var suffix=title.substring(title.lastIndexOf(".")+1).toLowerCase();
        for(let type in this.types){
          if(this.types[type].indexOf(suffix)>-1){
            art.type = type;
            break;
          }
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
      toArticle : function(n) {
        console.log('toArticle',n);
      // window.location = n;
      this.$router.push({name:'Article', params: { src: n}});
    },
    setList: function(list){
      this.menuList = list;
    }
  },
  mounted: function() {
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
    width: 1rem;
  }
  .back-icon{
    font-size: 1rem;
  }
  .search-bar{
    background: #29a9fd;
    display: flex;
    align-items: center;
    height: 1.5rem;
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
