/**
 * Created by cuishiyong on 2017/3/21.
 */
define(['angularAMD'], function (angularAMD) {
    'use strict';
    angularAMD.directive('repeatFinished',
        function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function () {
                            //这里element, 就是ng-repeat渲染的最后一个元素
                            scope.$emit('repeatFinished', element);
                        });
                    }
                }
            };
        });
})