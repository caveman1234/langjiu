let getters = {
    purchaseBillsCount(state) {
        return state.PurchaseBillsData.length;
    },
    purchaseBillsTotalAmount(state) {
        let total = 0;
        state.PurchaseBillsData.forEach(v => {
            if (v.isSelected) {
                total += v.totalAmount;
            }
        });
        return total;
    },
    isAllChecked(state) {
        return state.PurchaseBillsData.every(v => v.isSelected);
    }
};
export default getters;