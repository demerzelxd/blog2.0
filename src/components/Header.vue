<template>
	<!--导航菜单-->
	<div class="gis-nav" :class="gisSwitchNav">
		<el-image
			class="gis-logo"
			:src="icon"
			fit="fit"
			@click="refresh()"
			style="cursor: pointer; margin-left: 60px">
		</el-image>
		<el-menu :default-active="getActiveIndex()" ref="menu" mode="horizontal" @select="handleSelect" :text-color="textColor" class="gis-menu">
			<el-menu-item index="/home" @click="refresh()"><span>Home</span></el-menu-item>
			<el-menu-item index="/tags"><span>Tags</span></el-menu-item>
			<el-menu-item index="/archives"><span>Archives</span></el-menu-item>
			<el-menu-item index="/projects"><span>Projects</span></el-menu-item>
			<el-menu-item index="/about"><span>About</span></el-menu-item>
		</el-menu>
	</div>
</template>

<script>
import icon from '../assets/img/icon.svg'
export default {
	name: 'Header',
	data () {
		return {
			icon: icon,
			textColor: '#34495e',
			scrollTop: ''
		}
	},
	methods: {
		handleSelect (key) {
			// 此时key就代表选中的/index, /tag...
			// 避免重复跳转
			if (this.$route.path !== key) {
				this.$router.push(key)
			}
		},
		refresh () {
			if (this.$route.path === '/home') {
				this.$router.go(0)
			} else {
				this.$router.push('/home')
			}
		},
		// 获取当前激活路由
		getActiveIndex () {
			// 形如/tag/Java
			if (this.$route.path.lastIndexOf('/') !== 0) {
				// 返回形如/tag
				return ('/' + this.$route.path.split('/')[1])
			}
			// 形如/home直接返回
			return this.$route.path
		},
		// 监听侧边的滚动条
		handleScroll () {
			// 滚动距离
			this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			if (this.$route.path !== '/home') {
				// 当路由非首页且滚动距离为0
				if ((this.$route.path !== '/home') && (this.scrollTop === '' || this.scrollTop === 0)) {
					this.textColor = '#FFFFFF'
				} else {
					// 当路由非首页且滚动距离大于0
					this.textColor = '#34495e'
				}
			}
		}
	},
	computed: {
		gisSwitchNav () {
			// 当路由非首页且滚动距离为0，启用gisSwitchNav样式，隐藏背景色与box-shadow
			// console.log('实际：' + this.scrollTop)
			return {gisSwitchNav: (this.$route.path !== '/home') && (this.scrollTop === '' || this.scrollTop === 0)}
		}
	},
	mounted () {
		if (this.$route.path !== '/home') {
			// 路由非首页，在一开始把字体颜色设为白色
			this.textColor = '#FFFFFF'
		}
		// 监听滚动条
		window.addEventListener('scroll', this.handleScroll, true)
	},
	beforeDestroy () {
		window.removeEventListener('scroll', this.handleScroll, false)
	}
	// 监听路由变化
		// watch: {
		// 	$route (to, from) {
		// 		console.log(from.path, to.path)
		// 	}
		// }
}
</script>

<style scoped>
/*导航样式*/
.gisSwitchNav {
	background: none !important;
	box-shadow: none !important;
}
.gis-nav {
	margin: 0 auto;
	background-color: rgba(255, 255, 255, 0.9);
	/*固定*/
	position: fixed;
	width: 100%;
	height: 60px;
	left: 0;
	top: 0;
	z-index: 1000;
	/*阴影*/
	box-shadow: 0 0 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
/*logo样式*/
.gis-logo {
	width: 45px;
	height: 45px;
	margin: 10px 0;
}
/*menu样式*/
.gis-menu {
	float: right;
	margin-right: 60px;
	height: 100%;
}

/*覆盖elementUI原有样式*/
.el-menu.el-menu--horizontal {
	border-bottom: none;
	background-color: rgba(255, 255, 255, 0);
}

.el-menu-item {
	font-size: 16px;
	padding: 0 10px;
}

.el-menu-item:hover {
	background: transparent !important;
}

.el-menu-item:hover span {
	padding-bottom: 3px;
	border-bottom: 3px solid;
	border-bottom-color: #42B983;
}

.el-menu-item.is-active {
	border-bottom: transparent;
	color: #34495e;
}

.el-menu-item.is-active span {
	padding-bottom: 3px;
	border-bottom: 3px solid;
	border-bottom-color: #42B983;
}
</style>
