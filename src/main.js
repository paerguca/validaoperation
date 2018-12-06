import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import '../node_modules/materialize-css/dist/js/materialize'

Vue.config.productionTip = false

Vue.use(VueResource)

new Vue({
  render: h => h(App),
}).$mount('#app')
