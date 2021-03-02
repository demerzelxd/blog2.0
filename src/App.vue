<template>
	<div id="app">
		<el-container>
			<el-header class="gis-header">
				<Header/>
			</el-header>
			<el-main class="gis-main">
				<router-view/>
			</el-main>
			<el-footer>
				<div class="gis-footer">
					<p>Designed and Coded by © <el-link :underline="false" style="color: #42b983; margin-bottom: 2px" @click="refresh()">Giskard</el-link></p>
				</div>
			</el-footer>
		</el-container>
		<!--向上滚动-->
		<el-backtop/>
	</div>
</template>

<script>
import Header from './components/Header'
export default {
	name: 'App',
	components: {Header},
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
.gis-header {
	/*固定*/
	position: fixed;
	width: 100%;
	left: 0;
	top: 0;
	z-index: 1000;
	/*阴影*/
	box-shadow: 0 0 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.gis-main {
	margin-top: 65px;
	width: 100%;
	height: 100%
}
.gis-footer {
	max-width: 1200px;
	margin: 10px auto;
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
</style>
