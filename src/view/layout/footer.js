import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Footer from "./footer.vue";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(BootstrapVue);


export default new Vue({
    render: h => h(Footer)
}).$mount("#footer");