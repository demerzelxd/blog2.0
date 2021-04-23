import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/client/Home'
import PostDetail from '../views/client/PostDetail'
import Tags from '../views/client/Tags'
import Archives from '../views/client/Archives'
import About from '../views/client/About'
import Login from '../views/admin/Login'

Vue.use(Router)

export default new Router({
	routes: [
		{path: '/', redirect: '/home'},
		{path: '/home', name: 'Home', component: Home, meta: {keepAlive: true}},
		{path: '/post/:postId', name: 'PostDetail', component: PostDetail},
		{path: '/tags', name: 'Tags', component: Tags},
		{path: '/archives', name: 'Archives', component: Archives},
		{path: '/about', name: 'About', component: About},
		{path: '/admin/login', component: Login}
	],
	// 去除#，把Router的mode修改为history模式，VueRouter默认的模式为hash模式
	// 加上#后访问别的路由不会刷新页面，换成history后切换路由需要刷新
	mode: 'history',
	// 保存上次访问位置
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop
			}
			return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})
