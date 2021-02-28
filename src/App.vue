<template>
	<div id="app">
		<el-container>
			<el-header class="gis-header">
				<Header/>
			</el-header>
			<el-main>
				<router-view/>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import Header from './components/Header'
export default {
	name: 'App',
	components: {Header}
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
	box-shadow: 0 0 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
