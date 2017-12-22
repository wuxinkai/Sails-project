define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示

    //下拉框功能
    'css!bower_components/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min',
    'css!bower_components/bootstrap-multiselect/dist/css/bootstrap-multiselect',
    'scripts/directives/multiSelectDirt',
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {

        $scope.kpiList=[
            {id:'1',name:"河北"},
            {id:'2',name:"长沙"},
            {id:'3',name:"秦皇岛"},
            {id:'4',name:"北京"},
        ];


        $scope.amDropdown = true;
        $scope.amDropdownShow = function () {
            if ($scope.amDropdown == false)
                $scope.amDropdown = true;
            else
                $scope.amDropdown = false;
        };
        $('#searchIcon').on('click',function (event) {
            event.stopPropagation();
            var tag=$("#searchBomb");
            var flag = true;
            $(document).bind("click",function(e){
                var target = $(e.target);
                if(target.closest(tag).length == 0 && flag == true){
                    $scope.amDropdown = true;
                    $scope.$apply(function(){
                        $scope.amDropdown = true;
                    });
                    flag = false;
                }
            });
        });
    }];
});