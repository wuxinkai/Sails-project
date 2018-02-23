define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
    'bower_components/om-echarts/ng-echarts',
    'bower_components/om-echarts/src/util/mapData/params',
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {

// 1.配置图表参数:样式,加载效果,事件
        $scope.scatterConfig = {
            // 按需加载图表,根据需要可添加多个
            chartList: ['scatter'],
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
            // event: []
        };
        $scope.option = {
            tooltip : {
                trigger: 'axis', //触发类型  默认是item
                axisPointer:{  //坐标轴指示器，默认type为line，可选为：'line' | 'cross' | 'shadow' | 'none'(无)，指定type后对应style生效，
                    show: true,
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            legend: {
                data:['scatter1','scatter2']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            grid:{
                x:100,
                y:100,
                x2:100,
                y2:100,
            },
            calculable : true, //false，是否启用拖拽重计算特性，默认关闭
            xAxis : [
                {

                    type : 'value',

                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'scatter1',
                    type:'scatter',
                    //散点图靠symbol来做不同系列的视觉编码编码
                    symbol: 'circle', //'circle', 'rectangle', 'triangle', 'diamond', 'emptyCircle', 'emptyRectangle', 'emptyTriangle', 'emptyDiamond'
                    symbolSize: function (value){
                        if (value[0] < 2) {
                            return 2;
                        }
                        else if (value[0] < 8) {
                            return Math.round(value[2] * 3);
                        }
                        else {
                            return 20;
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'lightblue',
                            borderWidth: 4,
                            borderColor:'red', //边框颜色
                            label : {show: true}
                        },
                        emphasis: {
                            color: 'lightgreen',
                        }
                    },
                    data: (function () {
                        var d = [];
                        var len = 20;
                        while (len--) {
                            d.push([
                                (Math.random()*10).toFixed(2) - 0,
                                (Math.random()*10).toFixed(2) - 0,
                                (Math.random()*10).toFixed(2) - 0
                            ]);
                        }
                        return d;
                    })(),
                    markPoint : {
                        data : [
                            {type : 'max', name: 'y最大值'},
                            {type : 'min', name: 'y最小值'},
                            {type : 'max', name: 'x最大值', valueIndex : 0, symbol:'arrow',itemStyle:{normal:{borderColor:'red'}}},
                            {type : 'min', name: 'x最小值', valueIndex : 0, symbol:'arrow',itemStyle:{normal:{borderColor:'red'}}}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: 'y平均值'},
                            {type : 'average', name: 'x平均值', valueIndex : 0, itemStyle:{normal:{borderColor:'red'}}}
                        ]
                    }
                },
                {
                    name:'scatter2',
                    type:'scatter',
                    symbol: 'image://../asset/ico/favicon.png',     // 系列级个性化拐点图形
                    symbolSize: function (value){
                        return Math.round(value[2] * 3);
                    },
                    itemStyle: {
                        emphasis : {
                            label : {show: true}
                        }
                    },
                    data: (function () {
                        var d = [];
                        var len = 20;
                        while (len--) {
                            d.push([
                                (Math.random()*10).toFixed(2) - 0,
                                (Math.random()*10).toFixed(2) - 0,
                                (Math.random()*10).toFixed(2) - 0
                            ]);
                        }
                        d.push({
                            value : [5,5,1000],
                            itemStyle: {
                                normal: {
                                    borderWidth: 8,
                                    color: 'orange'
                                },
                                emphasis: {
                                    borderWidth: 10,
                                    color: '#ff4500'
                                }
                            },
                            symbol: 'emptyTriangle',
                            symbolRotate:90,
                            symbolSize:30
                        })
                        return d;
                    })(),
                    markPoint : {
                        symbol: 'emptyCircle',
                        itemStyle:{
                            normal:{label:{position:'top'}}
                        },
                        data : [
                            {name : '有个东西', value : 1000, xAxis: 5, yAxis: 5, symbolSize:80}
                        ]
                    }
                }
            ]
        };
    }];
});