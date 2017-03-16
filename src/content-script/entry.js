import Vue from 'vue'
new Vue({
    el: "#seanway-temp-window",
    render (h) {
        return (<imgCrawl/>)
    },
    beforeCreate () {
        $('<div>', {
            id: "seanway-temp-window"
        }).appendTo($(document.body))
    },
    components: {
        imgCrawl: (resolve, reject) => {
            resolve(require('./views/img-crawl'))
        }
    }
})

