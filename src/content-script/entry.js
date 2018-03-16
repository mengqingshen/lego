import Vue from 'vue'
import main from './views/main'
import store from './store'
new Vue({
  beforeCreate () {
    $('<div>', {
      id: 'jarvis-temp-window'
    }).appendTo($(document.body))
  },
  el: '#jarvis-temp-window',
  render: h => h(main),
  store
})
