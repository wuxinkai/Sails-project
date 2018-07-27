define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
    'bower_components/om-echarts/ng-echarts',
    'bower_components/om-echarts/src/util/mapData/params',

], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {
        // 1.配置图表参数:样式,加载效果,事件
        $scope.barConfig = {
            // 按需加载图表,根据需要可添加多个
            chartList: ['bar'],
            // 样式, theme没有将使用缺省样式
            theme: 'macarons',
            // 配置数据加载提示文本和动态效果
            loadingOption: {
                text: '数据加载中...',
                effect: 'whirling',
                textStyle: {
                    fontSize: 20,

                }
            },
            // 数据装载状态, false未加载,true已加载完毕
            dataLoaded: true,
            // 绑定事件,允许同时绑定多个事件
            event: [
                {
                    click: function(params){
                    }
                }
            ]
        };

        $scope.barOption2 = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title : {
                text: '各省故障次数统计表',
                x: 'center',
                y: '10',
                textStyle:{
                    fontSize: 18,
                    fontWeight: 'bolder',
                    color: '#ff0000',
                },

            },
            legend: {
                show : true,
                x: 'right',
                y: '15px',
                data:[]
            },
            toolbox: {
                show : false,
            },
            calculable : true,

            xAxis : [
                {
                    type : 'category',
                    data : ['北京市','河北省','内蒙古 ','黑龙江 ','吉林省','辽宁省','河南省 ']
                }

            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    stack: '总量',
                    itemStyle : { normal: {label : {show: true,}}},
                    data:[320, 302, 301, 334, 390, 330, 320]
                },
            ]
        };

        $.ajax({
            async:false,
            url: "json/echarts01.json", //实现同步的地方
            success: function (jsonData) {
                if (jsonData ) {
                    var count=0;
                    function  countProperties(obj) {
                        for(var property in obj){
                            if(Object.prototype.hasOwnProperty.call(obj,property)){ //检查对象是否有这个属性，有就数字加加
                                count++;
                            }
                        }
                        return count;
                    }
                    //数据结构   竖向排雷结构，而不是横向的
                    //{"PROVINCE_ID": 102, "PROVINCE_NAME": "上海市", "ressonCount1": 0, "ressonCount2": 1, "ressonCount3": 30, "ressonCount4": 50, "ressonCount5": 60, "ressonCount6": 30, "ressonCount7": 20, "ressonCount8": 90},
                    var indexLength=countProperties(jsonData[0])-2; //获取第一项，删除前两个字段，

                    var arrarOuter =[];
                    var arrarName =[];

                    for (var i=0;i<jsonData.length;i++){ //巡检数组
                        var arrarInner=[];
                  //      var cur =result[i];
                        var index = 0;
                        for (var a in jsonData[i]){
                            if(index==1){ // 1 是弟两列，的内容
                                arrarName.push(jsonData[i][a]) //存放是三个省
                            }else if(index>1){
                                arrarInner.push(jsonData[i][a]); //获取是最后一个的数据
                            }
                            if(i==index){

                            }
                            index++;
                        }
                        console.log(arrarInner);
                        arrarOuter.push(arrarInner);  //取出三条数据
                    }

                    var arr=[];
                    var arrName=['光缆中断','机房中断','鼠害','尾纤故障','割接','火灾','光板损坏','其他原因'];
                    for(var k=0;k<indexLength;k++){  //循环数据库字段 8次  因为有八个属性
                        var obj={};
                        var arrobj=[];
                        obj.name=arrName[k],
                            obj.type='bar',
                            obj.stack= '总量',
                            obj.itemStyle = { normal: {label : {show: true, position: 'insideBottom'}}};
                        for(var j=0;j<arrarOuter.length;j++){ //循环数据 三次  因为三个省
                            arrobj.push(arrarOuter[j][k])

                        }
                        console.log(arrobj)
                        obj.data=arrobj;
                       arr.push(obj)
                    }
                    $scope.barOption2.xAxis[0].data =arrarName;
                    $scope.barOption2.series =arr;
                    $scope.barOption2.legend.data=arrName;
                } else
                {
                    $scope.barOption2.xAxis[0].data =[];
                    $scope.barOption2.series =[];
                }
            }
        })
    }];
});