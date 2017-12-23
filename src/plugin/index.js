import axios from 'axios';
import { Loading, Notification } from 'element-ui';
import interfaceAddress from './interfaceAddress.js';
import util from './util.js';
import mixins from './mixins.js';

function install(Vue) {
    /* *****************************-static-********************************* */
    Vue.config.productionTip = false;
    /* *****************************-prototype-****************************** */
    Vue.prototype.util = util;
    Vue.prototype.interfaceAddress = interfaceAddress;
    // axios.defaults.baseURL = 'http://localhost:8080';
    Vue.prototype.$http = axios;
    Vue.prototype.$loading = Loading;
    Vue.prototype.$Notification = Notification;
    Vue.prototype.$Notification1 = function({ message, type, title }) {
        Notification({
            type: type,
            title: title,
            message: message,
            offset: 90,
            duration: 3000
        });
    };
    /* *****************************-mixins-********************************** */
    Vue.mixin(mixins);



    /* *****************************-directive-******************************* */
    Vue.directive('demo', {
        bind: function(el, binding, vnode) {
            let context = vnode.context;
            // context.myFun('al');
        }
    })

    /* *****************************-axios-*********************************** */
    /* request */
    let loadingInstance1;
    axios.interceptors.request.use(function(config) {
        loadingInstance1 = Loading.service({
            fullscreen: true,
            // target: '.routeContainer'
        });
        return config;
    }, function(error) {
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
    axios.interceptors.response.use(function(response) {
        loadingInstance1.close();
        if (response.headers["x-ocm-code"] != '1') {
            Notification.error({
                title: decodeURI(response.headers["x-ocm-message"]),
                // message: decodeURI(response.headers["x-ocm-message"]),
                offset: 90,
                duration: 3000
            });
        }
        return response;
    }, function(error) {
        loadingInstance1.close();
        Notification.error({
            title: '请求错误',
            message: '请求错误',
            offset: 90,
            duration: 3000
        });
        return Promise.reject(error);
    });
}
export default {
    install
};