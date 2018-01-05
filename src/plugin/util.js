class Cookies {
    constructor() {
        let cookiesArr = document.cookie.split(';').filter(v => v);
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
        document.cookie = '';
    }
}
export default {
    Cookies: Cookies
};