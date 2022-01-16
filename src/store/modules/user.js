import { reject, resolve } from "core-js/fn/promise";
import { getToken, setToken, removeToken } from "../../utils/auth";
import { authenticate, identity, getInfo } from "../../api/user";


const getDefaultState = () => {
    return {
        token: getToken(),
        name: "",
        avatar: "",
        roles: []
    };
};


const state = getDefaultState();

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState());
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    }
};


const actions = {
    async login({ commit }, userInfo) {
        const { mail, password } = userInfo;
        // await csrf();
        var response = await authenticate({ mail: mail, password: password });
        const token = response.data.token.split("|")[1];
        commit("SET_TOKEN", token);
        setToken(token);
    },
    async getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            try {
                const { data } = getInfo(state.token);

                if (!data) {
                    reject("Verification failed, please login again.");
                }

                const { roles, name, avatar } = data;

                if (!roles || roles.length < 0) {
                    reject("getInfo: roles must be a non-null array!");
                }

                commit("SET_ROLES", roles);
                commit("SET_NAME", name);
                commit("SET_AVATAR", avatar);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    }
};


export default {
    namespaced: true,
    state,
    mutations,
    actions
  };
  