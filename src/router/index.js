import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage/MainPage'
import Home from '@/components/route/Home/Home'
import GoodsCenter from '@/components/route/GoodsCenter/GoodsCenter'
import AccountCenter from '@/components/route/AccountCenter/AccountCenter'
import MsgCenter from '@/components/route/MsgCenter/MsgCenter'
import PurchaseBills from '@/components/route/PurchaseBills/PurchaseBills'
import GenerateBills from '@/components/route/GenerateBills/GenerateBills'
import OrderCenter from '@/components/route/OrderCenter/OrderCenter'
/* 订单 */
import DeliverList from '@/components/route/OrderCenter/DeliverList/DeliverList'
import ReturnList from '@/components/route/OrderCenter/ReturnList/ReturnList'
import MyOrderList from '@/components/route/OrderCenter/MyOrderList/MyOrderList'
/* 我的订单列表路由 */
import SavedOrder from '@/components/route/OrderCenter/MyOrderList/SavedOrder/SavedOrder'
import TotalOrder from '@/components/route/OrderCenter/MyOrderList/TotalOrder/TotalOrder'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'MainPage',
            component: Home
        },
        {
            path: '/Home',
            name: 'Home',
            component: Home
        },
        {
            path: '/GoodsCenter',
            name: 'GoodsCenter',
            component: GoodsCenter
        },
        {
            path: '/OrderCenter',
            component: OrderCenter,
            name: 'OrderCenter',
            children: [{
                    path: '',
                    component: MyOrderList
                },
                {
                    path: '/DeliverList',
                    name: 'DeliverList',
                    component: DeliverList
                },
                {
                    path: '/ReturnList',
                    name: 'ReturnList',
                    component: ReturnList
                },
                {
                    path: '/MyOrderList',
                    component: MyOrderList,
                    name: 'MyOrderList',
                    children: [{
                            path: '',
                            component: TotalOrder
                        },
                        {
                            path: '/TotalOrder',
                            name: 'TotalOrder',
                            component: TotalOrder
                        },
                        {
                            path: '/SavedOrder',
                            name: 'SavedOrder',
                            component: SavedOrder
                        }

                    ]
                }
            ]
        },
        {
            path: '/AccountCenter',
            name: 'AccountCenter',
            component: AccountCenter
        },
        {
            path: '/MsgCenter',
            name: 'MsgCenter',
            component: MsgCenter
        },
        {
            path: '/PurchaseBills',
            name: 'PurchaseBills',
            component: PurchaseBills
        },
        {
            path: '/GenerateBills',
            name: 'GenerateBills',
            component: GenerateBills
        }
    ]
})