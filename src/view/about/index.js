import Vue from "vue";
import router from '../router/router.js';
import VModel from 'vue-js-modal'
import BootstrapVue from "bootstrap-vue";
import About from './about.vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VModel)
Vue.use(BootstrapVue);

new Vue({
    router,
    template: "<router-view></router-view>",
    render: h => h(About),
}).$mount('#app')