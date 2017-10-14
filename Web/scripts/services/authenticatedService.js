/**
 * Created by cuishiyong1 on 2017/4/27.
 */
(function(){
    var tmpHref = decodeURIComponent(location.href);
    if (tmpHref.indexOf("token=") != -1) {
            var token = tmpHref.split("token=")[1];
            document.cookie = "Tescomm_Access_Token=" + token;
            document.cookie = "Token_Extend=" + token;
    } else {
        //判断不在Iframe中，带参数的情况
        if (getCookie("Tescomm_Access_Token") == null || getCookie("Tescomm_Access_Token") == "") {
            var url=getLoginUrl(tmpHref);
            location.href = url;
        }
    }
    function getCookie(cookieName) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(cookieName + "=")
            if (c_start != -1) {
                c_start = c_start + cookieName.length + 1
                var c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }

    //没cookie时，跳转到登陆页面
    function getLoginUrl(href){
        var url="";
        if(href){
            var arrTemp=href.split('/');
            if(arrTemp && arrTemp.length >0){
                url=arrTemp[0]+"/#/login";
            }
        }
        return url;
    }
})()