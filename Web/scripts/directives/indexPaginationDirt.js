/**
 * Created by cuishiyong on 2017/4/7.
 */
define(['angularAMD','scripts/services/httpService'], function (angularAMD) {
    'use strict';
    angularAMD.directive('indexFooterPagination',
        function (httpService) {
            return {
                restrict: 'E',
                templateUrl: './views/dirt/indexPagination.html',
                replace: true,
                link: function (scope, element, attr) {
                    /*
                    scope.page 是当前点击的页码；
                    scope.Allcount；是总共页码数；

                    */
                    //跳转
                    scope.skipClick = function(){
                        if(!scope.inputCurrentPage)return ;
                        if(scope.inputCurrentPage>scope.Allcount){
                            scope.page = scope.Allcount;
                        }else if(scope.inputCurrentPage<=0){
                            scope.page = 1;
                        }else{
                            scope.page = scope.inputCurrentPage;
                        }
                        scope.getData();
                    }
                    //下一页
                    scope.nextClick= function(){

                        if(scope.page<scope.Allcount){
                            scope.page = scope.page +1;
                            scope.getData();
                        }
                    }
                    //上一页
                    scope.prevClick = function(){
                        if(scope.page>1){
                            scope.page = scope.page -1;
                            scope.getData();
                        }
                    }
                    //首页或者尾页
                    scope.shadoweClick = function(page){
                        scope.page = page;
                        scope.getData();
                    }
                    scope.$emit('to-parent', 'onload');
                }
            };
        });
})