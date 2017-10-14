/**
 * Created by Administrator on 2017/4/17.
 */
define(['angularAMD'], function (angularAMD) {
    'use strict';
    angularAMD.directive('radioBroadcast',
        function ($compile) {
            return {
                restrict: "AE",
                scope: {
                    items: '='
                },
                template: '<div class="pull-left broadcast-box">'+
                            ' <div class="broadcast">'+
                                ' <ul>'+
                                    '<li><a href="javascript:;">太合佳通  java版本已经上线，极大的减少对接成本java版本已经上线，极大的减少对接成本java版本已经上线，极大的减少对接成本java版本已经上线，极大的减少对接成本java版本已经上线，极大的减少对接成本</a></li>'+
                                    '<li><a href="javascript:;">太合佳通 44已经上线，极大的减少对接成本</a></li>'+
                                    '<li><a href="javascript:;">太合佳通  22经上线，极大的减少对接成本</a></li>'+
                                    '<li><a href="javascript:;">太合佳通  222线，极大的减少对接成本</a></li>'+
                                    '<li><a href="javascript:;">太合佳通  333333，极大的减少对接成本</a></li>'+
                                    '<li><a href="javascript:;">太合佳通  555555555，极大的减少对接成本</a></li>'+
                                    '<li><a href="javascript:;">太合佳通  44444444，极大的减少对接成本</a></li>'+
                                    '<li><a href="javascript:;">太合佳通 333333，极大的减少对接成本</a></li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>',
                link: function (scope, element, attr) {
                    var num = $(".broadcast ul li").length;
                    $('.broadcast ul').append($('.broadcast ul li:eq(0)').clone(true));
                    var imgKey = 0;
                    var autoPlay = function(){
                        imgKey++;
                        if(imgKey > num){
                            imgKey = 1;
                            $('.broadcast ul').css('top','0px');
                        }
                        var move = imgKey * -40;
                        $('.broadcast ul').animate({'top':''+move+'px'},500);
                    };
                    var timer = setInterval(function(){
                        autoPlay();
                    },5000)
                }
            };
        });
})