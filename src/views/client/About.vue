<template>
	<div>
		<div :style="{'background-image': banner}" class="gis-about-banner"></div>
			<transition name="gis-about-fade-down">
				<!--动画不生效的话就用v-if代替v-show-->
				<div v-if="isAboutShow" class="gis-about">
					<div class="gis-about-header">
						<img :src="icon" alt="" class="gis-avatar">
					</div>
					<h3>Giskard</h3>
					<p style="font-size: 16px">Wubba Lubba Dub Dub</p>
					<div class="gis-social-icons">
						<a href="https://weibo.com/giskard" target="_blank" style="color: #e6162d;">
	                        <span class="fa-stack fa-lg">
	                            <i class="fa fa-circle fa-stack-2x"></i>
		                        <i class="fa fa-weibo fa-stack-1x fa-inverse"></i>
	                        </span>
						</a>

						<a href="https://twitter.com/Giskard33" target="_blank" style="color: #2aa9e0;">
	                        <span class="fa-stack fa-lg">
	                            <i class="fa fa-circle fa-stack-2x"></i>
	                            <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
	                        </span>
						</a>

						<a href="https://github.com/demerzelxd" target="_blank" style="color: #333;">
					        <span class="fa-stack fa-lg">
					          <i class="fa fa-circle fa-stack-2x"></i>
					          <i class="fa fa-github fa-stack-1x fa-inverse"></i>
					        </span>
						</a>

						<a href="https://www.zhihu.com/people/lixinda" target="_blank" style="color: #0767c8;">
					        <span class="fa-stack fa-lg">
					          <i class="fa fa-circle fa-stack-2x"></i>
					          <i class="fa fa-stack-1x fa-inverse">知</i>
					        </span>
						</a>

						<a href="https://www.douban.com/people/getschwifty" target="_blank" style="color: #00b51d;">
				            <span class="fa-stack fa-lg">
				                <i class="fa fa-circle fa-stack-2x"></i>
				                <i class="fa fa-stack-1x fa-inverse">豆</i>
				            </span>
						</a>
					</div>
				</div>
			</transition>
	</div>
</template>

<script>
import icon from '../../assets/img/icon.svg'
export default {
	name: 'About',
	data () {
		return {
			banner: '',
			isAboutShow: '',
			icon: icon
		}
	},
	mounted () {
		// 设置banner
		this.banner = require('geopattern').generate('About').toDataUrl()
		// 渐入显示归档详情
		this.isAboutShow = true
	}
}
</script>

<style scoped>
.gis-about-banner {
	width: 100%;
	height: 320px;
	box-sizing: border-box;
	top: 0;
	left: 0;
	padding: 80px 20px 25px 20px;
	text-align: center;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	position: relative;
	color: #FFFFFF;
}

.gis-about {
	margin-top: -50px;
	width: 100%;
	text-align: center;
	padding: 0 1em 30px 1em;
	box-sizing: border-box;
}

.gis-about-header {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	padding: 3px;
	background: #fff;
	box-shadow: 0 0 5px #95a5a6;
	position: relative;
	margin: 0 auto;
	transition: all 0.4s;
}

.gis-avatar{
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 50%;
}

.gis-social-icons {
	margin-top: 1.8em;
}

.gis-social-icons a {
	font-size: 0.9em;
	display: inline-block;
	margin: 0 0.4em;
}

.gis-social-icons a:hover{
	transition: opacity 0.2s;
	opacity: 0.6;
}

.gis-about-fade-down-enter-active,
.gis-about-fade-down-leave-active {
	transition: all 0.4s ease;
	transition-delay: 0.08s;
}
.gis-about-fade-down-enter,
.gis-about-fade-down-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}
</style>
