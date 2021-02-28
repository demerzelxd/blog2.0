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
#app {
	font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.gis-header {
	box-shadow: 0 0 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
