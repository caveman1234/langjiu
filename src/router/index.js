import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage/MainPage'
import Home from '@/components/route/Home/Home'
import GoodsCenter from '@/components/route/GoodsCenter/GoodsCenter'
import OrderCenter from '@/components/route/OrderCenter/OrderCenter'
import AccountCenter from '@/components/route/AccountCenter/AccountCenter'
import MsgCenter from '@/components/route/MsgCenter/MsgCenter'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '',
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
            name: 'OrderCenter',
            component: OrderCenter
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
    ]
})