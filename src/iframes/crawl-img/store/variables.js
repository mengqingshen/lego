// 模拟些假数据
(function () {
  const historySelectors = [
    {
      hostname: 'app.yinxiang.com',
      cssSelector: '#en-common-editor-iframe img.en-media'
    },
    {
      hostname: 'laputa-er.github.io',
      cssSelector: '.post-body .fancybox>img'
    },
    {
      hostname: 'www.baidu.com',
      cssSelector: 'img'
    }
  ].map(item => {
    return JSON.stringify(item)
  })

  localStorage.setItem('SELECTORS_HISTORY', JSON.stringify(historySelectors))

  const collectionSelectors = [
    ['laputa-er.github.io', ['.post-body .fancybox>img']]
  ]
  localStorage.setItem('SELECTORS_COLLECTED', JSON.stringify(collectionSelectors))
})()

// 推荐的爬取选择器
// -----------------------------
// -----------------------------
export const _selectorsRecommanded = [
  [
    'app.yinxiang.com', ['#en-common-editor-iframe img.en-media'],
  ],
  [
    'laputa-er.github.io', ['.post-body .fancybox>img']
  ]
]

// ---------------------------------
// localStorage 中收藏的选择器数据的键名
// ---------------------------------
export const SELECTORS_COLLECTED = 'SELECTORS_COLLECTED'

// ---------------------------------
// localStorage 中用过的选择器数据的键名
// ---------------------------------
export const SELECTORS_HISTORY = 'SELECTORS_HISTORY'
