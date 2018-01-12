/* ********************-goodsCenter.module-********************* */
export const setCustomerId = 'setCustomerId'; /* root-设置经销商ID */
export const prodGroupId = 'prodGroupId'; /* 舍当前选中品类,产品线 */
export const userloginName = 'userloginName'; /* 设置经销商名字-header显示 */
export const changeUsername = 'changeUsername'; /* 改变用户名--注册 */
export const CheckCustomerInfoIsVisiable = 'CheckCustomerInfoIsVisiable'; //签约信息弹框
export const isSign = 'isSign'; //是否签约

export const addPurchaseCount = 'addPurchaseCount'; /* root-增加进货单数量 */
export const changeCurrentNav = 'changeCurrentNav'; /* root-改变当前导航样式 */
export const addGoodsData = 'addGoodsData'; /* 添加购物车数据 */
export const fetchGoodsDataAsync = 'fetchGoodsDataAsync'; /* 获取购物车数据ajax */
export const addPurchaseDataAsync = 'addPurchaseDataAsync'; /* 添加商品到订单中心ajax */
export const delPurchaseDataAsync = 'delPurchaseDataAsync'; /* 从订单中心删除ajax */
export const addPurchaseData = 'addPurchaseData'; /* 增加订单 */
export const delPurchaseData = 'delPurchaseData'; /* 删除订单 */
export const fetchPurchaseCountAsync = 'fetchPurchaseCountAsync'; /* 获取订单总数量 */
/* ********************-orderCenter.module-********************* */
//进货单
export const fetchPurchaseBillsDataAsync = 'fetchPurchaseBillsDataAsync'; /* 获取进货单数据 */
export const addPurchaseBillsData = 'addPurchaseBillsData'; /* 增加进货单数据 */
export const changeInpNum = 'changeInpNum'; /* 进货单数量改变事件 */
export const changeInp = 'changeInp'; /* 左边item-checkbox改变事件 */
export const selectAll = 'selectAll'; /* 全选 */
export const delSelected = 'delSelected'; /* 删除选中产品 */
//生成订单