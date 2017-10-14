/**
 * Created by cuishiyong on 2017/3/23.
 */
define(['angularAMD','scripts/services/excelService'], function (angularAMD) {
    'use strict';
    angularAMD.directive('excelModal',
        function (excelService) {
            return {
                restrict: 'E',
                templateUrl: 'views/dirt/excelModal.html',
                scope:{
                    id:'@id',
                    title:'@title',
                    data:'=data'
                },
                replace: true,
                link: function (scope, element, attr) {
                    $(element).attr("title","")
                   scope.sureExcelExport = function(){
                       var captions = [];
                       var types = [];
                       var columns = [];
                       if($('.export-columns:checked').length!=0){
                           $('.export-columns:checked').each(function(){
                               captions.push($(this).attr("data-column"));
                               columns.push($(this).attr("data-cols"));
                               types.push("string");
                           });
                       }else{
                           $('.export-columns').each(function(){
                               captions.push($(this).attr("data-column"));
                               columns.push($(this).attr("data-cols"));
                               types.push("string");
                           });
                       }
                       excelService.export({
                           captions:captions,
                           //可有可无
                           types:types,
                           columns:columns,
                           url:scope.data.url,
                           condition:scope.data.condition,
                           fileName:scope.data.fileName
                       });
                       $('#'+scope.id).modal('hide');
                   }
                }
            };
        });
})