import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(VModel)
Vue.use(BootstrapVue);
Vue.use(ElementUI);

import '../view/router/router';
import '../view/layout/footer';
import VModel from 'vue-js-modal'
require("babel-core/register");
require("babel-polyfill");
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";