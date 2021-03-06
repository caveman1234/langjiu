import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/components/route/Home/Home'
import ContactUs from '@/components/route/ContactUs/ContactUs'
import GoodsCenter from '@/components/route/GoodsCenter/GoodsCenter'
import AccountCenter from '@/components/route/AccountCenter/AccountCenter'
import AppDownload from '@/components/route/AppDownload/AppDownload.vue'
//children
import AccountMgr from '@/components/route/AccountCenter/AccountMgr/AccountMgr'
import OnlineRecharge from '@/components/route/AccountCenter/OnlineRecharge/OnlineRecharge'
import MyProperty from '@/components/route/AccountCenter/MyProperty/MyProperty'
import BusinessCheck from '@/components/route/AccountCenter/BusinessCheck/BusinessCheck'
import FinancingInfo from '@/components/route/AccountCenter/FinancingInfo/FinancingInfo'
import PaymentInfo from '@/components/route/AccountCenter/PaymentInfo/PaymentInfo'

import WaitAuditCheck from '@/components/route/AccountCenter/WaitAuditCheck/WaitAuditCheck'
import CheckBills from '@/components/route/AccountCenter/CheckBills/CheckBills.vue'
import CashCheck from '@/components/route/AccountCenter/CashCheck/CashCheck'
import CostCheck from '@/components/route/AccountCenter/CostCheck/CostCheck'
import BuildCheck from '@/components/route/AccountCenter/BuildCheck/BuildCheck'
import PromiseCheck from '@/components/route/AccountCenter/PromiseCheck/PromiseCheck'
import BillDownload from '@/components/route/AccountCenter/BillDownload/BillDownload'
import LogisticsDownload from '@/components/route/AccountCenter/LogisticsDownload/LogisticsDownload'
import MyInfo from '@/components/route/AccountCenter/MyInfo/MyInfo'

import TakeWineCheck from '@/components/route/AccountCenter/TakeWineCheck/TakeWineCheck'
import FinatialCheck from '@/components/route/AccountCenter/FinatialCheck/FinatialCheck'


import Inquiry from '@/components/route/Inquiry/Inquiry'
import MsgCenter from '@/components/route/MsgCenter/MsgCenter'
import MsgContent from '@/components/route/MsgCenter/MsgContent/MsgContent'


import PurchaseBills from '@/components/route/PurchaseBills/PurchaseBills'
import GenerateBills from '@/components/route/GenerateBills/GenerateBills.vue'
import GenerateBillsEdit from '@/components/route/GenerateBills/GenerateBillsEdit/GenerateBillsEdit.vue'
import ApplySend from '@/components/route/OrderCenter/MyOrderList/ApplySend/ApplySend'
import ApplyReturn from '@/components/route/OrderCenter/MyOrderList/ApplyReturn/ApplyReturn'

import OrderCenter from '@/components/route/OrderCenter/OrderCenter'
/* 订单children */
import DeliverList from '@/components/route/OrderCenter/DeliverList/DeliverList'

import DeliverCheckNotPass from '@/components/route/OrderCenter/DeliverList/DeliverCheckNotPass/DeliverCheckNotPass'
import DeliverCheckPass from '@/components/route/OrderCenter/DeliverList/DeliverCheckPass/DeliverCheckPass'
import DeliverComplete from '@/components/route/OrderCenter/DeliverList/DeliverComplete/DeliverComplete'
import DeliverTotal from '@/components/route/OrderCenter/DeliverList/DeliverTotal/DeliverTotal'
import DeliverWaitCheck from '@/components/route/OrderCenter/DeliverList/DeliverWaitCheck/DeliverWaitCheck'


import ReturnList from '@/components/route/OrderCenter/ReturnList/ReturnList'

import ReturnTotal from '@/components/route/OrderCenter/ReturnList/ReturnTotal/ReturnTotal'
import ReturnWaitCheck from '@/components/route/OrderCenter/ReturnList/ReturnWaitCheck/ReturnWaitCheck'
import ReturnCheckPass from '@/components/route/OrderCenter/ReturnList/ReturnCheckPass/ReturnCheckPass'
import ReturnCheckNotPass from '@/components/route/OrderCenter/ReturnList/ReturnCheckNotPass/ReturnCheckNotPass'
import ReturnComplete from '@/components/route/OrderCenter/ReturnList/ReturnComplete/ReturnComplete'


