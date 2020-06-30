import Vue from 'vue'
import App from './App.vue'
import store from './store'
import closestPolyfillPlugin from './plugins/closest-polyfill'

Vue.config.productionTip = false

Vue.use(closestPolyfillPlugin)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
