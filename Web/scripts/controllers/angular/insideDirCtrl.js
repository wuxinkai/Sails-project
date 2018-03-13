define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
    'scripts/directives/inputReceivedDirt',//选择人指令
], function () {
    return ['$scope','Notification','httpService','inputReceivedDirtService', function ($scope,Notification,httpService,inputReceivedDirtService) {
        $scope.label='标题名字';
        $scope.roleName= '二级标题名';

        $scope.roleId='123456';

        // $scope.roleName = '项目经理';//角色名称
        $scope.operator = {};
        $scope.titlerr = '';

        //从父页面获取子页面的内容
      $scope.btn =function () {
          $scope.ReceiverData = inputReceivedDirtService.storage.operator;
          console.log( $scope.ReceiverData)
      }

    }];
});