import { pathToBase64, base64ToPath} from './image-tools/index.js'  //Third party plug-in
export default{
	data(){
		return{
			system_info:{}, //system info
			canvas_width:0, //canvas width px
			canvas_height:0, //canvas height px
			ctx:null, //canvas object
			canvas_id:null, //canvas id
			hidden:false//Whether to hide canvas
		}
	},
	methods:{
		/**
		 * save r-canvas.vue object
		 * @param {Object} that
		 */
		// saveThis(that){
		// 	rCanvasThis = that
		// },
		/**
		 * Draw round rect text
		 * @param {Object} config
		 * @param {Number} config.x x坐标
		 * @param {Number} config.y y坐标
		 * @param {Number} config.w 宽度
		 * @param {Number} config.h 高度
		 * @param {Number} config.radius 圆角弧度
		 * @param {String} config.fill_color 矩形颜色
		 */
		fillRoundRect(config) {
			return new Promise((resolve,reject)=>{
				let x = this.compatibilitySize(config.x)
				let y = this.compatibilitySize(config.y)
				let w = this.compatibilitySize(config.w)
				let h = this.compatibilitySize(config.h)
				let radius = config.radius || 10
				
				let fill_color = config.fill_color || "black"
				// The diameter of the circle must be less than the width and height of the rectangle
				if (2 * radius > w || 2 * radius > h) { 
					reject("The diameter of the circle must be less than the width and height of the rectangle")
					return false; 
				}
				this.ctx.save();
				this.ctx.translate(x, y);
				//  
				this.drawRoundRectPath({
					w: w, 
					h: h, 
					radius: radius
				});
				this.ctx.fillStyle = fill_color
				this.ctx.fill();
				this.ctx.restore();
				resolve()
			})
		},
		/**
		 * Draws the sides of a rounded rectangle
		 * @param {Object} config
		 * @param {Number} config.w 宽度
		 * @param {Number} config.h 高度
		 * @param {Number} config.radius 圆角弧度
		 */
		drawRoundRectPath(config) {
			this.ctx.beginPath(0);
			this.ctx.arc(config.w - config.radius, config.h - config.radius, config.radius, 0, Math.PI / 2);
			this.ctx.lineTo(config.radius, config.h);
			this.ctx.arc(config.radius, config.h - config.radius, config.radius, Math.PI / 2, Math.PI);
			this.ctx.lineTo(0, config.radius);
			this.ctx.arc(config.radius, config.radius, config.radius, Math.PI, Math.PI * 3 / 2);
			this.ctx.lineTo(config.w - config.radius, 0);
			this.ctx.arc(config.w - config.radius, config.radius, config.radius, Math.PI * 3 / 2, Math.PI * 2);
			this.ctx.lineTo(config.w, config.h - config.radius);
			this.ctx.closePath();
		},
		/**
		 * Draw special Text,line wrapping is not supported
		 * @param {Object} config
		 * @param {String} config.text 文字
		 * @param {Number} config.x x坐标
		 * @param {Number} config.y y坐标
		 * @param {String} config.font_color 文字颜色
		 * @param {String} config.font_family 文字字体
		 * @param {Number} config.font_size 文字大小（px）
		 */
		drawSpecialText(config_arr){
			return new Promise(async (resolve,reject)=>{
				if(config_arr && config_arr.length>0){
					for(let i in config_arr){
						if(i == 0){
							this.drawText(config_arr[i])
						}else{
							
							for(let a in config_arr){
								if(a < i){
									// 先处理font-size才能知道字体宽度
									let font_size = config_arr[a].font_size || 20
									this.ctx.setFontSize(this.compatibilitySize(font_size))
									config_arr[i].x = config_arr[i].x + this.ctx.measureText(config_arr[a].text).width
								}else{
									break;
								}
							}
							await this.drawText(config_arr[i])
						}
					}
					resolve()
				}else{
					reject("The length of config arr is less than 0")
					return;
				}
				
			})
		},
		/**
		 * Draw Text,support line
		 * @param {Object} config
		 * @param {String} config.text 文字
		 * @param {Number} config.max_width 文字最大宽度（大于宽度自动换行）
		 * @param {Number} config.line_height 文字上下行间距
		 * @param {Number} config.x x坐标
		 * @param {Number} config.y y坐标
		 * @param {String} config.font_color 文字颜色
		 * @param {String} config.font_family 文字字体 默认值：Arial
		 * @param {String} config.text_align 文字对齐方式（left/center/right）
		 * @param {Number} config.font_size 文字大小（px）
		 * @param {Boolean} config.line_through_height 中划线大小
		 * @param {Boolean} config.line_through_color 中划线颜色
		 * @param {String} config.font_style 规定文字样式
		 * @param {String} config.font_variant 规定字体变体
		 * @param {String} config.font_weight 规定字体粗细
		 * @param {String} config.line_through_cap 线末端类型
		 * @param {String} config.line_clamp 最大行数
		 * @param {String} config.line_clamp_hint 超过line_clamp后，尾部显示的自定义标识 如 ...
		 * 
		 */
		drawText(config){
			return new Promise(async (resolve,reject)=>{
				if(config.text){
					let font_size = config.font_size || 20
					let font_color = config.font_color || "#000"
					let font_family = config.font_family || "Arial"
					let line_height = config.line_height || 20
					let text_align = config.text_align || "left"
					let font_weight = config.font_weight || "normal"
					let font_variant = config.font_variant || "normal"
					let font_style = config.font_style || "normal"
					let line_clamp_hint = config.line_clamp_hint || '...'
					this.ctx.setFontSize(this.compatibilitySize(font_size)) // font size
					this.ctx.setFillStyle(font_color) // color
					this.ctx.textAlign = text_align;
					this.ctx.font= `${font_style} ${font_variant} ${font_weight} ${parseInt(this.compatibilitySize(font_size))}px ${font_family}`
					if( config.max_width && this.compatibilitySize(this.ctx.measureText(config.text).width) > this.compatibilitySize(config.max_width)){
						let current_text = ""
						let text_arr = config.text.split("")
						for(let i in text_arr){
							if( this.compatibilitySize(this.ctx.measureText(current_text+text_arr[i]).width) > this.compatibilitySize(config.max_width) ){
								// Hyphenation that is greater than the drawable width continues to draw
								if(config.line_clamp && parseInt(config.line_clamp) == 1){
									this.ctx.fillText(current_text + line_clamp_hint, this.compatibilitySize(config.x), this.compatibilitySize(config.y));
								}else{
									this.ctx.fillText(current_text, this.compatibilitySize(config.x), this.compatibilitySize(config.y));
									config.text = text_arr.slice(i).join("")
									config.y = config.y + line_height
									if(config.line_clamp){
										config.line_clamp = parseInt(config.line_clamp) - 1
									}
									await this.drawText(config)
									
								}
								break;
							}else{
								current_text = current_text+text_arr[i]
							}
						}
					}else{
						if(config.line_through_height){
							let x = config.x
							let w
							let y = config.y - (font_size / 2.6) 
							if(text_align == "left"){
								w = this.ctx.measureText(config.text).width/1.1 + config.x
							}else if(text_align == "right"){
								w = config.x - this.ctx.measureText(config.text).width/1.1
							}else if(text_align == "center"){
								x = config.x - this.ctx.measureText(config.text).width / 1.1 / 2
								w = config.x + this.ctx.measureText(config.text).width / 1.1 / 2
							}
							this.drawLineTo({
								x:x,
								y:y,
								w:w,
								h:y,
								line_width:config.line_through_height,
								line_color:config.line_through_color,
								line_cap:config.line_through_cap
							})
						} 
						this.ctx.fillText(config.text, this.compatibilitySize(config.x), this.compatibilitySize(config.y));
					}
					resolve()
				}else{
					// uni.showToast({
					// 	title:"Text cannot be empty:101",
					// 	icon:"none"
					// })
					reject("Text cannot be empty:101")
				}
			})
		},
		/**
		 * Draw Line
		 * @param {Object} config
		 * @param {Object} config.x x坐标
		 * @param {Object} config.y y坐标
		 * @param {Object} config.w 线的宽度
		 * @param {Object} config.h 线的高度
		 * @param {Object} config.line_width 线的宽度
		 * @param {Object} config.line_color 线条颜色
		 */
		drawLineTo(config){
			let x = this.compatibilitySize(config.x)
			let y = this.compatibilitySize(config.y)
			let w = this.compatibilitySize(config.w)
			let h = this.compatibilitySize(config.h)
			let line_width = config.line_width || 1
			let line_color = config.line_color || "black"
			let line_cap = config.line_cap || "butt"
			this.ctx.beginPath()
			this.ctx.lineCap = line_cap
			this.ctx.lineWidth = line_width
			this.ctx.strokeStyle = line_color
			this.ctx.moveTo(x,y)
			this.ctx.lineTo(w,h)
			this.ctx.stroke()
		},
		/** 
		 * Compatibility px
		 * @param {Object} size
		 */
		compatibilitySize(size) {
		  let canvasSize = (size / 750) * this.system_info.screenWidth
		  canvasSize = parseFloat(canvasSize * 2)
		  return canvasSize
		},
		/**
		 * Init canvas
		 */
		init(config){
			return new Promise(async (resolve,reject)=>{
				if(!config.canvas_id){
					reject("Canvas ID cannot be empty, please refer to the usage example")
					return;
				}
				this.hidden = config.hidden
				this.canvas_id = config.canvas_id
				let system_info = await uni.getSystemInfoSync()
				this.system_info = system_info
				this.canvas_width = this.compatibilitySize(config.canvas_width?config.canvas_width:system_info.windowWidth)
				this.canvas_height = this.compatibilitySize(config.canvas_height?config.canvas_height:system_info.windowHeight)
				this.ctx = uni.createCanvasContext(this.canvas_id,this)
				this.setCanvasConfig({
					backgroundColor:config.background_color?config.background_color:"#fff"
				})
				resolve()
			})
		},
		/**
		 * Set canvas config
		 * @param {Object} config
		 */
		setCanvasConfig(config){
			this.ctx.fillStyle = config.backgroundColor
			this.ctx.fillRect(0, 0, this.canvas_width, this.canvas_height)
		},
		/**
		 * Draw to filepath
		 */
		draw(callback){
			return new Promise((resolve,reject)=>{
				let stop = setTimeout(()=>{
					this.ctx.draw(false,setTimeout(()=>{
					    uni.canvasToTempFilePath({
					    	canvasId: this.canvas_id,
					    	quality: 1,
					    	success: (res)=>{
					    		// res.tempFilePath
					    		console.log('res',res)
					    		resolve()
					    		callback(res)
					    	},
					    	fail:(err)=>{
					    		reject(JSON.stringify(err)|| "Failed to generate poster:101")
					    	}
					    },this)
					},300))
					clearTimeout(stop)
				},300)
			})
		},
		/**
		 * draw rect
		 * @param {Number} config.x x坐标
		 * @param {Number} config.y y坐标
		 * @param {Number} config.w 图形宽度(px)
		 * @param {Number} config.h 图形高度(px)
		 * @param {Number} config.color 图形颜色
		 */
		drawRect(config){
			return new Promise(async (resolve,reject)=>{
				let color = config.color || "white"
				this.ctx.fillStyle = color;
				this.ctx.fillRect(this.compatibilitySize(config.x),this.compatibilitySize(config.y),this.compatibilitySize(config.w),this.compatibilitySize(config.h))
				resolve()
			})
		},
		/**
		 * Draw image
		 * @param {Object} config
		 * @param {String} config.url 图片链接
		 * @param {Number} config.x x坐标
		 * @param {Number} config.y y坐标
		 * @param {Number} config.w 图片宽度(px)
		 * @param {Number} config.h 图片高度(px)
		 * @param {Number} config.border_width 边大小
		 * @param {Number} config.border_color 边颜色
		 */
		drawImage(config){
			return new Promise(async (resolve,reject)=>{
				if(config.url){
					let type = 0 // 1、network image  2、native image  3、base64 image
					let image_url
					let reg = /^https?/ig;
					if(reg.test(config.url)){
						type = 1
					}else{
						if(config.url.indexOf("data:image/png;base64") != -1){
							type = 3
						}else{
							type = 2
						}
					}
					if(type == 1){
						// image_url = await pathToBase64(config.url) // one function
						await this.downLoadNetworkFile(config.url).then(res=>{ // two function
							image_url = res
						}).catch(err=>{
							reject(err)
							return;
						})
					}else if(type == 2){
						const imageInfoResult = await uni.getImageInfo({
							src: config.url
						});
						let base64 = await pathToBase64(imageInfoResult[1].path);
						image_url = await base64ToPath(base64)
					}else if(type == 3){
						image_url = await base64ToPath(config.url)
					}else{
						reject("Other Type Errors:101")
						return
					}
					
					if(config.border_width){
						// drawRect
						await this.drawRect({
							x:parseFloat(config.x) - parseFloat(config.border_width/2),
							y:parseFloat(config.y) - parseFloat(config.border_width/2),
							w:parseFloat(config.w) + parseFloat(config.border_width),
							h:parseFloat(config.h) + parseFloat(config.border_width),
							color:config.border_color
						})
					}
					
					await this.ctx.drawImage(image_url,this.compatibilitySize(config.x),this.compatibilitySize(config.y),this.compatibilitySize(config.w),this.compatibilitySize(config.h))
					resolve()
				}else{
					let err_msg = "Links cannot be empty:101"
					reject(err_msg)
				}
			})
		},
		/**
		 * Download network file
		 * @param {Object} url : download url
		 */
		downLoadNetworkFile(url){
			return new Promise((resolve,reject)=>{
				uni.downloadFile({
					url,
					success:(res)=>{
						if(res.statusCode == 200){
							resolve(res.tempFilePath)
						}else{
							reject("Download Image Fail:102")
						}
					},
					fail:(err)=>{
						reject("Download Image Fail:101")
					}
				})
			})
		},
		/**
		 * Save image to natice
		 * @param {Object} filePath ： native imageUrl
		 */
		saveImage(filePath){
			if(!filepath){
				uni.showToast({
					title:"FilePath cannot be null！",
					icon:"none"
				})
				return;
			}
			uni.saveImageToPhotosAlbum({
				filePath: filepath,
				success:(res)=>{
					uni.showToast({
					  title: 'save success',
					  icon: 'none'
					})
				}, 
				fail:(err)=>{
					uni.showToast({
					  title: 'save fail',
					  icon: 'none'
					})
				}
			})
		}
	}
}
