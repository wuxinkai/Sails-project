define(['scripts/services/httpService',
        'scripts/requireHelper/requireNotification',
        'ngload!ui-notification',
    ],
    function () {
        return ['$scope','httpService','Notification',
            function ($scope,httpService,Notification) {

                $scope.oneAtATime = true; //展开一个面板时是否关闭其他面板

                $scope.groups = [{
                    title: '循环uib-accordion-group出来的内容11111',
                    content: '里面的内容 手风琴效果11111'
                }, {
                    title: '循环uib-accordion-group出来的内容 这是头部22222',
                    content: '里面的内容 手风琴效果22222'
                }];

                $scope.items = ['Item 1', 'Item 2', 'Item 3'];

                $scope.addItem = function() {
                    var newItemNo = $scope.items.length + 1;
                    $scope.items.push('Item ' + newItemNo);
                };

                $scope.status2 = {
                    isFirstOpen: true,
                    isFirstDisabled: false,
                    panelClass: 'panel-success'
                };

            }]
    });