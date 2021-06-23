# skeleton组件

### 1.描述
> 此组件用于加载数据时占位图显示，跟vant-ui骨架屏用法相似，但比vant-ui更灵活



### 2.用法

- 基本用法

代码：
```vue
//基本用法
<skeleton :row="3" animate :loading="loading" >
  <view>
    content
  </view>
</skeleton>
```


- **显示 title ——通过 **title 属性显示title占位图

代码：
```vue
//显示 title——通过 title 属性显示title占位图
<skeleton :row="3" title animate :loading="loading">
  <view>
    content
  </view>
</skeleton>
```


- 显示头像（上面)——通过avatar=‘top’让头像的占位图上面显示

代码：
```vue
<skeleton  :avatar="top"  avatarAlign="left" :row="3" animate :loading="loading" style="margin-top:24rpx;">
  <view>
    content
  </view>
</skeleton>
```


- 显示头像（左边)——通过avatar=‘left’让头像的占位图左边显示

代码：
```vue
<skeleton title :avatar="left" :row="3" animate :loading="loading" style="margin-top:24rpx;">
  <view>
    content
  </view>
</skeleton>
```


- 显示banner**——通过 **banner属性显示banner占位图（只显示banner，不显示内容占位图时设置row="0"）

代码：
```vue
<skeleton banner :row="0" animate :loading="loading" style="margin-top:24rpx;">
  <view>
    content
  </view>
</skeleton>
```
### 
### 3. API
### Props
| **属性名** | **说明** | **类型** | **默认值** | 可取值 |
| --- | --- | --- | --- | --- |
| loading | 是否显示骨架屏 | Boolean | true | true/false |
| row | 段落行数 | Number | String | 3 | 0表示不展现 |
| rowWidth | 段落行宽度 | Boolean &#124; Number | '100%' |  |
| title | 是否显示标题 | Boolean &#124; String | false |  |
| banner | 是否显示banner | Boolean &#124; String | false |  |
| animate | 是否开启动画 | Boolean &#124; String | false |  |
| avatar | 头像位置 | Boolean &#124; String | ''空 | left/top |
| avatarSize | 头像大小 | String | - |  |
| avatarShape | 头像形状 | String | circle | circle/round |

