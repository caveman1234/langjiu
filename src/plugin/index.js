import axios from 'axios';
import interfaceAddress from './interfaceAddress.js';
import util from './util.js';
import mixins from './mixins.js';
let plugin = {
    install(Vue) {
        Vue.prototype.util = util;
        Vue.prototype.interfaceAddress = interfaceAddress;
        Vue.prototype.$http = axios;
        Vue.mixin(mixins);
    }
}
export default plugin;