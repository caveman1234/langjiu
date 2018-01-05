class Cookies {
    constructor() {
        let cookiesArr = document.cookie.split(';').filter(v => v.trim());
        this.cookiesObj = cookiesArr.reduce((acc, v) => {
            let item = v.split('=');
            let key = decodeURI(item[0].trim());
            let value = decodeURI(item[1].trim());
            acc[key] = value;
            return acc;
        }, {});
    }
    getCookie(key) {
        return this.cookiesObj[key];
    }
    clear() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
}
export default {
    Cookies: Cookies
};