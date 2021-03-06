<template>
	<div>
		<Header ref="header"></Header>
		<div :style="{'background-image': post.banner}" class="gis-post-banner" ref="banner">
			<transition name="gis-post-fade-down">
				<!--动画不生效的话就用v-if代替v-show-->
				<div v-if="isPostShow">
					<h1 style="font-size: 35px;" key="title">{{post.title}}</h1>
					<p style="font-size: 16px" key="time">{{post.createTime}}</p>
					<div class="arrow-down" key="arrow">
						<a href.prevent style="cursor: pointer;" @click="scrollDown()"></a>
					</div>
				</div>
			</transition>
		</div>
		<transition-group name="gis-post-fade-in">
			<div v-if="isPostShow" class="gis-post-container" key="postContainer">
				<markdown-it-vue class="md-body" :content="content" :options="options"/>
			</div>
			<div class="gis-toc-container" :class="gisTocFixed" key="tocContainer">
				<strong><i class="el-icon-s-unfold"></i> 目录</strong>
				<!--<el-tabs @tab-click="handleClick" v-model="activeName" :tab-position="tabPosition" style="height: auto;">-->
				<!--	<el-tab-pane :name="'tab'+index" :class="item.lev" v-for="(item, index) in navList" :key="index" :label="item.name"></el-tab-pane>-->
				<!--</el-tabs>-->
				<el-tabs tab-position="right" style="height: 100%;">
					<el-tab-pane label="用户管理"></el-tab-pane>
					<el-tab-pane label="配置管理"></el-tab-pane>
					<el-tab-pane label="角色管理"></el-tab-pane>
					<el-tab-pane label="定时任务补偿"></el-tab-pane>
				</el-tabs>
			</div>
		</transition-group>
	</div>
</template>

<script>
import Header from '../../components/Header'
// 引入markdown-it-vue
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
	name: 'PostDetail',
	data () {
		return {
			post: {},
			isPostShow: false,
			headerHeight: '',
			content: '',
			options: {
				githubToc: {
					anchorLinkSymbol: '#',
					anchorLinkSpace: true
				}
			},
			scrollTop: ''
			// // 目录
			// activeName: 'tab0',
			// tabPosition: 'right',
			// scroll: '',
			// navList: []
		}
	},
	components: {
		Header,
		MarkdownItVue
	},
	methods: {
		getPostDetail () {
			this.$http.get('/blog/' + this.$route.params.postId).then((resp) => {
				this.post = resp.data.data
				if (this.post.banner === null || this.post.banner === undefined || this.post.banner === '') {
					this.post.banner = require('geopattern').generate(this.post.title).toDataUrl()
				}
				this.content = this.post.content
			})
		},
		// 点击arrow向下滚动至内容
		scrollDown () {
			// 已知banner的高度为280px
			document.documentElement.scrollTo({top: 280 - this.headerHeight, behavior: 'smooth'})
		},
		handleTocScroll () {
			// 设置滚动距离
			this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			if (!this.scrollTop) {
				this.scrollTop = 0
			}
		}
		// // 目录
		// handleClick (tab, event) {
		// 	this.jump(tab.index)
		// },
		// jump (index) {
		// 	let jump = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
		// 	// 获取需要滚动的距离
		// 	let total = jump[index].offsetTop - 80
		// 	// Chrome
		// 	document.body.scrollTop = total
		// 	// Firefox
		// 	document.documentElement.scrollTop = total
		// 	// Safari
		// 	window.pageYOffset = total
		// 	// $('html, body').animate({
		// 	// 'scrollTop': total
		// 	// }, 400);
		// }
	},
	computed: {
		// 是否应该固定TOC
		isTimeToFixed () {
			return this.scrollTop >= 280 - this.headerHeight
		},
		// 控制样式是否展示
		gisTocFixed () {
			// 当滚动到一定距离，启用gisTocFixed，固定目录
			// console.log('实际：' + this.scrollTop)
			return {gisTocFixed: this.isTimeToFixed}
		}
	},
	created () {
		this.getPostDetail()
	},
	mounted () {
		// 渐入显示文章详情
		this.isPostShow = true
		// 获取导航栏高度
		this.headerHeight = this.$refs.header.$el.offsetHeight
		// 一开始就路由定位
		if (this.$route.hash) {
			this.$nextTick(() => {
				setTimeout(() => {
					// decodeURIComponent用于对中文解码
					// console.log(document.getElementById(decodeURIComponent(this.$route.hash).substring(1)).children[0])
					document.getElementById(decodeURIComponent(this.$route.hash).substring(1)).children[0].click()
				}, 250)
			})
		}
		// 监听滚动条
		window.addEventListener('scroll', this.handleTocScroll, true)
	},
	destroyed () {
		window.removeEventListener('scroll', this.handleTocScroll, false)
	},
	watch: {
		$route: {
			handler () {
				if (this.$route.hash) {
					// console.log(decodeURIComponent(this.$route.hash))
					// console.log(document.getElementById(decodeURIComponent(this.$route.hash).substring(1)).children[0])
					this.$nextTick(() => {
						setTimeout(() => {
							document.getElementById(decodeURIComponent(this.$route.hash).substring(1)).children[0].click()
						}, 0)
					})
				} else {
					// 地址没有hash，说明是返回顶部
					document.documentElement.scrollTo({top: 0, behavior: 'smooth'})
				}
			},
			deep: true
		}
	}
}
</script>

