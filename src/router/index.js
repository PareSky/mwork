import Vue from 'vue'
import Router from 'vue-router'
import iMain from '@/components/iMain'
import Study from '@/components/Study'
import Article from '@/components/Article'
import TechSource from '@/components/TechSource'
import Report from '@/components/Report'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
