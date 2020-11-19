import Vue from 'vue';
import Vuex from 'vuex';
import index from './modules/index.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
	},
	mutations: {
        setLoginStatus(state, hasLogin){
            state.hasLogin = hasLogin;
        },
    },
	actions: {},
	modules: {
		index
	}
});

export default store
