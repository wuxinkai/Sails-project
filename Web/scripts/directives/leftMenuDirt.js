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
                link: function (scope, element, attr) {
                    //根据路径实现页面跳转
                    function Routetoken(ViceName) {
                        if (ViceName == 'welcome') {
                            $scope.menu_One = '欢迎页';
                            $scope.menuTowShow = false;
                            $scope.menuThreeShow = false;
                        }else if(ViceName == 'orderBacklog'){
                            resourceMenu()
                            $scope.menuThree = '故障抢修';//三级菜单
                        }else if(ViceName == 'orderQuery'){
                            resourceMenu()
                            $scope.menuThree = '故障工单查询';
                        }else if(ViceName == 'orderManage'){
                            dispatchMenu()
                            $scope.menuThree ="故障派单规则管理"
                        }else if(ViceName == 'peopleManage'){
                            dispatchMenu()
                            $scope.menuThree ="人员管理"
                        }else if(ViceName == 'peopleManage'){
                            dispatchMenu()
                            $scope.menuThree ="维护单元管理"
                        }else if(ViceName == 'roomQuery'){
                            dispatchMenu()
                            $scope.menuThree ="机房维护单元关系查询"
                        }else if(ViceName == 'noticeManage'){
                            dispatchMenu()
                            $scope.menuThree ="通知规则管理"
                        }else if(ViceName == 'monitorView'){
                            dispatchMenu()
                            $scope.menuThree ="监控视图"
                        }else if(ViceName == 'monitorStatistic'){
                            $scope.menu_One = '故障抢修';//一级菜单
                            $scope.menuTowShow = true; //二级菜单显隐
                            $scope.menuThreeShow = false;
                            $scope.menu_Tow ="集中监控统计"
                        }else if(ViceName == 'timedTask'){
                            inspectionMenu()
                            $scope.menuThree ="定时任务"
                        }else if(ViceName == 'handTask'){
                            inspectionMenu()
                            $scope.menuThree ="手动任务"
                        }else if(ViceName == 'taskSearch'){
                            inspectionMenu()
                            $scope.menuThree ="任务查询"
                        }else if(ViceName == 'routingPeopleManger'){
                            adminMenu()
                            $scope.menuThree ="巡检人员管理"
                        }else if(ViceName == 'routingUnitManger'){
                            adminMenu()
                            $scope.menuThree ="巡检点管理"
                        }else if(ViceName == 'routingMangerSearch'){
                            adminMenu()
                            $scope.menuThree ="巡检管理查询"
                        }else if(ViceName == 'statisticsTask'){
                            countMenu()
                            $scope.menuThree ="工单统计"
                        }else if(ViceName == 'risk'){
                            countMenu()
                            $scope.menuThree ="隐患点统计"
                        }


                    }
                    function resourceMenu() {
                        $scope.menu_One = '故障抢修';//一级菜单
                        $scope.menuTowShow = true; //二级菜单显隐
                        $scope.menu_Tow = '集中监控故障处理';//二级菜单
                        $scope.menuThreeShow = true;//三级菜单显隐
                    };
                    function dispatchMenu() {
                        $scope.menu_One = '故障抢修';//一级菜单
                        $scope.menuTowShow = true; //二级菜单显隐
                        $scope.menu_Tow = '综合调度';//二级菜单
                        $scope.menuThreeShow = true;//三级菜单显隐
                    }
                    function inspectionMenu() {
                        $scope.menu_One = '线路巡检';
                        $scope.menuTowShow = true;
                        $scope.menu_Tow = '任务调度';
                        $scope.menuThreeShow = true;
                    }
                    function adminMenu() {
                        $scope.menu_One = '线路巡检';
                        $scope.menuTowShow = true;
                        $scope.menu_Tow = '巡检管理';
                        $scope.menuThreeShow = true;
                    }
                    function countMenu() {
                        $scope.menu_One = '线路巡检';
                        $scope.menuTowShow = true;
                        $scope.menu_Tow = '巡检统计';
                        $scope.menuThreeShow = true;
                    }

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