import Vue from "vue";
import '../router/router.js';
import VModel from 'vue-js-modal'
import BootstrapVue from "bootstrap-vue";
import Index from './index.vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VModel)
Vue.use(BootstrapVue);

new Vue({
    render: h => h(Index),
}).$mount('#app');