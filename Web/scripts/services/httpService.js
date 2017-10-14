define(['angularAMD','scripts/requireHelper/requireNotification'], function (angularAMD) {
    'use strict';
    angularAMD.service('httpService',
        function ($http, $q,Notification) {

            $http.defaults.withCredentials = true;

            return ({
                get: getService,
                getWithCache: getServiceWithCache,
                post: postService,
                getRemote: getRemoteService,
                getRemoteWithCache: getRemoteServiceWithCache,
                postRemote: postRemoteService,
                getCookie: getCookie,
            });

            function getService(serviceGroup, serviceName, action, data) {
                return baseService(serviceGroup, serviceName, action, 'GET', data, false);
            };

            function getServiceWithCache(serviceGroup, serviceName, action, data) {
                return baseService(serviceGroup, serviceName, action, 'GET', data, true);
            };

            function postService(serviceGroup, serviceName, action, data) {
                return baseService(serviceGroup, serviceName, action, 'POST', data, false);
            };

            function getRemoteService(serviceGroup, serviceName, action, data) {
                return baseRemoteService(serviceGroup, serviceName, action, 'GET', data, false);
            };

            function getRemoteServiceWithCache(serviceGroup, serviceName, action, data) {
                return baseRemoteService(serviceGroup, serviceName, action, 'GET', data, true);
            };

            function postRemoteService(serviceGroup, serviceName, action, data) {

                return baseRemoteService(serviceGroup, serviceName, action, 'POST', data, false);
            };

            function baseRemoteService(serviceGroup, serviceName, action, method, data, withCache) {
                checkcookie();
                var requestUrl = window.tescomm.config.system.AuthorizeService + serviceGroup + "/" + serviceName + "/" + action
                var request;
                if (method == 'POST') {
                    requestUrl = requestUrl + "?tokenID=" + getCookie("Tescomm_Access_Token");
                    request = $http({
                        method: method,
                        url: requestUrl,
                        data: data,
                        cache: withCache,
                        withCredentials:true,
                    });
                } else {
                    data.tokenID = getCookie("Tescomm_Access_Token");
                    request = $http({
                        method: method,
                        url: requestUrl,
                        params: data,
                        cache: withCache,
                        withCredentials:true,
                    });
                }
                return (request.then(handleSuccess, handleError));
            };

            function baseService(serviceGroup, serviceName, action, method, data, withCache) {
                checkcookie();
                var requestUrl = window.tescomm.config.system.ApiService + serviceGroup + "/" + serviceName + "/" + action
                var request;
                requestUrl = requestUrl + "?tokenID=" + getCookie("Tescomm_Access_Token");
                if (method == 'POST') {
                    request = $http({
                        method: method,
                        url: requestUrl,
                        data: data,
                        cache: withCache,
                        withCredentials:true,
                    });
                } else {
                    request = $http({
                        method: method,
                        url: requestUrl,
                        params: data,
                        cache: withCache,
                        withCredentials:true,
                    });
                }
                return (request.then(handleSuccess, handleError));
            };

            function handleError(response) {
                return ($q.reject(response.data.Message));
            }

            function handleSuccess(response) {
                if(response.data.Auth==null){
                    return (response.data);
                }else{
                    Notification.error({ message: response.data.msg , delay: 1000 });
                    setTimeout(function(){
                        var tmpHref = location.href;
                        var url=getLoginUrl(tmpHref);
                        location.href = url;
                    },1000)
                }
            }

            function checkcookie() {
                var tmpHref = location.href;
                if (tmpHref.indexOf("token=") != -1) {

                    //判断在Iframe中，不带参数的情况
                    if (getCookie("Tescomm_Access_Token") == null || getCookie("Tescomm_Access_Token") == "") {
                        var req = GetRequest();
                        var param = req.token;
                        var token = param.split("|")[0];
                        var id = param.split("|")[1];
                        document.cookie = "Tescomm_Access_Token=" + token;
                        document.cookie = "Token_Extend=" + id;
                    }
                } else {
                    //判断不在Iframe中，带参数的情况
                    if (getCookie("Tescomm_Access_Token") == null || getCookie("Tescomm_Access_Token") == "") {
                        var url=getLoginUrl(tmpHref);
                        if(url=="")
                            location.href = "http://www.baidu.com";
                        else
                            location.href = url;
                    }
                }

            }

            //没cookie时，跳转到登陆页面
            function getLoginUrl(href){
                var url="";
                if(href){
                    var arrTemp=href.split('/#／');
                    if(arrTemp && arrTemp.length >0){
                        url=arrTemp[0]+"/#/login";
                    }
                }
                return url;
            }

            function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
            function checkToken(token) {
                postRemoteService("open","Oauth","Verify",{token:token}).then(function(data){
                    console.log(data);
                })
            }
            function GetRequest() {
                var url = location.href; //获取url中"?"符后的字串
                url = url.split("?")[1];
                url = "?" + url;
                var theRequest = new Object();
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    var strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
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
        });
})