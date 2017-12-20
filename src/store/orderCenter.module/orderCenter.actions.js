import * as types from '../types.js';
import axios from 'axios';
let actions = {
    [types.fetchPurchaseBillsDataAsync]({ commit }, dataArr) {
        axios.get('static/purchaseBillsData.json')
            .then(res => {
                let dataArr = res.data.data;
                commit(types.addPurchaseData, dataArr)
            })
    }
};
export default actions;