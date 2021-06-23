<template>
	<view class="controller">
		<view class="container skeleton" :style="{ visibility: showSkeleton ? 'hidden' : 'visible' }">
			<view class="userinfo">
				<block>
					<!--skeleton-radius 绘制圆形-->
					<image class="userinfo-avatar skeleton-radius" :src="userInfo.avatarUrl" mode="cover"></image>
					<!--skeleton-rect 绘制矩形-->
					<text class="userinfo-nickname skeleton-rect">{{ userInfo.nickName }}</text>
				</block>
			</view>
			<view style="margin: 20px 0">
				<view v-for="(item, index) in lists" :key="index" class="lists">
					<text class="skeleton-rect">{{ item }}</text>
				</view>
			</view>
			<view class="__desc skeleton-rect">123</view>
			<view class="__desc skeleton-rect">123</view>
			<view class="__desc skeleton-rect">123</view>
		</view>
		<!--引用组件-->
		<skeleton :show="showSkeleton" :isNodes="isNodes" ref="skeleton" loading="chiaroscuro" selector="skeleton" bgcolor="#FFF" :skebgcolor="'rgb(194, 207, 214)'"></skeleton>
	</view>
</template>

<script>
import skeleton from '@/components/skeleton.vue';
export default {
	data() {
		return {
			userInfo: {
				avatarUrl: 'http://pic.wxhand.com/dev/student_image/d4305c73c610aa4f0841243c7455c76f',
				nickName: 'along'
			},
			lists:  ['第1行数据', '第2行数据', '第3行数据', '第4行数据', '第5行数据', '第6行数据'], //如果没有默认数据
			showSkeleton: true, //骨架屏显示隐藏
			isNodes: 0 //控制什么时候开始抓取元素节点,只要数值改变就重新抓取
		};
	},
	components: {
		skeleton
	},
	onLoad () {
		this.$nextTick(() => {
			this.isNodes++;
		})

		setTimeout(() => {
			this.showSkeleton = false;
		}, 5000);
	}
};
</script>

<style>
.container {
	padding: 20rpx 60rpx;
}
.userinfo {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 30rpx;
}
.userinfo-avatar {
	width: 128rpx;
	height: 128rpx;
	margin: 20rpx;
	border-radius: 50%;
}
.userinfo-nickname {
	color: #aaa;
}
.usermotto {
	margin-top: 200px;
}
.lists {
	margin: 10px 0;
}
.list {
	margin-right: 10px;
}
.__desc {
	font-size: 24rpx;
	margin-top: 10rpx;
}
</style>
