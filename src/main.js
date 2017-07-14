// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'iview/dist/styles/iview.css'
import Iview from './components/Iview'
import bigMenu from './components/BigMenu'
import loadmore from './components/Loadmore'
import bus from './bus'

Vue.use(Iview);
Vue.use(bigMenu);
Vue.use(loadmore);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  ready: function(){ }
})
