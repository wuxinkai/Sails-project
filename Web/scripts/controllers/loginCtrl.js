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
            $(btn).text("登录中...");
            $(btn).attr("disabled", "disabled");
            httpService.postRemote('Open','OAuth','Login',{
                userName: uid.val(), password: pwd.val(), verificationCode: vc.val(), clientId: window.tescomm.config.app.Id
                , callback: "/_authorizecallback?redirect_uri=/web/index.html#/main/simple"/*登录成功后显示的第一个页面，只需修改参数redirect_uri后对应的内容即可*/
            }).then(function (data) {
                $scope.changeImg();
                if (data.State) {
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
                    $.cookie('User_Name', uid.val());
                    $.cookie('User_ID', data.User_ID);
                    $.cookie('Tescomm_Access_Token', data.Access_Token);
                    $.ajax(window.tescomm.config.system.AuthorizeService + 'Open/OAuth/GetRoleDataByToken', {
                        type: 'POST', data: {
                            token: data.Access_Token
                            , callback: ""
                        },dataType:'json',
                        async:false,
                        success: function (data, staus) {
                            $.cookie('provids',data.proids);
                            $.cookie('cityids',data.cityids);
                            $.cookie('areaids',data.areaids);
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                    $state.go(window.tescomm.config.app.IndexHref);
                    //location.href = '/web/index.html#/main/processing';
                    //location.href = '/web/index.html#/'+window.tescomm.config.app.IndexHref.replace(".","/");
                    // location.href = '/web/index.html#/main/topology';
                } else {
                    showMsg(data.Description);
                }
                $(btn).text("登  录");
                $(btn).removeAttr("disabled");
            },function(error){
                //location.href = "/Web/index.html#/main/simple";
                $scope.changeImg();

                showMsg('请求错误，' + error);
                $(btn).text("登  录");
                $(btn).removeAttr("disabled");
            });
/*
            $.ajax(window.tescomm.config.system.AuthorizeService + 'Open/OAuth/Login', {
                type: 'POST', data: {
                    userName: uid.val(), password: pwd.val(), verificationCode: vc.val(), clientId: window.tescomm.config.app.Id
                    , callback: "/_authorizecallback?redirect_uri=/web/index.html#/main/simple"/!*登录成功后显示的第一个页面，只需修改参数redirect_uri后对应的内容即可*!/
                },dataType:'json',
                async:false,
                success: function (data, staus) {
                    $scope.changeImg();
                    if (data.State) {
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
                        $.cookie('User_Name', uid.val());
                        $.cookie('User_ID', data.User_ID);
                        $.cookie('Tescomm_Access_Token', data.Access_Token);
                        $.ajax(window.tescomm.config.system.AuthorizeService + 'Open/OAuth/GetRoleDataByToken', {
                            type: 'POST', data: {
                                token: data.Access_Token
                                , callback: ""
                            },dataType:'json',
                            async:false,
                            success: function (data, staus) {
                                $.cookie('provids',data.proids);
                                $.cookie('cityids',data.cityids);
                                $.cookie('areaids',data.areaids);
                            },
                             error: function (xhr, status, error) {
                                }
                            });

                         $state.go(window.tescomm.config.app.IndexHref);
                        //location.href = '/web/index.html#/main/processing';
                        //location.href = '/web/index.html#/'+window.tescomm.config.app.IndexHref.replace(".","/");
                        // location.href = '/web/index.html#/main/topology';
                    } else {
                        showMsg(data.Description);
                    }
                    $(btn).text("登  录");
                    $(btn).removeAttr("disabled");

                }
                , error: function (xhr, status, error) {
                    //location.href = "/Web/index.html#/main/simple";
                    $scope.changeImg();

                        showMsg('请求错误，' + error);
                    $(btn).text("登  录");
                    $(btn).removeAttr("disabled");
                }
            });
*/
        }
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