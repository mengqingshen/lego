# 初衷
离职了一段时间，准备奔下一份工作去了。原来的简历都是用 markdown 写的，现在越看越丑，准备排版下。发现选择并不多：
1. word 文档，直接 pass(不解释);
2. laTex，不会（就算会了，排版是够了，但样式不够灵活）;
3. html 文档。

毕竟自己是个前端，当然选择选项3（屁股决定脑袋？）。找了下国外质量不错的简历生成服务[uptowprk](https://uptowork.com)，然而对中简历并不友好，国内的山寨网站好一点的要收费，免费的就一个字，丑。所以就有了这个简历生成器。初步规划的功能如下：

```
☑ 支持多个简历
☑ 支持实时预览，所见即所得
☑ 支持导出 pdf、png、mhtml
☑ 支持生成在线链接
```

# 设计
## 颜色

颜色名|值
---|---
color-resume-bar|#464c5b
color-resume-bg|#f5f7f9
color-resume-border-dark|#e3e8ee
color-resume-font-dark|#464c5b
weight-resume-title|700
