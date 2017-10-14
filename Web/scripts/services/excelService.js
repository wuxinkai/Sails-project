/**
 * Created by cuishiyong on 2017/3/23.
 */
define(['angularAMD'], function (angularAMD) {
    'use strict';
    angularAMD.service('excelService',
        function ($http, $q) {
            function DownLoadFile(options) {
                var config = $.extend(true, { method: 'post' }, options);
                var $iframe = $('<iframe id="down-file-iframe" />');
                var $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
                $form.attr('action', config.url+ "?tokenID=" + getCookie("Tescomm_Access_Token"));
                for (var key in config.data) {
                    $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
                }
                $iframe.append($form);
                $(document.body).append($iframe);
                $form[0].submit();
                $iframe.remove();
            }
            function getCookie(cookieName) {
                if (document.cookie.length > 0) {
                    var c_start = document.cookie.indexOf(cookieName + "=")
                    if (c_start != -1) {
                        c_start = c_start + cookieName.length + 1
                        var c_end = document.cookie.indexOf(";", c_start)
                        if (c_end == -1) c_end = document.cookie.length
                        return unescape(document.cookie.substring(c_start, c_end))
                    }
                }
                return ""
            }
            return ({
                export:function(options){
                    if(!options.captions||!options.columns||!options.url)return;
                    var exportData = {};
                    exportData.url = options.url;
                    exportData.data = {};
                    if(options.captions instanceof Array)
                    exportData.data.captions = options.captions.join(",");
                    else
                    exportData.data.captions = options.captions;
                    if(options.columns instanceof Array)
                        exportData.data.columns = options.columns.join(",");
                    else
                        exportData.data.columns = options.columns;
                    var typeslength = exportData.data.columns.split(",").length;
                    if(!options.types){
                        var types = [];
                        for(var i=0;i<typeslength;i++){
                            types.push("string");
                        }
                        exportData.data.types = types.join(",");
                    }else{
                        if(options.types instanceof Array)
                            exportData.data.types = options.types.join(",");
                        else
                            exportData.data.types = options.types;
                    }
                    exportData.data.condition = options.condition;
                    exportData.data.fileName = options.fileName;
                    DownLoadFile(exportData);

                }
            });

        });
})