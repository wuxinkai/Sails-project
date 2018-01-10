define([
    // 'cookie',  //
    // 'ui.bootstrap',
    // 'scripts/requireHelper/requireNotification',//插件消息提示
    // 'bower_components/angular-confirm/angular-confirm', //确认消息提示框

    'css!bower_components/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min',
    'ngload!bootstrap-datetimepicker.zh-CN'


], function () {
    return ['$scope', function ($scope) {
        // $scope.deletes = {};//删除数据初始化

//初始化日期

            $('#startDate').datetimepicker({
                format: 'yyyy-mm-dd hh:00:00',
                language: 'zh-CN',
                minView: 1,
                maxView: 2,
                autoclose: true,
                pickerPosition: 'bottom-left'
            });
            $('#endDate').datetimepicker({
                format: 'yyyy-mm-dd hh:00:00',
                language: 'zh-CN',
                minView: 1,
                maxView: 2,
                autoclose: true,
                pickerPosition: 'bottom-left'
            });
            // $('#START_TIME').removeAttr("disabled");
            // $('#END_TIME').removeAttr("disabled");

    }]
});