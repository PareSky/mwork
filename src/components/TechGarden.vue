<template>
  <div class="techGarden">
    <iMenu class='headMenu' mode="horizontal" :theme="theme1"  @on-select='selectMenu' :active-name="activeMenu">
      <Menu-item v-for="(item,index) in menuList" :key="index" :name="item.id">
        {{item.name}}
      </Menu-item>
    </iMenu>


    <div v-for="(item,index) in artList" v-if='!showLh' class='artCard' :key="index">
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
    <div v-if='showLh'>
    <div v-if='!showMenu' class='back' @click='getUpperMenu' style='height: 1.3rem;'>
      <Icon type="reply" style='font-size: 1.3rem;'></Icon>
    </div>
      <div v-if='showMenu'>
        <div v-for="(item,index) in menuList1" class='artCard' :key="index">
        <Row >
          <iCol span="3">
            <div class='' >
              <img src="../assets/file.png" width="100%">
            </div>
          </iCol>
          <iCol span="21">
            <div class="artTitle" >
              <a class='artUrl' @click='selectMenu1(item.id)'>{{item.name}}</a>
            </div>
          </iCol>
        </Row>
      </div>
      </div>
		<!-- <BigMenu class='content' v-if='showMenu' :artList='menuList1' @selected='selectMenu1'></BigMenu> -->
		<div v-if='!showMenu' class='content'>
		  <div v-for="(item,index) in listData" v-if='item.parentNodeId==parentNodeId'  class='artCard' :key="index">
		    <Row >
		      <iCol span="3">
		        <div class='cardImg' :class="item.type" ></div>
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
  </div>
</template>

<script>
  import webServer from '../webServer'
  export default {
    name: 'techGarden',
    data () {
      return {
        inputVal:'',
        listData:[],
        parentNodeId : '',
        activeMenu: '',
        menuList: [
        {  "id": "1",  "name": "量化"},
        {"id": "2",  "name": "办公"  }
        ],
        artList:[
        // {name:'运营培训',url:'art2'},
        // {name:'入职培训',url:'art3'},
        // {name:'技术培训',url:'art1'}
        ],
        theme1: 'light',
        showLh: true,
        showMenu: true,
      }
    },
    computed: {
	    menuList1: function(){
	      var list = [];
	      for (var item in this.listData) {
	        if (this.listData[item].type == 1) {
	          list.push(this.listData[item]);
	        }
	      }
	      return list;
	    }
    },
    methods:{
	    getTechMenuList: function(param){
	      webServer.getTechAllList(param).then((res)=>{
	        this.listData = res.data;
	          for (let i in res.data) {
	            var art = res.data[i];
	            this.insertFileType(art);
	          }
	      })
	    },
    getUpperMenu: function(){
      this.showMenu = true;
    },
      insertFileType: function(art){
        var title = art.name;
        var name = title.substr(0,title.lastIndexOf("."));
        //art.name = name;
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
        if(n == 1){
        	this.showLh = true;
        }else{
        	this.showLh = false;
        }
      },
	    selectMenu1: function(n){
	      this.parentNodeId = n;
	      this.showMenu = false;
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
  created: function() {
    console.log('ready');
     var param = {
       parentNodeId: 2,
     }
     this.callArtList(param).then((res)=>{
       this.artList = res.data;
       for (let i in res.data) {
         var art = res.data[i];
         this.insertFileType(art);
       }
       this.activeMenu = this.menuList[0].id;
     })
  },
  mounted: function(){
    this.getTechMenuList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .techGarden{
    margin-bottom: 0.1rem;
  }
  .back-btn{
    width: 1rem;
  }
  .back-icon{
    font-size: 1rem;
  }
  .searchB{
    font-size: 1rem;
  }
  .search-bar{
    background: #29a9fd;
    display: flex;
    align-items: center;
    height: 1.5rem;
 }
 .search-bar img{
  margin: 0.2rem;
  vertical-align: middle;
}
.search-bar .search-btn{
  height: 1rem;
  width: 2rem;
  background: white;
  border-radius: 0 0.2rem 0.2rem 0 ;
}
.search-bar input{
  height: 1rem;
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
    background-size: 100%;
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
