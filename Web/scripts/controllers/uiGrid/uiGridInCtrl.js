define([
    'scripts/controllers/uiGrid/windows/customModalCtrl', //必须放最上面
    'cookie',  //
    'ui.bootstrap',
    'css!bower_components/om-custom-ui/css/pagination',
    'scripts/requireHelper/pagination.min',

    'ngload!bootstrap-datetimepicker.zh-CN',



    //分页指令
    'ngload!scripts/directives/indexPaginationDirt',
], function (customModalCtrl) {
    return ['$scope','$http','$uibModal','httpService','i18nService','uiGridConstants', function ($scope,$http,$uibModal,httpService,i18nService,uiGridConstants) {
        $scope.langs = i18nService.getAllLangs();
        $scope.lang = 'zh-cn';
        $scope.gridOptions ={
            showColumnFooter: true, // 统计
//            enablePaginationControls: false, //自定义分页
//            paginationPageSize: 15, //每页显示多少条
            rowHeight: 36, //初始化高度 默认是30opx 而我们设置成了 36px 所有滚动条滚动不到底部，需要加这一行代码
            onRegisterApi: function(gridApi) { //通知数据改变事件

                $scope.gridApi = gridApi;
            },
            columnDefs: [
                {   field: 'INDEX',headerCellClass:'headerAdd', cellClass:'bodyBluy',width :150,name:'多选',
                    cellTemplate:"<div class='allSelect'><input type='checkbox'  class='check'><input class='checkid' type='hidden' value='{{row.entity.ACTIVE_DATE}}'/><span> {{row.entity.INDEX}}</span></div>"
                },
                {
                    width :200,
                    name:'序号',
                    field: 'ACTIVE_DATE',
                    enableSorting : false,
                    enableRowHeaderSelection : true,
                    enableGridMenu : true,
                    enableColumnMenu:false, //不带筛选
                    useExternalSorting : false,//是否支持自定义的排序规则
                    showGridFooter: true,//时候显示表格的footer
                    enableHorizontalScrollbar : 1,//表格的水平滚动条
                    enableVerticalScrollbar : 1,//表格的垂直滚动条 (两个都是 1-显示,0-不显示)
                    selectionRowHeaderWidth : 30,
                    enableCellEditOnFocus:false,
                    enableFooterTotalSelected: true, // 是否显示选中的总数,default为true,如果显示,showGridFooter 必须为true
                    enableFullRowSelection : true, //是否点击行任意位置后选中,default为false,当为true时,checkbox可以显示但是不可选中
                    enableRowSelection : true, // 行选择是否可用,default为true;
                    enableSelectAll : true, // 选择所有checkbox是否可用，default为true;
                    enableSelectionBatchEvent : true, //default为true
                    modifierKeysToMultiSelect: false ,//default为false,为true时只能按ctrl或shift键进行多选,这个时候multiSelect必须为true;
                    multiSelect: true ,// 是否可以选择多个,默认为true;
                    noUnselect: false,//default为false,选中后是否可以取消选中
                    cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',
                },
                {   cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',
                    width :200,
                    name:'客户名称',
                    enableColumnMenu:false, //不带筛选
                    field: 'SINK',
                    enableSorting : false, //是否支持排序 后面都不支持排序
                    enableRowHeaderSelection : false,
                    enableGridMenu : false, //
                    useExternalSorting : false,//是否支持自定义的排序规则
                    showGridFooter: true,//时候显示表格的footer
                    enableHorizontalScrollbar : 1,//表格的水平滚动条
                    enableVerticalScrollbar : 1,//表格的垂直滚动条 (两个都是 1-显示,0-不显示)
                    selectionRowHeaderWidth : 30,
                    enableCellEditOnFocus:false,

                },
                {cellClass:'bodyBluy', //body样式
                    headerCellClass:'headerAdd',width :200, name:'客户等级',field: 'SINK_HOUSE_ID',enableFiltering:false, enableSorting: false ,  enableColumnMenu:false},
                {cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',width :200,name:'利用模板绑定内容',field: 'SOURCE_HOUSE_ID', enableSorting: false,
                    cellTemplate:"<div class='allSelect'><span>这是通过模板绑定的： {{row.entity.allNumber}}</span></div>" },
                {cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',width :200,name:'传输方式',field: 'SOURCE_HOUSE_NAME', enableSorting: false },
                {cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',width :200,name:'承载速率',field: 'TRANS_MODE', enableSorting: false },
                {cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',width :200,name:'服务状态',field: 'USER_LEVEL', enableSorting: false },
                {cellClass:'bodyBluy',

//                    pinnedLeft:true,
                    headerCellClass:'headerAdd',

                    width :200,

                    name:'缩端1',

                    field: 'SOURCE_HOUSE_ID',

                    enableColumnMenu:false,

                    aggregationType: uiGridConstants.aggregationTypes.sum,

                    footerCellTemplate: '<div class="ui-grid-cell-contents ui-grid-text-right" >{{grid.appScope.number}}求和</div>',
                    cellTooltip: function( row, col ) {
                        return  row.entity.ADDED_TAX;
                    },
                },

                {cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',width :200,name:'三种状态',field: 'SPARE_ROUTE', enableSorting: false ,
                    cellTemplate: '<div ng-class="{true: \'ruleStatus1\', false:row.entity.ODF_JUMPER==1?\'ruleStatus2\':\'ruleStatus3\'}[row.entity.SPARE_ROUTE==0]">{{row.entity.SPARE_ROUTE==0?"停止":(row.entity.ODF_JUMPER==1?"运行":"未启动")}}</div>'
                },
                {cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',width :200,name:'缩端2.2',field: 'ODF_JUMPER', enableSorting: false },
                {cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',width :200,name:'缩端3',field: 'TRANS_MODE', enableSorting: false },
                {field: 'USER_ID',name:'增值税/元', minWidth: 200,cellClass:'bodyBluy bodyBluy3', headerCellClass:'headerAdd',enableColumnMenu:false,aggregationType: uiGridConstants.aggregationTypes.sum,cellTooltip: function( row, col ) {
                        return  row.entity.USER_ID;
                    },
                    footerCellTemplate: '<div class="ui-grid-cell-contents ui-grid-text-right" >{{grid.appScope.ALL_ADDED_TAX}}求和</div>'
                },

                {cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',width :200,name:'缩端56',field: 'USER_LEVEL', enableSorting: false },
                {cellClass:'bodyBluy',
                    headerCellClass:'headerAdd',width :200,name:'缩端6',field: 'USER_NAME', enableSorting: false },

                {
                    cellClass:'bodyBluy', //加上这一行，pinnedRight 滚动就无法滚动到底部
                    headerCellClass:'headerAdd',
                    width :200,
                    name:'操作',
                    field: 'USER_NAME',
                    pinnedRight:true,
                    cellTemplate: '<div class="optcell"><button class="btn primary" ng-click="grid.appScope.rowEdit(row.entity)">修改</button><button class="btn primary" ng-click="grid.appScope.rowDelete(row.entity)">删除</button></div>'
                }

            ],

        };


        //头部hover效果
        $scope.gridOptions.rowTemplate = '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ng-mouseover="grid.appScope.hoveredIndex = rowRenderIndex" ng-mouseleave="grid.appScope.hoveredIndex = null" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{\'ui-grid-row-header-cell\': col.isRowHeader, \'your-hover-class\': grid.appScope.hoveredIndex === rowRenderIndex}" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell></div>';

//       单独设置某一行的样式
//        $scope.gridOptions.rowTemplate = '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ng-mouseover="grid.appScope.hoveredIndex = rowRenderIndex" ng-mouseleave="grid.appScope.hoveredIndex = null" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{\'ui-grid-row-header-cell\': col.isRowHeader, \'bodyBluy2\':row.entity.INDEX == \'2\', \'bodyBluy3\':row.entity.SOURCE_HOUSE_NAME == \'上清\'}" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell></div>';
        //  点击获取一横好的内容
//       $scope.gridOptions.rowTemplate = '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ng-click="grid.appScope.rowEdit(row.entity)" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{\'ui-grid-row-header-cell\': col.isRowHeader, \'your-hover-class\': grid.appScope.hoveredIndex === rowRenderIndex}" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell></div>';
        //页面在这的时候 高度自适应
        $scope.windowSize = function () {
            var newHeight = $(window).height()-70;
            angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
        };
        //屏幕大小变化时候执行
        $(window).resize(function () {
            $scope.windowSize();
        });

        //获取没一行的内容
        $scope.gridOptions.appScopeProvider= {
            rowHover: function(row, show) {
                console.log(row.entity+','+show);
                $scope.row= row.entity;
            },
            rowEdit: function(id) {
                console.log(id);
            },
            rowDelete: function(id) {
                console.log(id);
            },

        };





//自定义分页
        //分页设置
        $scope.totalCount =0;//数据总数
        $scope.Allcount=0;//页面总数
        $scope.pageSize=10;//每页显示的记录数
        $scope.page=1;//当前页
        $scope.prossingData={};
//下一页
        $scope.nextClick =function () {
            if($scope.page<$scope.Allcount){
                $scope.page = Number($scope.page)+1;
                $scope.getData(); //调用从新赋值 页码就可以实现分页
            }

        };
//上一页
        $scope.prevClick = function(){
            if($scope.page>1){
                $scope.page = $scope.page -1;
                $scope.getData();
            }
        };
//首页
        $scope.shadoweClick = function(page){
            $scope.page = page;
            $scope.getData();
        };
//输入某一页
        //跳转
        $scope.skipClick = function(){
            if(!$scope.inputCurrentPage)return ; //当前页
            if($scope.inputCurrentPage>$scope.Allcount){ //大于总页数
                $scope.page = $scope.Allcount;
            }else if($scope.inputCurrentPage<=0){ //小于1的
                $scope.page = 1;
            }
            $scope.getData();
        }




        $scope.getData=function(){
            $http.get('./json/uiGriddata.json').then(function onSuccess(response) {

                if (response != null && response.data.data.data.length > 0) {
                    $scope.showLoading = true;//隐藏加载条页面
                    //一共多少条数据
                    $scope.totalCount = response.data.data.data.length;
//显示多少页
                    $scope.Allcount =($scope.totalCount % $scope.pageSize==0) ? $scope.totalCount/$scope.pageSize : parseInt($scope.totalCount/$scope.pageSize)+1;
//当前是第几页
                    $scope.prossingData.currentPage =  $scope.page;
//点击下一页
                    $scope.gridOptions.data = response.data.data.data;


//获取编号  底部模板求和  不过的  注释 $scope.gridOptions.appScopeProvider 这一行 否则出不来内容
                    var all=0;
                    var all2=0;
                    $scope.gridOptions.data.forEach(function (item, index, attr) {
                        item.INDEX=index+1;

                        all=Number(item.SOURCE_HOUSE_ID)+all;
                        all2=Number(item.USER_ID)+all2;
                    });
                    $scope.number= all; //求和
                    $scope.ALL_ADDED_TAX= all2; //求和
                }


//
// 统计总数保留两位
            });
        }
        // $scope.getData();


        setTimeout(function(){ $scope.getData(); }, 3000);

//全选
        $scope.CheckAll=function(){
            for(i=0;i<$('.check').length;i++){
                if($('.check')[i].checked==true){
                    $('.check')[i].checked=false;
                }else{
                    $('.check')[i].checked=true;
                }
            };
        };
// 导出功能 获取勾选的所有id
        var arrids =[];
        $scope.export = function () {
            $('.check:checked').each(function(){
                arrids.push($(this).parent().find(".checkid").val());
            });
            console.log(arrids)
        }

//定制可见列

        for (var i=0; i<$scope.gridOptions.columnDefs.length; i++){
            $scope.curColumn =  $scope.gridOptions.columnDefs[i];
            $scope.curColumn.visible =true;
        }
        $scope.customs=function () {
            var modalInstance = $uibModal.open({
                templateUrl: './views/uiGrid/windows/customModal.html',
                controller: customModalCtrl,
                backdrop: "static",
                size: "sm",
                resolve: {
                    dataModel: function () {
                        return  $scope.gridOptions.columnDefs;
                    }
                }
            });
            modalInstance.result.then(
                //保存事件
                function (parameter) {
                    $scope.gridOptions.columnDefs =parameter;
                    //更新列
                    console.log( $scope.gridApi)
                    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                },
                //取消事件
                function () {
                });

        };

    }]
});