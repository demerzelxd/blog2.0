<template>
	<div>
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
		<el-link class="gis-icon" :class="gisIconFixed" :underline="false" @click="controlToc()" ref="foldBtn"><i class="el-icon-s-fold"></i></el-link>
		<transition-group name="gis-post-fade-in">
			<div v-if="isPostShow" class="gis-post-container" :class="gisPostSwitch" key="postContainer">
				<markdown-it-vue class="md-body" :content="content" :options="options"/>
			</div>
			<div class="gis-toc-container" :class="gisTocFixed" key="tocContainer" ref="tocContainer">
				<strong style="margin-left: 27px;" v-show="isTocShow"><i class="el-icon-s-unfold"></i> 目录</strong>
				<div style="width: 250px;height: 470px;position: relative;overflow: hidden;">
					<el-tabs tab-position="right" style="height: 100%;" @tab-click="handleClick" v-model="activeToc" v-show="isTocShow">
						<el-tab-pane v-for="(toc, index) in tocList" :key="index" :label="toc.name" :name="toc.name"></el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
// 引入markdown-it-vue
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
	name: 'PostDetail',
	data () {
		return {
			post: {},
			isPostShow: false,
			content: '',
			options: {
				githubToc: {
					anchorLinkSymbol: '#',
					anchorLinkSpace: true
				}
			},
			scrollTop: '',
			// 目录
			activeToc: '3.3 Authenticator',
			tocList: [],
			isTocShow: false
		}
	},
	components: {
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
			document.documentElement.scrollTo({top: 280 - 60, behavior: 'smooth'})
		},
		handleTocScroll () {
			// 设置滚动距离
			this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			if (!this.scrollTop) {
				this.scrollTop = 0
			}
		},
		// 获取所有标题
		setTocStyle () {
			let itemNodeList = document.querySelectorAll('.el-tabs__item')
			// console.log(itemNodeList)
			for (let i = 0; i < itemNodeList.length; i++) {
				if (this.tocList[i].level === '1') {
					itemNodeList[i].style.paddingLeft = '20px'
					itemNodeList[i].style.fontSize = '16px'
					itemNodeList[i].style.fontWeight = '700'
				} else if (this.tocList[i].level === '2') {
					itemNodeList[i].style.paddingLeft = '30px'
					itemNodeList[i].style.fontSize = '14px'
					itemNodeList[i].style.fontWeight = '600'
				} else if (this.tocList[i].level === '3') {
					itemNodeList[i].style.paddingLeft = '40px'
					itemNodeList[i].style.fontSize = '12px'
					itemNodeList[i].style.fontWeight = '500'
				} else if (this.tocList[i].level === '4') {
					itemNodeList[i].style.paddingLeft = '50px'
					itemNodeList[i].style.fontSize = '10px'
					itemNodeList[i].style.fontWeight = '400'
				} else if (this.tocList[i].level === '5') {
					itemNodeList[i].style.paddingLeft = '60px'
					itemNodeList[i].style.fontSize = '8px'
					itemNodeList[i].style.fontWeight = '300'
				} else if (this.tocList[i].level === '6') {
					itemNodeList[i].style.paddingLeft = '70px'
					itemNodeList[i].style.fontSize = '6px'
					itemNodeList[i].style.fontWeight = '200'
				}
			}
		},
		// 点击目录跳转
		handleClick (tab, event) {
			// console.log(this.tocList[tab.index].children[0])
			this.tocList[tab.index].children[0].click()
		},
		// 控制Toc是否展示及背景色
		controlToc () {
			this.isTocShow = !this.isTocShow
			// 如果没有z-index
			if (!this.$refs.tocContainer.style.zIndex || this.$refs.tocContainer.style.zIndex === '-1') {
				this.$refs.tocContainer.style.zIndex = '1'
			} else {
				// 如果有z-index
				this.$refs.tocContainer.style.zIndex = '-1'
			}
			// 如果没有背景色，添加背景色
			if (!this.$refs.tocContainer.style.backgroundColor) {
				this.$refs.tocContainer.style.backgroundColor = '#FFFFFF'
			} else {
				// 如果有背景色
				this.$refs.tocContainer.style.backgroundColor = ''
			}
		},
		goDetailAnchor (selector) {
			// 由于markdown-it默认的id是#1权限的管理，querySelector(selector)只能开头是英文字母，不能是1234
			// 故修改为getElementById
			let anchor = document.getElementById(decodeURIComponent(selector).substring(1))
			document.documentElement.scrollTop = anchor.offsetParent.offsetTop + anchor.offsetTop
		}
	},
	computed: {
		// 是否应该固定TOC
		isTimeToFixed () {
			return this.scrollTop >= 280 - 60
		},
		// 控制样式是否展示
		gisTocFixed () {
			// 当滚动到一定距离，启用gisTocFixed，固定目录
			// console.log('实际：' + this.scrollTop)
			return {gisTocFixed: this.isTimeToFixed}
		},
		// 计算tocList
		getTocList () {
			let titleNodeList = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6')
			// console.log(Array.from(titleNodeList))
			let tocList = Array.from(titleNodeList)
			tocList.forEach(item => {
				item.name = item.innerText.substring(2)
				item.level = item.localName.substring(1)
			})
			return tocList
		},
		gisIconFixed () {
			return {gisIconFixed: this.isTimeToFixed}
		},
		// 目录出现时，切换post主题宽度
		gisPostSwitch () {
			return {gisPostSwitch: this.isTocShow}
		}
	},
	created () {
		this.getPostDetail()
	},
	mounted () {
		// 渐入显示文章详情
		this.isPostShow = true
		// 初始化toc
		this.$nextTick(() => {
			setTimeout(() => {
				this.tocList = this.getTocList
			}, 250)
		})
		// 设置toc样式
		this.$nextTick(() => {
			setTimeout(() => {
				this.setTocStyle()
			}, 250)
		})
		// 一开始就路由定位
		if (this.$route.hash) {
			this.$nextTick(() => {
				setTimeout(() => {
					// decodeURIComponent用于对中文解码
					this.goDetailAnchor(this.$route.hash)
					// 一开始就toc标题激活
					this.tocList.forEach(toc => {
						// hash为shiro-实战教程
						if (decodeURIComponent(this.$route.hash).substring(1) === toc.id) {
							// name为Shiro 实战教程的toc被激活
							this.activeToc = toc.name
						}
					})
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
				// 路由发生跳转，说明已加载完
				if (this.$route.hash) {
					this.$nextTick(() => {
						setTimeout(() => {
							// 跳转到anchor
							this.goDetailAnchor(this.$route.hash)
							// 监听hash，toc侧边栏对应标题激活
							this.tocList.forEach(toc => {
								// hash为shiro-实战教程
								if (decodeURIComponent(this.$route.hash).substring(1) === toc.id) {
									// name为Shiro 实战教程的toc被激活
									this.activeToc = toc.name
								}
							})
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

.gisPostSwitch {
	max-width: 800px;
	margin: 35px 100px 35px 100px;
}

.gis-toc-container {
	position: absolute;
	right: 50px;
	top: 300px;
	width: 250px;
	height: 510px;
}

.gis-icon {
	width: 30px;
	height: 30px;
	position: absolute;
	top: 286px;
	right: 5px;
	z-index: 2;
}

.gisTocFixed {
	position: fixed;
	top: 60px;
	padding-top: 19px;
}

.gisIconFixed {
	position: fixed;
	top: 60px;
	margin-top: 5px;
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

.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
	padding-top: 60px;
	margin-top: -50px;
}

/*修改elementUI自带样式*/
.el-tabs--right .el-tabs__header.is-right {
	float: left;
}

.el-tabs__item {
	color: #34495e;
	transition: all .3s ease-out;
}

.el-tabs__item:hover {
	color: #42b983;
	transform: translateX(5px);
}

.el-tabs__item.is-active {
	color: #42b983;
}

.el-tabs__active-bar {
	background-color: #42b983;
}

.el-link.el-link--default {
	color: #34495e;
}

.el-link.el-link--default:hover {
	color: #42b983;
}

/*TODO: 代码样式问题，评论区*/
</style>
