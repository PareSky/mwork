import Vue from 'vue'
import Router from 'vue-router'
import iMain from '@/components/iMain'
import Study from '@/components/Study'
import Article from '@/components/Article'
import TechSource from '@/components/TechSource'
import Report from '@/components/Report'
import Charts from '@/components/Charts'

import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'iMain',
      component: iMain
    },
    {
      path: '/study',
      name: 'Study',
      component: Study
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/techSource',
      name: 'TechSource',
      component: TechSource
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    },
    {
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
    next('/noAuth')
  }else{
    next()
  }
})

export default router