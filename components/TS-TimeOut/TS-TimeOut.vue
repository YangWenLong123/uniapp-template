<template>
	<view>
		<text :style="{color: TimeColor,fonsSize: TimeSize + 'rpx'}">{{content}}</text>
	</view>
</template>

<script>
	/**
	 * @ComponentsDescription: 该组件是一个介于电商平台秒杀活动倒计时组件
	 * @Author: 田松
	 * @Date: 2020-12-05
	 * 组件说明
	 * @endTime：倒计时结束时间
	 * @listenState：当倒计时结束时的触发时间callback
	 * @TimeColor:倒计时颜色
	 * @TimeSize：倒计时字体大小
	 * @TimeContent：倒计时完成结束语
	 **/
	export default {
		props: {
			endTime: {
				type: String,
				default: ''
			},
			TimeColor: {
				type: String,
				default: '#333333'
			},
			TimeSize: {
				type: String,
				default: '28'
			},
			TimeContent: {
				type: String,
				default: '活动已结束'
			},
		},
		data() {
			return {
				hou: '',//时
				min: '',//分
				sec: '',//秒
				ssec: '',//毫秒
				content: '',//倒计时完成结束语
			};
		},
		created() {
			this.time(this.endTime)
		},
		methods: {
			time(timestamp) {
				let _this = this;
				let interval = setInterval(function timestampToTime() {
					let str = timestamp;
					let closeTime = new Date(str).getTime();
					let data = (new Date(closeTime)) - (new Date());
					if (data > 0) {
						let time = data / 1000;
						// 获取时、分、秒、毫秒
						_this.hou = parseInt((time % (60 * 60 * 24)) / 3600) < 10 ? ('0' + parseInt((time % (60 * 60 * 24)) / 3600)) :
							parseInt((time % (60 * 60 * 24)) / 3600);
						_this.min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60) < 10 ? ('0' + parseInt((time % (60 * 60 * 24) %
							3600) / 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
						_this.sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60) < 10 ? ('0' + parseInt(((time % (60 * 60 * 24)) %
							3600) % 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
						_this.ssec = parseInt(((data % (60 * 60 * 24)) % 3600) / 60) % 10;
						_this.content = _this.hou + ':' + _this.min + ':' + _this.sec + ':' + _this.ssec
						// console.log(_this.hou + ':' + _this.min + ':' + _this.sec + ':' + _this.ssec, 'wafawfawf')
						// console.log('sdjs')
					} else {
						// 自定义活动结束语
						_this.content = _this.TimeContent
						// 当活动结束，触发一个回调函数callback
						// _this.$emit('listenState')
						clearInterval(interval)
						console.log(2)
					}
				}, 100)
			},
		}
	}
</script>

<style lang="scss">

</style>
