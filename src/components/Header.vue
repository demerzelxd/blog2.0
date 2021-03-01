<template>
	<!--导航菜单-->
	<div class="gis-nav">
		<el-image
			class="gis-logo"
			:src="icon"
			fit="fit">
		</el-image>
		<el-menu :default-active="activeIndex" ref="menu" mode="horizontal" @select="handleSelect" text-color="#34495e" class="gis-menu">
			<el-menu-item index="/home"><span>Home</span></el-menu-item>
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
			// 当前激活的路由路径
			activeIndex: this.$route.path
		}
	},
	methods: {
		handleSelect (key) {
			// 此时key就代表选中的/index, /tag...
			// 避免重复跳转
			if (this.$route.path !== key) {
				this.$router.push(key)
			}
		}
	}
}
</script>

<style scoped>
/*导航样式*/
.gis-nav {
	max-width: 1200px;
	margin: 0 auto;
	height: 100%;
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
	height: 99%;
}

/*覆盖elementUI原有样式*/
.el-menu-item {
	font-size: 16px;
	padding: 0 10px;
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
