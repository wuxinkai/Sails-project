define([
    'scripts/services/httpService',
], function () {
    return ['$scope','$location','$compile','httpService', function ($scope,$location,$compile,httpService) {

        $scope.leftTile = '资源核实发起';
        $scope.isShowRoute = false;                      //是否显示详情路由 默认不显示
        $scope.isFirstAdd = true;                        //是否显示第一个添加按钮
        var neArr = [

        ];                                  //网元数组
        var htmlNum = 0;                                 //标记新增input框序号
        var htmlCount  = 0;                              //标记新增input个数
        $scope.entity = {
            IsSelect: "",                                 //满足或不满足
            CONTENT: ""                                   //备注
        }
        // 提交实体
        $scope.insertData = {
            MARK:"",                                      //备注/结果
            WORK_ID:"",                                   //工单ID
            TYPE:"",                                      //类型（0 资源核实结果1 市场部结果确认 2 采购部评估 3 工程部评估 4 资源管理部评估方案 5 采购部采购 6 工程部实施 7运维部开通 8 服务开通确认，9 资源管理部统计资源 10服务关闭结果 11 资源释放结果）
            IS_CONTINUE:"",                               //方案结果（0 不承接 1继续承接）
            IS_OPEN:"",                                   //运维部开通（开通结果： 1 开通成功 0开通失败）
            IS_SURE:"",                                   //服务开通确认（1 信息核实准确 0信息核实有误）
            IS_SITE:"",                                   //是否为业务站点（1 是 0 否）
        }
        $scope.workId = $location.search().workID;
        //获得全部网元

        //组装数据
        function formData(arr) {
            var str = '';
            var arr = [
                {NE_ID:'1',NE_NAME:'小米'},
                {NE_ID:'1',NE_NAME:'小米'},
                {NE_ID:'1',NE_NAME:'小米'},
                {NE_ID:'1',NE_NAME:'小米'},
                {NE_ID:'1',NE_NAME:'小米'}
            ];
            arr.forEach(function (item, index) {
                str += '<li class="item"><a href="javascript:;"ng-click="oneClick($event)" id="A'+item.NE_ID+'" title="' + item.NE_NAME + '">' + item.NE_NAME + '</a></li>';
            });
            return str;
        }
        //创建新建详细网元的html
        $scope.createNEHtml = function () {
            var html = '<div class="col-md-4 marginBottom nebox">' +
                '<input ng-model="html'+htmlNum+'"type="text" class="input-addNe" placeholder="请输入业务A端"' +
                'ng-blur="inputBlur($event)" ng-focus="inputFocus($event)"' +
                'ng-keyup="inputChange($event)">' +
                '<span ng-click="addSelect(2,$event)" class="addUser pull-right inputGroupRouteClick" style="margin-left: 5px"></span>' +
                '<span ng-click="deleteDom($event)" class="glyphicon glyphicon-remove pull-right " style="margin-left: 5px"></span>' +
                '<ul class="searchList" style="display: none"> ' +
                formData($scope.neList) +
                '</ul>' +
                ' </div>';
            return html;
        }
        //添加新的网元
        $scope.addSelect = function (type, $event) {
            htmlNum +=1;
            htmlCount+=1;
            var $html = $compile($scope.createNEHtml())($scope);
            if (type == 1) {
                $("#inputRoute").append($html);
                $scope.isFirstAdd = false;
            }else{
                var target = $event.target;
                $(target).parents(".nebox").after($html);
                $scope.isFirstAdd = false;
            }
        }
        //移除网元
        $scope.deleteDom = function ($event) {
            htmlCount -=1;
            if(htmlCount ==0){
                $scope.isFirstAdd = true;
            }
            var target = $event.target;
            $(target).parents('.nebox').remove();
        }
        //获焦
        $scope.inputFocus = function ($event) {
            var target = $event.target;
            $(target).parents('.nebox').children(".searchList").css({display: "block"});
            // $(target).parents('.nebox').children(".searchList").attr({id:"choose"});
            // // $(target).parents('#inputRoute').children(".searchList").not("#choose").css({display:"none"});
            // $(".searchList").not("#choose").css({display:"none"});
        }
        //失焦
        $scope.inputBlur = function ($event) {
            var target = $event.target;
            var a = $timeout(function () {
                $(target).parents('.nebox').children(".searchList").css({display: "none"});
            }, 300);
        };
        //检测输入框变化
        $scope.inputChange = function ($event) {
            var target = $event.target;
            var html = $(target).val();
            if (html) {
                $scope.neList = $scope.AllNe.filter(function (item, index, arr) {
                    return item.NE_NAME.indexOf(html) > -1;
                });
            }
            else {
                $scope.neList = $scope.AllNe;
            }
            var $html = $compile(formData($scope.neList))($scope);
            $(target).parents(".nebox").children(".searchList").children(".item").remove();
            $(target).parents(".nebox").children(".searchList").append($html);
        }
        //选中某条数据查询
        $scope.oneClick = function ($event) {
            var target = $event.target;
            var html = $(target).html();                //获取网元名称
            var id = target.getAttribute("id");      //获取网元Id
            $(target).parents('.nebox').children(".input-addNe").val(html);
            $(target).parents('.nebox').children(".input-addNe").attr({id:"B"+id});
        };
        // 资源满足/或不满足切换函数
        $scope.radioChange = function (type) {
            $scope.isShowRoute = type == 0 ? true : false;
        }
        // 根据工单Id和角色查询接单人信息
        httpService.post("WorkDetailInfo", "Work_detail_info", "getRecevier", {
            roleId: "scbzyhsfqr", workId: $scope.workId
        }).then(function (data) {
            if (data.success = true) {
                $scope.operator = data.data[0];
            }
            else {
                Notification.success({message: "新建工单失败！", delay: 2000});
            }
        });
        //发起提交
        $scope.setupProject = function () {
            if ($scope.entity.IsSelect === "") {
                return Notification.error({message: '请选择核查情况', delay: 3000});
            }
            if ($scope.entity.IsSelect == 0) {
                if ($scope.checkAllNe()) {
                    return Notification.error({message: $scope.checkAllNe() + ' 网元已经被选中，请修改或者删除此网元', delay: 5000});
                }
            }
            if (!$scope.entity.CONTENT) {
                return Notification.error({message: '请填写备注', delay: 3000});
            }
            $scope.error01 = true;
            $scope.error02 = false;
            $scope.error03 = true;
            $("#prompt").modal("show");

        }
        //提交确认
        $scope.suConfirm = function () {
            if ($scope.isSubmit) {
                return;
            }
            $scope.isSubmit = true;

            $scope.saveData = function () {
                httpService.post("WorkDetailInfo", "F_market_result", "create", {
                    entity: $scope.insertData
                }).then(function (data) {
                    if (data.success = true) {
                        if($scope.entity.IsSelect ==1){
                            $("#prompt").modal("hide");
                            $scope.reback();
                            Notification.success({message: "提交工单成功！", delay: 2000});
                        }else {
                            var routeIds = [];
                            var routeName = [];

                            $(".input-addNe").each(function (index,item) {
                                routeIds.push($(item).arrt("id").substr(1));
                                routeName.push($(item).val());
                            });
                            httpService.post("WorkDetailInfo", "F_customer_route", "updateCusByWorkId", {
                                Route_Ids: routeIds.join(","),Route_Names:routeName.join(","), workId:$scope.workId
                            }).then(function (data) {
                                if(data.success = true){
                                    $("#prompt").modal("hide");
                                    $scope.reback();
                                    Notification.success({message: "提交工单成功！", delay: 2000});
                                }else {
                                    $scope.isSubmit = false;
                                    Notification.success({message: "提交工单失败！", delay: 2000});
                                }
                            });
                        }
                    }
                    else {
                        $scope.isSubmit = false;
                        Notification.success({message: "提交工单失败！", delay: 2000});
                    }

                });
            }
        }
        // 验证网元是否有相同
        $scope.checkAllNe = function () {
            var result = "";
            $(".input-addNe").each(function () {
                neArr.push(this.value);
            });
            for (var i = 0; i < neArr.length; i++) {
                if (UtilsService.isExistArray(neArr.slice(i + 1, neArr.length), neArr[i])) {
                    result = neArr[i];
                    break;
                }
            }
            neArr = [];
            return result;
        }

        //返回按钮
        $scope.reback = function () {
            $location.path('/main/verifyMain').search(
                {
                    view1: $scope.view1,//全部
                    view2: $scope.view2,//我的已发
                    view3: $scope.view3,//我的待办
                    view4: $scope.view4//我的已办
                }
            );


        }


    }];
});