import Vue from "vue";
import '../../common/index';
import List from './list.vue';


Vue.use(VModel)
Vue.use(BootstrapVue);

new Vue({
    // el: "#app",
    // render: h => h(List),
    components: { List },
    // components: { Product, Category },
    template: "<List></List>"
}).$mount('#app');