import MyOrderList from '@/components/route/OrderCenter/MyOrderList/MyOrderList'
import AddPickOrder from '@/components/route/OrderCenter/AddPickOrder/AddPickOrder'
import NotDeliverSearch from '@/components/route/OrderCenter/NotDeliverSearch/NotDeliverSearch'
//去提货 eidt--
import GoPickGoods from '@/components/route/OrderCenter/GoPickGoods/GoPickGoods.vue'
import GoPickGoodsEdit from '@/components/route/OrderCenter/GoPickGoods/GoPickGoodsEdit/GoPickGoodsEdit.vue'

/* 我的订单列表路由 */
import SavedOrder from '@/components/route/OrderCenter/MyOrderList/SavedOrder/SavedOrder'
import TotalOrder from '@/components/route/OrderCenter/MyOrderList/TotalOrder/TotalOrder'


import CheckPass from '@/components/route/OrderCenter/MyOrderList/CheckPass/CheckPass'
import Complete from '@/components/route/OrderCenter/MyOrderList/Complete/Complete'
import NotCheckPass from '@/components/route/OrderCenter/MyOrderList/NotCheckPass/NotCheckPass'
import NotSubmitOrder from '@/components/route/OrderCenter/MyOrderList/NotSubmitOrder/NotSubmitOrder'


import MainPage from '@/components/MainPage/MainPage'

import Login from '@/components/Login/Login.vue'
import ChangePassword from '@/components/ChangePassword/ChangePassword.vue'
import FindPassword from '@/components/FindPassword/FindPassword.vue'

