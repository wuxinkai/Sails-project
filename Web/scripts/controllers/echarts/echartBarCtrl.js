define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
    'bower_components/om-echarts/ng-echarts',
    'bower_components/om-echarts/src/util/mapData/params',
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {
        // 1.配置图表参数:样式,加载效果,事件
        $scope.mapConfig = {
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
            // event: []
        };
        $scope.mapOption = {
            title: {
                show: false,
                x: 'center',
                text: '',
                textStyle:{
                    fontSize: 16,
                    fontWeight: 'bolder',
                    color: '#b1cee3',
                },
            },
            tooltip: {
                trigger: 'item'
            },

            calculable: true,
            grid: {
                x:'40',
                y:'10',
                x2:'10',
                y2:'40',
                borderWidth: 0,
            },
            xAxis: [
                {
                    splitLine:{show: false},
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        clickable:true,
                        textStyle:{
                            fontSize:14 ,
                            color : '#b1cee3',
                            width:'0'
                        },
                    },
                    type: 'category',
                    show: true,
                    data : ['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00',]
                }
            ],
            yAxis: [
                {
                    splitLine:{show: false,},
                    type: 'value',
                    show: true,
                    axisLine:{
                        show:true,
                        lineStyle:{
                            color : '#437aa4',
                        },
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel : {
                        show:true,
                        clickable:true,
                        textStyle:{
                            fontSize:14 ,
                            color : '#b1cee3',
                        },
                        formatter:function(v){  //当做模板使用，
                            return v+"万"
                        },
                    },
                }
            ],
            series: [
                {
                    name: '人数',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList = [
                                    '#e56730','#e57d30','#e59630','#e5b430','#e5e330', '#b0e530','#81e530','#0fd24f','#20cc71','#30b597'
                                ];
                                return colorList[params.dataIndex]
                            },
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{c}万'
                            },

                        }
                    },
                    data: [12,13,14,15,16,17,18,19,20,21,19,20,21,22],
                }
            ]

        };
    }];
});