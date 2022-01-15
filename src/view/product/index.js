import Vue from "vue";
import '../../common/index';
import List from './list.vue';

new Vue({
    // el: "#app",
    // render: h => h(List),
    components: { List },
    // components: { Product, Category },
    template: "<List></List>"
}).$mount('#app');