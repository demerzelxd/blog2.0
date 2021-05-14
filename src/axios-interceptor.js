import axios from 'axios'
import Vue from 'vue'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://getschwifty.cn'

// 前置拦截，拦截request请求
axios.interceptors.request.use(req => {
	return req
})

// 后置拦截，拦截response响应
axios.interceptors.response.use(resp => {
	return resp
})
