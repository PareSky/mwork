import Vue from 'vue'
import Router from 'vue-router'
import iMain from '@/components/iMain'
import Study from '@/components/Study'
import Article from '@/components/Article'
import TechSource from '@/components/TechSource'
import TechGarden from '@/components/TechGarden'
import Report from '@/components/Report'
import Charts from '@/components/Charts'

import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {//主界面，首页
      path: '/',
      name: 'iMain',
      component: iMain
    },
    {//业务培训
      path: '/study',
      name: 'Study',
      component: Study
    },
    {//文章页
      path: '/article',
      name: 'Article',
      component: Article
    },
    {//技术资源
      path: '/techSource',
      name: 'TechSource',
      component: TechSource
    },
    {//技术沙龙
      path: '/techGarden',
      name: 'TechGarden',
      component: TechGarden
    },
    {//使用分析
      path: '/report',
      name: 'Report',
      component: Report
    },
    {//验证微信权限页面
      path: '/noAuth',
      name: 'NoAuth',
      component: (resolve) => {
        require(['../components/NoAuth'], resolve)
      }
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts
    }
  ]
})


//  判断是否微信端
router.beforeEach(function(to, from, next){
  if(/^\/noAuth/.test(to.path)){
    next();
  }else if(!store.state.user.userid){
    store.state.lastRoute = to
    next('/noAuth')
  }else{
    next()
  }
})

export default router