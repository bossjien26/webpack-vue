import Vue from "vue";
import '../../common/index';
import About from './about.vue'

new Vue({
    router,
    // template: "<router-view></router-view>",
    render: h => h(About),
}).$mount('#app')