/* 合同中心 */
import ContractCenter from '@/components/route/ContractCenter/ContractCenter'
import GoSign from '@/components/route/ContractCenter/Sign/GoSign/GoSign'
//直投业务
import TakeWine from '@/components/route/TakeWine/TakeWine';
import TakeWineList from '@/components/route/TakeWine/TakeWineList/TakeWineList';
import ReturnWineList from '@/components/route/TakeWine/ReturnWineList/ReturnWineList';
import ReturnWineEdit from '@/components/route/TakeWine/ReturnWineList/ReturnWineEdit/ReturnWineEdit';
import ReturnWineOrder from '@/components/route/TakeWine/ReturnWineList/ReturnWineOrder/ReturnWineOrder';
Vue.use(Router)
let router = new Router({
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
                component: DeliverList,
                children: [
                    {
                        path: '',
                        redirect: '/DeliverTotal'
                    },
                    {
                        path: '/DeliverCheckNotPass',
                        name: 'DeliverCheckNotPass',
                        component: DeliverCheckNotPass
                    },
                    {
                        path: '/DeliverCheckPass',
                        name: 'DeliverCheckPass',
                        component: DeliverCheckPass
                    },
                    {
                        path: '/DeliverComplete',
                        name: 'DeliverComplete',
                        component: DeliverComplete
                    },
                    {
                        path: '/DeliverTotal',
                        name: 'DeliverTotal',
                        component: DeliverTotal
                    },
                    {
                        path: '/DeliverWaitCheck',
                        name: 'DeliverWaitCheck',
                        component: DeliverWaitCheck
                    },
                ]
            },
            {
                path: '/ReturnList',
                name: 'ReturnList',
                component: ReturnList,
                children: [{
                    path: '',
                    redirect: '/ReturnTotal'
                },
                {
                    path: '/ReturnTotal',
                    name: 'ReturnTotal',
                    component: ReturnTotal
                },
                {
                    path: '/ReturnWaitCheck',
                    name: 'ReturnWaitCheck',
                    component: ReturnWaitCheck
                },
                {
                    path: '/ReturnCheckPass',
                    name: 'ReturnCheckPass',
                    component: ReturnCheckPass
                },
                {
                    path: '/ReturnCheckNotPass',
                    name: 'ReturnCheckNotPass',
                    component: ReturnCheckNotPass
                },
                {
                    path: '/ReturnComplete',
                    name: 'ReturnComplete',
                    component: ReturnComplete
                },
                ]
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
                },
                {
                    path: '/CheckPass',
                    name: 'CheckPass',
                    component: CheckPass
                },
                {
                    path: '/Complete',
                    name: 'Complete',
                    component: Complete
                },
                {
                    path: '/NotCheckPass',
                    name: 'NotCheckPass',
                    component: NotCheckPass
                },
                {
                    path: '/NotSubmitOrder',
                    name: 'NotSubmitOrder',
                    component: NotSubmitOrder
                }

                ]
            },
            {
                path: '/NotDeliverSearch',
                name: 'NotDeliverSearch',
                component: NotDeliverSearch
            },
            {
                path: '/AddPickOrder',
                name: 'AddPickOrder',
                component: AddPickOrder
            }
            ]
        },
        {
            path: '/AccountCenter',
            name: 'AccountCenter',
            component: AccountCenter,
            children: [{
                path: '',
                redirect: '/MyProperty'
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
                path: '/BusinessCheck',
                name: 'BusinessCheck',
                component: BusinessCheck
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
            {
                path: '/CashCheck',
                name: 'CashCheck',
                component: CashCheck
            },
            {
                path: '/TakeWineCheck',
                name: 'TakeWineCheck',
                component: TakeWineCheck
            },
            {
                path: '/FinatialCheck',
                name: 'FinatialCheck',
                component: FinatialCheck
            },
            {
                path: '/CostCheck',
                name: 'CostCheck',
                component: CostCheck
            },
            {
                path: '/BuildCheck',
                name: 'BuildCheck',
                component: BuildCheck
            },
            {
                path: '/PromiseCheck',
                name: 'PromiseCheck',
                component: PromiseCheck
            },
            {
                path: '/WaitAuditCheck',
                name: 'WaitAuditCheck',
                component: WaitAuditCheck
            },
            {
                path: '/CheckBills',
                name: 'CheckBills',
                component: CheckBills
            },
            {
                path: '/BillDownload',
                name: 'BillDownload',
                component: BillDownload
            },
            {
                path: '/LogisticsDownload',
                name: 'LogisticsDownload',
                component: LogisticsDownload
            },
            {
                path: '/MyInfo',
                name: 'MyInfo',
                component: MyInfo
            },
            ]
        },
        {
            path: '/MsgCenter',
            name: 'MsgCenter',
            component: MsgCenter
        },
        {
            path: '/Inquiry',
            name: 'Inquiry',
            component: Inquiry
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
        },
        {
            path: '/GoPickGoods',
            name: 'GoPickGoods',
            component: GoPickGoods
        },
        {
            path: '/GoPickGoodsEdit',
            name: 'GoPickGoodsEdit',
            component: GoPickGoodsEdit
        },
        {
            path: '/ContractCenter',
            name: 'ContractCenter',
            component: ContractCenter
        },
        {
            path: '/MsgContent',
            name: 'MsgContent',
            component: MsgContent
        },
        {
            path: '/ContactUs',
            name: 'ContactUs',
            component: ContactUs
        },
        {
            path: '/AppDownload',
            name: 'AppDownload',
            component: AppDownload,
        },
        {
            path: '/GoSign',
            name: 'GoSign',
            component: GoSign
        },
        {
            path: '/TakeWine',
            name: 'TakeWine',
            component: TakeWine,
            children: [
                {
                    path: '',
                    redirect: '/TakeWineList'
                },
                {
                    path: '/TakeWineList',
                    name: 'TakeWineList',
                    component: TakeWineList
                },
                {
                    path: '/ReturnWineList',
                    name: 'ReturnWineList',
                    component: ReturnWineList
                },
                {
                    path: '/ReturnWineEdit',
                    name: 'ReturnWineEdit',
                    component: ReturnWineEdit
                },
                {
                    path: '/ReturnWineOrder',
                    name: 'ReturnWineOrder',
                    component: ReturnWineOrder
                }
            ]
        }
        ]
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/ChangePassword',
        name: 'ChangePassword',
        component: ChangePassword
    },
    {
        path: '/FindPassword',
        name: 'FindPassword',
        component: FindPassword
    }

    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});





export default router;