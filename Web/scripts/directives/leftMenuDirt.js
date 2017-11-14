/**
 * Created by cuishiyong on 2017/3/24.
 */
define(['angularAMD'], function (angularAMD) {
    'use strict';
    angularAMD.directive('leftMenu',
        function () {
            return {
                restrict: 'E',
                templateUrl: 'views/dirt/leftMenuDirt.html',
                link: function ($scope, element, attr) {
                    //根据路径实现页面跳转
                    function Routetoken(ViceName) {
                        if (ViceName == 'welcome') {
                            $scope.menu_One = '欢迎页';
                            $scope.menuTowShow = false;
                            $scope.menuThreeShow = false;
                        }else if(ViceName == 'uiGrid'){
                            $scope.menu_One = 'uiGrid表格和弹出确认框框';
                        }else if(ViceName == 'echartLine'){
                            resourceMenu()
                            $scope.menu_Tow = '折线图';
                        }else if(ViceName == 'echartBar'){
                            resourceMenu()
                            $scope.menu_Tow = '柱状图';
                        }


                    }
                    function resourceMenu() {
                        $scope.menu_One = 'ECHARTS图';//一级菜单
                        $scope.menuTowShow = true; //二级菜单显隐
                        $scope.menuThreeShow = false;//三级菜单显隐
                    };

                    //（1）个人工作台跳转带参数执行
                    var path = window.location.hash; //获取路径
                    var pathAry = path.split("?"); //带参数
                    var pathMain = pathAry[pathAry.length - 2];
                    if (pathMain != undefined) {
                        var pathName = pathMain.split("/");
                        var last = pathName[pathAry.length];
                        alert('1')
                        Routetoken(last);
                    }
                    //（2）也页面刷新执行
                    var pathAryVice = path.split("/"); //不带参数
                    var ViceName = pathAryVice[pathAryVice.length - 1];
                    if(ViceName != undefined){
                        Routetoken(ViceName);
                    }
                    //页面跳转执行
                    $scope.$on('$locationChangeStart', function(event, newUrl, oldUrl){ //手动换路径
                        var newRoute = newUrl.split("main/");
                        var newRouteIn = newRoute[newRoute.length - 1];
                        Routetoken(newRouteIn);
                    });
                }
            };
        });
})