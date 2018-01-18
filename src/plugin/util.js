import axios from 'axios';
class Cookies {
    constructor() {
        let cookiesArr = document.cookie.split(';').filter(v => v.trim());
        this.cookiesObj = cookiesArr.reduce((acc, v) => {
            let item = v.split('=');
            let key = decodeURIComponent(item[0].trim());
            let value = decodeURIComponent(item[1].trim());
            acc[key] = value;
            return acc;
        }, {});
    }
    getCookie(key) {
        return this.cookiesObj[key];
    }
    clear() {
        // var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        // if (keys) {
        //     for (var i = keys.length; i--;)
        //         document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        // }
        return axios.post('/ocm-web/api/account/logout')

    }
}
let isIE = () => {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
    var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  
    return isIE;

}
export default {
    Cookies: Cookies,
    isIE: isIE()
};