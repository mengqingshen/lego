/**
* 2017.04.16 by mengqingshen
*/
const routers = [
  {
    path: '/',
    meta: {
      title: 'seanway resume'
    },
    component: resolve => require(['./views/index.vue'], resolve)
  }
]
export default routers