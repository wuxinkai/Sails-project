define([
    // 'cookie',  //
    // 'ui.bootstrap',
    // 'scripts/requireHelper/requireNotification',//插件消息提示
    // 'bower_components/angular-confirm/angular-confirm', //确认消息提示框

    'css!bower_components/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min',
    'ngload!bootstrap-datetimepicker.zh-CN'


], function () {
    return ['$scope', 'i18nService', function ($scope, i18nService) {

        // $scope.deletes = {};//删除数据初始化
        $scope.langs = i18nService.getAllLangs();
        $scope.lang = 'zh-cn';
//初始化日期

        $('#startDate').datetimepicker({
            format: 'yyyy-mm-dd hh:00:00',
            language: 'zh-CN',
            minView: 1,
            maxView: 2,
            autoclose: true,
            pickerPosition: 'bottom-left'
        });
        $('#endDate').datetimepicker({
            format: 'yyyy-mm-dd hh:00:00',
            language: 'zh-CN',
            minView: 1,
            maxView: 2,
            autoclose: true,
            pickerPosition: 'bottom-left'
        });
        // $('#START_TIME').removeAttr("disabled");
        // $('#END_TIME').removeAttr("disabled");

//时间控件被调用
        $scope.initDate = function (index) {
            $('#startDate'+index).datetimepicker({
                format: 'yyyy-mm-dd hh:00:00',
                language: 'zh-CN',
                minView: 1,
                maxView: 2,
                autoclose: true
            });
            $('#endDate'+index).datetimepicker({
                format: 'yyyy-mm-dd hh:00:00',
                language: 'zh-CN',
                minView: 1,
                maxView: 2,
                autoclose: true
            });
        }

        $scope.checkStatus = false; //默认不是全选
        //分页JSON
        $scope.pageIndex = 1;//当前页
        $scope.NumOfPage = 0;//总页数
        $scope.pageSize = 20;   //每页显示多少
        var strList='';        //插入表格html字符串
        $scope.PartName='';
        var number=0;
        //初始化条件
        $scope.gridOptions = {
            enablePaginationControls: false, //自定义分页
            columnDefs: [
                {
                    field: 'INDEX',
                    name: '序号',
                    width: 100,
                    enableColumnMenu: false,
                    cellClass: 'bodyBluy',
                    headerCellClass: 'headerColor',
                    cellTemplate: "<div ><input class='inputWidth' type='checkbox'  ng-model='row.entity.ISCHECKED' ng-click='grid.appScope.checkStatus()'><span> {{row.entity.INDEX}}</span></div>"
                },
                {
                    field: 'PART_NAME',
                    name: '巡检段落',
                    cellClass: 'bodyBluy',
                    headerCellClass: 'headerColor',
                    enableColumnMenu: false,
                    cellTooltip: function (row, col) {
                        return row.entity.PART_START;
                    }
                }
            ]
        }
        //头部hover效果
        $scope.gridOptions.rowTemplate = '<div ng-click="grid.appScope.rowClick(grid, row, col,rowRenderIndex,row.entity)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ng-mouseover="grid.appScope.hoveredIndex = rowRenderIndex" ng-mouseleave="grid.appScope.hoveredIndex = null" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{\'ui-grid-row-header-cell\': col.isRowHeader, \'your-hover-class\': grid.appScope.hoveredIndex === rowRenderIndex}" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell></div>';
        //获取没一行的内容
        $scope.gridOptions.appScopeProvider = {
            rowHover: function (row, show) {

            },
//如果选中的个数 等于 总条数 说明 是全选
            checkStatus: function () {
                if ($scope.gridOptions.data.filter(function (item, index, arr) { //判断当前 总数据的和被赛选的有多少带有ISCHECKED：true属性
                        return item.ISCHECKED == true;  //被选中的增加自定义属性 ISCHECKED：true
                    }).length == $scope.gridOptions.data.length) {
                    $scope.checkAll = true; //这是所有的都选中后，全选按钮也跟着一起选中
                }
                else {
                    $scope.checkAll = false; //没有全选
                }

            }
        }
        $scope.gridOptions.data = [];
//（一）获取段落
      var datas=[
            {
                "success": true,
                "data": [
                    {
                        "ID": "73e6d731-42aa-443c-9c57-6debdc8313a4",
                        "PART_NAME": "测试2"
                    },
                    {
                        "ID": "6699e7cd-37ea-4489-8aba-e77308095eea",
                        "PART_NAME": "段落6"
                    },
                    {
                        "ID": "4bc2357d-cacb-4c07-836b-1cf452862cd1",
                        "PART_NAME": "段落7"
                    },
                    {
                        "ID": "cc190916-80c6-474f-8fce-db09571c8a84",
                        "PART_NAME": "段落8"
                    },
                    // {
                    //     "ID": "25d99cfc-cb0a-4bed-8826-1ffdb86e2331",
                    //     "PART_NAME": "段落9"
                    // },
                    // {
                    //     "ID": "d13da0cc-02b7-4fa7-8b36-fc02f0836882",
                    //     "PART_NAME": "段落12"
                    // },
                    // {
                    //     "ID": "47ce2ca8-994f-46b0-bb5a-b7d5b8f611c1",
                    //     "PART_NAME": ""
                    // },
                    // {
                    //     "ID": "9c80944e-390c-4776-8c2e-5045e21ccfd8",
                    //     "PART_NAME": "小河-武汉北-黄坡东"
                    // },
                    // {
                    //     "ID": "0cde194c-9034-4abf-a6d0-6cae47e4b8ca",
                    //     "PART_NAME": "武汉西-湖北省厅-长航通信"
                    // },
                    // {
                    //     "ID": "9af83454-b458-470b-a309-6c051f0b5aa3",
                    //     "PART_NAME": "北培南-重庆高速集团-中兴"
                    // },
                    // {
                    //     "ID": "2d5c66ef-381c-4155-8e58-373d42e94c1e",
                    //     "PART_NAME": "白彦花-福生庄"
                    // },
                    // {
                    //     "ID": "2618545c-8b89-4546-93d6-7ad1173c0b22",
                    //     "PART_NAME": "测试"
                    // }
                ],
                "dataCount": 12
            }
        ];
        $scope.gridOptions.data=datas[0].data;

//（二）点击确定
        $scope.modalSubmit = function () {

            $scope.filterList = $scope.gridOptions.data.filter(function (item, index, arr) {
                return item.ISCHECKED == true; //获取的是item.ISCHECKED的数据
            });

//(三)被选中的条数 等于$scope.selectLength；
            $scope.selectLength=$scope.filterList.length; //判断选中多少条被选中

            $scope.taskReList=[]; //往里面存储我我们选中的样式；
            $scope.gridOptions.data.forEach(function (item,index,arr) {
                if(item.ISCHECKED==true){  //判断有多少个被选中
                    $scope.taskReList.push({
                        PART_ID: item.ID,//段落ID
                        PART_NAME:item.PART_NAME,
                        PART_STATUS: 1,//状态（0未添加 1添加）
                        START_TIME: '',//开始时间
                        END_TIME: '',//结束时间
                        PREPARATION: ''//巡检准备
                    });
                    item.ISCHECKED=false;  //选中完后让状态回归到原来的false
                }
            });
            $scope.insertTr(); //成功后调用一下插入的方法
            $scope.checkAll=false;
             $('#selectRange').modal('hide');
        };
//（四）插入页面
        //动态插入表格
        $scope.insertTr=function () {
            //selectLength是总共有多少条被选中的数据
            for (var i = 0; i < $scope.selectLength; i++) {
                strList='';
                number=number+1;
                strList += '<tr  class="range"><td  style="width: 50px">'+number+'</td><td style="max-width: 200px;">'+$scope.filterList[i].PART_NAME+'</td><td style="padding: 0"> <div id="startDate'+number+'" class="detail-con form_datetime  kc-demo date datetime clearfix"><span class="add-on" style="width:100%;height: 100%;position: relative;display:inline-block;"><input type="text" class="form-control input-color form-select startValue" style="background: #fff;border: 0"><i class="glyphicon glyphicon-calendar fa fa-calendar pr-calendar" style="position: absolute;top:10px;right: 10px;"></i></span></div></td>';
                strList += ' <td style="padding: 0"><div id="endDate'+number+'" class="detail-con form_datetime  kc-demo date datetime clearfix"><span class="add-on" style="width:100%;height: 100%;position: relative;display:inline-block;"><input type="text" class="form-control input-color form-select endValue" style="background: #fff;border: 0"><i class="glyphicon glyphicon-calendar fa fa-calendar pr-calendar" style="position: absolute;top:10px;right: 10px;"></i></span></div></td>';
                strList += '<td style="padding: 0;width: 40px"><button class="btnStyle table-td01 deleteBtn" title="删除" id="deleteRange'+number+'"></button></td></tr>';
                //append  可以不断的插入
                $('#insertTr').append(strList);
                 $scope.initDate(number); //时间呗控件
            }
        };
// (五)  删除当前内容 每个标签上都有一个class 叫deleteBtn  找到他们对应的id
        $("body").on("click", '.deleteBtn ', function (e) {
            var n = $(this).attr("id");
            var it=Number(n.slice(11))-1; //deleteRange1  删除11项 得到的结果减去1就是当前的索引
            $("#" + n).parent().parent().remove(); //删除当前元素的爷爷 <tr class="range">标签
            $scope.taskReList.splice(it,1); //也从当前的空数组中删除这一项内容
            number=number-1; //当前元素的控件的索引也会少一个
        });

//查询
    $scope.queryRange=function () {
        $scope.getParlListByName();
    };
//清空查询
    $scope.empty = function () {
        $scope.PartName = '';
    };
//点击取消
    $scope.modalCancle = function () {
        $('#selectRange').modal('hide');
    };
//点击弹出侧
        $scope.selectRange = function () {
            $('#selectRange').modal('show');
        };

//分页
        $scope.pageChanged = function (index, flg) {
            $scope.checkStatus = false;
            if (flg) {
                if (!$scope.pageNum) {
                    Notification.info('请输入页数');
                    return;
                }
                else if ($scope.pageNum > $scope.NumOfPage) {
                    $scope.pageNum = $scope.NumOfPage;
                }
                else {
                    $scope.pageIndex = $scope.pageNum;
                }
            }
            else {
                if (index == 0) {
                    $scope.pageIndex = 1;
                }
                else if (index == 1) {
                    if ($scope.pageIndex == 1) {
                        $scope.pageIndex = 1
                    }
                    else {
                        $scope.pageIndex = $scope.pageIndex - 1;
                    }
                }
                else if (index == 2) {
                    if ($scope.pageIndex < $scope.NumOfPage) {
                        if ($scope.pageIndex == $scope.pageNum) {
                            $scope.pageIndex = $scope.pageNum;
                        }
                        else {
                            $scope.pageIndex = $scope.pageIndex + 1;
                        }
                    }
                }
                else if (index == 3) {
                    $scope.pageIndex = $scope.NumOfPage;
                }
            }
            $scope.getData();
        };
//失去焦点
        $scope.keyUp = function () {
            $scope.pageNum = $scope.pageNum.replace(/[^0-9-]+/, '');
            if ($scope.pageNum > $scope.NumOfPage) {
                $scope.pageNum = $scope.NumOfPage;
            }
        };
// 全选
        $scope.checkClick = function () {
            $scope.gridOptions.data.forEach(function (item, index, arr) {
                item.ISCHECKED = $scope.checkAll;
            });
        };
        
        
//打印内容
//         $scope.submit=function () {
//
//         }
    }];
})