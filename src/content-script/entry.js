import Vue from 'vue'
import main from './views/main'
import store from './store'
new Vue({
  beforeCreate () {
    $('<div>', {
      id: 'lego-temp-window'
    }).appendTo($(document.body))
  },
  el: '#lego-temp-window',
  render: h => h(main),
  store
})
