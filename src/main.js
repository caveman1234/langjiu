import 'babel-polyfill'
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import plugin from './plugin';
import router from './router';
import store from './store/root.index.js';
Vue.use(ElementUI);
Vue.use(plugin);


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})