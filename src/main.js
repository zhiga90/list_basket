import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import dummyJSON from './plugins/axios'

Vue.config.productionTip = false
Vue.prototype.$api = dummyJSON

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
