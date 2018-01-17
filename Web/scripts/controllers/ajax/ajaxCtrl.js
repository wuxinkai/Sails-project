define([

], function () {
    return ['$scope','$log', function ($scope,$log) {

        $log.info('普通信息');

        $log.warn('警告信息');

        $log.error('错误信息');

        $log.log('打印信息');

        $log.debug('调试信息');


        function binHTML(data) {
            $scope.ments = data;
            $log.info('执行顺序3',$scope.ments);  //不加同步的话，在这里可以接受到内容
        }
        $.ajax({
            async:false,
            url: "json/menu.json", //实现同步的地方
            success: function (jsonData) {
                $log.info('执行顺序2',jsonData);
                if (jsonData ) {
                    binHTML(jsonData);
                }
            }
        })
//    不加同步，在这里接收不到内容

        $log.info('执行顺序1',$scope.ments);  //undefinde
    }];
});