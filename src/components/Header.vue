<template>
	<!--导航菜单-->
	<div class="gis-nav">
		<el-image
			class="gis-logo"
			:src="icon"
			fit="fit"
			@click="refresh()"
			style="cursor: pointer">
		</el-image>
		<el-menu :default-active="getActiveIndex()" mode="horizontal" @select="handleSelect" text-color="#34495e" class="gis-menu">
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
			icon: icon
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
			// 形如/index直接返回
			return this.$route.path
		}
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
.gis-nav {
	max-width: 1200px;
	margin: 0 auto;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.9);
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
	outline: none;
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
