/**
 * Created by yhj on 2017/3/27.
 */
define(['angularAMD', 'scripts/directives/repeatFinishedDirt', 'scripts/directives/stopEventDirt','bootstrap'], function (angularAMD) {
    'use strict';
    angularAMD.directive('errorcollect',
        function ($q) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: './views/alarm/alarmError.html',
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
                    //详情
                    scope.detailDescripe = function (items) {
                            scope.$emit('detail-parent', items);
                    }

                }
            }
        });
});

