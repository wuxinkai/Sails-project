define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {
        //数标点击后添加到另一处
        //左侧添加
        $scope.checkCateData = []; //创建数组  （如果不添加出出现替换，始终都是一个）
        $scope.subDataClick = function (cate) {
            var ary =$scope.checkCateData//赋值给变量
            console.log(cate)
            if (ary.indexOf(cate)==-1) {   //避免重复添加
                ary.push(cate);
            }
            $scope.checkCateData = ary; //添加到
            var box= $scope.checkCateData.join(","); //添加内容用逗号分隔
            var box1=$scope.checkCateData[0]; //当前选择的第1个

        };
        //左侧删除
        //添加到原型的删除方法
        Array.prototype.remove = function (val) { var index = this.indexOf(val); if (index > -1) { this.splice(index, 1); } };
        $scope.deleteCheckData = function (cate) {
            $scope.checkCateData.remove(cate);

        };

        //右侧切换
        $scope.checkcateClick = function (c,$event) {  //c是当前点击的（标签里的内容）   $event 是所有标签的对象所有的信息
            $('.active').removeClass("active");  //有active 这个属性的删除 active
            $($event.target).addClass("active"); //$event.target 当前点击的这个标签加属性，添加样式
            console.log(c)

        }

//数标划过显示或者隐藏
        setTimeout(function () {
            $(".product_sort .bd .item").hover(function () {
                $(this).addClass("layer");
            }, function () {
                $(this).removeClass("layer");
            });
        },500);
//全部数据数据
        $scope.category=[
            {
                "application_id": "www.nuomi.com",
                "expression_type": "commercial",
                "expression_category": "bar",
                "expression_subcategory": "drinks",
                subData:[
                    {
                        "expression_subcategory": "北方的女王"
                    },
                    {
                        "expression_subcategory": "浮光掠影 "
                    },
                    {
                        "expression_subcategory": "安与骑兵"
                    }
                ]
            },
            {
                "application_id": "www.dianping.com",
                "expression_type": "commercial",
                "expression_category": "Cake shop",
                "expression_subcategory": "cake",
                subData:[
                    {
                        "expression_subcategory": "刘明汉"
                    },
                    {
                        "expression_subcategory": "宋冬野"
                    },
                    {
                        "expression_subcategory": "马頔"
                    },
                    {
                        "expression_subcategory": "赵雷 "
                    },
                ]
            },
            {
                "application_id": "www.meituan.com",
                "expression_type": "commercial",
                "expression_category": "restaurants",
                "expression_subcategory": "Shandong cuisine",
                subData:[
                    {
                        "expression_subcategory": "封锁线 "
                    },
                    {
                        "expression_subcategory": "阳光中的向日葵"
                    },
                    {
                        "expression_subcategory": "洪启"
                    },
                    {
                        "expression_subcategory": "刘东明"
                    },
                    {
                        "expression_subcategory": "城市稻草人"
                    }
                ]
            }
        ]
    }];
});