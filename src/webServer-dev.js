class WebServerDev {
  constructor(n) {
    this.url = {
      articleList: 'http://192.168.8.18/' + 'study_file_node/get_by_parentNodeId_list_json',
      articleMenuList: 'http://192.168.8.18/' + 'study_file_node/get_root_list_json',
      techMenuList: 'mock/' + 'apptech/source_node/get_root_list_json' + '.json',
      techList: 'mock/' + 'apptech/source_node/get_by_parentNodeId_list_json' + '.json',
      techAllList: 'mock/' + 'apptech/source_node/get_list_json' + '.json',
      visitPage: 'mock/' + 'appdoor/visit_page_log/get_page_json' + '.json',
      userDetail: 'mock/' + 'appdoor/weixin_user_api/get_user_detail_json' + '.json',
      userPermission: 'mock/' + 'appdoor/privilege_api/get_access_application_json' + '.json',
      smartbi: 'appdoor/smartbi_authen_api/authen_redirect_url?userId=useridValue&redirectUrl=http://oa.sywgqh.com.cn:41901/smartbi/vision/mobileportal.jsp'
    };
  }
}

var webServerDev = new WebServerDev();

export default webServerDev
