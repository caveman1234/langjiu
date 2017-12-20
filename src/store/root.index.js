import Vue from 'vue';
import Vuex from 'vuex';
import state from './root.state.js'
import mutations from './root.mutation';
import goodsCenter from './goodsCenter.module/goodsCenter.index.js';
import orderCenter from './orderCenter.module/orderCenter.index.js';
Vue.use(Vuex);
export default new Vuex.Store({
    state: state,
    mutations,
    modules: {
        goodsCenter,
        orderCenter
    }
})