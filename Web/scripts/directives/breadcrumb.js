// define([], function () {
//     return ['$scope', function ($scope) {
//
//         var path = window.location.hash;
//         var pathAry = path.split("?");
//         var pathMain = pathAry[pathAry.length - 2];
//         var pathVice = pathAry[pathAry.length - 1];
//         if(pathVice !=undefined){
//             var pathViceName = pathVice.split("/");
//             var ViceName = pathViceName[pathViceName.length-1];
//             if(ViceName=='welcome'){
//                 $scope.menu_One ='欢迎页';
//                 $scope.menuTowShow=false;
//                 $scope.menuThreeShow=false;
//             }else if(ViceName=='topology'){
//                 $scope.menu_One='告警管理';
//                 $scope.menuTowShow=true;
//                 $scope.menu_Tow='网络拓扑图';
//                 $scope.menuThreeShow=false;
//                 breadcrumb()
//             }else if(ViceName=='amMonitoring'){
//                 $scope.menu_One='告警管理';
//                 $scope.menuTowShow=true;
//                 $scope.menu_Tow='告警监控';
//                 $scope.menuThreeShow=true;
//                 $scope.menuThree='当前告警监控';
//             }else if(ViceName=='historyQuery'){
//                 $scope.menu_One='告警管理';
//                 $scope.menuTowShow=true;
//                 $scope.menu_Tow='历史告警';
//                 $scope.menuThreeShow=true;
//                 $scope.menuThree='历史告警查询';
//                 $('.breadcrumb .breadcrumbList02').removeClass('am-active1');
//             }else if(ViceName=='recoveryMonitor'){
//                 $scope.menu_One='告警管理';
//                 $scope.menuTowShow=true;
//                 $scope.menu_Tow='告警监控';
//                 $scope.menuThreeShow=true;
//                 $scope.menuThree='故障处理监控';
//                 $('.breadcrumb .breadcrumbList02').removeClass('am-active1');
//             }
//         }
//
//         if(pathMain !=undefined){
//             var pathName = pathMain.split("/");
//             var last = pathName[pathAry.length];
//             function Route() {
//                 if(last =='topology'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='网络拓扑图';
//                     $scope.menuThreeShow=false;
//                     breadcrumb()
//                 }else if(last =='amMonitoring'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='告警监控';
//                     $scope.menuThreeShow=true;
//                     $scope.menuThree='当前告警监控';
//                 }else if(last =='coveredArea'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='告警监控';
//                     $scope.menuThreeShow=true;
//                     $scope.menuThree='保障区域监控';
//                 }else if(last =='recoveryMonitor'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='告警监控';
//                     $scope.menuThreeShow=true;
//                     $scope.menuThree='故障处理监控';
//                 }else if(last =='historyQuery'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='历史告警';
//                     $scope.menuThreeShow=true;
//                     $scope.menuThree='历史告警查询';
//                 }else if(last =='historyStats'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='历史告警';
//                     $scope.menuThreeShow=true;
//                     $scope.menuThree='历史告警统计';
//                 }else if(last =='redefinition'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='告警策略';
//                     $scope.menuThreeShow=true;
//                     $scope.menuThree='重定义策略';
//                 }else if(last =='ridtact'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='告警策略';
//                     $scope.menuThreeShow=true;
//                     $scope.menuThree='屏蔽策略';
//                 }else if(last =='presstact'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='告警策略';
//                     $scope.menuThreeShow=true;
//                     $scope.menuThree='压缩策略';
//                 }else if(last =='rule'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='故障规则';
//                     $scope.menuThreeShow=true;
//                     $scope.menuThree='故障规则管理';
//                 }else if(last =='processing'){
//                     $scope.menu_One='告警管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='故障规则';
//                     $scope.menuThreeShow=true;
//                     $scope.menuThree='处理时限规则管理';
//                 }else if(last =='statisticsCSR'){
//                     $scope.menu_One='配置管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='客户资源统计';
//                     breadcrumb()
//                 }else if(last =='negis'){
//                     $scope.menu_One='配置管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='GIS呈现';
//                     breadcrumb()
//                 }else if(last =='negis'){
//                     $scope.menu_One='配置管理';
//                     $scope.menuTowShow=true;
//                     $scope.menu_Tow='GIS呈现';
//                     breadcrumb()
//                 }
//             }
//             Route();
//         }
//         function breadcrumb() {
//             $('.breadcrumb .breadcrumbList02').addClass('am-active1')
//         }
//
//     }]
// });
