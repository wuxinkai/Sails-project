define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
    // 'bower_components/om-echarts/ng-echarts',
    // 'bower_components/om-echarts/src/util/mapData/params',
    'bower_components/echartsCommon/echarts.common.min',
    // 'echarts3/echarts.common.min'
    // 'echarts/echarts'
], function (echarts) {
    return ['$scope','Notification','httpService',  function ($scope,Notification,httpService) {
        <!-- 为ECharts准备一个具备大小（宽高）的Dom -->

// console.log(echarts)
        // 基于准备好的dom，初始化echarts实例
        // var myChart = echarts.init(document.getElementById('main'));
        setTimeout(function () {
            // console.log(echarts)
        }, 1000)

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);

    }];
});