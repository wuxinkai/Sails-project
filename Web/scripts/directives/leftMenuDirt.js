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

                }
            };
        });
})