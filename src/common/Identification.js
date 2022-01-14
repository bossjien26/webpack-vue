import Vue from "vue";
import axios from "axios";
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
                let response = axios.get("http://localhost:5002/api/User/identity/verification",
                    {
                        headers: {
                            'Authorization': `Basic ${this.token}`
                        }
                    });
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