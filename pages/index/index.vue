<template>
	<view class="content">
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="content-refresh" :top="0" @refresh="onPulldownReresh()" @setEnableScroll="setEnableScroll">
			<scroll-view class="content-scroller" scroll-y="true" :show-scrollbar="enableScroll" @scrolltolower="loadMore">
				<view class="content-head-logo">
					<image class="content-head-image" src='/static/images/extuiIndex.png'></image>
				</view>
				<view class="content-head-text">
					uniapp学习笔记～
				</view>
				<view class="content-box" v-for="(item, index) in list" :key="index">
					<view class="content-box-list" @tap.prevent.stop='fnNavigatePage(item)'>
						<text class="content-box-text" style="font-size: 28rpx">{{item.name}}</text>
						<text class="iconfont icon-arrowRight"></text>
					</view>
				</view>
			</scroll-view>
		</mix-pulldown-refresh>
	</view>
</template>

<script>
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
	import { http } from '@/utils/index.js'
	export default {
		components:{
			mixPulldownRefresh
		},
		data() {
			return {
				enableScroll: true,
				list: [
					{ url: '/pages/index/nvue-template', name: 'nvue页面模版', navigateTo: 'navigateTo' }
				]
			}
		},
		onLoad() {
			console.log(process.env.NODE_ENV, process.env.NODE_ENV == 'development' ? '开发环境' : '生产环境');
			this.preloadPage();
			this.getRequest();
		},
		methods: {
			/* 页面跳转 */
			fnNavigatePage (row) {
				switch (row.navigateTo){
					case 'navigateTo':
						uni.navigateTo({
							url: row.url
						})
						break;
					default:
						break;
				}
			},
			
			/* 页面预加载 */
			preloadPage () {
				uni.preloadPage({
					url: '/pages/index/nvue-template'
				})
			},
			
			/* 接口请求测试 */
			getRequest () {
				// http.post('/student/User/phoneLogin', {
				// 	phone: '17521192130',
				// 	phone_verify_code: '0000'
				// }).then(res => {
				// 	http.post('/student/Message/stat', {}).then(res => {
				// 		console.log(res.data.stat,'res');
				// 	}).catch(err => {
				// 		console.log(err,'err');
				// 	})
				// })
			},

			/* 下拉刷新 */
			onPulldownReresh () {
				setTimeout(()=>{
					this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
				},400)
			},
			
			/* 页面滚动到最底部 */
			loadMore () {
				console.log('@@@@@@@@@@@页面滚动到底部@@@@@@@@@@@@@@@');
			},
			
			/* 设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动 */
			setEnableScroll (enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable;
				}
			}
		}
	}
</script>

<style lang="less">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	.content-refresh {
		flex: 1;
	}
	&-refresh {
		width: 100%;
	}
	&-scroller {
		width: 100%;
	}
	&-head-logo {
		padding: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		.content-head-image {
			width: 80px;
			height: 80px;
		}
	}
	&-head-text {
		width: 100%;
		text-align: center;
		font-size: 16px;
		color: #7A7E83;
	}
	.content-head-text {
		margin-bottom: 30rpx;
	}
	&-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30upx;
		&-list {
			width: 90%;
			padding: 15upx 40upx;
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			font-size: 15px;
			color: #333;
		}
	}
}
</style>
