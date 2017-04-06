import Vue from 'vue'
import main from './views/main'
import store from './store'
new Vue({
  beforeCreate () {
    $('<div>', {
      id: "seanway-temp-window"
    }).appendTo($(document.body))
  },
  el: "#seanway-temp-window",
  render: h => h(main),
  store
})
