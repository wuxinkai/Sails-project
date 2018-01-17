define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
    'scripts/requireHelper/pagination.module',//分页插件
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {
        $scope.paginationOptions = {
            size: 23 ,
            page: 1 ,
            step: 1 ,
        };
        $scope.onPageChange = function (pageNumber){
            console.log(pageNumber)
        };
    }];
});