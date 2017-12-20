import * as types from '../types.js';
let mutations = {
    [types.addPurchaseData](state, dataArr) {
        state.PurchaseBillsData = dataArr;
    },
    [types.changeInpNum](state, { id, amount }) {
        let changedItem = state.PurchaseBillsData.find(v => v.id == id);
        changedItem.amount = amount;
        changedItem.totalAmount = amount * changedItem.price;
    },
    [types.changeInp](state, { value, id }) {
        let changedItem = state.PurchaseBillsData.find(v => v.id == id);
        changedItem.isSelected = value;
    },
    [types.selectAll](state, value) {
        state.PurchaseBillsData.forEach(v => {
            v.isSelected = value;
        });
    },
    [types.delSelected](state) {
        state.PurchaseBillsData = state.PurchaseBillsData.filter(v => !v.isSelected);
    }
};
export default mutations;