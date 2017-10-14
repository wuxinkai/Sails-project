/**
 * Created by yhj on 2017/3/24.
 */
define(['angularAMD', 'scripts/services/httpService',
    'bootstrap',
    'ngload!scripts/directives/excelModalDirt',
    'ngload!angular-confirm',
    'css!bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
    'ngload!ui-notification',
    'css!bower_components/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min',
    'scripts/directives/repeatFinishedDirt',
    'ngload!scripts/controllers/alarm/loadingDirt',
    'ngload!bootstrap-datetimepicker.zh-CN'], function (angularAMD) {
    'use strict';
    angularAMD.directive('tactModal',
        function (httpService, excelService, Notification,$confirm) {
            return {
                restrict: 'E',
                templateUrl: 'views/tact/redefinition.html',
                scope: {
                    tacttype: '=tacttype',
                    alarmLevel: '=alarmLevel'
                },
                replace: true,
                link: function ($scope, element, attr) {

// ........................................................初始化字段 ........................................................
                    $scope.names = [];//判断姓名重复
                    $scope.alarmNames=[];
                    $scope.neIds = [];//判断网元ID重复
                    $scope.tacts = [];      //策略集合
                    $scope.totalNum = 0;   //总数
                    $scope.runNum = 0;     //运行
                    $scope.stopNum = 0;    //停止
                    $scope.unRunNum = 0;   //未启动
                    $scope.oldName = "";
                    $scope.isSucess=false;//是否不可用
                    $scope.userName = $.cookie("User_Name");//当前操作人
                    $scope.checkAll = false;
                    $scope.page = {
                        nowPage: 1,
                        pageCount: 50,
                        allCount: 0,
                        NumOfPage: 0
                    }
                    $scope.entity = {};
                    $scope.editflag = false;
                    $scope.titleName = "新建重定义策略";
                    $scope.columnsTitle = ["策略名称", "策略描述", "策略状态", "开始时间", "结束时间", "创建人", "创建时间","最后一次修改人","最后一次修改时间"];
                    $scope.columnsName = ["TACT_NAME", "TACT_DESC", "TACT_STATUS", "START_TIME", "END_TIME", "CREATE_USER", "CREATE_TIME","UPDATE_USER", "UPDATE_TIME"];
                    //导出
                    $scope.excelData = {};
                    $scope.excelData.columnsTitle = $scope.columnsTitle;
                    $scope.excelData.columnsName = $scope.columnsName;
                    $scope.excelData.url = tescomm.config.system.ApiService + "TactService/Alarm_tact/excel";
                    $scope.excelData.condition = $('#inputValue').val();
                    if ($scope.tacttype == 1)
                    {
                        $scope.url='#/main/redefinition';
                        $scope.excelData.fileName = "重定义策略";
                    }
                    else if ($scope.tacttype == 3)
                    {
                        $scope.url='#/main/presstact';
                        $scope.excelData.fileName = "压缩策略";
                    }
                    //二级弹窗网元操作
                    $scope.rightList = [];//右侧网元列表
                    $scope.leftList = [];//左侧网元列表
                    $scope.searchName = "";//模糊查询名称
                    $scope.allNetList = [];//获取全集（API）
                    $scope.leftList = [];

                    // 二级弹窗告警名称操作
                    $scope.AlarnText = "";//告警模糊查询名称
                    $scope.dictData = {};//字典表数据
                    $scope.alarmData = {};//告警信息数据
                    $scope.rightData = [];//右侧选中数据
                    $scope.AllAlarmData = [];//全局告警名称
                    $scope.viewFlag=false;//查看
                    $scope.isSingle=false;//新增编辑点击两下问题（新增一样两条数据）
                    $scope.isLoading=true;

//.......................................................时间控件初始化.............................................................
                    function initDate() {
                        $('#startDate').datetimepicker({
                            format: 'yyyy-mm-dd hh:00',
                            language: 'zh-CN',
                            minView: 1,
                            maxView: 2,
                            autoclose: true
                        });
                        $('#endDate').datetimepicker({
                            format: 'yyyy-mm-dd hh:00',
                            language: 'zh-CN',
                            minView: 1,
                            maxView: 2,
                            autoclose: true
                        });
                        $('#START_TIME').removeAttr("disabled");
                        $('#END_TIME').removeAttr("disabled")
                    }
                    function disableDate() {
                        $('#startDate').datetimepicker('remove');
                        $('#START_TIME').val("");
                        $('#END_TIME').val("");
                        $('#START_TIME').attr("disabled", "disabled");
                        $('#endDate').datetimepicker('remove');
                        $('#END_TIME').attr("disabled", "disabled");
                    }
                    $("input[type=radio][name=status]").click(function () {
                        if ($(this).val() == 2) {
                            initDate()
                        } else if ($(this).val() == 1) {
                            disableDate();
                        }
                    })

//......................................................查询操作 .....................................................................
                    //动态按钮权限
                    $.ajax(window.tescomm.config.system.AuthorizeService + 'Open/OAuth/GetUserAllActions', {
                        type: 'POST', data: {
                            token: $.cookie("Tescomm_Access_Token"),
                            appId: 'InMonitor',
                            url: $scope.url
                            , callback: ""
                        },dataType:'json',
                        async:false,
                        success: function (data, staus) {
                            $scope.btnPermission = data;
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                    //$scope.getFirstData=function(){
                    //    httpService.get("TactService", "Alarm_tact", "searchAll", {
                    //        PROVINCE_ID: $.cookie('provids'),
                    //        CITY_ID: $.cookie('cityids'),
                    //        AREA_ID: $.cookie('areaids'),
                    //        nowPage: $scope.page.nowPage,
                    //        pageCount: $scope.page.pageCount,
                    //        tact_name: $('#inputValue').val(),
                    //        tact_type: 2
                    //    }).then(function (data) {
                    //        if (data.result.success) {
                    //            $scope.checkAll = false;
                    //            $scope.tacts = data.result.data.model;
                    //            $scope.page = data.result.data.page;
                    //            $scope.page.nowPage = parseInt($scope.page.nowPage);
                    //            $scope.page.pageCount = parseInt($scope.page.pageCount);
                    //            var models = data.result.countList.model;
                    //            data.result.neList.forEach(function(item,index,arr){
                    //                item.Select=false;
                    //            });
                    //            $scope.allNetList = data.result.neList;
                    //            getCount(models);
                    //        }
                    //    })
                    //}
                    //$scope.getFirstData();
                    $scope.getAll = function (value) {
                        $scope.isLoading=true;
                        httpService.get("TactService", "Alarm_tact", "search", {
                            nowPage: $scope.page.nowPage,
                            pageCount: $scope.page.pageCount,
                            tact_name: $('#inputValue').val(),
                            tact_type: $scope.tacttype
                        }).then(function (data) {
                            $scope.isLoading=false;
                            if (data.result.success) {

                                $scope.checkAll = false;
                                $scope.tacts = data.result.data.model;
                                $scope.page = data.result.data.page;
                                $scope.page.nowPage = parseInt($scope.page.nowPage);
                                $scope.page.pageCount = parseInt($scope.page.pageCount);
                                var models = data.result.countList.model;
                                getCount(models);
                            }
                        })
                    }
                    //查询网元
                    function getDimNeELement() {
                        var condi = {
                            PROVINCE_ID: '',
                            CITY_ID: '',
                            AREA_ID: ''
                        };
                        httpService.post("AlarmService", "Alarm", "getNeList", {condition: condi}).then(function (data) {
                            if (data.success == true) {
                                data.data.forEach(function(item,index,arr){
                                    item.Select=false;
                                });
                                $scope.allNetList = data.data;
                            }
                        })
                    }
                    getDimNeELement();
                    $scope.getAll();
                    //接收模糊查询数据
                    $scope.$on('to-inputchange',function(event,data){

                        $scope.nuList=$scope.alarmNames.filter(function(item,index,arr){
                            return item.NAME.toLowerCase().indexOf(data.toLowerCase())>-1
                        });
                        if($scope.nuList!=null&&$scope.nuList.length>10)
                            $scope.nuList=$scope.nuList.slice(0,10);
                        $scope.$emit('to-mainnu',$scope.nuList);
                    });
                    //精确查找某条数据（用于拓扑图，其它模糊查询）
                    $scope.$on('to-single',function(event,data){
                        $('#inputValue').val(data.NAME);
                        $scope.page.nowPage = 1;
                        $scope.getAll();
                    });
                    //模糊查询数据，更新LIST
                    $scope.$on('to-name',function(event,data){
                        $scope.page.nowPage = 1;
                        $scope.getAll();
                    });
                    //统计数量
                    var getCount = function (models) {
                        $scope.totalNum = 0;   //总数
                        $scope.runNum = 0;     //运行
                        $scope.stopNum = 0;    //停止
                        $scope.unRunNum = 0;   //未启动
                        $scope.totalNum = $scope.page.allCount;
                        $scope.names = [];
                        $scope.neIds = [];
                        $scope.alarmNames=[];
                        if (models.length > 0) {
                            models.forEach(function (item, index, arr) {
                                switch (item.TACT_STATUS) {
                                    case 0:
                                        $scope.stopNum += 1;
                                        break;
                                    case 1:
                                        $scope.runNum += 1;
                                        break;
                                    case 2:
                                        $scope.unRunNum += 1;
                                        break;
                                }
                                if (item.NE_ID != null && item.NE_ID.length > 0) {
                                    var narr = item.NE_ID.split(',');
                                    if (narr.length > 0)
                                        narr.forEach(function (ne, index, nrr) {
                                            $scope.neIds.push(ne);
                                        });
                                }
                                $scope.names.push(item.TACT_NAME);
                                $scope.alarmNames.push({ID:item.TACT_NAME,NAME:item.TACT_NAME});

                            });
                        }
                    }

                    //全选
                    $scope.checkdAll = function (checked) {
                        $scope.tacts.forEach(function (item, index, arr) {
                            item.IS_CHECKED = checked;
                        });
                    }
//................................................................网元操作................................................................
                    //默认网元选中未选中初始操作
                    function  initialNe(allArr,tempArr) {
                        $scope.leftList=[];
                        if(allArr!=null&&allArr.length>0)
                        {
                            allArr.forEach(function(item,index,arr){
                                $scope.leftList.push(item);
                            });
                            if ($scope.neIds.length > 0) {
                                $scope.leftList.forEach(function (item, index, arr) {
                                    if ($scope.neIds.indexOf(item.NE_ID.toString()) > -1)
                                        item.Select = true;
                                    else
                                        item.Select = false;
                                    if (tempArr.length > 0)
                                        if (tempArr.filter(function (sitem, sindex, sarr) {
                                                return sitem.NE_ID == item.NE_ID;
                                            }).length > 0)
                                            item.Select = true;
                                });
                            }
                        }
                        else
                            $scope.leftList=[];
                    }
                    //添加网元
                    $scope.addNe=function(){
                        //if($scope.neIds.length>0)
                        //{
                        //    $scope.allNetList.forEach(function(item,index,arr){
                        //        //为了解决编辑新增加网元选中状态问题
                        //        if($scope.selectList.length>0)
                        //            if($scope.selectList.filter(function(sitem,sindex,sarr){
                        //                    return sitem.NE_ID==item.NE_ID;
                        //                }).length>0)
                        //                item.Select=true;
                        //    });
                        //}
                        initialNe($scope.allNetList,$scope.selectList);
                        $scope.searchName='';
                        $scope.rightList=cloneObj($scope.selectList);
                    }
                    //根据网元名称模糊查询网元
                    $scope.getleftList = function () {
                        if ($scope.searchName == "" || $scope.searchName == undefined)
                        {
                            initialNe($scope.allNetList,$scope.rightList);
                        }
                        else
                        {
                            var searchArr=$scope.allNetList.filter(function (item, index, arr) {
                                return item.NE_NAME.indexOf($scope.searchName) >= 0;
                            });
                            initialNe(searchArr,$scope.rightList);
                        }

                    }
                    $scope.clearall = function () {
                        $scope.selectList = [];
                        $scope.entity.NE_NAME="";
                        $scope.entity.NE_ID="";
                    };
                    //全选网元
                    $scope.selectAllNe=function(){
                        $scope.leftList.forEach(function(item,index,arr){
                            if (item.Select==false)
                            {
                                item.Select=true;
                                $scope.rightList.push(item);
                            }
                        });
                    }
                    //全部清空网元
                    $scope.clearAllNe=function(){
                        if($scope.rightList.length>0)
                        {
                            $scope.rightList.forEach(function(ritem,rindex,rarr){
                                $scope.leftList.forEach(function(litem,lindex,larr){
                                    if(ritem.NE_ID==litem.NE_ID)
                                        litem.Select=false;
                                })
                            })
                        }
                        $scope.rightList=[];
                    }
                    //左侧数据添加到右侧
                    $scope.selectModel = function (left) {
                        if (left.Select==true)
                        return;
                        else {
                            if ($scope.rightList.indexOf(left) < 0) {
                                left.Select=true;
                                $scope.rightList.push(left);
                            }
                        }
                    }
                    //右侧网元删除事件
                    $scope.removeright = function (item, type) {
                        if (type == 1)//第一个界面X
                        {
                            if ($scope.selectList.length > 0) {
                                $scope.selectList.removeByValue(item);//把删除的数据给置亮
                                $scope.entity.NE_ID = '';
                                $scope.entity.NE_NAME = '';
                                $scope.selectList.forEach(function (item, index, arr) {
                                    $scope.entity.NE_ID += item.NE_ID + ',';
                                    $scope.entity.NE_NAME += item.NE_NAME + ',';
                                });
                            }
                        }
                        else {
                            if ($scope.rightList.length > 0) {
                                $scope.rightList.removeByValue(item);
                                $scope.leftList.forEach(function (litem, index, arr) {
                                    if (litem.NE_ID == item.NE_ID)
                                        litem.Select = false;
                                });
                                $scope.neIds.removeByValue(item.NE_ID);
                            }
                        }
                    }
                    //二次弹框确定选中网元
                    $scope.sureNe = function () {
                        $scope.entity.NE_ID = "";
                        $scope.entity.NE_NAME = "";
                        if($scope.rightList.length>0)
                            $scope.rightList.forEach(function (item, index, arr) {
                                $scope.entity.NE_ID += item.NE_ID + ',';
                                $scope.entity.NE_NAME += item.NE_NAME + ',';
                            });
                        $scope.selectList=cloneObj($scope.rightList);
                        $scope.entity.NE_ID = $scope.entity.NE_ID.substr(0, $scope.entity.NE_ID.length - 1);
                        $scope.entity.NE_NAME = $scope.entity.NE_NAME.substr(0, $scope.entity.NE_NAME.length - 1);
                    }
                    //二次弹框取消选中网元
                    $scope.cancleNe = function () {
                        $('#myModalSon').modal('hide');
                    }
//................................................................告警级别...............................................................

                    //查询字典表
                    function seachDict(dict, callback) {
                        httpService.get("IM", "Dict", "getItem", {dict_type_id: dict}).then(function (data) {
                            if (data.success) {
                                if (callback)callback(data.data);
                            }
                        })
                    }
                    //告警级别
                    seachDict('alartLevel', function (data) {
                        $scope.dictData = data;
                    });
                    //选择告警级别
                    $scope.selectLevel = function (dt) {
                        entity.ALARM_LEVEL = dt.DICT_ID;
                    }
//..........................................................告警名称.....................................................................

                    //告警名称查询
                    function seachAlarm(levels) {
                        httpService.post("IM", "Dict", "getAlarm", {levels: levels}).then(function (data) {
                            if (data.success) {
                                $scope.AllAlarmData = data.data;
                            }
                        })
                    }

                    //添加告警
                    $scope.newAlarmClick = function () {
                        initialAlarm($scope.AllAlarmData,$scope.selectData);
                        $scope.rightData = cloneObj($scope.selectData);
                        $scope.AlarnText='';
                        $('#myModalSon1').modal('show');
                    }
                    //全选告警
                    $scope.selectAllAlarm=function(){
                        if($scope.alarmData!=null&&$scope.alarmData.length>0)
                        {
                           // $scope.rightData=[];
                            $scope.alarmData.forEach(function(item,index,arr){
                                item.Select=true;
                                if($scope.rightData.indexOf(item.ALARM_NAME)==-1)
                                    $scope.rightData.push(item.ALARM_NAME);
                            })
                        }
                    }

                    //清空告警
                    $scope.clearAllAlarm=function(){
                        $scope.alarmData.forEach(function(item,index,arr){
                            item.Select=false;
                        });
                        $scope.rightData=[];
                    }
                    //告警信息增加到右边
                    $scope.addRight = function ($event, ad) {
                        if (ad.Select == true)
                            return;
                        ad.Select = true;
                        $scope.rightData.push(ad.ALARM_NAME);
                    }
                    //删除右侧告警信息
                    $scope.removeAlarmClick = function (name, type) {
                        if (type == 1) {
                            if ($scope.selectData.length > 0) {
                                $scope.alarmData.forEach(function (item, index, arr) {
                                    if (item.ALARM_NAME == name)
                                        item.Select = false;
                                });
                                $scope.selectData.removeByValue(name);
                            }
                        }
                        else {
                            if ($scope.rightData.length > 0) {
                                $scope.alarmData.forEach(function (item, index, arr) {
                                    if (item.ALARM_NAME == name)
                                        item.Select = false;
                                });
                                $scope.rightData.removeByValue(name);
                            }
                        }
                    }
                    //全部清除
                    $scope.deleteAllClick = function () {
                        $scope.selectData = [];
                    }
                    //告警查询
                    $scope.alarmSearchByName = function () {
                        if ($scope.AlarnText == "" || $scope.AlarnText == null)
                        {
                            initialAlarm($scope.AllAlarmData,$scope.rightData);
                        }
                        else
                        {
                            var temp = $scope.AllAlarmData.filter(function (item, index, arr) {
                                return item.ALARM_NAME.indexOf($scope.AlarnText) >= 0;
                            });
                            initialAlarm(temp,$scope.rightData);
                        }
                    }
                    //确定告警信息
                    $scope.sureAlarmClick = function () {
                        $scope.selectData=cloneObj($scope.rightData);
                    }
                    //取消告警信息
                    $scope.cancelAlarmClick = function () {
                        $('#myModalSon1').modal('hide');
                    }
                    function initialAlarm(allData,tempData){
                        $scope.alarmData=[];
                        allData.forEach(function (item, index, arr) {
                            item.Select = false;
                            $scope.alarmData.push(item);
                        });
                        if (tempData.length > 0) {
                            tempData.forEach(function (sitem, sindex, sarr) {
                                $scope.alarmData.forEach(function (item, index, arr) {
                                    if (sitem == item.ALARM_NAME)
                                        item.Select = true;
                                });
                            });
                        }
                    }

//...........................................................................增删改导出分页 .........................................................

                    //删除
                    $scope.deleteMul = function (item, flg) {
                        var ids = [];
                        if (flg == 1) {
                            if (item.TACT_STATUS == 1)
                                return;
                            else {
                                ids.push(item.TACT_UNIQ_ID);
                                deleteCL(ids);
                            }
                        }
                        else {
                            var selectArr = $scope.tacts.filter(function (currentValue) {
                                return currentValue.IS_CHECKED == true;
                            });
                            if (selectArr.length >= 1) {
                                selectArr.forEach(function (item, index, selectArr) {
                                    if(item.TACT_STATUS != 1)
                                        ids.push(item.TACT_UNIQ_ID)
                                });
                                if(ids.length==selectArr.length)
                                    deleteCL(ids);
                                else
                                    Notification.error({message: "选中的策略中包含正在运行的策略，不可删除！", delay: 5000});
                            }
                            else {
                                Notification.error({message: "请选择要删除的策略！", delay: 5000});
                            }
                        }
                    }
                    function deleteCL(ids) {
                        $confirm({ title: '消息确认框',text: "确定删除选中的策略吗？" }).then(function () {
                            httpService.get("TactService", "Alarm_tact", "delete", {ids: ids}).then(function (data) {
                                if (data.result != null) {
                                    if (data.result.success == true) {
                                        Notification.success({message: "删除策略成功！", delay: 5000});
                                        $scope.checkAll = false;
                                        $scope.page.nowPage = 1;
                                        $scope.getAll();
                                    }
                                    else
                                        Notification.error({message: "删除策略失败！", delay: 5000});
                                }
                            });
                        });
                    }
                    //编辑
                    $scope.edit = function (item,flag) {
                        if (item.TACT_STATUS == 1&&flag==false) {
                            return;
                        }
                        else {
                            $scope.isSingle=false;
                            $scope.viewFlag=flag;
                            initialTab();
                            if(item.TACT_TYPE==1)
                            {
                                if($scope.viewFlag==true)
                                {
                                    disableDate();
                                    $scope.titleName = "查看重定义策略";
                                }
                                else
                                    $scope.titleName = "编辑重定义策略";
                            }

                            else
                            {
                                if($scope.viewFlag==true)
                                {
                                    disableDate();
                                    $scope.titleName = "查看压缩策略";
                                }
                                else
                                $scope.titleName = "编辑压缩策略";
                            }
                            $scope.oldName = item.TACT_NAME;
                            $scope.entity = cloneObj(item);
                            $('#START_TIME').val($scope.entity.START_TIME);
                            $('#END_TIME').val($scope.entity.END_TIME);
                            if ($scope.entity.IS_FOREVER == 1) {
                                disableDate();
                            }
                            else
                                initDate();
                            $scope.rightData = [];
                            $scope.rightList = [];
                            $scope.selectData = [];
                            $scope.selectList = [];
                            if ($scope.entity.NE_ID.length > 0 && $scope.allNetList.length > 0) {
                                $scope.entity.NE_ID.split(',').forEach(function (item, index, arr) {
                                    $scope.allNetList.forEach(function (net, ndex, narr) {
                                        if (net.NE_ID == item){
                                            $scope.rightList.push(net);
                                            $scope.selectList.push(net);
                                        }
                                    });
                                });
                            }
                            if ($scope.entity.EMS_ALARM_REASON.length > 0) {
                                $scope.entity.EMS_ALARM_REASON.split(',').forEach(function (item, index, arr) {
                                    $scope.rightData.push(item);
                                    $scope.selectData.push(item);
                                });
                            }

                            $scope.editflag = true;
                            $scope.user="修改人";
                            if($scope.AllAlarmData.length==0)
                                seachAlarm('');
                            $('#myModal').modal('show');
                        }
                    }
                    //停止
                    $scope.stop = function (item) {
                        if (item.TACT_STATUS != 1)
                            return;
                        $confirm({ title: '消息确认框',text: "确定停止选中的策略吗？" }).then(function () {
                            $scope.isSingle=false;
                            $scope.isStop=true;
                            var model = {};
                            model = item;
                            if (model.IS_FOREVER == 1) {
                                model.START_TIME = '';
                                model.END_TIME = '';
                            }
                            $scope.oldName = item.TACT_NAME;
                            model.TACT_STATUS = 0;
                            $scope.editflag = true;
                            updateEntity(model);
                        });
                    }
                    //导出
                    $scope.export = function () {
                        var ids = [];
                        var selectArr = $scope.tacts.filter(function (currentValue) {
                            return currentValue.IS_CHECKED == true
                        });
                        if (selectArr.length >= 1) {
                            selectArr.forEach(function (item, index, selectArr) {
                                ids.push(item.TACT_UNIQ_ID)
                            });
                        }
                        $scope.excelData.condition = $('#inputValue').val() + "|" + ids.join(",") + "|" + $scope.tacttype;
                        $('#excelModelId').modal('show');
                    }
                    //添加
                    $scope.add = function () {
                        $scope.isSingle=false;
                        $scope.viewFlag=false;
                        $scope.entity = {};
                        $scope.entity.IS_FOREVER = 2;
                        $scope.entity.FRAME_NAME='';
                        $scope.entity.DEVICE_NAME='';
                        $scope.entity.SLOT_NO='';
                        $scope.entity.PLATE_NAME='';
                        $scope.entity.PORT_NO='';
                        $scope.entity.ALARM_EMS_TYPE='';
                        $scope.entity.ALARM_REASON='';
                        $scope.entity.SERVICE_FLAG='';
                        $scope.entity.PRODUCT_TYPE='';
                        $scope.entity.EQUIPMENT_NAME='';
                        $scope.entity.MAINTENANCE_STATUS='';
                        $scope.entity.ALARM_TYPE='';
                        $scope.entity.OBJECT_TYPE='';
                        $scope.rightData = [];
                        $scope.rightList = [];
                        $scope.selectData = [];
                        $scope.selectList = [];
                        $scope.editflag = false;
                        initialTab();
                        initDate();
                        $('#START_TIME').val('');
                        $('#END_TIME').val('');

                        if($scope.tacttype==1)
                            $scope.titleName = "新建重定义策略";
                        else
                            $scope.titleName = "新建压缩策略";
                        $scope.user="创建人";
                        if($scope.AllAlarmData.length==0)
                        seachAlarm('');
                        $('#myModal').modal('show');
                    }
                    function initialTab(){
                        $("#tabUl").children().removeClass('active');
                        $("#tabUl").children().first().addClass('active');
                        $("#tabDiv").children().removeClass('in active');
                        $("#tabDiv").children().first().addClass('in active');
                    }
                    //分页
                    $scope.pageChanged = function (index, flg) {
                        if (flg) {
                            if (index == "" || index == null)
                                index = 1;
                            if (index > $scope.page.NumOfPage)
                                index = $scope.page.NumOfPage;
                            $scope.page.nowPage = index;
                        }
                        else {
                            switch (index) {
                                case 0:
                                    $scope.page.nowPage = 1;
                                    $scope.pageNum="";
                                    break;
                                case 1:
                                    if ($scope.page.nowPage > 1)
                                        $scope.page.nowPage -= 1;
                                    $scope.pageNum="";
                                    break;
                                case 2:
                                    if ($scope.page.NumOfPage - $scope.page.nowPage > 0)
                                        $scope.page.nowPage += 1;
                                    $scope.pageNum="";
                                    break;
                                case 3:
                                    $scope.page.nowPage = $scope.page.NumOfPage;
                                    $scope.pageNum="";
                                    break;
                            }
                        }
                        $scope.getAll();
                    }
                    $scope.keyUp = function () {
                        $scope.pageNum = $scope.pageNum.replace(/[^0-9-]+/, '');
                        if ($scope.pageNum > $scope.page.NumOfPage)$scope.pageNum = '';
                    }
                    //新增或编辑
                    $scope.addTact = function () {
                        $scope.isSucess=true;
                        if (validEntity()) {
                            var date = new Date();
                            if (new Date($scope.entity.START_TIME) > date) {
                                $scope.entity.TACT_STATUS = 2;
                            }
                            else
                                $scope.entity.TACT_STATUS = 1;//启动
                            if ($scope.editflag == false) {
                                var Datime=getNowFormatDate();
                                $scope.entity.CREATE_USER = $scope.userName;
                                $scope.entity.CREATE_TIME = Datime;
                                $scope.entity.LOAD_TIME = Datime;
                                $scope.entity.TACT_TYPE = $scope.tacttype;//重定义策略
                                $scope.entity.UPDATE_USER=$scope.userName;
                                $scope.entity.UPDATE_TIME=Datime;
                                $scope.entity.LOAD_TIME=Datime;
                                ValidTactName(create);
                            }
                            else {
                                $scope.isStop=false;
                                if (!($scope.editflag == true && $scope.oldName == $scope.entity.TACT_NAME))
                                    ValidTactName(updateEntity)
                                else
                                {
                                    updateEntity($scope.entity);
                                }
                            }
                        }
                        else
                            $scope.isSucess=false;
                    }
                    //验证名称
                    function ValidTactName(method){
                        httpService.get("TactService", "Alarm_tact", "getNames", {
                            tact_type: $scope.tacttype,
                            tact_name: $scope.entity.TACT_NAME
                        }).then(function (data) {
                            if (data.success) {
                                var models = data.model;
                                if(models!=null&&models.length>0)
                                    Notification.error({message: "该策略名称已在数据库中存在，请重新填写！", delay: 5000});
                                else
                                    method($scope.entity);
                            }
                        })
                    }
                    //新建
                    function  create(model) {
                        if($scope.isSingle==true)
                            return;
                        $scope.isSingle=true;
                        httpService.post("TactService", "Alarm_tact", "create", {entity: model}).then(function (data) {
                            if (data.result.success== true) {
                                Notification.success({message: "新增成功 ！", delay: 5000});
                                $scope.getAll();
                                $('#myModal').modal('hide');
                            }
                            else
                            {
                                Notification.success({message: "新增失败！", delay: 5000});
                                $scope.isSingle=false;
                                $scope.getAll();
                            }
                        })
                    }
                    //编辑
                    function updateEntity(model) {
                        if($scope.isSingle==true)
                            return;
                        $scope.isSingle=true;
                        model.UPDATE_TIME = getNowFormatDate();
                        model.UPDATE_USER = $scope.userName;
                        httpService.post("TactService", "Alarm_tact", "update", {entity: model}).then(function (data) {
                            if (data.result.success== true) {
                                if($scope.isStop==true)
                                Notification.success({message: "停止成功 ！", delay: 1000});
                                else
                                    Notification.success({message: "编辑成功 ！", delay: 1000});
                                $scope.getAll();
                                $('#myModal').modal('hide');
                            }
                            else
                            {
                                Notification.success({message: "编辑失败！", delay: 1000});
                                $scope.isSingle=false;
                                $scope.getAll();
                                $('#myModal').modal('hide');
                            }
                        })
                    }
                    //验证填写信息是否正确
                    function validEntity() {
                        $scope.entity.START_TIME = $('#START_TIME').val();
                        $scope.entity.END_TIME = $('#END_TIME').val();
                        if ($scope.selectData.length > 0)
                            $scope.entity.EMS_ALARM_REASON = $scope.selectData.join(',');
                        else
                            $scope.entity.EMS_ALARM_REASON = '';
                        if ($scope.entity.TACT_NAME == null || $scope.entity.TACT_NAME == '') {
                            Notification.error({message: "策略名称不能为空！", delay: 5000});
                            return false;
                        }
                        if ($scope.entity.NE_NAME == null || $scope.entity.NE_NAME == '') {
                            Notification.error({message: "已选网元不能为空！", delay: 5000});
                            return false;
                        }
                        if ($scope.entity.EMS_ALARM_REASON == null || $scope.entity.EMS_ALARM_REASON == '') {
                            Notification.error({message: "已选告警名称不能为空！", delay: 5000});
                            return false;
                        }
                        if ($scope.alarmLevel == true)
                            if ($scope.entity.ALARM_LEVEL == null || $scope.entity.ALARM_LEVEL == '') {
                                Notification.error({message: "告警等级不能为空！", delay: 5000});
                                return false;
                            }
                        if ($scope.entity.IS_FOREVER == 2) {
                            if ($scope.entity.START_TIME == '' || $scope.entity.START_TIME == null) {
                                Notification.error({message: "必须选择开始时间！", delay: 5000});
                                return false;
                            }
                            if ($scope.entity.END_TIME == '' || $scope.entity.END_TIME == null) {
                                Notification.error({message: "必须选择结束时间！", delay: 5000});
                                return false;
                            }
                            if (new Date($scope.entity.END_TIME) < new Date($scope.entity.START_TIME)) {
                                Notification.error({message: "结束时间必须大于开始时间！", delay: 5000});
                                return false;
                            }
                            if (new Date($scope.entity.END_TIME) < new Date()) {
                                Notification.error({message: "结束时间必须大于当前时间！", delay: 5000});
                                return false;
                            }
                        }
                        return true;
                    }

 //.............................................................公共方法.............................................................................
                    //数组添加自定义删除
                    Array.prototype.removeByValue = function (val) {
                        for (var i = 0; i < this.length; i++) {
                            if (this[i] == val) {
                                this.splice(i, 1);
                                break;
                            }
                        }
                    }
                    //获得当前时间
                    function getNowFormatDate() {
                        var date = new Date();
                        var seperator1 = "-";
                        var seperator2 = ":";
                        var month = date.getMonth() + 1;
                        var strDate = date.getDate();
                        if (month >= 1 && month <= 9) {
                            month = "0" + month;
                        }
                        if (strDate >= 0 && strDate <= 9) {
                            strDate = "0" + strDate;
                        }
                        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                            + " " + date.getHours() + seperator2 + date.getMinutes()
                            + seperator2 + date.getSeconds();
                        return currentdate;
                    }
                    //初始化页面
                    $scope.$on('repeatFinished',function(repeatFinishedEvent, element){
                        initStyleRedefinition();
                        function initStyleRedefinition() {

                             $('#tbodyScroll').css("height", ($('#alarmConRight').height() - $('.om-footer').height() - 100) + 'px')

                            if($(window).width() <= 1880){
                                $('#tbodyScroll').css("height", ($('#alarmConRight').height() - $('.om-footer').height() - 117) + 'px')
                            }
                        };
                        $(window).resize(function () {
                            initStyleRedefinition();
                        });
                    });
                    $(".amLeft-group li,.am-souSuo a").click(function () {
                        $(this).addClass('cur').siblings().removeClass('cur');
                    });
                    //深拷贝
                    var cloneObj = function(obj){
                        var str, newobj = obj.constructor === Array ? [] : {};
                        if(typeof obj !== 'object'){
                            return;
                        } else if(window.JSON){
                            str = JSON.stringify(obj), //系列化对象
                                newobj = JSON.parse(str); //还原
                        } else {
                            for(var i in obj){
                                newobj[i] = typeof obj[i] === 'object' ?
                                    cloneObj(obj[i]) : obj[i];
                            }
                        }
                        return newobj;
                    };
                }
            };
        });
})
