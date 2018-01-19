define([

], function () {
    return ['$scope', function ($scope) {

            var height;
            var rowWidth;
            var Illusion;
            var reduction;
            var IllusionRight;
            var combination;

            function windowSize() {
                height = $(window).height()-55-40 ;
                rowWidth = $(".middle ").width()-597 ;
                $(".core").width(rowWidth);
                Illusion= $(".core").width()+261;
                reduction= $(".core").width();
                IllusionRight= $(".core").width()+281;
                combination= $(".core").width()+281+260;
                $("#containerHeight,.tabLeft,.hideBtn,.clCenter,.centRight").height(height);
            }
            windowSize()
            window.onresize = function () {
                //解决页面因为大小，改变
                windowSize()
            };

//左右按钮切换
            $scope.pcleftstatue = false;
            $scope.pcrightstatue = false;
            $scope.hidecallbackleft = function () {
                $scope.pcleftstatue =  !$scope.pcleftstatue;
                if ($scope.pcrightstatue) {
                    $(".core").width(combination);
                    if(!$scope.pcleftstatue){
                        $(".core").width(IllusionRight)
                    }
                } else {
                    $(".core").width(Illusion);
                }
                if( !$scope.pcleftstatue){
                    if(!$scope.pcrightstatue){
                        $(".core").width(reduction);
                    }
                }
            };
//点击左侧弹窗
            $scope.openLefts= function(){
                $scope.pcleftstatue = false;
                if ($scope.pcrightstatue) {
                    $(".core").width(combination);
                    if(!$scope.pcleftstatue){
                        $(".core").width(IllusionRight)
                    }
                } else {
                    $(".core").width(Illusion);
                }
                if( !$scope.pcleftstatue){
                    if(!$scope.pcrightstatue){
                        $(".core").width(reduction);
                    }
                }
            }
//又按钮切换
            $scope.hidecallbackright = function () {
                $scope.pcrightstatue = !$scope.pcrightstatue;
                if ($scope.pcleftstatue) {
                    $(".core").width(combination);
                    if(!$scope.pcrightstatue){
                        $(".core").width(Illusion)
                    }
                } else {
                    $(".core").width(IllusionRight);
                }
                if( !$scope.pcrightstatue){
                    if(!$scope.pcleftstatue){
                        $(".core").width(reduction);
                    }
                }
            }

//   地图头部下拉
            $scope.nationals = ["全国项目", "省份项目"];
            $scope.quarters = ["2016年第一季度集中测试", "2016年第二季度集中测试"];
            $scope.covers = ["LTE","GSM","WCDMA"];
            $scope.networks = ["网管","路测"];


    }];
});