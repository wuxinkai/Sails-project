
define(['angularAMD'], function (angularAMD) {
    'use strict';
    angularAMD.directive('mouseOverLeave',
        function () {
            return {
                restrict: 'A',
                scope: {
                    hover: "="
                },
                link: function(scope, elem, attr){
                    elem.bind('mouseover', function(){
                        elem.css("cursor", "pointer");
                        scope.$apply(function(){
                            scope.hover = true;
                        });
                    });
                    elem.bind('mouseleave', function(){
                        scope.$apply(function(){
                            scope.hover = false;
                        });
                    });
                }
            };
        });
})