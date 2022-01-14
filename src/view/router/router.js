import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Router from "../router/router.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(BootstrapVue);
Vue.use(ElementUI);

export default new Vue({
    render: h => h(Router)
}).$mount("#header");