define(['css!bower_components/angular-ui-notification/dist/angular-ui-notification.min.css','css!bower_components/bootstrap/dist/css/bootstrap.css','css!bower_components/om-custom-ui/css/alarmStyle.css','bootstrap','cookie', 'ngload!ui-notification','scripts/services/httpService'], function () {
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
            httpService.post('UsersQuery','Users','login',{
                userName: uid.val(),
                password: pwd.val(),
            }).then(function (data) {
                $scope.changeImg();
                console.log(data)
//有数据才走可放行
                if (data.success) {
                    //记住密码是否勾选
                    if ($("#isRemember:checked").length > 0) {
                        $.cookie('isRemember', "true");
                        $.cookie('User_Name', uid.val());
                    }
                    else {
                        $.removeCookie('isRemember');
                        $.removeCookie('User_Name');
                    }
//必须走这行代码
                    $.cookie('User_Name', uid.val());
//页面跳转
                    $state.go(window.tescomm.config.app.IndexHref);

                } else {
                    showMsg('data.State不是true');
                }
            },function(error){
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