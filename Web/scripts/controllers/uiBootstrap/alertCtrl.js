define(['scripts/services/httpService',
        'scripts/requireHelper/requireNotification',
        'ngload!ui-notification',
    ],
    function () {
        return ['$scope','httpService','Notification',
            function ($scope,httpService,Notification) {

                $scope.alerts = [
                    { type: 'danger', msg: '1 哦！ 请更改几个项目，然后重试提交。' },
                    { type: 'success', msg: '2 做得好！ 您已成功读取此重要警报消息。' }
                ];

                $scope.addAlert = function() {
                    $scope.alerts.push({type: 'info',msg: '另一个警报!'});
                };

                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };
            }]
    });
