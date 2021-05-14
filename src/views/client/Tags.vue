<template>
	<div>
		<div :style="{'background-image': banner}" class="gis-tag-banner">
			<transition name="gis-tag-fade-down">
				<!--动画不生效的话就用v-if代替v-show-->
				<div v-if="isTagShow">
					<h1 style="font-size: 35px;" key="tags">Tags</h1>
					<p style="font-size: 16px" key="desc">标签检索</p>
				</div>
			</transition>
		</div>
		<transition-group name="gis-tag-fade-down">
			<div v-if="isTagShow" class="gis-tag-cloud" key="tagCloud">
				<a v-for="(tagName, index) in tagList" :key="index" :style="{'background': colorList[index % colorList.length]}" :href="'#'+tagName">{{tagName}}</a>
			</div>
			<div v-if="isTagShow" class="gis-tag-container" key="tagContainer">
				<div v-for="(tagPosts, index) in tagPostList" :key="index">
					<h3 :id="tagPosts.tagName" class="gis-tag-anchor"><a :href="'#'+tagPosts.tagName">#</a> {{tagPosts.tagName}}</h3>
					<ul v-for="(tagPostItem, index) in tagPosts.tagItemInfoList" :key="index">
						<li>
							<router-link :to="{name: 'PostDetail', params: {postId: tagPostItem.id}}" class="gis-tag-router-link">
								{{tagPostItem.title}}
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
export default {
	name: 'Tags',
	data () {
		return {
			banner: '',
			isTagShow: false,
			tagName: '',
			tagList: [],
			tagPostList: [],
			colorList: ['#fa5a5a', '#f0d264', '#82c8a0', '#7fccde', '#6698cb', '#cb99c5', '#bbbbee', '#9cb2e1']
		}
	},
	methods: {
		initAllTagData () {
			this.$http.get('/api/tags/findAllTagsAndBlogs').then((resp) => {
				// console.log(resp.data);
				// 初始化tagPostList
				this.tagPostList = resp.data.data
				for (let i = 0; i < this.tagPostList.length; i++) {
					// 初始化tagList
					this.tagList.push(this.tagPostList[i].tagName)
				}
			})
		},
		goAnchor (selector) {
			let anchor = document.querySelector(decodeURIComponent(selector))
			// console.log(anchor.offsetParent.offsetTop + anchor.offsetTop)
			document.documentElement.scrollTop = anchor.offsetParent.offsetTop + anchor.offsetTop
		}
	},
	created () {
		// 获取数据
		this.initAllTagData()
	},
	mounted () {
		// 设置banner
		this.banner = require('geopattern').generate('tags').toDataUrl()
		// 渐入显示标签详情
		this.isTagShow = true
		// 一开始就跳转到anchor
		if (this.$route.hash) {
			this.$nextTick(() => {
				setTimeout(() => {
					this.goAnchor(this.$route.hash)
				}, 400)
			})
		}
	},
	watch: {
		$route: {
			handler () {
				if (this.$route.hash) {
					this.$nextTick(() => {
						setTimeout(() => {
							// 路由切换时跳转到anchor
							this.goAnchor(this.$route.hash)
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

<style scoped>
.gis-tag-banner {
	width: 100%;
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

.gis-tag-cloud {
	max-width: 500px;
	margin: 50px auto;
	text-align: center;
	cursor: pointer;
}

.gis-tag-cloud a {
	border: none;
	line-height: 28px;
	margin: 0 8px 8px 0;
	background: #63a35c;
	display: inline-block;
	border-radius: 4px;
	padding: 0 10px;
	color: #fff;
	transition: background 0.5s;
	cursor: pointer;
	text-decoration: none;
}

.gis-tag-cloud a:hover {
	background: #0085a1 !important;
}

.gis-tag-container {
	max-width: 550px;
	margin: 50px auto;
	position: relative;
	min-height: 628px;
	height: 100%;
}

.gis-tag-anchor {
	padding-top: 60px;
	margin-top: -50px;
}

.gis-tag-anchor a {
	color: #42b983;
	text-decoration: none;
}

.gis-tag-router-link {
	text-decoration: none;
	/*transform失效，使用inline-block即可*/
	display:inline-block;
	color: #42b983;
	transition: all 0.3s ease;
}

.gis-tag-router-link:hover{
	transform: translateX(10px);
}

.gis-tag-fade-down-enter-active,
.gis-tag-fade-down-leave-active {
	transition: all 0.4s ease;
	transition-delay: 0.08s;
}
.gis-tag-fade-down-enter,
.gis-tag-fade-down-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}
</style>
