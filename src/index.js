import Vue from "vue";
import Vuex from "vuex";
import "./icons"; // icon
import VueRouter from 'vue-router';
import BootstrapVue from "bootstrap-vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VModel from 'vue-js-modal'
import Dayjs from 'vue-dayjs';
require("babel-core/register");
require("babel-polyfill");
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VModel)
Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(Dayjs);

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
const user = () => import("./view/user");
const cart = () => import("./view/cart");
const checkout = () => import("./view/checkout");
const order = () => import("./view/order");
const orderDetail = () => import("./view/order/orderDetail.js");

Vue.use(VueRouter)
Vue.use(Vuex);

const router = new VueRouter({
    linkActiveClass: 'active',
    history: true,
    mode: 'history',
    routes: [
        { path: '/', component: index, meta: { title: "Store", icon: "dashboard" } },
        { path: '/about', component: about, meta: { title: "about", icon: "dashboard" } },
        { path: '/product', component: product, meta: { title: "product", icon: "dashboard" } },
        { path: '/detail', component: productDetail, meta: { title: "productDetail", icon: "dashboard" } },
        { path: "/login", component: login, meta: { title: "Login", icon: "dashboard" } },
        { path: "/user", component: user, meta: { title: "Member", icon: "dashboard" } },
        { path: "/cart", component: cart, meta: { title: "Cart", icon: "dashboard" } },
        { path: "/checkout", component: checkout, meta: { title: "Checkout", icon: "dashboard" } },
        { path: "/order", component: order, meta: { title: "Order", icon: "dashboard" } },
        { path: "/orderDetail", component: orderDetail, meta: { title: "OrderDetail", icon: "dashboard" } },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
})

export default router
import store from "./store";

new Vue({
    el: '#app',
    router,
    store,
    components: {
        isheader,
        isfooter
    }
})