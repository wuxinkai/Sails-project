/**
 * Created by yhj on 2017/4/17.
 */
/**
 * Created by yhj on 2017/3/27.
 */
define(['angularAMD', 'scripts/directives/repeatFinishedDirt', 'scripts/directives/stopEventDirt'], function (angularAMD) {
    'use strict';
    angularAMD.directive('historycollect',
        function ($q) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: './views/alarm/historyCollect.html',
                link: function (scope, element, attrs) {
                    scope.getDetail = function (items,$event) {
                        scope.$emit('to-parent', items);
                    }
                    //查看设备面板
                    scope.device = function (items) {
                        scope.$emit('panel-parent', items);
                    }
                    //定位网络拓扑
                    scope.location = function (items) {
                        scope.$emit('topo-parent', items);
                        scope.$emit('topo-name', '网络拓扑图');
                        $('.breadcrumb .breadcrumbList02').addClass('am-active1')
                    }
                    //查看相关业务
                    scope.relativeRes = function (items) {
                        scope.$emit('business-parent', items);
                    }
                }
            }
        });
});
/**
 * Created by yhj on 2017/4/7.
 */
