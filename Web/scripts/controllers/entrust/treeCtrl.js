
define([
    'css!bower_components/z-tree.v3/css/zTreeStyle/zTreeStyle.css',
    'bower_components/z-tree.v3/js/jquery.ztree.all'
], function (addPersonnelCtrl,uploadCommonCtrl) {
    'use strict';
    return ['$scope', function ($scope) {

//------------------------------------------------------------------
        $scope.canUse = true; //按钮启用

        var setting2 = {
            view: {
                showIcon: showIconForTree
            },
            check: {
                enable: true,
                chkStyle: "checkbox",//显示 checkbox 选择框
                chkboxType: { "Y": "ps", "N": "ps" }//勾选 checkbox 对于父子节点的关联关系
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pId",
                    rootPId: ""
                }
            },
            callback: {
                onCheck: zTreeCheck2
            }
        };
        //初始化
        function IniTree() {
            var t = $("#tree2");  //11111111111111通过id 获取内容
            t = $.fn.zTree.init(t, setting2, zNodes);
            t.expandAll(true);
        };
        //图标
        function showIconForTree(treeId, treeNode) {
            return !treeNode.isParent;
        };

        var zNodes =[];

        function GetTree2(data) {
            $.each(data, function (index, value) {
                var node = {
                    "pId": value.Pid,
                    "id": value.Id,
                    "org_no": value.Org_No,
                    "name": value.Org_Name,
                    "IsUser": value.IsUser,
                    checked: false,
                    open: false
                };
                zNodes.push(node);
                if (value.Children && value.Children.length > 0) {
                    GetTree2(value.Children);
                } else {
                    return;
                }
            })
        }


        $scope.getZtree2 = function () {
            zNodes.length = 0;//清空数据
            $.ajax({
                async:false,
                url: "json/tree2.json",
                success: function (jsonData) {
                    var index = relIndexOf(jsonData, "Org_No", 'zjxtjt');
                    var newData = [];
                    newData.push(jsonData[index]);
                    GetTree2(newData);
                    IniTree();
                }
            })
        };
        $scope.getZtree2();
        $scope.$on('get-ztree', function (event, data) {
            $scope.TO_ISSUER_ID_LIST = "";
            $scope.TO_ISSUER_NAME_LIST = "";
            $scope.ANNOUNCEMENT_CONTENT = "";
            $("input[name='radios']").eq(0).prop({"checked":true});
            $('#AnnDate').attr({'disabled': true}).val("");
        });
        function zTreeCheck2(event, treeId, treeNode) {
            var treeObj=$.fn.zTree.getZTreeObj("tree2"), //222222222222通过id 获取内容
                nodes=treeObj.getCheckedNodes(true);
            var v = [];
            for(var i=0; i<nodes.length ; i++){
                if(nodes[i].IsUser) {
                    v.push(nodes[i].id); //获取id
                }
            }
            console.log(v)

            if(v.length > 0) { //大于0  按钮是否可以点击
                $scope.$apply(function () {
                    $scope.canUse = false;
                })
            }else { //小于0  按钮是否可以点击
                $scope.$apply(function () {
                    $scope.canUse = true;
                })
            }

        };

        function relIndexOf(data,key, val) {
            for (var i = 0; i < data.length; i++) {
                if (data[i][key] == val) return i;
            }
            return -1;
        }
        $scope.getAllUserList = function () {
            //下面这个方法可以写到确定点击事件中，
            var treeObj=$.fn.zTree.getZTreeObj("tree2"), //33333333333333通过id 获取内容
                nodes=treeObj.getCheckedNodes(true);
            var v = [];
            var m = [];
            for(var i=0; i<nodes.length ; i++){
                if(nodes[i].IsUser) {
                    v.push(nodes[i].id);
                    m.push(nodes[i].name);
                }
            }
            $scope.TO_1 = v;
            $scope.TO_2 = m.join(',');
            console.log(  $scope.TO_1,$scope.TO_2)

        };
//----------------------------------------------------
        (function () {

            var setting = {  //初始化
                view: {
                    showIcon: showIconForTree
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: ""
                    }
                },
                callback: {
                    onClick: zTreeCheck
                }
            };
            //初始化
            function IniTree() {
                var t = $("#tree");
                t = $.fn.zTree.init(t, setting, zNodes);
                t.expandAll(true);
            };
            function showIconForTree(treeId, treeNode) {
                return !treeNode.isParent;
            };
            var zNodes =[]; //存储 DOM树
            $scope.TO_ISSUER_ID_LIST = [];
            $scope.canUse = true;
            function GetTree(data) {
                var node = {
                    "pId": null,
                    "id": 0,
                    "name": "全国",
                    checked: false,
                    open: false
                };
                zNodes.push(node);
                $.each(data, function (index, value) {
                    var node = {
                        "pId": value.PID, //通过父id
                        "id": value.ID,  //子id   通过id
                        "name": value.NAME,
                        checked: false,
                        open: false
                    };

                    zNodes.push(node);
                    if (value.Children && value.Children.length > 0) {
                        console.log(value.Children )
                        GetTree(value.Children);
                    } else {
                        return;
                    }

                })
            }
            $scope.getZtree = function () {
                $.ajax({
                    async:false,
                    url: "json/tree.json",
                    success: function (jsonData) {
                        $scope.areaList=jsonData;
                        GetTree(jsonData);
                        IniTree();
                    }
                })
            };
            $scope.getZtree();
            //区域点击事件
            function zTreeCheck(event, treeId, treeNode) {
                $scope.ProvinceID = treeNode.id;
                $scope.ProvinceName = treeNode.name;
                console.log( $scope.ProvinceID,$scope.ProvinceName)
            };

        })()
        }]
});