/******************************************************************

 * Copyright (C): 北京泰合佳通信息技术有限公司广东分公司
 * 创建人: 林俊杰
 * 创建时间: 2015年11月23日
 * 版本: WebFramework v2.0
 * 描述: Angular路由配置及启动文件

 ******************************************************************/

define(['scripts/common','angular-breadcrumb'],
    function (angularAMD) {
        'use strict';
        var app = angular.module('Position', ['ui.router', 'ui.bootstrap', 'ncy-angular-breadcrumb']);

        app.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.state('main', angularAMD.route({
                    url: '/main',
                    templateUrl: 'views/main.html',
                    controllerUrl: 'scripts/controllers/mainCtrl',
                    ncyBreadcrumb: {
                        label: '主页'
                    }
                }))
                    .state('main.welcome',angularAMD.route({  //欢迎页
                    url: '/welcome',
                    templateUrl: 'views/welcome.html',
                    controllerUrl: 'scripts/controllers/welcomeCtrl'
                }))
                    .state('main.uiGrid',angularAMD.route({  //ui-grid表格
                    url: '/uiGrid',
                    templateUrl: 'views/uiGrid/uiGrid.html',
                    controllerUrl: 'scripts/controllers/uiGrid/uiGridCtrl',
                    ncyBreadcrumb: {
                        label: 'ui-grid表格'
                    }
                })) .state('main.uiGridIn',angularAMD.route({  //ui-grid表格
                    url: '/uiGridIn',
                    templateUrl: 'views/uiGrid/uiGridIn.html',
                    controllerUrl: 'scripts/controllers/uiGrid/uiGridInCtrl',
                    ncyBreadcrumb: {
                        label: 'ui-grid表格'
                    }
                }))
                    .state('main.echartLine',angularAMD.route({  //echart图  折线图
                    url: '/echartLine',
                    templateUrl: 'views/echarts/echartLine.html',
                    controllerUrl: 'scripts/controllers/echarts/echartLineCtrl',
                    ncyBreadcrumb: {
                        label: 'ECHARTS图 > 折线图'
                    }
                })).state('main.echartBar',angularAMD.route({  //echart图  柱状图
                    url: '/echartBar',
                    templateUrl: 'views/echarts/echartBar.html',
                    controllerUrl: 'scripts/controllers/echarts/echartBarCtrl'
                })).state('main.echartManyBar',angularAMD.route({  //echart图  柱状图
                    url: '/echartManyBar',
                    templateUrl: 'views/echarts/echartManyBar.html',
                    controllerUrl: 'scripts/controllers/echarts/echartManyBarCtrl'
                })).state('main.echartScatter',angularAMD.route({  //echart图  散点图
                    url: '/echartScatter',
                    templateUrl: 'views/echarts/echartScatter.html',
                    controllerUrl: 'scripts/controllers/echarts/echartScatterCtrl'
                })).state('main.echartK',angularAMD.route({  //echart图  k线图
                    url: '/echartK',
                    templateUrl: 'views/echarts/echartK.html',
                    controllerUrl: 'scripts/controllers/echarts/echartKCtrl'
                })).state('main.echartPie',angularAMD.route({  //echart图  饼图
                    url: '/echartPie',
                    templateUrl: 'views/echarts/echartPie.html',
                    controllerUrl: 'scripts/controllers/echarts/echartPieCtrl'
                })).state('main.echartRadar',angularAMD.route({  //echart图  雷达图
                    url: '/echartRadar',
                    templateUrl: 'views/echarts/echartRadar.html',
                    controllerUrl: 'scripts/controllers/echarts/echartRadarCtrl'
                })).state('main.echartGauge',angularAMD.route({  //echart图  仪表盘
                    url: '/echartGauge',
                    templateUrl: 'views/echarts/echartGauge.html',
                    controllerUrl: 'scripts/controllers/echarts/echartGaugeCtrl'
                })).state('main.echartFunnel',angularAMD.route({  //echart图  漏斗图
                    url: '/echartFunnel',
                    templateUrl: 'views/echarts/echartFunnel.html',
                    controllerUrl: 'scripts/controllers/echarts/echartFunnelCtrl'
                })).state('main.echartMap',angularAMD.route({  //echart图  地图
                    url: '/echartMap',
                    templateUrl: 'views/echarts/echartMap.html',
                    controllerUrl: 'scripts/controllers/echarts/echartMapCtrl'
                })).state('main.gis',angularAMD.route({  //谷歌地图
                    url: '/gis',
                    templateUrl: 'views/gis/gis.html',
                    controllerUrl: 'scripts/controllers/gis/gisCtrl'
                })).state('main.time',angularAMD.route({  // 时间控件
                    url: '/time',
                    templateUrl: 'views/time/time.html',
                    controllerUrl: 'scripts/controllers/time/timeCtrl'
                })).state('main.uiBootstrap',angularAMD.route({  //ui-bootstrap
                    url: '/uiBootstrap',
                    templateUrl: 'views/uiBootstrap/uiBootstrap.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/uiBootstrapCtrl'
                })).state('main.accordion',angularAMD.route({  //手风琴
                    url: '/accordion',
                    templateUrl: 'views/uiBootstrap/accordion.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/accordionCtrl'
                })).state('main.alert',angularAMD.route({  //提示消息
                    url: '/alert',
                    templateUrl: 'views/uiBootstrap/alert.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/alertCtrl'
                })).state('main.buttons',angularAMD.route({  //按钮
                    url: '/buttons',
                    templateUrl: 'views/uiBootstrap/buttons.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/buttonsCtrl'
                })).state('main.carousel',angularAMD.route({  //轮播的控件
                    url: '/carousel',
                    templateUrl: 'views/uiBootstrap/carousel.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/carouselCtrl'
                })).state('main.collapse',angularAMD.route({  //折叠控件
                    url: '/collapse',
                    templateUrl: 'views/uiBootstrap/collapse.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/collapseCtrl'
                })).state('main.datepicker',angularAMD.route({  //时间控件
                    url: '/datepicker',
                    templateUrl: 'views/uiBootstrap/datepicker.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/datepickerCtrl'
                })).state('main.dropdown',angularAMD.route({  //下拉菜单
                    url: '/dropdown',
                    templateUrl: 'views/uiBootstrap/dropdown.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/dropdownCtrl'
                })).state('main.model',angularAMD.route({  //模态框
                    url: '/model',
                    templateUrl: 'views/uiBootstrap/model.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/modelCtrl'
                })).state('main.pagination',angularAMD.route({  //分页
                    url: '/pagination',
                    templateUrl: 'views/uiBootstrap/pagination.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/paginationCtrl'
                })).state('main.progressbar',angularAMD.route({  //进度条
                    url: '/progressbar',
                    templateUrl: 'views/uiBootstrap/progressbar.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/progressbarCtrl'
                })).state('main.rating',angularAMD.route({  //打分或排名的控件
                    url: '/rating',
                    templateUrl: 'views/uiBootstrap/rating.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/ratingCtrl'
                })).state('main.tabs',angularAMD.route({  //tab切换栏
                    url: '/tabs',
                    templateUrl: 'views/uiBootstrap/tabs.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/tabsCtrl'
                })).state('main.tooltip',angularAMD.route({  //提示信息
                    url: '/tooltip',
                    templateUrl: 'views/uiBootstrap/tooltip.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/tooltipCtrl'
                })).state('main.typeahead',angularAMD.route({  //input下拉搜索
                    url: '/typeahead',
                    templateUrl: 'views/uiBootstrap/typeahead.html',
                    controllerUrl: 'scripts/controllers/uiBootstrap/typeaheadCtrl'
                })).state('main.angular',angularAMD.route({  //input下拉搜索
                    url: '/angular',
                    templateUrl: 'views/angular/angular.html',
                    controllerUrl: 'scripts/controllers/angular/angularCtrl'
                })).state('main.insideDir',angularAMD.route({  //内部指令
                    url: '/insideDir',
                    templateUrl: 'views/angular/insideDir.html',
                    controllerUrl: 'scripts/controllers/angular/insideDirCtrl'
                })).state('main.outDir',angularAMD.route({  //外部指令
                    url: '/outDir',
                    templateUrl: 'views/angular/outDir.html',
                    controllerUrl: 'scripts/controllers/angular/outDirCtrl'
                })).state('main.angularAPI',angularAMD.route({  //Api
                    url: '/angularAPI',
                    templateUrl: 'views/angular/angularAPI.html',
                    controllerUrl: 'scripts/controllers/angular/angularAPICtrl'
                })).state('main.angularHttps',angularAMD.route({  //https请求的知识点
                    url: '/angularHttps',
                    templateUrl: 'views/angular/angularHttps.html',
                    controllerUrl: 'scripts/controllers/angular/angularHttpsCtrl'
                })).state('main.angularForm',angularAMD.route({  //表单
                    url: '/angularForm',
                    templateUrl: 'views/angular/angularForm.html',
                    controllerUrl: 'scripts/controllers/angular/angularFormCtrl'
                })).state('main.angularCommon',angularAMD.route({  //常用指令
                    url: '/angularCommon',
                    templateUrl: 'views/angular/angularCommon.html',
                    controllerUrl: 'scripts/controllers/angular/angularCommonCtrl'
                })).state('main.angularRepeat',angularAMD.route({  //常用指令
                    url: '/angularRepeat',
                    templateUrl: 'views/angular/angularRepeat.html',
                    controllerUrl: 'scripts/controllers/angular/angularRepeatCtrl'
                })).state('main.assembly',angularAMD.route({  //常用指令
                    url: '/assembly',
                    templateUrl: 'views/assembly/assembly.html',
                    controllerUrl: 'scripts/controllers/assembly/assemblyCtrl'
                })).state('main.entrust',angularAMD.route({  //常用指令
                    url: '/entrust',
                    templateUrl: 'views/entrust/entrust.html',
                    controllerUrl: 'scripts/controllers/entrust/entrustCtrl'
                })).state('main.tree',angularAMD.route({  //常用指令
                    url: '/tree',
                    templateUrl: 'views/entrust/tree.html',
                    controllerUrl: 'scripts/controllers/entrust/treeCtrl'
                })).state('main.characters',angularAMD.route({  //常用指令
                    url: '/characters',
                    templateUrl: 'views/entrust/characters.html',
                    controllerUrl: 'scripts/controllers/entrust/charactersCtrl'
                })).state('main.loading',angularAMD.route({  //loading加载
                    url: '/loading',
                    templateUrl: 'views/loading/loading.html',
                    controllerUrl: 'scripts/controllers/loading/loadingCtrl'
                })).state('main.addContent',angularAMD.route({  //增加选择内容
                    url: '/addContent',
                    templateUrl: 'views/loading/addContent.html',
                    controllerUrl: 'scripts/controllers/loading/addContentCtrl'
                })).state('main.vague',angularAMD.route({  //模糊搜索
                    url: '/vague',
                    templateUrl: 'views/vague/vague.html',
                    controllerUrl: 'scripts/controllers/vague/vagueCtrl'
                })).state('main.each',angularAMD.route({  //模糊搜索
                    url: '/each',
                    templateUrl: 'views/each/each.html',
                    controllerUrl: 'scripts/controllers/each/eachCtrl'
                })).state('main.step',angularAMD.route({  //步骤条
                    url: '/step',
                    templateUrl: 'views/step/step.html',
                    controllerUrl: 'scripts/controllers/step/stepCtrl'
                })).state('main.ellipsisPaging',angularAMD.route({  //省略号分页
                    url: '/ellipsisPaging',
                    templateUrl: 'views/pagination/ellipsisPaging.html',
                    controllerUrl: 'scripts/controllers/pagination/ellipsisPagingCtrl'
                })).state('main.bootstrapPaging',angularAMD.route({  //bootstrap分页
                    url: '/bootstrapPaging',
                    templateUrl: 'views/pagination/bootstrapPaging.html',
                    controllerUrl: 'scripts/controllers/pagination/bootstrapPagingCtrl'
                })).state('main.inputPaging',angularAMD.route({  //输入内容分页
                    url: '/inputPaging',
                    templateUrl: 'views/pagination/inputPaging.html',
                    controllerUrl: 'scripts/controllers/pagination/inputPagingCtrl'
                })).state('main.ajax',angularAMD.route({
                    url: '/ajax',
                    templateUrl: 'views/ajax/ajax.html',
                    controllerUrl: 'scripts/controllers/ajax/ajaxCtrl'
                })).state('main.fixedBg',angularAMD.route({
                    url: '/fixedBg',
                    templateUrl: 'views/css3/fixedBg.html',
                    controllerUrl: 'scripts/controllers/css3/fixedBgCtlr'
                })).state('main.fixedMinMax',angularAMD.route({
                    url: '/fixedMinMax',
                    templateUrl: 'views/css3/fixedMinMax.html',
                    controllerUrl: 'scripts/controllers/css3/fixedMinMaxCtrl'
                })).state('main.skin',angularAMD.route({
                    url: '/skin',
                    templateUrl: 'views/jquery/skin.html',
                    controllerUrl: 'scripts/controllers/jquery/skinCtrl'
                })).state('main.getAttribute',angularAMD.route({
                    url: '/getAttribute',
                    templateUrl: 'views/javascript/getAttribute.html',
                    controllerUrl: 'scripts/controllers/javascript/getAttributeCtrl'
                })).state('main.bracket',angularAMD.route({ //页面支架
                    url: '/bracket',
                    templateUrl: 'views/bracket/bracket.html',
                    controllerUrl: 'scripts/controllers/bracket/bracketCtrl'
                })).state('main.uploader',angularAMD.route({ //页面支架
                    url: '/uploader',
                    templateUrl: 'views/uploader/uploader.html',
                    controllerUrl: 'scripts/controllers/uploader/uploaderCtrl'
                })).state('main.tooltips',angularAMD.route({ //页面支架
                    url: '/tooltips',
                    templateUrl: 'views/tooltips/tooltips.html',
                    controllerUrl: 'scripts/controllers/tooltips/tooltipsCtrl'
                }))
                    .state('login',angularAMD.route({
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