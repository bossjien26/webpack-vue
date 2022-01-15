import Vue from "vue";
import '../../common/index';
import Detail from './detail.vue';

new Vue({
    // el: "#app",
    // render: h => h(List),
    components: { Detail },
    // components: { Product, Category },
    template: "<Detail></Detail>"
}).$mount('#app');