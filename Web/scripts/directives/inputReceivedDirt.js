/**
 * Created by cuishiyong on 2017/7/12.
 */

define(['angularAMD','scripts/services/httpService'], function (angularAMD) {
    'use strict';
    angularAMD.service('inputReceivedDirtService',function(){  //建立一个空服务，存储我们选择的内容
        var self = this;
        self.storage = {};
        self.clearStorage = function () {
            self.storage = {};
        };
    }).directive('inputReceivedDirt',
        function (inputReceivedDirtService,httpService,$state) {
            return {
                restrict: 'E',
                templateUrl: 'views/dirt/inputReceivedDirt.html',
                scope:{
                    roieId:'=',
                    model:'@',
                    title:'=',
                    titleModel:'=', //
                    selectRole:'=',
                    widthLabel:'=',
                    labelModel:'=',

                },
                // replace: true,
                // transclude: true,
                link: function ($scope, element, attr) {
                    //挂起的工单不能选择接单人
                    $scope.isHung = $state.params.isHung;
                    $scope.selectRole=$scope.isHung==true?true:false;

                    // function inputSize() {
                    //     $(".selectHeight").width($(".applyWidth").width());
                    // }
                    // inputSize()
                    // $(window).resize(function () {
                    //     inputSize();
                    // });
                    $scope.dataList = [];
                    $scope.cheRoleObj = {};
                    $scope.cheRoleObjcopy = {};
                    $scope.sureContent = function(){
                        $scope.cheRoleObj = angular.copy($scope.cheRoleObjcopy);
                        inputReceivedDirtService.storage[$scope.model] = $scope.cheRoleObj;
                        $scope.titlerr=$scope.cheRoleObj.org_name;
                   // console.log(inputReceivedDirtService)
                    }

                    $scope.checkRole = function(o){
                        $scope.cheRoleObjcopy = o;
                    };
                    //通过id去查询 是哪个人
                    // $scope.reLoadData=function () {
                    //     httpService.postRemote('Open','OAuth','GetUserInfoByRoleID',{roleid:$scope.roieId}).then(function(data){
                    //         $scope.dataList = data;
                    //         $scope.PredataList = data;
                    //     })
                    // }

                    $scope.$on("clearRole",function (p1, p2) {
                        $scope.cheRoleObj={};
                    });
                    // ---------------------------------wyz 20171211 增加搜索接单人功能-----------------------------------------
                    $scope.changeText=function (data) {
                        $scope.selectPeopleItem=[];
                        if(data!="") {
                            $.each($scope.PredataList, function (i, v) {
                                if (v.org_name.indexOf(data) > -1||v.REAL_NAME.indexOf(data) > -1||v.MOBILE.indexOf(data) > -1) {
                                    $scope.selectPeopleItem.push(v);
                                }
                            })
                            $scope.dataList = $scope.selectPeopleItem;
                        }
                        else
                        {
                            $scope.reLoadData();
                        }
                    };

                    $scope.dataList = [
                        { org_name:'泰和', REAL_NAME:'运维部', MOBILE:'吴鑫凯'},
                        { org_name:'泰和', REAL_NAME:'运维部', MOBILE:'吴鑫凯'},
                        { org_name:'泰和', REAL_NAME:'运维部', MOBILE:'吴鑫凯'},
                        { org_name:'泰和', REAL_NAME:'运维部', MOBILE:'吴鑫凯'},
                        { org_name:'泰和', REAL_NAME:'运维部', MOBILE:'吴鑫凯'},
                        { org_name:'泰和', REAL_NAME:'运维部', MOBILE:'吴鑫凯'},
                    ]
                }
            };

        });
})