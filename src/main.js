import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueMask from 'v-mask';
import router from './router'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueMask);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
