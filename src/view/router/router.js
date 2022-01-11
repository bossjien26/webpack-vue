import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Headers from "../router/router.vue";

Vue.use(BootstrapVue);

export default new Vue({
    render: h => h(Headers)
}).$mount("#header");