define([
    'scripts/directives/angularUiSwitch', //引入指令
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {
        $scope.enabled = true;
        $scope.onOff = true;
        $scope.yesNo = true;
        $scope.disabled = true;
        $scope.changeCallback = function() {
            console.log('This is the state of my model ' + $scope.enabled);
        };
    }];
});