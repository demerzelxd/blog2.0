<template>
	<div>
		<Header ref="header"></Header>
		<div class="gis-post-container">
			<div :style="{'background-image': post.banner}" class="gis-post-banner" ref="banner">
				<transition name="gis-post-fade-down">
					<!--动画不生效的话就用v-if代替v-show-->
					<div v-if="isPostShow">
						<h1 style="font-size: 35px;" key="title">{{post.title}}</h1>
						<p style="font-size: 16px" key="time">{{post.createTime}}</p>
						<div class="arrow-down" key="arrow">
							<a href.prevent style="cursor: pointer;" @click="scrollDown()"></a>
						</div>
					</div>
				</transition>
			</div>
			<transition name="gis-post-fade-down">
				<div v-if="isPostShow">
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
			</transition>
		</div>
	</div>
</template>

<script>
import Header from '../../components/Header'
export default {
	name: 'PostDetail',
	data () {
		return {
			post: {},
			isPostShow: false,
			headerHeight: ''
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
		},
		// 点击arrow向下滚动至内容
		scrollDown () {
			// 已知banner的高度为280px
			document.documentElement.scrollTo({top: 280 - this.headerHeight, behavior: 'smooth'})
		}
	},
	mounted () {
		this.getPostDetail()
		// 渐入显示文章详情
		this.isPostShow = true
		// 获取导航栏高度
		this.headerHeight = this.$refs.header.$el.offsetHeight
	}
}
</script>

<style>
.gis-post-container {
	min-height: 600px;
	height: 100%;
}

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

.arrow-down {
	display: flex;
	justify-content: center;
}

.arrow-down a {
	width: 25px;
	height: 25px;
	transform: rotate(315deg);
	animation-name: shine;
	animation-duration: 1.5s;
	animation-iteration-count: infinite;
	border-bottom: 1px solid #fff;
	border-left: 1px solid #fff;
}

/*重写transition样式*/
.gis-post-fade-down-enter-active,
.gis-post-fade-down-leave-active {
	transition: all 1s ease;
}
.gis-post-fade-down-enter,
.gis-post-fade-down-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}
/*动画效果*/
@keyframes shine {
	0%, 100% {
		opacity: 0.1;
	}
	25%, 75% {
		opacity: 0.2;
	}
	37.5%, 62.5% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
}

</style>
