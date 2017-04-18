#  chrome 扩展

## 1 这个扩展有啥用？
**已完成**
```
☑ 批量下载网页上的图片
☑ 网址二维码
```

**开发中**
```
☑ 页面取色器
☑ 简历生成器
```

## 2 为什么做这个扩展？
WEB 前端这个角色，少不了和浏览器打交道。就我自己来讲，离不开 chrome 来调试。因为工作需求要给运营部门开发过两个扩展，来做些自动化编辑和操作和事情，收获了蛮多乐趣。自己开发的东西给别人带来了效率（被苦恼的运营三天两头叫过去调试 BUG 的部分我是不会告诉你们的），我当然是很开心的（我猜，作为群居动物，做一些对别人很有意义的事情本身就是很吸引人的吧）。

这几年多多少少也积累了一些开发的经验，开发一些独立产品对我的诱惑变得越来越大。就想，拥有一个为自己量身打造的 chrome 扩展，听起来是一件挺酷的事情（吧）。正好那段时间正在迁移马克飞象上旧的笔记, 还就真没找到顺手的 chrome 扩展来批量下载旧笔记上的图片，就从这个功能开始吧。后面陆续注意其它的需求，于是就计划持续地开发下去（厄，谁知道呢...）。当然了,这个扩展也应该会和我后面其它的（希望吧...）一样，作为自己探索新的开发方式和新技术的试验场，😊。

## 3 简单列下技术要点...
### 构造相关
+ webpack2
+ webpack-dev-server
+ Babel
+ browser-sync
+ npm3

### 框架
+ [Vue2](http://cn.vuejs.org/)
+ [Vuex2](https://vuex.vuejs.org/)
+ [Vue-router2](https://router.vuejs.org/zh-cn/)
+ [ElementUI](http://element.eleme.io/)
+ [iView2](https://www.iviewui.com)
+ [jQuery3](https://jquery.com/)
+ [Animate.css](https://daneden.github.io/animate.css/)
+ [QRcode](https://www.npmjs.com/package/qrcode)
+ [Velocity](http://velocityjs.org/)

### 预处理
+ [SASS](http://sass-lang.com/)
+ [PostCSS](https://github.com/postcss)
+ [pug](https://pugjs.org/api/getting-started.html)

### 其它
+ [ESLint](http://eslint.cn/)

## 4 开发遇到的问题总结几个，万一有人感兴趣呢...

### 第三方库相关
- [x] vuex 中 v-model 问题。
利用计算属性的 setter(有时候一个空的 setter 也能工作，原因未知)
- [ ] chrome 插件调试过程中不能使用 vue-dev-tool 观察 store 等状态，不方便调试。
- [x] style 使用 scoped 特性是通过往相应节点插入一个没有值的属性来实现作用命名空间的，如果 css 选择器定位的是某个组件中的元素，在预编译阶段无法完成插入，则无法生效。
在 `.vue` 中使用多个 style，存在问题的 css 放在没有 scoped 的 style 中。

### 平台相关
- [ ] 下载图片时，引发迅雷插件报错（不管它？）

### 架构相关
- [x] [将 jQuery 暴露到全局，从而顺利使用 jQuery 插件](https://github.com/yiifaa/yii-template/blob/master/webpack.MD)
- [ ] 使用 `.vue` 文件无法优雅地使用 compass，可以考虑用分离的方式开发组件，即 template(pug)、style(scss)、和 js 分离，在js 中整合（并没有这样做）。

- [ ] 无法使用 webpack 的 code spliing 功能按需加在 content script，因为用 ajax 的方式无法访问到扩展中的文件。

### webpack
- [x] code spliing。
- [x] img base64。
- [x] 通过 CommonsChunkPlugin 提取第三方库到公共 js ，提升构建效率，降低整个 bundle 的体积。
- [x] 配合 Browsersync 实现多端预览效果(呵呵，其实没必要，chrome 扩展只有桌面端浏览器才有)。
- [x] 设置 devtools ，从而生成更详细的调试信息。
- [x] `.vue` 文件中的 style 使用 `lang="scss"` 报错的问题，可以通过设置 vue-loader 解决。
