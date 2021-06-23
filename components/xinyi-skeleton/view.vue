<template>
	<view>
		<nav-bar title="骨架屏"></nav-bar>
		<view class="content">
			基础用法
			<skeleton :row="3" animate :loading="loading">
				<view>
					content1
				</view>
			</skeleton>
			显示 title
			<skeleton :row="3" title animate :loading="loading">
				<view>
					content2
				</view>
			</skeleton>
			显示头像（上面)
			<skeleton :avatar="avatarTop" :row="3" animate :loading="loading" style="margin-top:24rpx;">
				<view>
					content3
				</view>
			</skeleton>
			显示头像（左面）
			<skeleton title :avatar="avatarLeft" :row="3" animate :loading="loading" style="margin-top:24rpx;">
				<view>
					content4
				</view>
			</skeleton>
			显示banner
			<skeleton banner :row="0" animate :loading="loading" style="margin-top:24rpx;">
				<view>
					content5
				</view>
			</skeleton>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true, // 是否显示骨架屏组件
				avatarTop: 'top',
				avatarLeft: 'left',
			}
		},
		onLoad() {
			// 通过延时模拟向后端请求数据，调隐藏骨架屏
			setTimeout(() => {
				this.loading = false;
			}, 3000)
		}
	}
</script>