﻿define(['css!bower_components/angular-ui-notification/dist/angular-ui-notification.min.css','css!bower_components/bootstrap/dist/css/bootstrap.css','css!bower_components/om-custom-ui/css/alarmStyle.css','bootstrap','cookie', 'ngload!ui-notification','scripts/services/httpService'], function () {
    'use strict';
    return ['$scope', '$location', 'Notification','$state','httpService', function ($scope, $location, Notification,$state,httpService) {
        //var parentHeight = $(".login-wrapper").height();
        //var selfOutHeight = $(".login-wrapper-header").outerHeight(true) - $(".login-footer").height() - 5;
        //$(".form-wrapper").height(parentHeight - selfOutHeight);
        var uid = $("#userName");
        var pwd = $("#password");
        var vc = $("#verificationCode");
        var msg = $("#msg");
        for(var i = 1; i < 1000; i++) {
            clearInterval(i);
        }
        function showMsg(m) {
            Notification.error({ message: m, delay: 5000 });
            window.setTimeout(function () { msg.hide(); }, 6000);
        }
        //刷新验证码
        $scope.changeImg = function() {
            var vi = $("#vi");
            vi.attr("src", window.tescomm.config.system.AuthorizeService + "Open/OAuth/GetVerifyCode?" + (new Date()).toString())
        };
        $scope.login = function(btn) {
            $.cookie('menuThree',null);
            $.cookie('menu_Tow',null);
            $.cookie('menu_mark',null);
            if (uid.val().length == 0) {
                showMsg("用户名不能为空");
                return;
            }
            if (pwd.val().length == 0) {
                showMsg("密码不能为空");
                return;
            }
            /*
             if (vc.val().length == 0) {
             showMsg("验证码不能为空");
             return;
             }*/

        //获取config.js的配置
            console.log(window.tescomm.config.app.IndexHref);

        //向后台取token后存储
            httpService.postRemote('Open','OAuth','Login',{
                userName: uid.val(),
                password: pwd.val(),
                verificationCode: vc.val(),
                clientId: window.tescomm.config.app.Id,
                callback: "/_authorizecallback?redirect_uri=/web/index.html#/main/simple"/*登录成功后显示的第一个页面，只需修改参数redirect_uri后对应的内容即可*/
            }).then(function (data) {
                $scope.changeImg();

//有数据才走可放行
//                 if (data.State) {
                if (true) {
//配置参数

                    data.User_Name=uid.val();
                    data.Access_Token='122B29D315FFDC473B4E55EED84654AA';
                    data.User_ID='381047b726564578b89cd3dbf856d7f5';


                    //记住密码是否勾选
                    if ($("#isRemember:checked").length > 0) {
                        $.cookie('pe', data.Encrypt);
                        $.cookie('isRemember', "true");
                        $.cookie('User_Name', uid.val());
                        $.cookie('User_ID', data.User_ID);
                    }
                    else {
                        $.removeCookie('pe');
                        $.removeCookie('isRemember');
                        $.removeCookie('User_ID');
                        $.removeCookie('User_Name');
                    }

//必须走这行代码

                    $.cookie('User_Name', uid.val());
                    $.cookie('User_ID', data.User_ID);
                    $.cookie('Tescomm_Access_Token', data.Access_Token);

                    // 存储取回来的内容
                    // $.ajax(window.tescomm.config.system.AuthorizeService + 'Open/OAuth/GetRoleDataByToken', {
                    //     type: 'POST', data: {
                    //         token: data.Access_Token
                    //         , callback: ""
                    //     },dataType:'json',
                    //     async:false,
                    //     success: function (data, staus) {
                    //         $.cookie('provids',data.proids);
                    //         $.cookie('cityids',data.cityids);
                    //         $.cookie('areaids',data.areaids);
                    //     },
                    //     error: function (xhr, status, error) {
                    //     }
                    // });
//页面跳转
                    $state.go(window.tescomm.config.app.IndexHref);

                    //location.href = '/web/index.html#/main/processing';
                    //location.href = '/web/index.html#/'+window.tescomm.config.app.IndexHref.replace(".","/");
                    // location.href = '/web/index.html#/main/topology';
                } else {
                    showMsg(data.Description);
                }
            },function(error){
 //走的是这个
          alert('走的是这个')
                $state.go(window.tescomm.config.app.IndexHref);


                $scope.changeImg();
                // showMsg('请求错误，' + error);
            });
        };

        //页面加载执行的房啊
        $(document).ready(function () {
            $scope.changeImg();
            if ($.cookie("isRemember") == "true") {
                $("#isRemember").attr("checked", "checked");
                $("#password").attr('type', 'password');

                pwd.val($.cookie('pe'));
                uid.val($.cookie('User_Name'));
            } else {
                uid.val("");
                pwd.val("");
            }

        });
    }]
})