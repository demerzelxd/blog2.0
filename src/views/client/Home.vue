<template>
	<div>
		<transition name="gis-list-fade-down">
			<div class="gis-list-container" v-show="isListShow" key="list">
				<el-row v-for="(post, index) in postList" :key="index" v-if="index % 2 === 0" style="margin-bottom: 25px;">
					<!--左侧栏-->
					<el-col :span="11">
						<el-card :body-style="{ padding: '0px' }">
							<div class="gis-img-container">
								<el-image class="image" :src="getUrl(post)" fit="cover">
								</el-image>
								<div class="gis-mask" @click="onRoute(post.id)">
									<p style="max-width: 400px; max-height: 100px; margin: 20px auto;">
										{{ post.description }}
									</p>
								</div>
							</div>
							<div style="padding: 10px;">
								<span @click="onRoute(post.id)" style="cursor: pointer">{{ post.title }}</span>
								<div class="bottom clearfix">
									<time class="time">{{ getCreateTime(post.createTime) }}</time>
									<router-link :to="{name: 'Tags', hash: '#'+post.tagName}" class="gis-tag">
										#{{post.tagName}}
									</router-link>
									<span @click="onRoute(post.id)" class="gis-router-link">
										Read more
									</span>
								</div>
							</div>
						</el-card>
					</el-col>
					<!--右侧栏-->
					<el-col :span="11" :offset="2" v-if='index + 1 < postList.length'>
						<el-card :body-style="{ padding: '0px' }">
							<div class="gis-img-container">
								<el-image class="image" :src="getUrl(postList[index + 1])" fit="cover">
								</el-image>
								<div class="gis-mask" @click="onRoute(postList[index + 1].id)">
									<p style="max-width: 400px; max-height: 100px; margin: 20px auto;">
										{{ postList[index + 1].description }}
									</p>
								</div>
							</div>
							<div style="padding: 10px;">
								<span @click="onRoute(postList[index + 1].id)" style="cursor: pointer">{{ postList[index + 1].title }}</span>
								<div class="bottom clearfix">
									<time class="time">{{ getCreateTime(postList[index + 1].createTime) }}</time>
									<router-link :to="{name: 'Tags', hash: '#'+postList[index + 1].tagName}" class="gis-tag">
										#{{postList[index + 1].tagName}}
									</router-link>
									<span @click="onRoute(postList[index + 1].id)" class="gis-router-link">
										Read more
									</span>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<!--分页-->
				<!--只有一页或无数据时隐藏-->
				<!--:hide-on-single-page="value"-->
				<el-pagination
					layout="prev, pager, next, sizes"
					:page-size="pageSize"
					:current-page="pageNow"
					:page-sizes="[8, 12, 16]"
					:total="total"
					@current-change="findPage"
					@size-change="findSize"
					:hide-on-single-page="pages === 1"
					style="text-align: right; margin-top: 40px; margin-bottom: -50px">
				</el-pagination>
			</div>
		</transition>
	</div>
</template>

<script>
import Header from '../../components/Header'
export default {
	name: 'Home',
	data () {
		return {
			isListShow: false,
			pages: 1,
			total: 0,
			pageNow: 1,
			pageSize: 8,
			postList: []
		}
	},
	components: {
		Header
	},
	methods: {
		// 随机生成占位图
		getUrl (post) {
			if (post.banner) {
				return post.banner
			}
			return require('geopattern').generate(post.title).toDataUri()
			// return 'http://source.unsplash.com/random/900x300'
			// return 'https://picsum.photos/id/1021/900/300'
		},
		// 获取所有文章
		getPostList (pageNow, pageSize) {
			// 如果没有传参，则默认是1和5
			pageNow = pageNow || this.pageNow
			pageSize = pageSize || this.pageSize
			this.$http.get('/api/blog/findByPage?pageNow=' + pageNow + '&pageSize=' + pageSize).then((resp) => {
				// console.log(resp.data);
				this.postList = resp.data.data.records
				this.total = resp.data.data.total
				this.pages = resp.data.data.pages
			})
		},
		findPage (page) {
			// 处理分页，findPage方法默认回传当前页码，从1开始
			// console.log(page)
			this.pageNow = page
			this.getPostList(page, this.pageSize)
		},
		findSize (size) {
			// 处理下拉菜单中每页显示多少条
			// console.log(size)
			this.pageSize = size
			this.getPostList(this.pageNow, size)
		},
		// id路由跳转
		onRoute (id) {
			this.$router.push({name: 'PostDetail', params: {postId: id}})
		},
		// 格式化日期
		getCreateTime (createTime) {
			let date = new Date(createTime)
			let dateString = date.toDateString()
			return dateString.split(' ')[1] + ' ' + dateString.split(' ')[2] + ', ' + dateString.split(' ')[3]
		}
	},
	mounted () {
		this.getPostList()
		// 渐入显示文章列表
		this.isListShow = true
	}
}
</script>

<style>
.gis-list-container {
	max-width: 1000px;
	margin: 85px auto;
	min-height: 635px;
	height: 100%;
}

/*遮罩层容器*/
.gis-img-container {
	position: relative;
	overflow: hidden;
	background-color: #fff;
}

/*遮罩层*/
.gis-mask {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 150px;
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0.4);
	color: #f5f1e5;
	opacity: 0;
	z-index: 1;
	font-size: 15px;
	transition: opacity 0.3s;
}

.gis-tag {
	font-size: 14px;
	color: teal;
	text-decoration: none;
}

.gis-img-container:hover .gis-mask {
	opacity: 1;
}

/*router-link按钮样式*/
.gis-router-link {
	float: right;
	font-size: 14px;
	font-weight: bold;
	color: #42b983 !important;
	cursor: pointer;
}

/*elementUI的card样式*/
.el-card {
	color: #34495e;
}

.time {
	font-size: 14px;
	color: #999;
}

.bottom {
	margin-top: 13px;
	line-height: 12px;
}

.image {
	width: 100%;
	height: 150px;
	display: block;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}

.clearfix:after {
	clear: both
}

/*重写transition样式*/
.gis-list-fade-down-enter,
.gis-list-fade-down-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}

.gis-list-fade-down-enter-active,
.gis-list-fade-down-leave-active {
	transition: all 1s ease;
}

/*自定义分页组件*/
.el-pager li:hover {
	color: #42b983 !important;
}

.el-pager li.active {
	color: #42b983 !important;
}

.el-select-dropdown__item {
	font-family: 'Source Sans Pro', 'Noto Serif SC', sans-serif;
}

.el-select-dropdown__item.selected {
	color: #42b983 !important;
}

.el-select .el-input.is-focus .el-input__inner {
	border-color: #42b983 !important;
}

.el-pagination__sizes .el-input .el-input__inner:hover {
	border-color: #42b983 !important;
}

.el-select .el-input__inner:focus {
	border-top-color: #42b983 !important;
	border-right-color: #42b983 !important;
	border-bottom-color: #42b983 !important;
	border-left-color: #42b983 !important;
}

.el-pagination button:hover {
	color: #42b983 !important;
}

input {
	font-family: 'Source Sans Pro', 'Noto Serif SC', sans-serif;
}

.el-pagination button:disabled {
	display: none;
}

</style>
