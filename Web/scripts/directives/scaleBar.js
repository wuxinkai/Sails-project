/**
 * Created by cuishiyong on 2017/4/10.
 */
define(['angularAMD','bootstrap'], function (angularAMD) {
    'use strict';
    angularAMD.directive('tescommScaleBar',
        function () {
            return {
                restrict: 'E',
                scope:{
                    barData:'=',
                    allNum:'='
                },
                template: '<div ng-style="{width:allWidth+\'%\'}" style="height: 100%">'+
                    '<div class="tooltip-toggle" ng-repeat="d in barData" data-toggle="tooltip" title="{{d.tooltip}}" ng-style="{\'background\':\'{{d.color}}\',\'width\':(d.num/allDataNum*100)+\'%\'}" style="width:50%;float: left;height: 100%; "></div>'+
                    '</div>',
                replace: true,
                link: function (scope, element, attr) {
                    scope.allDataNum = 0;
                    scope.$watch("barData",function(newVal,oldVal){
                        for(var i=0;i<scope.barData.length;i++){
                            scope.allDataNum+=scope.barData[i].num;
                        }
                        if(scope.allNum){
                            scope.allWidth = scope.allDataNum/scope.allNum*100;
                        }else{
                            scope.allWidth = 100;
                        }
                        setTimeout(function(){
                            $('.tooltip-toggle').tooltip();
                        },100)

                    });
                }
            };
        });
})