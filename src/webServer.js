import axios from 'axios'

class WebServer {
  constructor(n) {
    this.mock = false;
      // this.host = 'http://192.168.8.18/';
      this.host = 'http://oa.sywgqh.com.cn:41901/';
      this.url={
        articleList : 'appstudy/study_file_node/get_by_parentNodeId_list_json',
        articleMenuList : 'appstudy/study_file_node/get_root_list_json',
        techMenuList: 'apptech/source_node/get_root_list_json',
        techList : 'apptech/source_node/get_by_parentNodeId_list_json',
        techAllList: 'apptech/source_node/get_list_json',
        visitPage: 'appdoor/visit_page_log/get_page_json',
        userDetail: 'appdoor/weixin_user_api/get_user_detail_json',
        userPermission: 'appdoor/privilege_api/get_access_application_json'
      };
    }
    handler(url,param,method){
      var config = {
        url:url,
        method: method||'get',
        params: param,
        data:param
      };
      if (this.mock) {
        config.url = 'mock/'+ url + '.json';
        config.method = 'get';
      }else {
        config.url = this.host+url;
      }
      return axios(config).then(function(res){
        return res.data
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    getArticleList(param){
      var url = this.url.articleList;
      return this.handler(url, param);
    }
    getArticleMenuList(param){
      var url = this.url.articleMenuList;
      return this.handler(url, param);
    }
    getTechList(param){
      var url = this.url.techList;
      return this.handler(url, param);
    }
    getTechMenuList(param){
      var url = this.url.techMenuList;
      return this.handler(url, param);
    }
    getTechAllList(param){
      var url = this.url.techAllList;
      return this.handler(url, param);
    }
    getVisitPage(param){
      var url = this.url.visitPage;
      return this.handler(url, param,'post');
    }
    //if fail, return null
    getUserDetail(param){
      var url = this.url.userDetail;
      return this.handler(url, param);
    }
    getPermission(param){
      var url = this.url.userPermission;
      return this.handler(url, param);
    }

  }

  var webServer = new WebServer();

  export default webServer
