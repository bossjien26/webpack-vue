import Vue from "vue";
import '../../common/index';
import Index from './index.vue';

new Vue({
    // el: "#app",
    render: h => h(Index),
    // components: { Product, Category },
    // template: Product
}).$mount('#app');