import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/blog/Index'

Vue.use(Router)

export default new Router({
	routes: [
		{path: '/', redirect: '/index'},
		{path: '/index', name: 'Index', component: Index}
	],
	// 去除#，把Router的mode修改为history模式，VueRouter默认的模式为hash模式
	// 加上#后访问别的路由不会刷新页面，换成history后切换路由需要刷新
	mode: 'history'
})
