function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
    var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        switch (fIEVersion) {
            case 7:
                return "IE7";
                break;
            case 8:
                return "IE8";
                break;
            case 9:
                return "IE9";
                break;
            case 10:
                return "IE10";
                break;
            case 11:
                return "IE11";
                break;
            default:
                return "0";
        }
    } else if (isEdge) {
        return "Edge";
    } else {
        return "-1"; //非IE  
    }
}
let notSupportVersion = ["IE7", "IE8", "IE9", "IE10"];
let currentVersion = IEVersion();

if (notSupportVersion.indexOf(currentVersion) != -1) {
    let isConfirm = window.confirm('当前浏览器版本过低，请下载IE11浏览器？');
    if (isConfirm) {
        let aTag = document.createElement('a');
        //360浏览器
        // aTag.href = "http://down.360safe.com/se/360se9.1.0.362.exe";
        //谷歌浏览器
        // aTag.href = "http://sw.bos.baidu.com/sw-search-sp/software/3b543c7b6bd21/ChromeStandalone_63.0.3239.108_Setup.exe";
        // aTag.click();
        // window.open('http://down.360safe.com/se/360se9.1.0.362.exe');
    } else {

    }
}