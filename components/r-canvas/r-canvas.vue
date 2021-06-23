<template>
	<view class="r-canvas-component" :class="{'hidden':hidden}">
		<canvas v-if="canvas_id" :canvas-id="canvas_id" :id="canvas_id" :style="{width:canvas_width+'px',height:canvas_height+'px'}"></canvas>
	</view>
</template>

<script>
	import rCanvasJS from "./r-canvas.js"
	export default {
		mixins:[rCanvasJS]
	}
</script>
<style>
.r-canvas-component.hidden{
	position: fixed;
	top:-5000upx;
}
</style>
