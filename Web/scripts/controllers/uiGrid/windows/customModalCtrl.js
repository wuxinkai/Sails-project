define([

    'ngload!ui-notification',
    'ngload!ui.bootstrap',
], function () {
    'use strict';
    return ['$scope', "$uibModal", '$uibModalInstance', 'dataModel',
        function ($scope, $uibModal, $uibModalInstance, dataModel) {
            $scope.dataModel = dataModel;
            //点击确定按钮事件
            $scope.ok = function () {
                $uibModalInstance.close( $scope.dataModel);
            };
            //点击取消按钮事件
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]
})