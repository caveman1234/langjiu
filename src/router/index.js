import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/route/Home/Home'
import GoodsCenter from '@/components/route/GoodsCenter/GoodsCenter'
import AccountCenter from '@/components/route/AccountCenter/AccountCenter'
//children
import AccountMgr from '@/components/route/AccountCenter/AccountMgr/AccountMgr'
import OnlineRecharge from '@/components/route/AccountCenter/OnlineRecharge/OnlineRecharge'
import MyProperty from '@/components/route/AccountCenter/MyProperty/MyProperty'
import NotDeliver from '@/components/route/AccountCenter/NotDeliver/NotDeliver'
import FinancingInfo from '@/components/route/AccountCenter/FinancingInfo/FinancingInfo'
import PaymentInfo from '@/components/route/AccountCenter/PaymentInfo/PaymentInfo'


import MsgCenter from '@/components/route/MsgCenter/MsgCenter'
import PurchaseBills from '@/components/route/PurchaseBills/PurchaseBills'
import GenerateBills from '@/components/route/GenerateBills/GenerateBills.vue'
import GenerateBillsEdit from '@/components/route/GenerateBills/GenerateBillsEdit/GenerateBillsEdit.vue'
import ApplySend from '@/components/route/ApplySend/ApplySend'
import ApplyReturn from '@/components/route/ApplyReturn/ApplyReturn'

import OrderCenter from '@/components/route/OrderCenter/OrderCenter'
/* 订单children */
import DeliverList from '@/components/route/OrderCenter/DeliverList/DeliverList'
import ReturnList from '@/components/route/OrderCenter/ReturnList/ReturnList'
import MyOrderList from '@/components/route/OrderCenter/MyOrderList/MyOrderList'
/* 我的订单列表路由 */
import SavedOrder from '@/components/route/OrderCenter/MyOrderList/SavedOrder/SavedOrder'
import TotalOrder from '@/components/route/OrderCenter/MyOrderList/TotalOrder/TotalOrder'


import MainPage from '@/components/MainPage/MainPage'
import Login from '@/components/Login/Login'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'MainPage',
            component: MainPage,
            children: [{
                    path: '',
                    redirect: '/Login'
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
                            // component: MyOrderList
                            redirect: '/MyOrderList'
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
                                    redirect: '/TotalOrder'
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
                    component: AccountCenter,
                    children: [{
                            path: '',
                            redirect: '/AccountMgr'
                        },
                        {
                            path: '/AccountMgr',
                            name: 'AccountMgr',
                            component: AccountMgr
                        },
                        {
                            path: '/OnlineRecharge',
                            name: 'OnlineRecharge',
                            component: OnlineRecharge
                        },
                        {
                            path: '/MyProperty',
                            name: 'MyProperty',
                            component: MyProperty
                        },
                        {
                            path: '/NotDeliver',
                            name: 'NotDeliver',
                            component: NotDeliver
                        },
                        {
                            path: '/FinancingInfo',
                            name: 'FinancingInfo',
                            component: FinancingInfo
                        },
                        {
                            path: '/PaymentInfo',
                            name: 'PaymentInfo',
                            component: PaymentInfo
                        },
                    ]
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
                },
                {
                    path: '/GenerateBillsEdit',
                    name: 'GenerateBillsEdit',
                    component: GenerateBillsEdit
                },
                {
                    path: '/ApplySend',
                    name: 'ApplySend',
                    component: ApplySend
                },
                {
                    path: '/ApplyReturn',
                    name: 'ApplyReturn',
                    component: ApplyReturn
                }
            ]
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },

    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})