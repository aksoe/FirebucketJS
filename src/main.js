// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import VueFire from 'vuefire'

Vue.config.productionTip = false

let colorPrimary = {
  color: 'red',
  hue: 700,
  hexa: '#D32F2F'
}

let colorAccent = {
  color: 'yellow',
  hue: 600,
  hexa: '#FDD835'
}

let colorBackground = {
  color: 'grey',
  hue: 200,
  hexa: '#EEEEEE'
}

Vue.use(VueMaterial);
Vue.use(VueFire);

Vue.material.registerTheme('default', {
  primary: colorPrimary,
  accent: colorAccent,
  warn: colorPrimary,
  background: colorBackground
})

Vue.material.setCurrentTheme('default')

/* We must call all the Vue.use(<plugin>) before instanciating Vue */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
