<template>
	<view class="container">
		<view class="__header" :style="{height: statusBarHeight + 44 + 'px', paddingTop: statusBarHeight + 'px'}">
			<text class="zsdxfont zsdxzuojiantou1" @click="fnNavigateBack()"></text>
			<text class="__title">页面模版</text>
		</view>
		2
	</view>
</template>
 
<script>
import { mapState } from 'vuex';
export default {
	components: {
	},
	data() {
		return {
			statusBarHeight: 0
		};
	},
	filter: {
	},
	computed: {
		...mapState({
			userInfo: state => state.userinfo.userInfo,
			hasLogin: state => state.hasLogin
		})
	},
	watch: {
	},
	// life cycle start
	onShow() {
		this.init()
	},
	onLoad(options) {},
	// life cycle end
	methods: {
		init(){
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
		},
		
		// 返回上一页
		fnNavigateBack(){
			uni.navigateBack()
		},
	},

};
</script>
 
<style lang="scss" scoped>
.container{
	width:100%;
	height:100%;
	background-color: #FFFFFF;
	display: flex;
	flex-direction: column;
	.__header{
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		.zsdxzuojiantou1{
			color: rgba(51, 51, 51, 1);
			font-size: 32rpx;
			font-size: 32rpx;
			font-weight: 500;
			margin-left: 30rpx;
		}
		.__title{
			color: rgba(51, 51, 51, 1);
			font-size: 32rpx;
			font-weight: 500rpx;
			margin-left: 250rpx;
			letter-spacing: 0;
		}
	}
}
</style> 