import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'qs'

Vue.use(qs)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import api from './api/install' //调用插件
Vue.use(api)

import axios from 'axios'
Vue.prototype.$ajax= axios
//Vue.prototype.axios = axios

import '@/permission'
Vue.config.productionTip = false

Vue.prototype.$message1 = function (msg) {
  this.$message({message: msg,duration:1500})
}


//创建和挂载根实例。通过 router 配置参数注入路由，从而让整个应用都有路由功能
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//render: h => h(App)表示 Vue 实例选项对象的 render 方法作为一个函数，接受传入的参数 h 函数，返回 h(App) 的函数调用结果。
//render函数是渲染一个视图，然后提供给el挂载，如果你没有加那么就等于没有视图给el挂载，就不会有任何显示。

