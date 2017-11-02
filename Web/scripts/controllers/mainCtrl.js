/******************************************************************

 * Copyright (C): 北京泰合佳通信息技术有限公司广东分公司

 * 创建人: 林俊杰

 * 创建时间: 2015年5月21日

 ******************************************************************/

define(['cookie',
    'scripts/services/authenticatedService',
    'scripts/directives/radioBroadcastDirt',
    'scripts/directives/leftMenuDirt',
    'scripts/services/httpService',
    'ngload!scripts/requireHelper/requireNotification',
    'angular-ui-grid'
], function () {
    return ['$scope', '$state', 'httpService', 'Notification', '$timeout', function ($scope, $state, httpService, Notification, $timeout) {
        $scope.User_ID = $.cookie('User_ID');
        $scope.User_Name = $.cookie('User_Name');
        $scope.Tescomm_Access_Token = $.cookie('Tescomm_Access_Token');

        var vm = this;
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

        function myBrowser() {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
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
        var promise = httpService.postRemote('Open', 'OAuth', 'GetUserRight', {token: httpService.getCookie("Tescomm_Access_Token"), app: window.tescomm.config.app.Id}).then(function (data) {
                $scope.userlists = data;
                if (data.length > 0) {
                    $scope.selectedMenu = $scope.userlists[0].Name;
                    $scope.count = 0;
                    initialMenu($scope.userlists);

                    var curpath=window.location.href;
                    if(curpath.indexOf("main")>=0 && curpath.indexOf("main/")<0 )//第一次进入系统，不是刷新后进入系统
                    {
                        if ($scope.count > 0) {
                            $state.go('main', {neid: null});
                        }
                        else {
                            $state.go('main.welcome');
                        }
                    }
                }
            },
            function (errorMessage) {
                Notification.error({message: errorMessage, delay: 5000});
            });

        function initialMenu(menuList) {

            if (menuList != null && menuList.length > 0) {

                for (var i = 0; i < menuList.length; i++) {
                    var item = menuList[i];
                    if(item.Url!=null)
                    {
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
            setCookie('menu_One', $scope.menu_One);
            setCookie('menu_Tow', null);
            setCookie('menuThree', null);
            $('#inputValue').val('');
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
            setCookie('menu_Tow', $scope.menu_Tow);
            setCookie('menuThree', null);
            if (item.Name == '网络拓扑图' || item.Name == 'GIS呈现' || item.Name == '客户资源统计') {
                breadcrumb();
                setCookie('menu_mark', '');
            } else {
                $('.breadcrumb .breadcrumbList02').removeClass('am-active1');
                setCookie('menu_mark', 'A');
            }
            $('#inputValue').val('');

        };
        //三级
        $scope.btnItemClick = function (item) {
            emitClearTimer(item.Url);
            $scope.nulist=[];
            $('.breadcrumb .breadcrumbList02').removeClass('am-active1');
            $scope.menuThree = item.Name;
            if (name != "历史告警统计") {
                $scope.alarmSearch = false;
                $.cookie('alarmSearch', 'alarmSearch')
            } else {
                $scope.alarmSearch = true;
                $.cookie('alarmSearch', '')
            }
            $scope.menuThreeShow = true;
            setCookie('menuThree', $scope.menuThree);
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

        //设置cookie
        function setCookie(name, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        }

        //读取
        var menu_One = getCookie("menu_One");
        var menu_Tow = getCookie("menu_Tow");
        var menuThree = getCookie("menuThree");
        if (menu_One != null) {
            $scope.menu_One = menu_One;
        } else {
            $scope.menu_One = '告警管理';
            $scope.menuTowShow = true;
            $scope.menu_Tow = '网络拓扑图';
            $scope.menuThreeShow = false;
        }
        if (menu_Tow != 'null' && menu_Tow != null) {
            $scope.menu_Tow = menu_Tow;
            $scope.menuTowShow = true;
        } else {
            $scope.menuThreeShow = false;
        }
        if (menuThree != 'null' && menuThree != null) {
            $scope.menuThree = menuThree;
            $scope.menuThreeShow = true;
            $('.breadcrumb .breadcrumbList02').removeClass('am-active1');
        } else {
            $scope.menuThreeShow = false;
        }
        if (getCookie('menu_mark') == 'A') {
            $('.breadcrumb .breadcrumbList02').removeClass('am-active1');
        }
        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }

        //获取数据
        //$scope.$on('to-exist', function (event, data) {
        //    $scope.exist = true;
        //});

        $scope.isDown = false;

        //获取数据
        $scope.$on('to-mainnu', function (event, data) {
            $scope.nulist = data;
            $scope.isDown = true;

        });
        $scope.$on('topo-name', function (event, data) {
            $scope.menu_Tow = data;
            $scope.menuThreeShow = false;
        });
        $scope.$on('breadcrumb-name', function (event, data) {
            $scope.menu_One = data.menu_One;
            $scope.menu_Tow = data.menu_Tow;
            $scope.menuThreeShow = true;
            $scope.menuThree = data.menuThree;

        });

        //选中某条数据查询
        $scope.appclick = function (appid) {
            for (var i = 0; i < $scope.AppItems.length; i++) {
                if ($scope.AppItems[i].App_Id == appid) {
                    var item = $scope.AppItems[i];
                    var url = item.RELEASEIP + "/" + item.DEFAULTROUTE + "?token=" + $.cookie("Tescomm_Access_Token");
                    //window.open(url);
                    location.href = url;
                }
            }
            //  Notification.error({message: appid, delay: 5000});
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
        //失去焦点，隐藏下拉
        // $scope.hides=function(){
        //     $scope.isDown=false;
        // }

        $("#inputValue").focus(function () {
            $scope.isDown = false;
        });
        //失去焦点
        //
        $scope.InputFocus = function () {
            $scope.isDown = true;

        }
        $scope.InputBlur = function () {
            var a = $timeout(function () {
                $scope.isDown = false;
            }, 300);
        };

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
        //public dynamic UserChangePassword(string token, string password, string newpwd)

        var path = window.location.hash;
        var pathAry = path.split("?");
        var pathMain = pathAry[pathAry.length - 2];
        if (pathMain != undefined) {
            var pathName = pathMain.split("/");
            var last = pathName[pathAry.length];
            function Route() {
                if (last == 'welcome') {
                    $scope.menu_One = '欢迎页';
                    $scope.menuTowShow = false;
                    $scope.menuThreeShow = false;
                    breadcrumb()
                } else if (last == 'topology') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '网络拓扑图';
                    $scope.menuThreeShow = false;
                    breadcrumb()
                } else if (last == 'amMonitoring') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警监控';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '当前告警监控';
                    breadcrumbRem()
                } else if (last == 'coveredArea') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警监控';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '保障区域监控';
                    breadcrumbRem()
                } else if (last == 'recoveryMonitor') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警监控';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '故障处理监控';
                    breadcrumbRem()
                } else if (last == 'historyQuery') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '历史告警';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '历史告警查询';
                    breadcrumbRem()
                } else if (last == 'historyStats') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '历史告警';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '历史告警统计';
                    breadcrumbRem()
                } else if (last == 'redefinition') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警策略';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '重定义策略';
                    breadcrumbRem()
                } else if (last == 'ridtact') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警策略';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '屏蔽策略';
                    breadcrumbRem()
                } else if (last == 'presstact') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警策略';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '压缩策略';
                    breadcrumbRem()
                } else if (last == 'rule') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '故障规则';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '故障规则管理';
                    breadcrumbRem()
                } else if (last == 'processing') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '故障规则';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '处理时限规则管理';
                    breadcrumbRem()
                } else if (last == 'statisticsCSR') {
                    $scope.menu_One = '配置管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '客户资源统计';
                    breadcrumb()
                } else if (last == 'negis') {
                    $scope.menu_One = '配置管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = 'GIS呈现';
                    breadcrumb()
                } else if (last == 'negis') {
                    $scope.menu_One = '配置管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = 'GIS呈现';
                    breadcrumb()
                }
            }
            Route();
        }
        var pathAryVice = path.split("/");
        var ViceName = pathAryVice[pathAryVice.length - 1];
        if(ViceName != undefined){
            function Routetoken() {  //初始化登录进来
                if (ViceName == 'welcome') {
                    $scope.menu_One = '欢迎页';
                    $scope.menuTowShow = false;
                    $scope.menuThreeShow = false;
                    breadcrumb()
                } else if (ViceName == 'topology') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '网络拓扑图';
                    $scope.menuThreeShow = false;
                    breadcrumb()
                } else if (ViceName == 'amMonitoring') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警监控';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '当前告警监控';
                    breadcrumbRem()
                } else if (ViceName == 'coveredArea') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警监控';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '保障区域监控';
                    breadcrumbRem()
                } else if (ViceName == 'recoveryMonitor') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警监控';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '故障处理监控';
                    breadcrumbRem()
                } else if (ViceName == 'historyQuery') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '历史告警';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '历史告警查询';
                    breadcrumbRem()
                } else if (ViceName == 'historyStats') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '历史告警';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '历史告警统计';
                    breadcrumbRem()
                } else if (ViceName == 'redefinition') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警策略';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '重定义策略';
                    breadcrumbRem()
                } else if (ViceName == 'ridtact') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警策略';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '屏蔽策略';
                    breadcrumbRem()
                } else if (ViceName == 'presstact') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警策略';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '压缩策略';
                    breadcrumbRem()
                } else if (ViceName == 'rule') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '故障规则';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '故障规则管理';
                    breadcrumbRem()
                } else if (ViceName == 'processing') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '故障规则';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '处理时限规则管理';
                    breadcrumbRem()
                } else if (ViceName == 'statisticsCSR') {
                    $scope.menu_One = '配置管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '客户资源统计';
                    breadcrumb()
                } else if (ViceName == 'negis') {
                    $scope.menu_One = '配置管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = 'GIS呈现';
                    breadcrumb()
                } else if (ViceName == 'negis') {
                    $scope.menu_One = '配置管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = 'GIS呈现';
                    breadcrumb()
                }
            }
            Routetoken()
        }

        $scope.$on('$locationChangeStart', function(event, newUrl, oldUrl){
            var newRoute = newUrl.split("main/");
            var newRouteIn = newRoute[newRoute.length - 1];
                if (newRouteIn == 'welcome') {
                    $scope.menu_One = '欢迎页';
                    $scope.menuTowShow = false;
                    $scope.menuThreeShow = false;
                    breadcrumb()
                } else if (newRouteIn == 'topology') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '网络拓扑图';
                    $scope.menuThreeShow = false;
                    breadcrumb()
                } else if (newRouteIn == 'amMonitoring') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警监控';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '当前告警监控';
                    breadcrumbRem()
                } else if (newRouteIn == 'coveredArea') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警监控';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '保障区域监控';
                    breadcrumbRem()
                } else if (newRouteIn == 'recoveryMonitor') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警监控';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '故障处理监控';
                    breadcrumbRem()
                } else if (newRouteIn == 'historyQuery') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '历史告警';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '历史告警查询';
                    breadcrumbRem()
                } else if (newRouteIn == 'historyStats') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '历史告警';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '历史告警统计';
                    breadcrumbRem()
                } else if (newRouteIn == 'redefinition') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警策略';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '重定义策略';
                    breadcrumbRem()
                } else if (newRouteIn == 'ridtact') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警策略';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '屏蔽策略';
                    breadcrumbRem()
                } else if (newRouteIn == 'presstact') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '告警策略';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '压缩策略';
                    breadcrumbRem()
                } else if (newRouteIn == 'rule') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '故障规则';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '故障规则管理';
                    breadcrumbRem()
                } else if (newRouteIn == 'processing') {
                    $scope.menu_One = '告警管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '故障规则';
                    $scope.menuThreeShow = true;
                    $scope.menuThree = '处理时限规则管理';
                    breadcrumbRem()
                } else if (newRouteIn == 'statisticsCSR') {
                    $scope.menu_One = '配置管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = '客户资源统计';
                    breadcrumb()
                } else if (newRouteIn == 'negis') {
                    $scope.menu_One = '配置管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = 'GIS呈现';
                    breadcrumb()
                } else if (newRouteIn == 'negis') {
                    $scope.menu_One = '配置管理';
                    $scope.menuTowShow = true;
                    $scope.menu_Tow = 'GIS呈现';
                    breadcrumb()
                }
        });
        function breadcrumb() {
            $('.breadcrumb .breadcrumbList02').addClass('am-active1')
        }
        function breadcrumbRem() {
            $('.breadcrumb .breadcrumbList02').removeClass('am-active1')
        }

    }]
});
