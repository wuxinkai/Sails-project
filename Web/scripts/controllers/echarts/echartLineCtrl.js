define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
    'bower_components/om-echarts/ng-echarts',
    'bower_components/om-echarts/src/util/mapData/params',
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {
        //折线图
        $scope.barConfig2 = {
            // 按需加载图表,根据需要可添加多个
            chartList: ['line'],
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
        $scope.barOption = {

            title : {
                x: 'left',
                textStyle:{
                    fontSize: 16,
                    fontWeight: 'bolder',
                    color: '#b1cee3',
                },
            },
            tooltip : {
                trigger: 'axis'
            },
            grid: {
                borderWidth: 1,
                borderColor:"#356193", //边框
                x:'40',
                y:'10',
                x2:'20',
                y2:'50',
            },
            calculable : true,
            xAxis : [
                {
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color : '#356193',
                            type:'solid',
                            width:1,
                        },
                    },
                    type : 'category',
                    boundaryGap : false,
                    axisLabel : {
                        textStyle:{
                            color : '#b1cee3',
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                    data : ['2017.05','2017.06','2017.07','2017.08','2017.09','2017.10','2017.11']
                }
            ],
            yAxis : [
                {

                    type : 'value',
                    name:"命名这个轴",
                    nameLocation:'end', //把轴放在地下，默认在上面
                    nameTextStyle:{      //调整页面样式
                        color:"red",
                        fontSize:20,

                    },
                    splitLine:{
                        show: false,
                        lineStyle:{
                            color: ['#356296'],
                            width: 1,
                            type: 'dotted'
                        }
                    },


                    axisLabel : {
                        textStyle:{
                            color : '#b1cee3',
                        },
                        formatter:function(v){  //当做模板使用，
                            return v+"万"
                        },
                    },
                    axisLine:{
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    }
                }
            ],
            series : [

                {
                    smooth:true,
                    name:'人流量',
                    type:'line',
                    data:[10, 20, 150, 50, 185, 60, 200],

                    symbol:'circle',
                    symbolSize:4,
                    itemStyle:{
                        normal:{
                            color:"#38adff",
                            label:{
                                show:true,
                                position: 'top',
                            }

                        }

                    }
                }

            ]
        };
    }];
});