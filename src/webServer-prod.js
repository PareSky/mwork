class WebServerProd {
  constructor(n) {
    this.host = 'http://oa.sywgqh.com.cn:41901/';
    this.url = {
      articleList: this.host + 'appstudy/study_file_node/get_by_parentNodeId_list_json',
      articleMenuList: this.host + 'appstudy/study_file_node/get_root_list_json',
      techMenuList: this.host + 'apptech/source_node/get_root_list_json',
      techList: this.host + 'apptech/source_node/get_by_parentNodeId_list_json',
      techAllList: this.host + 'apptech/source_node/get_list_json',
      visitPage: this.host + 'appdoor/visit_page_log/get_page_json',
      userDetail: this.host + 'appdoor/weixin_user_api/get_user_detail_json',
      userPermission: this.host + 'appdoor/privilege_api/get_access_application_json',
      smartbi: this.host + 'appdoor/smartbi_authen_api/authen_redirect_url?userId=useridValue&redirectUrl=http://oa.sywgqh.com.cn:41901/smartbi/vision/mobileportal.jsp'
    };
  }
}

var webServerProd = new WebServerProd();

export default webServerProd
