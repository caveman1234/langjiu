let state = {
    purchaseCount: 0,
    customerId: "", //红旗
    // customerId: "2b6c6970-2464-4040-9bd5-e314ff67eb9d", //红旗
    // customerId: "3eac6d3b-16c1-489c-aa0f-a2b5fdc2e5a9",
    prodGroupId: '', //产品线
    username: '', //用户名
    CheckCustomerInfoIsVisiable: false, //检查用户信息，是否签约弹框是否显示
    isSign: false,
    navList: [
        { name: "首页", routeTo: "/Home", hasSelected: true },
        { name: "合同中心", routeTo: "/ContractCenter", hasSelected: false },
        { name: "商品中心", routeTo: "/GoodsCenter", hasSelected: false },
        { name: "订单中心", routeTo: "/OrderCenter", hasSelected: false },
        { name: "直投业务", routeTo: "/TakeWine", hasSelected: false },
        { name: "账户中心", routeTo: "/AccountCenter", hasSelected: false },
        { name: "公告", routeTo: "/MsgCenter", hasSelected: false },
        { name: "联系我们", routeTo: "/ContactUs", hasSelected: false }
    ]
}
export default state;