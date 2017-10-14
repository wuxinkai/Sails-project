/**
 * Created by cuishiyong on 2017/5/17.
 */
define(['angularAMD','bootstrap'], function (angularAMD) {
    'use strict';
    angularAMD.directive('panel47Dirt',
        function () {
            return {
                restrict: 'E',
                scope:{
                    data:'=',
                    allNum:'='
                },
                templateUrl: './views/dirt/47Panel.html',
                replace: true,
                link: function ($scope, element, attr) {
                    $scope.slot = [
                        {
                            class:'circular-orange',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                        {
                            class:'circular-orange',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                        {
                            class:'circular-yellow',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-blue',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-blue',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg5.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg5.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                    ];
                    $scope.slot.forEach(function (item, index, arr) {
                        var num = index*28;
                        var  number = index+1;
                        item.positionLeft = num+'px';
                        item.positionTop = '260px';
                        item.number = number;
                        if(index==8 || index==9){
                            item.positionTop = '129px';
                        }
                    });
                    $scope.slot1 = [
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',
                        },

                    ];
                    $scope.slot1.forEach(function (item, index, arr) {
                        var num = index*28;
                        var  number = index+20;
                        if(number>=28){
                            num = num+56;
                        }
                        item.positionLeft = num+'px';
                        item.positionTop = '129px';
                        item.number =number;

                    });
                    $scope.slot2 = [
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg2.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg2.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg2.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg4.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg2.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg2.png',
                            text:'asd',
                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg2.png',
                            text:'asd',

                        },
                        {
                            class:'circular-red',
                            src:'./imgs/plc_bg2.png',
                            text:'asd',

                        },

                    ];
                    $scope.slot2.forEach(function (item, index, arr) {
                        var  number = index+36;
                        item.number =number;

                    });
                }
            };
        });
})