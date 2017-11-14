/******************************************************************

 * Copyright (C): 北京泰合佳通信息技术有限公司广东分公司

 * 创建人: 林俊杰

 * 创建时间: 2015年5月21日

 ******************************************************************/

define(['cookie', //jquery cookie存储
    'scripts/services/authenticatedService',
    'scripts/directives/radioBroadcastDirt',
    'scripts/directives/leftMenuDirt',
    'scripts/services/httpService',
    'ngload!scripts/requireHelper/requireNotification', //报错提示插件
    'ngload!angular-ui-grid', // 表格插件
    'bootstrap',
], function () {
    return ['$scope','$http','$state', 'httpService', 'Notification', '$timeout', function ($scope,$http,$state, httpService, Notification, $timeout) {
        //存储 cookie ；
        $.cookie('Tescomm_Access_Token', 'B2A63B67DB6A29B98F834A7B34C64D8A');

        $scope.Tescomm_Access_Token = $.cookie('Tescomm_Access_Token');
        $scope.sidebarOpen = function () {
            $(".alarmConLeft").toggleClass("sidebar-open");
            $("#alarmConRight").toggleClass("sidebar-left");
            $(".logoLeft").toggleClass("logoLeft01");
            $(".cd-nav-trigger").toggleClass("cd-nav-right");
            $scope.$broadcast('to-topology', "data");
        };

        initStyle();
        function initStyle() {
            $('#alarmConRight').css({"height": ($(window).height() - 65) + 'px'});
        }
        $(window).resize(function () {
            initStyle();
        });
        $scope.userPhoto = "./imgs/user-128x128.jpg";

// 远程git请求用postRemote 方法（postRemote 远程邮递） 请求的是登录者的信息
        httpService.postRemote('Open', 'OAuth', 'GetUserInfo', {token: $.cookie("Tescomm_Access_Token")}).then(function (data) {
                if (data != [] && data.Photo != null)
                    $scope.userPhoto = window.tescomm.config.system.AuthorizeService + "Open/FileService/Download?fileId=" + data.Photo;
                else
                    $scope.userPhoto = "./imgs/user-128x128.jpg";
            },
            function (errorMessage) {
                Notification.error({message: errorMessage, delay: 5000});
            });
        var promise = httpService.postRemote('Open', 'OAuth', 'GetUserApps', {
            token: $.cookie("Tescomm_Access_Token"),
            appid: window.tescomm.config.app.Id
        }).then(function (data) {
                if (data != [])
                    $scope.AppItems = data;
            },
            function (errorMessage) {
                Notification.error({message: errorMessage, delay: 5000});
            });

//取得浏览器的userAgent字符串
        function myBrowser() {
            var userAgent = navigator.userAgent;
            var isOpera = userAgent.indexOf("Opera") > -1;
            if (userAgent.indexOf("Firefox") > -1) {
                return "FF";
            } //判断是否Firefox浏览器
            if (userAgent.indexOf("Chrome") > -1) {
                return "Chrome";
            }
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                return "IE";
            }
            ; //判断是否IE浏览器
        }
        var mb = myBrowser();

//请求的左侧菜单 此方法是异步的，所以会后面加载
        $http({
            url: 'json/menu.json',
            method: 'GET',
            contentType: "application/json; charset=utf-8"
        }).success(function (data, header, config, status) {
            $scope.userlists=data
        }).error(function (data, header, config, status) {
            //处理响应失败
        });

//localStorage存储 sessionStorage存储和cookie存储
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

//判断浏览器
        function initialMenu(menuList) {
            if (menuList != null && menuList.length > 0) {
                for (var i = 0; i < menuList.length; i++) {
                    var item = menuList[i];
                    if(item.Url!=null) {
                        var urlTow = item.Url.split("/");
                        var pathUrl = urlTow[urlTow.length - 1];
                        if (pathUrl == 'topology') {
                            $scope.count++;
                        }
                    }
                    if ("Chrome" == mb) {
                        if (item.Url == '#' || item.Url == '' || item.Url == null) {
                            item.Url = 'javascript:;';
                        }
                        ;
                    }
                    ;
                    if ("IE" == mb) {
                        if (item.Url == '#' || item.Url == '' || item.Url == null) {
                            item.Url = '';
                        }
                        ;
                    }
                    if (item.Icon != null && item.Icon != '') {
                        item.Icon1 = item.Icon.substr(0, item.Icon.length - 4) + "A.png";
                    }
                    if (item.Children != null) {
                        initialMenu(item.Children);
                    }
                    ;

                }

            }

        }
        //一级
        $scope.btnClick = function (event, item) {
            emitClearTimer(item.Url);
            $scope.nulist=[];
            getCss(event);
            $scope.menu_One = item.Name;
            $scope.menuThreeShow = false;
            $scope.menuTowShow = false;
        };
        //二级
        $scope.btnSonClick = function (event, item) {
            emitClearTimer(item.Url);
            $scope.nulist=[];
            getCss(event);
            $scope.menu_Tow = item.Name;
            $scope.menuTowShow = true;
            $scope.menuThreeShow = false;
            $scope.menuThree =false;
        };
        function emitClearTimer(url) {
            $scope.$broadcast('destroy',url);
        }
        //三级菜单
        function getCss(event) {
            var _this = event.srcElement || event.target;
            if (_this.nodeName == 'A') {
                if ($(_this).parent().hasClass("curStyle")) {
                    $(_this).parent().removeClass("curStyle");
                } else {
                    $(_this).parent().addClass("curStyle").siblings().removeClass("curStyle");
                }
            }
            else if (_this.nodeName == 'SPAN' || _this.nodeName == 'I' || _this.nodeName == 'IMG') {
                if ($(_this).parent().parent().hasClass("curStyle")) {
                    $(_this).parent().parent().removeClass("curStyle");
                } else {
                    $(_this).parent().parent().addClass("curStyle").siblings().removeClass("curStyle");
                };
            }
        }


 //选中某条数据查询
        $scope.nuclick = function (id) {
            $scope.$broadcast('to-single', id);
            $scope.isDown = false;
        };
//检测输入框变化
        $scope.getNamesByInput = function (item) {
            if (item != "")
                $scope.$broadcast('to-inputchange', item);
            else
                $scope.isDown = false;
        }
//模糊查询
        $scope.getList = function (item) {
            $scope.isDown = false;
            $scope.$broadcast('to-name', item);
        }

//修改密码
        $scope.changePwd = function () {
            if (!$scope.newPwd) {
                Notification.error({message: "新密码不能为空", delay: 5000});
                return;
            }
            if (!(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){7,19}$/.test($scope.newPwd))) {
                Notification.error({message: "密码只能输入8-20个以字母开头、可带数字、“_”、“.”的字串！", delay: 5000});
                return;
            }
            if ($scope.surePwd !== $scope.newPwd) {
                Notification.error({message: "两次输入的密码必须一致！", delay: 5000});
                return;
            }
            httpService.postRemote('Open', 'OAuth', "UserChangePassword", {
                token: $scope.Tescomm_Access_Token,
                password: $scope.oldPwd,
                newpwd: $scope.newPwd
            }).then(function (data) {
                if (data.success == true) {
                    Notification.success({message: "修改密码成功！", delay: 5000});
                }
                else {
                    Notification.error({message: "修改密码失败！", delay: 5000});
                }
                $('#modifyPwdModal').modal('hide');
            });
        };
        $scope.openModal = function () {
            $scope.oldPwd = "";
            $scope.newPwd = "";
            $scope.surePwd = "";
        };

    }]
});
