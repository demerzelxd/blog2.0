<template>
	<div id="app">
		<el-container>
			<el-main style="padding: 0">
				<keep-alive>
					<router-view v-if="$route.meta.keepAlive"></router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keepAlive"></router-view>
			</el-main>
			<el-footer>
				<div class="gis-footer">
					<el-divider><i class="el-icon-lollipop"></i></el-divider>
					<p>Designed and Coded by © <el-link :underline="false" style="color: #42b983; margin-bottom: 2px" @click="refresh()">Giskard</el-link></p>
				</div>
			</el-footer>
		</el-container>
		<!--向上滚动-->
		<el-backtop/>
	</div>
</template>

<script>
export default {
	name: 'App',
	methods: {
		refresh () {
			if (this.$route.path === '/home') {
				this.$router.go(0)
			} else {
				this.$router.push('/home')
			}
		}
	}
}
</script>

<style>
@import "../src/assets/font/font.css";
/*选中字体颜色*/
::selection {
	background: #42b983;
	color: #fff;
}
#app {
	font-family: 'Source Sans Pro', 'Noto Serif SC', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #34495e;
}
.gis-footer {
	max-width: 1000px;
	margin: 0 auto;
	text-align: center;
	font-size: 8px;
	color: #999;
}
/*自定义进度条样式*/
#nprogress .bar {
	background: #42B983;
}
#nprogress .spinner {
	display: none;
}
/*自定义滚动条 */
::-webkit-scrollbar {
	width: 4px;
	height: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: #42B983;
  border-radius: 10px;
}
/*自定义backTop*/
.el-backtop, .el-calendar-table td.is-today {
	color: teal
}
.el-divider__text {
	color: #999;
}
.el-divider--horizontal {
	margin: 12px 0
}
</style>
