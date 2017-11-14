define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {
//session存储localStorage存储和cookie存储
        localStorage.localInfo='{"msg":"登录成功！","success":true,"displayName":"localStorage存储"}';
        sessionStorage.sessionInfo='{"msg":"登录成功！","success":true,"displayName":"sessionStorage存储"}';
        var cookie = $.cookie("attr","cookie存储"); //存储

        var loginInfo = localStorage.localInfo || sessionStorage.localInfo;
        var sessionInfo = localStorage.sessionInfo || sessionStorage.sessionInfo;


        if(loginInfo != undefined){
            $('#localUser').html(JSON.parse(loginInfo).displayName);//ocalStorage存储在页面显示
        }
        if(sessionInfo != undefined){
            $('#sessionUser').html(JSON.parse(sessionInfo).displayName);//ocalStorage存储在页面显示
        }
        if(cookie != undefined){
            $('#cookieUser').html($.cookie('attr')); //cookie读取内容
        }
//cookie存储
//

    }];
});