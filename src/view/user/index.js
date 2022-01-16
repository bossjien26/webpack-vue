import userVue from "./user.vue";
import store from '../../store'

export default {
    components: { userVue },
    store,
    template: "<userVue></userVue>"
}