<style>
.gis-post-container {
	max-width: 1000px;
	margin: 35px auto;
	position: relative;
	min-height: 628px;
	height: 100%;
}

.gis-toc-container {
	position: absolute;
	right: 50px;
	top: 300px;
	width: 250px;
}

.gisTocFixed {
	position: fixed;
	top: 80px;
}

.gis-post-banner {
	width: 100%;
	height: 280px;
	box-sizing: border-box;
	top: 0;
	left: 0;
	padding: 80px 20px 25px 20px;
	text-align: center;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	color: #FFFFFF;
}

.arrow-down {
	display: flex;
	justify-content: center;
}

.arrow-down a {
	width: 25px;
	height: 25px;
	transform: rotate(315deg);
	animation-name: shine;
	animation-duration: 1.5s;
	animation-iteration-count: infinite;
	border-bottom: 1px solid #fff;
	border-left: 1px solid #fff;
}

/*重写transition样式*/
/*fade-down*/
.gis-post-fade-down-enter-active,
.gis-post-fade-down-leave-active {
	transition: all 0.4s ease;
	transition-delay: 0.05s;
}
.gis-post-fade-down-enter,
.gis-post-fade-down-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}
/*fade-in*/
.gis-post-fade-in-enter-active,
.gis-post-fade-in-leave-active {
	transition: all 0.4s ease;
	transition-delay: 0.05s;
}
.gis-post-fade-in-enter,
.gis-post-fade-in-leave-to {
	opacity: 0;
}
/*动画效果*/
@keyframes shine {
	0%, 100% {
		opacity: 0.1;
	}
	25%, 75% {
		opacity: 0.2;
	}
	37.5%, 62.5% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
}
/*重写markdown-it*/
.markdown-body {
	font-family: 'Source Sans Pro', 'Noto Serif SC', -apple-system, BlinkMacSystemFont ,Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
}

.markdown-body blockquote {
	border-left: .25em solid #42b983;
	background: #f8f8f8;
	padding: 15px 20px;
}

/*重写router-link样式*/
.markdown-body a {
	color: #42b983;
}

.markdown-body a:hover {
	text-decoration: none;
}

/*标题动画容易误触，去除*/
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
	padding-top: 60px;
	margin-top: -50px;
	/*transition: all .3s ease-out;*/
}

/*.markdown-body h1:hover, .markdown-body h2:hover, .markdown-body h3:hover, .markdown-body h4:hover, .markdown-body h5:hover, .markdown-body h6:hover {*/
/*	transform: translateX(5px);*/
/*	cursor: pointer;*/
/*}*/

/*修改elementUI自带样式*/
.el-tabs--right .el-tabs__header.is-right {
	float: left;
	margin: 10px 0 0 0
}

.el-tabs__item:hover {
	color: #42b983;
}

.el-tabs__item.is-active {
	color: #42b983;
}

.el-tabs__active-bar {
	background-color: #42b983;
}

/*TODO: TOC及代码样式问题，评论区*/
</style>
