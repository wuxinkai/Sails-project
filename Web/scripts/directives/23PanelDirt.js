/**
 * Created by cuishiyong on 2017/5/17.
 */
define(['angularAMD','bootstrap'], function (angularAMD) {
    'use strict';
    angularAMD.directive('panel23Dirt',
        function () {
            return {
                restrict: 'E',
                scope:{
                    data:'=',
                    allNum:'='
                },
                templateUrl: './views/dirt/23Panel.html',
                replace: true,
                link: function (scope, element, attr) {

                }
            };
        });
})