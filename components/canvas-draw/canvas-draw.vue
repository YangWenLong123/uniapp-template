<template>
	<view class="container">
		<canvas class="my-canvas" canvas-id="shareCanvas"></canvas>
	</view>
</template>

<script>
import Painter from "mp-painter";
export default {
	props: {
		goodsInfo: {
			type: Object,
			required: true
		},
		shareFansData: {
		    type: Object,
		    default: () => {
		        return {};
		    }
		}
	},
	data () {
		return {
			cardUrl: '',
			errMsg: [],
			qrcode: '',
			hasDrawn: false
		}
	},
	methods: {
		/**
		 * cache: 商品编号 用于缓存
		 */
		generateCard () {
			this.getCard().then((url) => {
				console.log('url', url);
			})
		},
		
		async getCard() {
		    let _this = this;
		    
		    // TODO 计算边距
		    let margin_price_1= 504 - (_this.goodsInfo.price_pay+'').length/2*40;
		    let hasDiscount = +_this.goodsInfo.goods_reduction_money > 0;
		    let painter = new Painter(uni.createCanvasContext('shareCanvas', this));
		    return new Promise((resolve, reject) => {
		        // 整体背景
		        painter.draw({
		            type: "container",
		            top: 0,
		            left: 0,
		            children: [
		                {type: "rect", top: 0, width: 610, height: 970, background: "#fff"}
		            ]
		        }).then(() => {
		            Promise.all([
		                // 标题
		                painter.draw({
		                    type: "container",
		                    top: 40,
		                    left: 210,
		                    children: [
		                        {type: "image", top: 0, left: 0, width: 40, height: 40, src: "http://cdn.zsdx.cn/student-app/images/hand-logo.png"},
		                    ]
		                }),
		                painter.draw({
		                    type: "container",
		                    top: 60,
		                    left: 258,
		                    children: [
		                        { type: "text", top: 0, left: 0,fontSize: 30,baseline: "middle", content: "掌上大学" }
		                    ]
		                }),
		                // 封面价格部分
		                painter.draw({
		                    type: "container",
		                    top: 120,
		                    left: 40,
		                    children: [
		                        {type: "rect", top: 0, left:0, width: 530, height: 530, background: '#FF2A2A'},
		                        {type: "image", top: 6, left: 6, width: 518, height: 518, src: _this.goodsInfo.posters[0], objectFit: "cover", position: "absolute"},
		                        {type: "rect", top: 470, left:0, width: 530, height: 60, background: {
		                            type: "liner-gradient",
		                            x1: 0, y1: 0, x2: 530, y2: 60,
		                            colorStops: [
		                                { offset: 0, color: "#FF2A2A" },
		                                { offset: 1, color: "#FF9B36" }
		                            ]
		                        }, position: "absolute"},
		                        {type: "rect", top: 449, left: margin_price_1-104 - 70, width: 530 - (margin_price_1-104-70), height: 80, background: {
		                            type: "liner-gradient",
		                            x1: 0, y1: 0, x2: 280, y2: 80,
		                            colorStops: [
		                                { offset: 0, color: "#FF4978" },
		                                { offset: 1, color: "#FF2A2A" }
		                            ]
		                        }, borderRadius: [200, 0, 0, 0], position: "absolute"},
		                        { type: "text", top: 502, left: 16,baseline: "middle", content: "大学生专享特权",fontSize: 24,color: '#FFFFFF',position: "absolute" },
		                        { type: "text", top: 506, left: margin_price_1-104, content: _this.shareFansData.goods_type == 'new_user' ? '新人价' : "学生价",fontSize: 28,color: '#FFFFFF',baseline: "bottom",position: "absolute" },
		                        { type: "text", top: 504, left: margin_price_1-18, content: "¥",fontSize: 24,color: '#FFFFFF',baseline: "bottom",position: "absolute" }, 
		                        { type: "text", top: 510, left: margin_price_1, content: _this.goodsInfo.price_pay+'',fontSize: 40,color: '#FFFFFF',baseline: "bottom",fontWeight: "bold",position: "absolute" }
		                    ]
		                }),
		                // 商品详情文字部分
		                painter.draw({
		                    type: "container",
		                    top: 670,
		                    left: 40,
		                    children: [
		                        {
		                            type: "text-block",
		                            top: 0,
		                            left: 0,
		                            width: 346,
		                            lineClamp: 2,
		                            fontSize: 28,
		                            color: '#1D2023',
		                            content: _this.goodsInfo.title,
		                        },
		                        {
		                            type: "text-block",
		                            top: 12,
		                            left: 0,
		                            width: 346,
		                            lineClamp: 1,
		                            fontSize: 24,
		                            color: '#88909C',
		                            content: (_this.shareFansData.goods_type == 'flash_sale' &&_this.goodsInfo.sale) ? "已抢"+_this.goodsInfo.sale+"件" : '',
		                        }
		                    ]
		                }),
		                // 二维码
		                painter.draw({
		                    type: "container",
		                    top: 670,
		                    left: 434,
		                    children: [
		                        {type: "rect", top: 0, left:0, width: 136, height: 136, background: "#FFA8A8"},
		                        {type: "image", top: 8, left: 8, width: 120, height: 120, src: _this.qrcode,position: "absolute",objectFit: "contain"},
		                        { type: "text", top: 8, left: 68, content: "长按进行购买", fontSize: 16,color: '#656A6F', align:'center' },    
		                    ]
		                }),
		                // 学生价
		                painter.draw({
		                    type: "container",
		                    direction: "horizontal",
		                    top: 820,
		                    left: 40,
		                    children: [
		                        { type: "text", top: 0, left: 0, content: _this.shareFansData.goods_type == 'new_user' ? '新人价' : "学生价",fontSize: 20,color: '#F95B56',baseline: "bottom" },
		                        { type: "text", top: 0, left: 2, content: "¥",fontSize: 24,color: '#F95B56',baseline: "bottom" },
		                        { type: "text", top: 2, left: 90, content: _this.goodsInfo.price_pay+'',fontSize: 40,color: '#F95B56',baseline: "bottom", position: 'absolute' },
		                       
		                    ],
		                }),
						// 最高优惠
						painter.draw({
						    type: "container",
						    direction: "horizontal",
						    top: 854,
						    left: 40,
						    children: [
						        { type: "text", top: 0, left: 0, content: hasDiscount ? ("最高优惠: ¥"+_this.goodsInfo.goods_reduction_money+'') : '',fontSize: 20,color: '#F95B56',baseline: "bottom", position: 'absolute' },
						    ],
						}),
		                // 原价
		                painter.draw({
		                    type: "container",
		                    direction: "horizontal",
		                    top: 854,
		                    left: 40,
		                    children: [
		                        { type: "text", top: 0, left: 0, content: _this.shareFansData.goods_type == 'new_user' ? '原价 ¥'+_this.goodsInfo.price_origin : '',fontSize: 20,color: '#ccc',baseline: "center",textDecoration: "line-through" },
		                    ],
		                }),
		                // 底部文字
		                painter.draw({
		                    type: "container",
		                    direction: "horizontal",
		                    top: 942,
		                    left: 0,
		                    children: [
		                        { type: "text", top: 0, left: 305, content: "又   /   见   /   学   /   生   /   价  ·  好   /   物   /   拿   /   回   /   家",fontSize: 16,color: '#656A6F',baseline: "bottom", align:'center' },
		                    ],
		                })
		            ]).then(res => {
						// console.log('2222222222222');
		                _this.hasDrawn = true;
		                _this.getNewImage()
		                    .then(imgUrl => {
		                        _this.cardUrl = imgUrl;
		                        console.log('绘制完毕', imgUrl);
		                        _this.errMsg.push('绘制完毕: '+ imgUrl);
		                        resolve(imgUrl);
		                    })
		                    .catch(error => {
		                        console.log('绘制失败', error);
		                        _this.errMsg.push('绘制失败: '+JSON.stringify(error));
		                        reject(error);
		                    });
		            }).catch(e => {
						// console.log('33333333333333');
		                console.log(e)
		            });
		            // 防止出现卡死问题
		            setTimeout(() => {
		                if(_this.hasDrawn){
		                    return ;
		                }
						// console.log('1111111111111');
		                _this.getNewImage()
		                    .then(imgUrl => {
		                        _this.cardUrl = imgUrl;
		                        resolve(imgUrl);
		                        console.log('绘制完毕', imgUrl);
		                        _this.errMsg.push('绘制完毕: '+ imgUrl);
		                    })
		                    .catch(error => {
		                        console.log('绘制失败', error);
		                        _this.errMsg.push('绘制失败: '+JSON.stringify(error));
		                        reject(error);
		                    });
		            }, 3000);
		        });
		    });
		},
		
		getNewImage() {
		    return new Promise((resolve, reject) => {
		        uni.canvasToTempFilePath( {
					canvasId: 'shareCanvas',
					quality: 0.01,
					success: res => {
						resolve(res.tempFilePath);
					},
					fail: error => {
						reject(error);
					}
				},this);
		    });
		}
	}
}
</script>

<style lang="scss" scoped>
.my-canvas {
    position: absolute;
    top: -9999rpx;
    left: 0;
    width: 610rpx;
    height: 970rpx;
    z-index: -999;
    opacity: 0;
}
</style>
