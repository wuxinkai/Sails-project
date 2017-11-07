define([
    'cookie',  //
    'ui.bootstrap',
    'scripts/requireHelper/requireNotification',//插件消息提示
    'angular-confirm', //确认消息提示框
], function () {
    return ['$scope','$confirm','Notification','httpService','i18nService', function ($scope,$confirm,Notification,httpService,i18nService) {
        //（1）语言设置
        $scope.langs = i18nService.getAllLangs();
        $scope.lang = 'zh-cn';

        $scope.gridOptions ={
            showColumnFooter: true, // 统计
            enablePaginationControls: false, //自定义分页
            columnDefs: [
                {field: 'MAINTYPE_NAME',name:'费用大类名称', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'SUBTYPE_NAME',name:'费用细类名称', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'AMOUNT',name:'费用细类金额/元', minWidth: 150,cellClass:'bodyBluy  ', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'RATE',name:'增值税率', minWidth: 100,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false,cellTooltip: function( row, col ) {
                    return  row.entity.RATE;
                }},
                {field: 'ADDED_TAX',name:'增值税/元', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'TAX_TOTAL',name:'含税总额/元', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                { field: 'ODF_JUMPER', name:'操作',minWidth: 70,cellClass:'bodyBluy', headerCellClass:'headerAdd', enableColumnMenu:false, cellTemplate: '<div class="optcell">' +
                '<button class="btnStyle table-td00" ng-click="grid.appScope.modify(row.entity)"></button> <button class="btnStyle table-td01" ng-click="grid.appScope.rowDelete(row.entity)"></button>' +
                '</div>'}]
        };
//头部hover效果
        $scope.gridOptions.rowTemplate = '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ng-mouseover="grid.appScope.hoveredIndex = rowRenderIndex" ng-mouseleave="grid.appScope.hoveredIndex = null" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{\'ui-grid-row-header-cell\': col.isRowHeader, \'your-hover-class\': grid.appScope.hoveredIndex === rowRenderIndex}" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell></div>';
//获取没一行的内容
        $scope.result = "初始化";
        $scope.gridOptions.appScopeProvider= {
            rowHover: function(row, show) {

            },
            modify: function(id) {
                $confirm({ text: '这是个自定义确认框，是否确认。' })
                    .then(function () {
                        $scope.result = "确认";
                    }, function () {
                        $scope.result = "取消";
                    })
            },
            rowDelete: function(id) {
                $scope.dataAll();
                // Notification.success('成功的通知');
                // Notification.error({message: '删除', delay: 5000});
                // Notification({message: '警告通知'}, 'warning');
                // Notification({message: '原发性通知', title: '有表头'});
                // Notification.error({message: '错误通知1s', delay: 1000});

                // Notification.success({message: 'Success notification<br>Some other <b>content</b><br><a href="https://github.com/alexcrack/angular-ui-notification">This is a link</a><br><img src="https://angularjs.org/img/AngularJS-small.png">', title: '可以实现页面跳转'});

                // Notification.error({message: '从底部弹出', positionY: 'bottom', positionX: 'right'});

                Notification.error({message: '错误通知1s', replaceMessage: true});//取代的消息




            }
        };

        $scope.gridOptions.data=[
            {
                MAINTYPE_NAME:'1',
                SUBTYPE_NAME:'1',
                AMOUNT:'1',
                RATE:'1',
                ADDED_TAX:'1',
                TAX_TOTAL:'1',
            }
        ];
        $scope.condition={
            a:1,
            b:2,
        };
     $scope.dataAll=function () {
         //在api -- controller --UserService --  UserController --
         // httpService.post("UserService", "User", "zhuce", {}).then(function (data) {
         //        console.log(data);
         // });
     };

     $scope.dataAll();
    }]
});