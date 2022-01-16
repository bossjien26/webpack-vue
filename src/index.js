import Vue from "vue";
import Vuex from "vuex";
import "./icons"; // icon
import VueRouter from 'vue-router';
import BootstrapVue from "bootstrap-vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VModel from 'vue-js-modal'
require("babel-core/register");
require("babel-polyfill");
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store";

Vue.use(VModel)
Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.use(Vuex);

import isheader from './view/layout/header.vue'
import isfooter from './view/layout/footer.vue'
import index from './view/index'

// import './common/index';
// import '@fortawesome/fontawesome-free/css/all.css'
// import '../assets/style/icomoon.css'
const about = () => import('./view/about')
const product = () => import('./view/product')
const productDetail = () => import('./view/product/detail.js')
const login = () => import("./view/login");

Vue.use(VueRouter)
Vue.use(Vuex);

const router = new VueRouter({
    linkActiveClass: 'active',
    history: true,
    mode: 'history',
    routes: [
        { path: '/', component: index },
        { path: '/about', component: about },
        { path: '/product', component: product },
        { path: '/detail', component: productDetail },
        { path: "/login", component: login },
    ]
})
export default router

new Vue({
    el: '#app',
    router,
    components: {
        isheader,
        isfooter
    }
})