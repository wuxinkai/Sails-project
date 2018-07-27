/******************************************************************

 * Copyright (C): 北京泰合佳通信息技术有限公司广东分公司
 * 创建人: 林俊杰
 * 创建时间: 2015年11月23日
 * 版本: WebFramework v2.0
 * 描述: RequireJs配置文件

 ******************************************************************/

require.config({
    urlArgs: "ver=" + tescomm.config.system.version,

    waitSeconds: 0,

    packages: [
        {
            name: 'echarts',
            location: 'bower_components/echarts/build/dist',
            main: 'bower_components',
            lib: '.'
        },
        {
            name: 'echarts3',
            location: 'bower_components/echartsCommon',
            main: 'bower_components',
            lib: '.'
        }
    ],

    baseUrl: './',

    paths: {
        'angular': 'bower_components/angular/angular.min',
        'angular-route': 'bower_components/angular-route/angular-route.min',
        'angular-ui-router': 'bower_components/ui-route/release/angular-ui-router.min',
        'angularAMD': 'bower_components/angularAMD/angularAMD.min',
        'ngload': 'bower_components/angularAMD/ngload.min',
        //新增
        'angular-touch': 'bower_components/angular-touch/angular-touch',
        'angular-animate': 'bower_components/angular-animate/angular-animate',
        'angular-ui-grid': 'bower_components/angular-ui-grid/ui-grid.min',

        'jquery': 'bower_components/jquery/dist/jquery.min',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
        //老版本ui-bootstrap
        'ui.bootstrap': 'bower_components/ui-bootstrap-tpls/ui-bootstrap-tpls-0.13.2.min',
        'ui-bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',

        'kendo-angular': 'bower_components/om-kendo/kendo.all.min',
        'kendo-czh': "bower_components/om-kendo/cultures/kendo.culture.zh-CN.min",
        'kendo-mzh': "bower_components/om-kendo/messages/kendo.messages.zh-CN.min",

        'ui-notification': 'bower_components/angular-ui-notification/dist/angular-ui-notification.min', //警告框

        "angular-confirm":"bower_components/angular-confirm/angular-confirm", //确认弹出窗

        'leaflet': 'bower_components/leaflet/dist/leaflet-src', //谷歌地图
        'leaflet-directive': 'bower_components/angular-leaflet/dist/angular-leaflet-directive.min',
        'leaflet.draw': 'bower_components/leaflet-draw/dist/leaflet.draw',
        'leaflet.Label': 'bower_components/Leaflet.label/src/Label',
        'leaflet.Marker.Label': 'bower_components/Leaflet.label/src/Marker.Label',
        'leaflet.BaseMarkerMethods': 'bower_components/Leaflet.label/src/BaseMarkerMethods',

        'threejs': 'bower_components/threejs/build/three.min',
        'threeCSG': 'bower_components/ThreeCSG/ThreeCSG',
        'trackballControls': 'bower_components/om-threejs/controls/TrackballControls',
        'stats': 'bower_components/om-threejs/libs/stats.min',
        'objLoader': 'bower_components/om-threejs/loaders/OBJLoader',
        'mtlLoader': 'bower_components/om-threejs/loaders/MTLLoader',
        'colladaLoader': 'bower_components/om-threejs/loaders/ColladaLoader',
        'lteApp': 'bower_components/adminlte/dist/js/app.min',
        'cookie':'bower_components/jquery.cookie/jquery.cookie',
        'bootstrap-daterangepicker':'bower_components/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min',
        'bootstrap-datetimepicker.zh-CN':'bower_components/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN',
        // "daterangepicker":"bower_components/daterangepicker/lib/daterangepicker/daterangepicker",
        "bootstrap-multiselect":"bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect",
        "angular-breadcrumb":"bower_components/angular-breadcrumb/dist/angular-breadcrumb",



    },

    map: {
        '*': {
            'css': 'bower_components/require-css/css.min'
        }
    },

    shim: {
        'angular-route': {
            deps: ['angular']
        },
        'angularAMD': {
            deps: ['angular']
        },
        'ngload': {
            deps: ['angularAMD']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-touch':{
            deps: ['angular']
        },
        'angular-animate':{
            deps: ['angular']
        },
        'angular-ui-grid':{
            deps: ['angular']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'ui-bootstrap': {
            deps: ['angular','bootstrap']
        },
        'ui.bootstrap': {
            deps: ['angular']
        },
        'angular': {
            deps: ['jquery']
        },
        'kendo-angular': {
            deps: ['jquery', 'angular']
        },
        'kendo-czh': {
            deps: ['kendo-angular']
        },
        'kendo-mzh': {
            deps: ['kendo-angular']
        },
        'ui-notification': {
            deps: ['angular']
        },
        'leaflet': {
            deps: ['angular']
        },
        'leaflet-directive': {
            deps: ['leaflet']
        },
        'leaflet.draw': {
            deps: ['leaflet']
        },
        'leaflet.Label': {
            deps: ['leaflet']
        },
        'leaflet.Marker.Label': {
            deps: ['leaflet']
        },
        'leaflet.BaseMarkerMethods': {
            deps: ['leaflet']
        },
        'trackballControls': {
            deps: ['threejs']
        },
        'stats': {
            deps: ['threejs']
        },
        'objLoader': {
            deps: ['threejs']
        },
        'mtlLoader': {
            deps: ['threejs']
        },
        'colladaLoader': {
            deps: ['threejs']
        },
        'threeCSG': {
            deps: ['threejs']
        },
        'lteApp': {
            deps: ['jquery']
        },
        'cookie':{
            deps: ['jquery']
        },
        // 'daterangepicker':{
        //     deps: ['jquery',]
        // },
        'bootstrap-daterangepicker':{
            deps: ['jquery','bootstrap']
        },
        'bootstrap-datetimepicker.zh-CN':{
            deps:['bootstrap-daterangepicker']
        },
        'angular-confirm':{
            deps: ['angular',"ui-bootstrap"]
        },
        'angular-breadcrumb':{
            deps: ['angular',"ui-bootstrap"]
        }

    },

    onNodeCreated: function (node, config, moduleName, url) {
        //脚本加载监听
        //console.log('module ' + moduleName + ' is about to be loaded');
        //node.addEventListener('load', function () {
        //    console.log('module ' + moduleName + ' has been loaded');
        //});
        //node.addEventListener('error', function () {
        //    console.log('module ' + moduleName + ' has failed to be loaded');
        //});
    },

    deps: ['scripts/app']
});
