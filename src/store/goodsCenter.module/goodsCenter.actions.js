import * as types from '../types.js';
import axios from 'axios';
let actions = {
    /* 获取订单数据 */
    [types.fetchGoodsDataAsync]({ commit, dispatch }, params = {}) {
        axios.get('static/goodsList.json', params)
            .then(res => {
                let data = res.data;
                if (data.result == 1) {
                    let purchaseCount = data.data.filter(v => v.hasPurchase).length;
                    /* 添加商品数据 */
                    commit(types.addGoodsData, data.data);
                    /* 获取订单总数量 */
                    dispatch(types.fetchPurchaseCountAsync);
                }
            })
            .catch(res => {})
    },
    /* 增加数据到订单中心 */
    [types.addPurchaseDataAsync]({ commit, dispatch }, params = {}) {
        axios({
            // method: 'post',
            method: 'get',
            url: 'static/goodsList.json',
            data: params
        }).then(res => {}).catch(res => {})
    },
    /* 删除订单中心数据 */
    [types.delPurchaseDataAsync]({ commit }, params = {}) {
        axios({
            method: 'get',
            // method: 'post',
            url: 'static/goodsList.json',
            data: params
        }).then(res => {}).catch(res => {})
    },
    /* 获取订单总数量 */
    [types.fetchPurchaseCountAsync]({ commit }) {
        axios({
            method: 'get',
            // method: 'post',
            url: 'static/purchaseCount.json',
            data: "params"
        }).then(res => {
            commit(types.addPurchaseCount, { flag: 'total', purchaseCount: res.data.data.purchaseCount }, { root: true });
        }).catch(res => {})
    }
};
export default actions;