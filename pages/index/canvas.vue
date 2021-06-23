<template>
	<view class="content">
		<button @click="eventDraw">绘制</button>
	</view>
</template>

<script>
import canvasdrawer from '@/components/canvas-draw/canvas-draw.vue'
let worker = null;
export default {
	components: {
		canvasdrawer
	},
	data() {
		return {
			
		}
	},
	onLoad() {
		
	},
	methods: {
		eventDraw () {
			
		}
	}
}
</script>

<style>
	.share-image {
		width: 600upx;
		height: 888upx;
		margin: 0 75upx;
		border: 1px solid black;
	}
	
	button {
		margin-top: 20upx;
	}
</style>
