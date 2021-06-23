<template>
	<view>
		<view class="lx-skeleton" v-show="loading" :class="[avatarClass,animationClass]">
			<view class="avatar-class" :style="{width:avatarSize,height:avatarSize}" :class="[avatarShapeClass,bannerClass]"></view>
			<view class="row" :style="{width:rowWidth}">
				<view v-if="title" class="row-class lx-skeleton_title"></view>
				<view v-for="(item,index) in row" :key="item" class="row-class"></view>
			</view>
		</view>
		<slot v-if="!loading"></slot>
	</view>
</template>
<script>
	/**
	 * skeleton 骨架屏
	 * @description 用于加载数据时占位图显示，跟Vant-UI用法相似，但比Vant-UI更灵活
	 * @property {Boolean} loading 是否显示骨架屏，默认为true
	 * @property {Number | String} row 段落行数，默认为3
	 * @property {Boolean | Number} rowWidth 段落行宽度，默认为100%
	 * @property {Boolean | String} title 是否显示标题，默认为false
	 * @property {Boolean | String} banner 是否显示banner，默认为false
	 * @property {Boolean | String} animate 是否开启动画，默认为false
	 * @property {Boolean | String} avatar 头像位置
	 * @property {String} avatarSize 头像大小
	 * @property {String} avatarShape 头像形状，默认为circle
	 * 
	 * */
	export default {
		props: {
			loading: {
				type: Boolean,
				default: true
			},
			row: {
				type: Number | String,
				default: 3
			},
			title: {
				type: Boolean | Number,
				default: false
			},
			avatar: {
				type: String,
				default: ''
			},
			animate: {
				type: Boolean,
				default: false
			},
			avatarSize: {
				type: String,
			},
			rowWidth: {
				type: String | Number,
				default: '100%'
			},
			avatarShape: {
				type: String,
				default: 'circle'
			},
			banner: {
				type: Boolean | String,
				default: false
			},
			// avator-size:{
			// 	type: String,
			// 	defualt: '32px'
			// }
		},
		computed: {
			avatarClass() {
				if (this.avatar == 'top') {
					return ['lx-skeleton_avator__top']
				} else if (this.avatar == 'left') {
					return ['lx-skeleton_avator__left']
				} else {
					return ''
				}
			},
			animationClass() {
				return [this.animate ? 'lx-skeleton_animation' : '']
			},
			slotClass() {
				return [!this.loading ? 'show' : 'hide']
			},
			avatarShapeClass() {
				return [this.avatarShape == 'round' ? 'lx-skeleton_avator__round' : '']
			},
			bannerClass() {
				return [this.banner ? 'lx-skeleton_banner' : '']
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.lx-skeleton {
		background-color: #fff;
		padding: 12px;
	}

	.lx-skeleton_avator__left {
		display: flex;
		width: 100%;
	}

	.avatar-class {
		
	}

	.lx-skeleton_avator__left .avatar-class,
	.lx-skeleton_avator__top .avatar-class {
		background-color: #f2f3f5;
		border-radius: 50%;
		width: 32px;
		height: 32px;
	}

	.lx-skeleton_avator__left .avatar-class.lx-skeleton_avator__round,
	.lx-skeleton_avator__top .avatar-class.lx-skeleton_avator__round {
		border-radius: 0;
		width: 32px;
		height: 32px;
	}

	.lx-skeleton_avator__left .avatar-class {
		margin-right: 16px;
	}

	.lx-skeleton_avator__top .avatar-class {
		margin: 0 auto 12px auto;

	}

	.row-class {
		width: 100%;
		height: 16px;
		background-color: #f2f3f5;
	}

	.row-class:not(:first-child) {
		margin-top: 12px;
	}

	.row {
		flex: 1;
	}

	.lx-skeleton_avator__left .row {
		width: calc(100% - 48px);
	}

	.row-class:nth-last-child(1) {
		width: 60%;
	}

	.lx-skeleton_animation .row-class {
		animation-duration: 1.5s;
		animation-name: blink;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0.6;
		}
	}

	.lx-skeleton_title {
		width: 40%;
	}

	.show {
		display: block;
	}

	.hide {
		display: none;
	}

	.lx-skeleton .lx-skeleton_banner {
		width: 92%;
		margin: 10px auto;
		height: 64px;
		border-radius: 0;
		background-color: #f2f3f5;
	}
</style>
