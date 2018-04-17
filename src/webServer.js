import axios from 'axios'
//import webServerConst from './webServer-prod'
import webServerConst from './webServer-dev'

class WebServer {
  constructor(n) {
    axios.defaults.headers.common['authorization'] = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwOTQyIn0.TcKvZsFtxaeMmZGhdC-zEZFAd-4jD12I-Ravmk2y0dtcxa6mdm6pdiRs83Hsu5kyV_a8DBXLnvOG-8LQVBDmEQ";
  }
  handler(url, param, method) {
    var config = {
      url: url,
      method: method || 'get',
      params: param,
      data: param
    };
    return axios(config).then(function(res) {
        return res.data
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  getArticleList(param) {
    var url = webServerConst.url.articleList;
    return this.handler(url, param);
  }
  getArticleMenuList(param) {
    var url = webServerConst.url.articleMenuList;
    return this.handler(url, param);
  }
  getTechList(param) {
    var url = webServerConst.url.techList;
    return this.handler(url, param);
  }
  getTechMenuList(param) {
    var url = webServerConst.url.techMenuList;
    return this.handler(url, param);
  }
  getTechAllList(param) {
    var url = webServerConst.url.techAllList;
    return this.handler(url, param);
  }
  getVisitPage(param) {
    var url = webServerConst.url.visitPage;
    return this.handler(url, param, 'post');
  }
  //if fail, return null
  getUserDetail(param) {
    var url = webServerConst.url.userDetail;
    return this.handler(url, param);
  }
  getPermission(param) {
    var url = webServerConst.url.userPermission;
    return this.handler(url, param);
  }
  toSmartbi(param) {
    var url = webServerConst.url.smartbi;
    url = url.replace('useridValue', param.userid);
    location.href = url;
  }

}

var webServer = new WebServer();

export default webServer
