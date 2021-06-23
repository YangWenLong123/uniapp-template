<template>
  <view>
    <view v-if="isHide">
      <view style="position: relative">
        <view class="sunui-grand-summary" :style="'-webkit-line-clamp:'+line+';'">
          <text class="content">
            <slot>{{dt?dt:''}}</slot>
          </text>
        </view>
        <view class="sunui-grand-show-btn" @tap="isHide = false" v-if="enableButton&&lines>line">
          <text style="color: blue">{{expandText}}</text>
        </view>
      </view>
    </view>
    <view v-else="!isHide">
      <view>
        <view>
          <text class="content">
            <slot>{{dt?dt:''}}</slot>
          </text>
        </view>
        <view class="text-right" v-if="foldHint">
          <view @tap="hide" style="color: blue">
            {{foldHint}}
          </view>
        </view>
      </view>
    </view>
    <view>
      <text class="placeholder">
        {{placeholder}}
      </text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 是否隐藏多余行。初始状态不隐藏
      isHide: true,
      // 全量所占文本高度
      textHeight: 0,
      // 单行文本所占高度
      lineHeight: 1,
      // 占位文本
      placeholder: '占位'
    };
  },
  props: {
    // 展示多少行
    line: {
      type: [Number, String],
      default: 1
    },
    // 文本
    dt: {
      type: [String, Object],
      default: ''
    },
    enableButton: {
      type: Boolean,
      default: true
    },
    // 自定义展开提示
    expandText: {
      type: String,
      default: "展开"
    },
    // 自定义收起提示
    foldHint: {
      type: String,
      default: "收起"
    }
  },

  mounted() {
    let _this = this
    if (this.enableButton) {
      const query = uni.createSelectorQuery().in(this);

      // 获取所有文本在html中的高度
      query.select('.content').boundingClientRect(data => {
        _this.textHeight = data.height
      }).exec();

      // 通过占位元素获取单行文本的高度
      query.select('.placeholder').boundingClientRect(data => {
        _this.lineHeight = data.height
      }).exec();
    }
    // 获取单行文本高度后，置空占位元素，使其释放占位
    _this.placeholder = ''

  },
  computed: {
    // 全文本所占总行数
    lines() {
      if (!this.enableButton) {
        return this.line
      }
      return Math.floor(this.textHeight > 0 && this.lineHeight > 0 ? this.textHeight / this.lineHeight : 0)
    }
  },

  methods: {
    hide() {
      this.isHide = true;
    }
  }
}
</script>

<style scoped>
.sunui-grand-summary {
  overflow: hidden;
  text-overflow: clip;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.sunui-grand-show-btn {
  width: 70rpx;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;
  text-align: right;
  background-image: linear-gradient(-180deg, rgba(233, 236, 239, 0) 50%, #FFF 80%);
  padding-top: 2rem;
}

.text-right {
  text-align: right;
}
</style>
