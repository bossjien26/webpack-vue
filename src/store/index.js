import Vue from "vue";
import Vuex from "vuex";
require("babel-core/register");
require("babel-polyfill");
import getters from "./getters";
import app from "./modules/app";
// import permission from "./modules/permission";
// import settings from "./modules/settings";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    // permission,
    // settings,
    user
  },
  getters
});

export default store;