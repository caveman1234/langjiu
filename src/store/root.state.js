let state = {
    purchaseCount: 0,
    customerId: "730a9ebe-4a95-4db1-867f-fd99a90228b6", //红旗
    prodGroupId: '',
    navList: [
        { name: "首页", routeTo: "/Home", hasSelected: true },
        { name: "合同中心", routeTo: "/ContractCenter", hasSelected: false },
        { name: "商品中心", routeTo: "/GoodsCenter", hasSelected: false },
        { name: "订单中心", routeTo: "/OrderCenter", hasSelected: false },
        { name: "账户中心", routeTo: "/AccountCenter", hasSelected: false },
        { name: "消息中心", routeTo: "/MsgCenter", hasSelected: false }
    ]
}
export default state;