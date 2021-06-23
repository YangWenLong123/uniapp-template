# gmy-img-cropper
## 安装
1. NPM安装： 
``` js
npm i  gmy-img-cropper
```
2. 通过插件市场下载安装
   
##　使用帮助

#### 引入组件：
``` js
// npm 方式安装
import gmyList from "gmy-img-cropper/gmy-img-cropper.vue"

// 应用市场下载方式，如果配置了easycom规则则无需引入
import gmyList from "../../components/gmy-img-cropper/gmy-img-cropper.vue"
```
#### 页面使用：
``` html
<gmy-img-cropper ref="gmyImgCropper" @getImg = "getImg"></gmy-img-cropper>
```
#### 参数说明
|参数名|类型|默认值|说明|
|--|--|--|--|
|quality|String/NUmber|1|图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理|
|imgSrc|String||直接传入图片路径，从而跳过选择图片步骤，需要特别注意：H5端 Canvas 内绘制的图像需要支持跨域访问才能成功。|
|fileType|String|png|目标文件的类型，只支持 'jpg' 或 'png'。默认为 'png'|
|cropperType|String|free|裁剪类型，自由裁剪:free;固定比例裁剪（正方形）:fixed|

#### 事件说明
- getImg : 点击完成时触发，回调参数为裁剪图片的临时路径
#### 实例方法
- chooseImage ： 选择图片，通过`this.$refs.gmyImgCropper.chooseImage();`形式调用
> 注意：在一版本中该方法名为`getImage()`,本版本修改为`chooseImage`,实现更好的语义化，更易于理解。

## 使用说明
* 本组件没有设置例如上传文件的可视化组件，因此需要将实例方法绑定到按钮或者其它表单组件上，通过`this.$refs.gmyImgCropper.chooseImage();`调用选择图片接口，从而全屏显示图片裁剪界面。
  
* 该组件会占据整个屏幕，如果在页面中同时使用了其它组件，尤其时第三方组件库可能导致本组件层级被覆盖，无法置顶显示，则是可自行调整组件的`z-index`层级，实现置顶显示

## 完整案列
```js
<template>
	<view>
		<view >
			<button type="warn" @click="chooseImg" >选择图片</button>
		</view>
		<my-img-cropper
			ref="gmyImgCropper"
			quality="0.5"
			cropperType="free"
			fileType="jpg"
			imgSrc=""
			@getImg="getImg"
		></my-img-cropper>
  	</view>
</template>

<script>
	import gmyImgCropper from '@/components/gmy-img-cropper/gmy-img-cropper.vue'
	export default {
		components:{
			gmyImgCropper
		},
		data() {
			return {

			}
		},
		methods: {
			chooseImg:function(){
				// 调用实例的chooseImg方法，拉起图片选择界面，待图片选择完毕后直接进入图片截取界面
				this.$refs.gmyImgCropper.chooseImage();
			},

			// 点击完成时，返回截取图片的临时路径
			getImg:function(e){
				console.log("父页面拿到了图片",e);
				this.imgCropperShow = false;
			},
		}
	}
</script>

<style lang="scss">
</style>
```
