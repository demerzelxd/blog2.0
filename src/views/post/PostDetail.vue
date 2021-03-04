<template>
	<div>
		<Header></Header>
		<div :style="{'background-image': post.banner}" class="gis-post-banner">
			<h1 style="font-size: 35px;">{{post.title}}</h1>
			<p style="font-size: 16px">{{post.createTime}}</p>
			<div class="arrow-down">
				<a href="javascript:void(0)"></a>
			</div>
		</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
		<div>{{post.description}}</div>
	</div>
</template>

<script>
import Header from '../../components/Header'
export default {
	name: 'PostDetail',
	data () {
		return {
			post: {}
		}
	},
	components: {
		Header
	},
	methods: {
		getPostDetail () {
			this.$http.get('/blog/' + this.$route.params.postId).then((resp) => {
				this.post = resp.data.data
				if (this.post.banner === null || this.post.banner === undefined || this.post.banner === '') {
					this.post.banner = require('geopattern').generate(this.post.title).toDataUrl()
				}
			})
		}
	},
	created () {
		this.getPostDetail()
	}
}
</script>

<style>
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
</style>
