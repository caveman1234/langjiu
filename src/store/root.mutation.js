import * as types from './types.js';
let mutations = {
    [types.addPurchaseCount](state, obj) {
        if (obj.flag === 'total') {
            state.purchaseCount = obj.purchaseCount;
        } else if (obj.flag === 'plus') {
            state.purchaseCount += 1;
        } else if (obj.flag === 'minus') {
            state.purchaseCount -= 1;
        }
    },
    [types.changeCurrentNav](state, payload) {
        let { index, hash } = payload;
        hash && (index = state.navList.findIndex(v => hash == v.routeTo));
        state.navList.forEach((v, i) => {
            if (index == i) {
                v.hasSelected = true;
            } else {
                v.hasSelected = false;
            }
        });
    },
    [types.setCustomerId](store, customerId) {
        store.customerId = customerId
    },
    [types.prodGroupId](store, prodGroupId) {
        store.prodGroupId = prodGroupId;
    },
    [types.userloginName](store, userloginName) {
        store.userloginName = userloginName;
    },
    [types.changeUsername](store, username) {
        store.username = username;
    },
    [types.CheckCustomerInfoIsVisiable](store, isVisiable) {
        store.CheckCustomerInfoIsVisiable = isVisiable;
    },
    [types.isSign](store, isSign) {
        store.isSign = isSign;
    }
};
export default mutations;