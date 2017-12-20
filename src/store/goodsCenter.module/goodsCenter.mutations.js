import * as types from '../types';
let mutations = {
    [types.addGoodsData](state, goodsData = []) {
        state.goodsData = goodsData;
    },
    [types.addPurchaseData](state, params = {}) {
        let currentObj = state.goodsData.find(v => v.id == params.id);
        currentObj.hasPurchase = true;
    },
    [types.delPurchaseData](state, params = {}) {
        let currentObj = state.goodsData.find(v => v.id == params.id);
        currentObj.hasPurchase = false;
    }
};
export default mutations;