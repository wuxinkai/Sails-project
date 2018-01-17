define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {
        //下拉菜单
        $scope.placement = {
            options: [5,10,20,50],
            pageSize:5,
            selected: 20,
            changeFn:function(){
                //执行的函数
                console.log($scope.placement.selected);
            }
        };

        //翻页
        $scope.totalItems = 1000;    //所有页面中的项目总数
        $scope.currentPage = 4;     //当前页
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;

        };
        $scope.maxSize = 5;



//分页上一页下一页
        $scope.totalItems2 = 64;
        $scope.currentPage2 = 4;
    }];
});