<template>
	<div>
		<Header/>
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
				<a class="tag0" data-name="tag-react">前端开发</a>
				<a class="tag1" data-name="tag-react">深入理解系列</a>
				<a class="tag2" data-name="tag-react">php</a>
				<a class="tag3" data-name="tag-react">Java</a>
			</div>
			<div v-if="isTagShow" class="gis-tag-container" key="tagContainer">
				<div v-for="(postTag, indexOut) in postTagList" :key="indexOut">
					<h3 :id="postTag[0].name" style="padding-top: 60px;margin-top: -50px;" class="gis-tag-anchor"><a :href="'#'+postTag[0].name">#</a> {{postTag[0].name}}</h3>
					<ul v-for="(post, indexIn) in postTag" :key="indexIn">
						<li>
							<router-link :to="{name: 'PostDetail', params: {postId: post.postId}}" style="text-decoration: none;color: #42b983;">
								{{post.postTitle}}
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
import Header from '../../components/Header'
export default {
	name: 'Tags',
	components: {
		Header
	},
	data () {
		return {
			banner: '',
			isTagShow: false,
			tagName: '',
			postTagList: [
				[
					{ name: 'React', postId: '51', postTitle: '初识React' },
					{ name: 'React', postId: '50', postTitle: 'React事件系统' },
					{ name: 'React', postId: '49', postTitle: 'React使用表单的正确姿势' },
					{ name: 'React', postId: '48', postTitle: 'React使用表单的正确姿势' },
					{ name: 'React', postId: '47', postTitle: 'React组件间的通信' }
				],
				[
					{ name: '深入理解系列', postId: '46', postTitle: '深入理解JavaScript原型和原型链' },
					{ name: '深入理解系列', postId: '45', postTitle: '深入理解flex-grow、flex-basis、flex-shrink' }
				],
				[
					{ name: '前端开发', postId: '44', postTitle: '纪念那些年我写的PHP' },
					{ name: '前端开发', postId: '43', postTitle: '纯手工打造前端后端分离项目中的mock-server' }
				]
			]
		}
	},
	methods: {
		toTag () {
			if (this.tagName) {
				document.getElementById(decodeURIComponent(this.tagName)).children[0].click()
				// console.log(document.getElementById(decodeURIComponent(this.tagName)).children[0])
			}
		}
	},
	mounted () {
		// 设置banner
		this.banner = require('geopattern').generate('tags').toDataUrl()
		// 渐入显示标签详情
		this.isTagShow = true
		// 从别的路由获取到的参数
		this.tagName = this.$route.params.tagName
		// 跳转到标签
		this.$nextTick(() => {
			setTimeout(() => {
				this.toTag()
			}, 0)
		})
	},
	watch: {
		$route: {
			handler () {
				if (this.$route.hash) {
					this.$nextTick(() => {
						setTimeout(() => {
							// 跳转到hash
							document.getElementById(decodeURIComponent(this.$route.hash).substring(1)).children[0].click()
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
	margin-top: 50px;
	text-align: center
}

.gis-tag-cloud a {
	border: none;
	line-height: 28px;
	margin: 0 4px 8px 0;
	background: #63a35c;
	display: inline-block;
	border-radius: 4px;
	padding: 0 10px;
	color: #fff;
	transition: background 0.5s;
	cursor: pointer;
}

.gis-tag-cloud .tag0 {
	background: #bbe;
}
.gis-tag-cloud .tag1 {
	background: #9cb2e1;
}
.gis-tag-cloud .tag2 {
	background-color: rgba(0,133,161,0.8);
}

.gis-tag-cloud a:hover {
	background: #0085a1;
}

.gis-tag-container {
	max-width: 1000px;
	margin: 30px auto;
	position: relative;
	min-height: 628px;
	height: 100%;
}

.gis-tag-anchor a {
	color: #42b983;
	text-decoration: none;
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
