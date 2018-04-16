define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
    'scripts/directives/inputReceivedDirt',//选择人指令
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {

        //存储内容
        $scope.formData = [];
        $.ajax({
            async:false,
            url: "json/formData.json", //实现同步的地方
            success: function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].PRO_ENNAME === 'CONDUIT_ID') {
                        continue;
                    }
                    var formType = 'input';  //类型要哪一个显示， input显示
                    var selectOptions;
                    var value = $scope.dataModel.entity[data.data[i].PRO_ENNAME];
                    if (data.data[i].HOUSE_STATUS === '1') {
                        $scope.showInput = true;

                    }


                    if (data.data[i].MATERIAL_STATUS=== '2') { // select 显示
                        formType = 'select';
                        selectOptions = [];
                        $scope.showSelect = true;
                    }
                }
            }
        })
    }];
});