import Vue from "vue";
import { identity } from "../api/user";

const identification = new Vue({
    data() {
        return {
            checkLogin: false,
            token: ""
        };
    },
    created: function () {
        this.verification();
        this.token = localStorage.getItem('user');
    },
    methods: {
        verification() {
            try {
                let response = identity(this.token);
                this.checkLogin = true;
            } catch (error) {
                console.log(error);
                localStorage.removeItem("user");
                this.token = "";
            }
        }
    }
});
var token = identification.token;
export default { token };