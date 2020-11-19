<script>
	import { http } from '@/utils/index.js'
	export default {
		globalData: {
			http: http
		},
		data () {
			return {
			}
		},
		onLaunch: function (){
			//监听消息推送
			plus.push.addEventListener( 'click', (msg)=>{
				uni.showToast({
					title: JSON.stringify(msg.content),
					icon: 'none',
					duration: 3000
				})
			} , true );
		},
		onShow() {
		},
		onHide() {
		},
		methods: {
		}
	}
</script>

<!-- 全局样式，作用与每一个组件 -->
<style>
	/* @import "/common/css/uni.css"; */
	/* @import "/common/css/animate.css"; */
	@import "/common/css/icon.css";
	/* @import "/common/css/common.css"; */
</style>
