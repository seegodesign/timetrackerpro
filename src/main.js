import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Buefy (Bulma for Vue)
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

// Data Table
import 'handsontable/dist/handsontable.full.css'

Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
