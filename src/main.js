import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Table from '@/components/Ant/table'
Vue.use(Table)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
