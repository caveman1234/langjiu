let state = {
    purchaseCount: 0,
    customerId: "2b6c6970-2464-4040-9bd5-e314ff67eb9d", //红旗
    // customerId: "7c38a6d5-d5bf-4942-b695-16ca1898cc66", 
    prodGroupId: '', //产品线
    username: '', //用户名
    navList: [
        { name: "首页", routeTo: "/Home", hasSelected: true },
        { name: "合同中心", routeTo: "/ContractCenter", hasSelected: false },
        { name: "商品中心", routeTo: "/GoodsCenter", hasSelected: false },
        { name: "订单中心", routeTo: "/OrderCenter", hasSelected: false },
        { name: "账户中心", routeTo: "/AccountCenter", hasSelected: false },
        { name: "公告", routeTo: "/MsgCenter", hasSelected: false }
    ]
}
export default state;