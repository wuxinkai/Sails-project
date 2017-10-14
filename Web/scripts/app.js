/******************************************************************

 * Copyright (C): 北京泰合佳通信息技术有限公司广东分公司
 * 创建人: 林俊杰
 * 创建时间: 2015年11月23日
 * 版本: WebFramework v2.0
 * 描述: Angular路由配置及启动文件

 ******************************************************************/

define(['scripts/common'],
    function (angularAMD) {
        'use strict';
        var app = angular.module('Position', ['ui.router']);
        app.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.state('main', angularAMD.route({
                    url: '/main',
                    templateUrl: 'views/main.html',
                    controllerUrl: 'scripts/controllers/mainCtrl'
                })).state('main.welcome',angularAMD.route({  //欢迎页
                    url: '/welcome',
                    templateUrl: 'views/welcome.html',
                    controllerUrl: 'scripts/controllers/welcomeCtrl'
                })).state('main.redefinition', angularAMD.route({ //重定义策略
                    url: '/redefinition',
                    templateUrl: 'views/redefinition.html',
                    controllerUrl: 'scripts/controllers/tactCtrl'
                 })).state('main.ridtact', angularAMD.route({ //屏蔽策略
                    url: '/ridtact',
                    templateUrl: 'views/ridtact.html',
                    controllerUrl: 'scripts/controllers/ridtactCtrl'
                })).state('main.presstact', angularAMD.route({ //压缩策略
                    url: '/presstact',
                    templateUrl: 'views/redefinition.html',
                    controllerUrl: 'scripts/controllers/presstactCtrl'
                })).state('main.amMonitoring',angularAMD.route({//当前告警
                    url: '/amMonitoring',
                    templateUrl: 'views/amMonitoring.html',
                    params: {neid:"" },
                    controllerUrl: 'scripts/controllers/amMonitoringCtrl'
                })).state('main.recoveryMonitor',angularAMD.route({//故障监控
                    url: '/recoveryMonitor',
                    templateUrl: 'views/recoveryMonitor.html',
                    params: {neid:"" },
                    controllerUrl: 'scripts/controllers/recoveryMoniCtrl'
                })).state('main.guarantee',angularAMD.route({
                    url: '/guarantee',
                    templateUrl: 'views/guarantee.html',
                    params: {entity:{},btnPermission:{} },
                    controllerUrl: 'scripts/controllers/guaranteeCtrl'
                })).state('main.linkMonitor',angularAMD.route({
                    url: '/linkMonitor',
                    templateUrl: 'views/linkMonitor.html',
                    controllerUrl: 'scripts/controllers/linkMonitorCtrl'
                })).state('main.processing',angularAMD.route({
                    url: '/processing',
                    templateUrl: 'views/processing.html',
                    controllerUrl: 'scripts/controllers/processingCtrl'
                 })).state('main.collectionState',angularAMD.route({
                    url: '/collectionState',
                    templateUrl: 'views/collectionState.html',
                    controllerUrl: 'scripts/controllers/collectionStateCtrl'
                 })).state('main.coveredArea',angularAMD.route({//重保区域
                    url: '/coveredArea',
                    templateUrl: 'views/coveredArea.html',
                    controllerUrl: 'scripts/controllers/coveredAreaCtrl'
                })).state('main.topology',angularAMD.route({
                    url: '/topology',
                    templateUrl: 'views/topology.html',
                    params: {neid:"" },
                    controllerUrl: 'scripts/controllers/topologyCtrl'
                })).state('main.negis',angularAMD.route({
                    url: '/negis',
                    templateUrl: 'views/negis.html',
                    params: {neid:"" },
                    controllerUrl: 'scripts/controllers/negisCtrl'
                })).state('main.rule',angularAMD.route({
                    url: '/rule',
                    templateUrl: 'views/rule.html',
                    controllerUrl: 'scripts/controllers/ruleCtrl'
                })).state('main.historyQuery',angularAMD.route({//历史告警
                    url: '/historyQuery',
                    templateUrl: 'views/historyQuery.html',
                    params: {neid:"" },
                    controllerUrl: 'scripts/controllers/historyQueryCtrl'
                })).state('main.historyStats',angularAMD.route({
                    url: '/historyStats',
                    templateUrl: 'views/historyStats.html',
                    controllerUrl: 'scripts/controllers/historyStatsCtrl',
                    params:{condition:null}
                })).state('alarmScreen',angularAMD.route({
                    url: '/alarmScreen',
                    templateUrl: 'views/alarmScreen.html',
                    controllerUrl: 'scripts/controllers/alarmScreenCtrl'
                })).state('main.statisticsTrunk',angularAMD.route({  //干线统计
                    url: '/statisticsTrunk',
                    templateUrl: 'views/statisticsTrunk.html',
                    controllerUrl: 'scripts/controllers/statisticstrunkCtrl'
                })).state('main.statisticsCSR',angularAMD.route({  //
                    url: '/statisticsCSR',
                    templateUrl: 'views/statisticsCSR.html',
                    controllerUrl: 'scripts/controllers/statisticscsrCtrl'
                })).state('login',angularAMD.route({
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controllerUrl: 'scripts/controllers/loginCtrl'
                }));
                $urlRouterProvider.otherwise('/login');
            }]);
        app.run(function ($rootScope,$state) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                $('.modal-backdrop').css('display','none')
            })
        });
        return angularAMD.bootstrap(app);
    });