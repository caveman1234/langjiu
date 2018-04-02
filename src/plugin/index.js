import axios from 'axios';
import { Loading, Notification } from 'element-ui';
import interfaceAddress from './interfaceAddress.js';
import util from './util.js';
import mixins from './mixins.js';
import './downLoadBrower.js';

function install(Vue) {
    window.log = window.console.log;
    /* *****************************-static-********************************* */
    Vue.config.productionTip = false;
    // Vue.config.devtools = true;
    /* *****************************-prototype-****************************** */
    Vue.prototype.$util = util;
    Vue.prototype.interfaceAddress = interfaceAddress;
    // axios.defaults.baseURL = 'http://localhost:8080';
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    Vue.prototype.$http = axios;
    Vue.prototype.$loading = Loading;
    Vue.prototype.$Notification = Notification;
    Vue.prototype.$Notify = function ({ message, type, title, offset = 90, duration = 3000 }) {
        Notification({
            type: type,
            title: title,
            message: message,
            offset: offset,
            duration: duration
        });
    };
    /* *****************************-mixins-********************************** */
    Vue.mixin(mixins);



    /* *****************************-directive-******************************* */
    Vue.directive('red', {
        inserted(el, binding, vnode) {
            let context = vnode.context;
            // context.myFun('al');
            el.style.color = '#E7442E';
        }
    });
    Vue.directive('blue', {
        inserted(el, binding, vnode) {
            let context = vnode.context;
            // context.myFun('al');
            el.style.color = 'blue';
        }
    });
    /* 格式化日期 */
    Vue.filter('formatDate', function (value) {
        if (!value) return '';
        let date = new Date(value);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let day = (date.getDate() + 1) < 10 ? '0' + (date.getDate()) : (date.getDate());
        let formatDate = [year, month, day];
        return formatDate.join('-');
    });
    Vue.filter('formatPrice', function (value) {
        if (value === null || value === '' || value === undefined) {
            return '暂无价格';
        }
        if (value === 0) {
            return '¥0.00';
        }
        value = String(Number(value).toFixed(2));
        var str = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        return '¥' + str;
    });
    //收入支出格式化
    Vue.filter('formatInOut', function (value) {
        if (value === null || value === '' || value === undefined) {
            return '';
        }
        if (value === 0) {
            return '¥0.00';
        }
        value = String(Number(value).toFixed(2));
        var str = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        return '¥' + str;
    });
    //格式化审核状态
    Vue.filter('formatBillStatus', function (value) {
        let billStatusObj = {
            0: '融资中',
            1: '融资成功',
            2: '融资审批拒绝',
            3: '限定时间内未处理',
            4: '作废',
            10: '未融资'
        };
        return billStatusObj[value] || '暂无';
    });
    //格式化发货要求下拉框
    Vue.filter('formatIsNoticeSend', function (value) {
        let billStatusObj = {
            0: '立即发货',
            1: '待通知发货'
        };
        return billStatusObj[value];
    });
    //格式化支付状态
    Vue.filter('formatPaymentStatus', function (value) {
        let billStatusObj = {
            '0': '未支付',
            '1': '支付中',
            '2': '支付成功',
            '3': '支付失败'
        };
        return billStatusObj[value];
    });

    /* *****************************-axios-*********************************** */
    /* request */
    let loadingInstance1;
    axios.interceptors.request.use(function (config) {
        loadingInstance1 = Loading.service({
            fullscreen: true,
            text: '正在拼命加载......',
            background:'rgba(0,0,0,0.1)'
        });
        let cookies = new Vue.prototype.$util.Cookies();
        if (config.method == 'get' && config.params && config.params.hasOwnProperty('customerId') && !config.params.customerId) {
            config.params.customerId = cookies.getCookie('customerId');
        }
        //订单中心列表
        if (config.url == '/ocm-web/api/b2b/purchase-orders/search-all-orders') {
            if (!config.data.distributorIds) {
                config.data.distributorIds = cookies.getCookie('customerId');
            }
        }
        //追加一个参数,disable cache
        config.url = `${config.url}?_=${Date.now()}`;

        return config;
    }, function (error) {
        loadingInstance1.close();
        Notification.error({
            title: '请求错误',
            message: '请求错误',
            offset: 90,
            duration: 3000
        });
        return Promise.reject(error);
    });
    /* response */
    axios.interceptors.response.use(function (response) {
        setTimeout(_ => loadingInstance1.close(),300);
        if (response.headers["x-ocm-code"] != '1') {
            Notification.error({
                title: decodeURIComponent(response.headers["x-ocm-message"]),
                // message: decodeURI(response.headers["x-ocm-message"]),
                offset: 90,
                duration: 3000
            });
        }
        return response;
    }, function (error) {
        loadingInstance1.close();
        Notification.error({
            title: '请求错误',
            message: '请求错误',
            offset: 90,
            duration: 3000
        });
        return Promise.reject(error);
    });
    //jquery ajax
    $.ajaxSetup({
        timeout: 30 * 1000,
        cache: false,
        beforeSend: function(xhr) {
            loadingInstance1 = Loading.service({
                fullscreen: true,
                text: '正在拼命加载......',
                background:'rgba(0,0,0,0.1)'
            });
        },
        complete: function(xhr, status,x,y) {
            debugger
            if(xhr.getResponseHeader('x-ocm-code') != 1){
                Notification.error({
                    title: decodeURIComponent(xhr.getResponseHeader('x-ocm-message')),
                    // message: decodeURI(response.headers["x-ocm-message"]),
                    offset: 90,
                    duration: 3000
                });
            }
            setTimeout(_ => loadingInstance1.close(),300);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { //对错误进行统一处理
            Notification.error({
                title: textStatus,
                message: errorThrown,
                offset: 90,
                duration: 3000
            });
        }
    });
}
export default {
    install
};