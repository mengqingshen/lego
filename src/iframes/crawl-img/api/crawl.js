import * as VARIABLES from '../store/variables'

/**
 * 一个简单的爬虫
 */
class Crawler {
    /**
     * 获取页面中的图片的 URL
     * 
     * @param{string} CSSSelector css 选择器
     * @returns{array} 找到的所有图片的 URL 组成的数组
     */
    getImgUrlsByCSSSelector (cssSelector) {
        const imgDoms = $(cssSelector + ':not(#seanway-crawl-window img)')
        if(imgDoms) {
            return Array.from(imgDoms).map(function(img) {
                return [
                    img.src,
                    {
                        w: img.naturalWidth,
                        h: img.naturalHeight,
                        checked: true,
                        downloaded: false,
                        longdesc: img.getAttribute('longdesc') || null
                    }
                ]
            })
        }
        return []
    }

    /**
     * 批量下载图片到本地
     * 
     * @param{array} imgSrcs 需要下载的图片信息
     */

    downloadImgBySrc(checkedImgs) {
        const a = document.createElement('a')
        a.setAttribute('download', '')
        
        let count = 0

        return new Promise((resolve, reject) => {
            a.onclick = () => {
                if (count === checkedImgs.length) {
                    resolve()
                    return
                }
                setTimeout(() => {
                    download(count++)
                }, 100)
            }
            function download(count) {
                let uri = checkedImgs[count].uri
                const match = uri.match(/(https?)/)
                if (match && match.length === 2) {
                    uri = match[1] + uri.split(match[1]).pop()
                }
                a.setAttribute('href', uri)
                a.setAttribute('download', checkedImgs[count].picName)
                const evObj  = document.createEvent('MouseEvents')
                evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null)        
                a.dispatchEvent(evObj)
            }
            download(count++)
        })
    }
}

export const crawler = new Crawler()
export default {
    /**
     * 获取所有网站推荐的 css 选择器
     * 
     * @returns {Array} 所有网站推荐的 css 选择器
     */
    getSelectorsRecommanded () {
        return VARIABLES._selectorsRecommanded
    },

    /**
     * 获取所有收藏的 css 选择器
     */
    getSelectorsCollected () {
        let selectorCollected
        const temp = localStorage.getItem(VARIABLES.SELECTORS_COLLECTED)
        if(!temp) {
            return null
        }

        try {
            selectorCollected = JSON.parse(temp)
        } catch (err) {
            console.error(err)
        }
        return selectorCollected
    },

    /**
     * 持久化收藏的 css 选择器数据
     * 
     * @param {Array} selectorCollected 收藏的 css 选择器数据
     */
    saveSelectorsCollected (selectorsCollected) {
        localStorage.setItem(VARIABLES.SELECTORS_COLLECTED, JSON.stringify(selectorsCollected))
    },

    /**
     * 获取使用过的 css 选择器数据
     * 
     * @returns{Array}
     */
    getSelectorsHistory () {
        let selectorsHistory
        const temp = localStorage.getItem(VARIABLES.SELECTORS_HISTORY)
        if(!temp){
            return null
        }
        try {
            selectorsHistory = JSON.parse(temp)
        }
        catch (err) {
            console.error(err)
        }
        return selectorsHistory
    },

    /**
     * 持久化 css 选择器历史数据
     * 
     * @param{Array} selectorsHistory
     */
    saveSelectorsHistory (selectorsHistory) {
        localStorage.setItem(VARIABLES.SELECTORS_HISTORY, JSON.stringify(selectorsHistory))
    }
}