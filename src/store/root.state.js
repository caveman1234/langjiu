let state = {
    purchaseCount: 0,
    customerId: "5f797111-a54a-4473-b71b-1b27a9e1da03", //红旗
    prodGroupId: '', //产品线
    username: '', //用户名
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