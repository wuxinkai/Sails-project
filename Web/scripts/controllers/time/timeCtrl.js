define([
    'cookie',  //
    'ui.bootstrap',
    'scripts/requireHelper/requireNotification',//插件消息提示
    'bower_components/angular-confirm/angular-confirm', //确认消息提示框

    'css!bower_components/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min',
    'ngload!bootstrap-datetimepicker.zh-CN',

    //分页指令
    'ngload!scripts/directives/indexPaginationDirt',
], function () {
    return ['$scope','$http','$confirm','Notification','httpService','i18nService', function ($scope,$http,$confirm,Notification,httpService,i18nService) {
        $scope.deletes={};//删除数据初始化

//初始化日期
        function initDate() {
            $('#startDate').datetimepicker({
                format: 'yyyy-mm-dd hh:00:00',
                language: 'zh-CN',
                minView: 1,
                maxView: 2,
                autoclose: true,
                pickerPosition:'bottom-left'
            });
            $('#endDate').datetimepicker({
                format: 'yyyy-mm-dd hh:00:00',
                language: 'zh-CN',
                minView: 1,
                maxView: 2,
                autoclose: true,
                pickerPosition:'bottom-left'
            });

            $('#START_TIME').removeAttr("disabled");
            $('#END_TIME').removeAttr("disabled");
        }
        initDate();


//（1）ui-grid语言设置
        $scope.langs = i18nService.getAllLangs();
        $scope.lang = 'zh-cn';
        $scope.gridOptions ={
            showColumnFooter: true, // 统计
            enablePaginationControls: false, //自定义分页
            columnDefs: [
                {field: 'name1',name:'表格1', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'name2',name:'表格2', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'name3',name:'表格3', minWidth: 150,cellClass:'bodyBluy  ', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'name4',name:'表格4', minWidth: 100,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false,cellTooltip: function( row, col ) {
                    return  row.entity.RATE;
                }},
                {field: 'name5',name:'表格5', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'name6',name:'表格6', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'name7',name:'表格7', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'name8',name:'表格8', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                {field: 'name9',name:'表格9', minWidth: 130,cellClass:'bodyBluy', headerCellClass:'headerAdd',enableColumnMenu:false},
                { field: 'name9', name:'操作',minWidth: 70,cellClass:'bodyBluy', headerCellClass:'headerAdd', enableColumnMenu:false, cellTemplate: '<div class="optcell">' +
                '<button class="btnStyle table-td00" ng-click="grid.appScope.modify(row.entity)"></button>' +
                ' <button class="btnStyle table-td01" ng-click="grid.appScope.rowDelete(row.entity)"></button><a class="btnStyle " ng-click="grid.appScope.Notification(row.entity)"></a>' +
                '</div>'}]
        };
//头部hover效果
        $scope.gridOptions.rowTemplate = '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ng-mouseover="grid.appScope.hoveredIndex = rowRenderIndex" ng-mouseleave="grid.appScope.hoveredIndex = null" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{\'ui-grid-row-header-cell\': col.isRowHeader, \'your-hover-class\': grid.appScope.hoveredIndex === rowRenderIndex}" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell></div>';

        $scope.gridOptions.appScopeProvider= {
            Notification: function(data) {
                var number = data.id;
            },
            modify: function(id) {

            },
            rowDelete: function(data) {
                $confirm({ text: '确定要删除吗？' })
                    .then(function () {
                        $scope.deletes.id = data.id;
                        httpService.post("biaogeFolder","Biaoge","biaogeDelete",{condition:$scope.deletes}).then(function (data) {
                            if (data.success == true) { //请求成功
                                $scope.dataAll(); //调用一下查询方法
                                Notification.error({message: '删除成功', delay: 5000});
                            }else {
                                Notification({message: '删除失败'}, 'warning');
                            }
                        });
                        $scope.result = "确认";
                    }, function () {
                        Notification({message: '取消删除'}, 'warning');
                        $scope.result = "取消";
                    });


            }
        };

//页面在这的时候 高度自适应
        $scope.windowSize = function () {
            var newHeight = $('#alarmConRight ').height() - $('#topBtn').height()-60;
            angular.element(document.getElementsByClassName('grid')).css({
                height: newHeight + 'px',
                background: "#fff"
            });
        };
//屏幕大小变化时候执行

        $(window).resize(function () {
            $scope.windowSize();
        });

        // $scope.gridOptions.data=[
        //     {
        //         name1:'',
        //         name2:'',
        //         name3:'',
        //         name4:'',
        //         name5:'',
        //         name6:'',
        //         name7:'',
        //     }
        // ];

        //获取列表数据
        $scope.dataAll=function (type) {
            if(type == 1){
                $scope.condition.a1='1';
            };
            httpService.post("biaogeFolder","Biaoge","biaogeData",{condition: searchData}).then(function (data) {
                if (data.success == true) { //请求成功
                    if (data.data != null && data.data.length > 0) {
                        $scope.gridOptions.data=data.data;
                    }else {
                        Notification({message: '没有数据'}, 'warning');
                    }
                }
            });
        };
        $scope.dataAll();

        //插入内容
        var searchData = {};  //查询的条件
        function InsertTable() {

            httpService.post("biaogeFolder","Biaoge","biaogeInsert",{condition: searchData}).then(function (data) {

                if (data.success) { //请求成功
                    $scope.dataAll();
                }

            });
        }

//提示插件
        $scope.btnPrompt = function (number) {
            if(number==1){
                Notification.success('成功的通知');
            }else if(number==2){
                Notification.error({message: '删除', delay: 5000});
            }else if(number==3){
                Notification({message: '警告通知'}, 'warning');
            }else if(number==4){
                Notification({message: '原发性通知', title: '有表头'});
            }else if(number==5){
                Notification.error({message: '错误通知1s', delay: 1000});
            }else if(number==6){
                Notification.success({message: 'Success notification<br>Some other <b>content</b><br><a href="https://github.com/alexcrack/angular-ui-notification">This is a link</a><br><img src="https://angularjs.org/img/AngularJS-small.png">', title: '可以实现页面跳转'});
            }else if(number==7){
                Notification.error({message: '从底部弹出', positionY: 'bottom', positionX: 'right'});
            }else{
                Notification.error({message: '错误通知1s', replaceMessage: true});//取代的消息
            }
        };
//自定义提示插件
        $scope.result = "初始化";
        $scope.btnPrompt2 = function (number) {
            $confirm({ text: '这是个自定义确认框，是否确认。' })
                .then(function () {
                    $scope.result = "确认";
                }, function () {
                    $scope.result = "取消";
                });
        };


//三级联动
        $scope.error = {};
        $scope.list = [];
        $http({
            url: 'json/linkage.json',
            method: 'GET',
            contentType: "application/json; charset=utf-8"
        }).success(function (data, header, config, status) {
            $scope.list = data;
        }).error(function (data, header, config, status) {
            Notification({message: 'json没有请求到'}, 'warning');
        });

        $scope.c = function () {
            $scope.error.province = true;
            $scope.error.city = false;
            $scope.error.area = false;

            $scope.condition.a5 = "";
            $scope.condition.a6 = "";
        };

        $scope.c2 = function () {
            $scope.error.city = true;
            $scope.error.area = false;
            $scope.condition.a6 = "";
        };

        $scope.c3 = function () {
            $scope.error.area = true;
        };

        $scope.submit = function () {
            $scope.error.province = $scope.condition.a4 ? false : true;
            $scope.error.city = $scope.condition.a5 ? false : true;
            $scope.error.area = $scope.condition.a6 ? false : true;
        };

        $scope.condition={
            a1:'',
            a2:'',
            a3:'',
            a4:'',
            a5:'',
            a6:'',
            a7:'',
            a8:'',
            a9:''
        }

        $scope.Query = function () {
            //判断是否为空
            if($scope.condition){
                //把得到的集合从新赋值给 这个属性
                if($scope.condition.a4){ //查看省是否有值
                    //如果实现没有值 是undefined  所以我们给空字符串
                    $scope.condition.a4 = $scope.condition.a4.name ?  $scope.condition.a4.name : '';
                    $scope.condition.a5 = $scope.condition.a5.name ? $scope.condition.a5.name : '';
                    $scope.condition.a6 = $scope.condition.a6.value ?  $scope.condition.a6.value : '';
                }
//弹窗查询功能
                searchData = $scope.condition; //存值的集合 打包传送给数据库
                InsertTable()
                $("#myModal").modal('hide');
                $scope.dataAll();
            }else {
                Notification({message: '请选择数据'}, 'warning');
            }


        };
// 重置
        function reset() {
            $scope.condition.a1 = '';
            $scope.condition.a2 = '';
            $scope.condition.a3 = '';
            $scope.condition.a4 = '';
            $scope.condition.a5 = '';
            $scope.condition.a6 = '';
            $scope.condition.a7 = '';
            $scope.condition.a8 = '';
            $scope.condition.a9 = '';
        }
        $scope.reset = function () {  //点击重置
            reset();
        }


    }]
});