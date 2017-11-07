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
                    controllerUrl: 'scripts/controllers/uiGridCtrl'
                })).state('main.uiGrid',angularAMD.route({  //ui-grid表格
                    url: '/uiGridCtrl',
                    templateUrl: 'views/uiGrid.html',
                    controllerUrl: 'scripts/controllers/uiGridCtrl'
                })).state('login',angularAMD.route({
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controllerUrl: 'scripts/controllers/loginCtrl'
                }));
                $urlRouterProvider.otherwise('/login');
            }]);
        app.run(function ($rootScope,$state) {
            // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            //     $('.modal-backdrop').css('display','none')
            // })
        });
        return angularAMD.bootstrap(app);
    });