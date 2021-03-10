<template>
	<div>
		<Header/>
		<div :style="{'background-image': banner}" class="gis-archive-banner">
			<transition name="gis-archive-fade-down">
				<!--动画不生效的话就用v-if代替v-show-->
				<div v-if="isArchiveShow">
					<h1 style="font-size: 35px;" key="tags">Archives</h1>
					<p style="font-size: 16px" key="desc">文章归档</p>
				</div>
			</transition>
		</div>
		<transition name="gis-archive-fade-down">
			<div v-if="isArchiveShow" class="gis-archive-container">
				<el-timeline v-for="(archives, index) in archiveList" :key="index">
					<strong style="font-size: 1.6em">{{archives.year}}</strong>
					<br>
					<br>
					<el-timeline-item
						v-for="(archiveItem, index) in archives.archiveItemInfoList"
						:key="index"
						:color="colorList[index % colorList.length]"
						size="large"
						:timestamp="archiveItem.md">
						<router-link :to="{name: 'PostDetail', params: {postId: archiveItem.id}}" class="gis-archive-router-link">
							{{archiveItem.title}}
						</router-link>
					</el-timeline-item>
				</el-timeline>
			</div>
		</transition>
	</div>
</template>

<script>
import Header from '../../components/Header'
export default {
	name: 'Archives',
	components: {
		Header
	},
	data () {
		return {
			banner: '',
			isArchiveShow: false,
			archiveList: [],
			colorList: ['#fa5a5a', '#f0d264', '#82c8a0', '#7fccde', '#6698cb', '#cb99c5', '#bbbbee', '#9cb2e1']
		}
	},
	methods: {
		getArchiveList () {
			this.$http.get('/blog/findArchivesByYear').then((resp) => {
				// console.log(resp.data);
				this.archiveList = resp.data.data
			})
		}
	},
	created () {
		this.getArchiveList()
	},
	mounted () {
		// 设置banner
		this.banner = require('geopattern').generate('archives').toDataUrl()
		// 渐入显示归档详情
		this.isArchiveShow = true
	}
}
</script>

<style>
.gis-archive-banner {
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

.gis-archive-container {
	max-width: 650px;
	margin: 50px auto;
	min-height: 628px;
}

.gis-archive-router-link {
	text-decoration: none;
	/*transform失效，使用inline-block即可*/
	display:inline-block;
	color: #42b983;
	transition: all 0.3s ease;
}

.gis-archive-router-link:hover{
	transform: translateX(10px);
}

.gis-archive-fade-down-enter-active,
.gis-archive-fade-down-leave-active {
	transition: all 0.4s ease;
	transition-delay: 0.08s;
}
.gis-archive-fade-down-enter,
.gis-archive-fade-down-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}

.el-timeline {
	font-size: 1.1em;
}

.el-timeline-item__tail {
	top: 10px;
	border-left-width: 4px;
}

.el-timeline-item__node {
	top: 6px;
	left: -1px;
}

</style>
