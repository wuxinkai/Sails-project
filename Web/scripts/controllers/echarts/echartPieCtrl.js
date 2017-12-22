define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
    'bower_components/om-echarts/ng-echarts',
    'bower_components/om-echarts/src/util/mapData/params',
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {
        $scope.pieConfigs = {
            chartList: ['pie'],
            theme: 'macarons',
            loadingOption: {
                text: '数据加载中',
                effect: 'whirling',
                textStyle: {
                    fontSize: 14
                }
            },
            // 数据装载状态, false未加载,true已加载完毕
            dataLoaded: true
        };
        $scope.problemOption = {
            color:['#38adff', '#ffa71d'],
            //图例;
            legend: {
                show:true,
                orient : 'horizontal',
                x : 'center',
                y : 'bottom',
                textStyle:{
                    color: '#b1cee3'
                },
                data:['男','女'],
            },

            calculable : false,
            series : [
                {
                    name:'',
                    type:'pie',
                    radius : '65%',
                    center: ['50%'],
                    itemStyle:{
                        normal: {
                            label : {
                                position : 'inner',
                                formatter : function (params) {
                                    return (params.percent - 0).toFixed(0) + '%'
                                }
                            },
                            labelLine:{
                                show:false,
                            }
                        }
                    },
                    data:[
                        {value:65, name:'男'},
                        {value:35, name:'女'},

                    ]
                }
            ]
        };
    }];
});