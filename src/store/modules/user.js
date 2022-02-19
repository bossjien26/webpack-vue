import { reject, resolve } from "core-js/fn/promise";
import { getToken, setToken, removeToken } from "../../utils/auth";
import { authenticate, identity, getInfo, logout } from "../../api/user";


const getDefaultState = () => {
    return {
        token: getToken(),
        name: "",
        mail: "",
        avatar: "",
        role: 0
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
    SET_MAIL: (state, mail) => {
        state.mail = mail;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLE: (state, role) => {
        state.role = role;
    }
};


const actions = {
    async login({ commit }, userInfo) {
        const { mail, password } = userInfo;
        // await csrf();
        var response = await authenticate({ mail: mail, password: password });
        const token = response.data.token;
        commit("SET_TOKEN", token);
        setToken(token);
    },
    async getInfo({ commit, state }) {
        const { data } = await getInfo(state.token);
        return new Promise((resolve, reject) => {
            try {
                if (!data) {
                    reject("Verification failed, please login again.");
                }

                const { role, name, mail } = data;
                if (!role) {
                    reject("getInfo: role must be a non-null !");
                }
                commit("SET_ROLE", role);
                commit("SET_NAME", name);
                commit("SET_MAIL", mail);

                // commit("SET_AVATAR", avatar);
                resolve(data);
            } catch (error) {
                removeToken();
                reject(error);
            }
        })
    },
    async logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken();
                commit("RESET_STATE");
                resolve();
            }).catch(error => {
                reject(error);
            })
        });
    }
};


export default {
    namespaced: true,
    state,
    mutations,
    actions
};
