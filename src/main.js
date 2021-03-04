// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入axios
import axios from 'axios'
// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vuex的store实例
import store from './store'
// 引入font-awesome
import 'font-awesome/css/font-awesome.min.css'
// 引入加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入全局axios拦截
import './axios-interceptor'
// 引入mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 配置NProgress
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500 })

router.beforeEach((to, from, next) => {
	NProgress.start()
	next()
})

router.afterEach(() => {
	NProgress.done()
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>',
	// 注册vuex状态管理
	store
})
