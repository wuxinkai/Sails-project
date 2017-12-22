/**
 * select下拉带搜索功能
 */
define(['angularAMD','bootstrap'], function (angularAMD) {
    'use strict';
    angularAMD.directive('multiSelect',
        function ($timeout) {
            return {
                restrict: 'E',
                scope:{
                    data:'=',
                    searchShow:'=',
                    dataValue:'=',
                    columnName:'='
                },
                templateUrl: './views/dirt/multiSelect.html',
                replace: true,
                link: function (scope, element, attr) {
                    scope.isChecked=true;
                    scope.mulAllData=[];
                    scope.isPro=false;
                    scope.dataValue=attr.dataValue;
                    if(scope.dataValue=='')
                    scope.showText='全部';
                    scope.columnName=attr.columnName;
                    scope.nedisable=false;

                    scope.data1 = angular.copy(scope.data);
                    //选择（取消）全选
                    scope.mulCheckAll=function () {
                        if(scope.data.length>0)
                        {
                            scope.data.forEach(function (item,index,arr) {
                                item.Checked=scope.isChecked;
                            })
                        }
                      };

                    //重置
                    function  resetFun() {
                        if (scope.mulAllData.length > 0)
                            scope.data = angular.copy(scope.mulAllData);
                        else
                        {
                            scope.isChecked=true;
                            scope.mulCheckAll();
                        }
                    }


                    //子节点取消或是选中，全选按钮是否选中
                    scope.childCheck=function () {
                        if(scope.data.length>0)
                        {
                            if(scope.data.length==scope.data.filter(function (item,index,arr) {
                                    return item.Checked==true;
                                }).length)
                                scope.isChecked=true;
                            else
                                scope.isChecked=false;
                        }
                    }
                    //模糊搜索
                    scope.vagueSearch=function () {
                        if(scope.mulAllData.length==0)
                            scope.mulAllData=angular.copy(scope.data);
                        if(scope.mulAllData.length>0)
                        scope.data=scope.mulAllData.filter(function (item, index, arr) {
                            return item.Name.toLowerCase().indexOf(scope.inputText.trim().toLowerCase())>-1;
                        })
                        else
                            scope.data=[];
                    }


                    function func1() {
                        // scope.inputText ="";
                        if(scope.mulAllData.length==0)
                            scope.mulAllData=angular.copy(scope.data);
                        if(scope.mulAllData.length>0)
                            scope.data=scope.mulAllData.filter(function (item, index, arr) {
                                return item.Name.toLowerCase().indexOf(scope.inputText.trim().toLowerCase())>-1;
                            })
                        else
                            scope.data=[];
                    }
                    //取消
                    scope.clear=function () {

                        scope.isChecked=false;
                        if(scope.data.length>0)
                        scope.data.forEach(function (item,index,arr) {
                            item.Checked=false;
                        });
                        scope.inputText="";
                    }
                    //确定
                    scope.sure=function () {
                        if(scope.isChecked)
                        {
                            scope.isPro=false;
                            if(scope.mulAllData.length>0)
                            {
                                if(scope.mulAllData.length==scope.data.length)
                                {
                                    scope.dataValue='';
                                    scope.showText='全部';
                                }
                                else
                                {
                                    getSelText();
                                }
                            }
                            else if(scope.data.length==1)
                            {
                                scope.dataValue=scope.data[0].Id;
                                scope.showText=scope.data[0].Name;
                            }
                            else
                            {
                                scope.dataValue='';
                                scope.showText='全部';
                            }
                        }
                        else
                        {
                            getSelText();
                        }
                        scope.isDown = false;
                        scope.$emit('mulSelect-parent', {key:scope.columnName,value:scope.dataValue,isPro:scope.isPro});
                    }
                    //获得选中数据
                    function getSelText () {

                            scope.dataValue='';
                            scope.showText='';
                            if(scope.columnName=='selPro')//如果选择的是省
                            {
                                var length=scope.data.filter(function (item,index,arr) {
                                    if(item.Checked)
                                    {
                                        scope.dataValue+=item.Id+',';
                                        scope.showText+=item.Name+',';
                                    }

                                    return item.Checked;
                                }).length;
                                if(length>5)
                                {
                                    scope.isPro=true;
                                    scope.showText='全部';
                                    scope.isChecked=true;
                                    scope.mulCheckAll();
                                    return;
                                }
                                else
                                {
                                    scope.isPro=false;
                                }
                            }
                            else
                            {
                                        if(scope.inputText=="")
                                        {
                                            scope.data.forEach(function (item,index,arr) {
                                                if(item.Checked)
                                                {
                                                    scope.dataValue+=item.Id+',';
                                                    scope.showText+=item.Name+',';
                                                }
                                            });
                                        }
                                        else
                                        {
                                            if ( scope.mulAllData.length>0)
                                            scope.mulAllData.forEach(function (item,index,arr) {
                                                if(item.Checked)
                                                {
                                                    scope.dataValue+=item.Id+',';
                                                    scope.showText+=item.Name+',';
                                                }
                                            });
                                            else
                                                scope.data.forEach(function (item,index,arr) {
                                                    if(item.Checked)
                                                    {
                                                        scope.dataValue+=item.Id+',';
                                                        scope.showText+=item.Name+',';
                                                    }
                                                });
                                        }
                            }
                        if(scope.dataValue.length>0)
                        {
                            scope.dataValue=scope.dataValue.substr(0,scope.dataValue.length-1);
                            scope.showText=scope.showText.substr(0,scope.showText.length-1);
                        }
                    }

                    scope.InputFocus = function () {
                        scope.isDown = true;
                    }

                    scope.InputBlur = function () {
                        scope.isDown = false;
                    };
                    scope.showDropDown=function () {


                        if(scope.isDown)
                            scope.isDown=false;
                        else
                            scope.isDown=true;

                        if(scope.dataValue!=''&&scope.dataValue!=null&&scope.dataValue.length>0)
                        {
                            var dataArr=scope.dataValue.split(',');
                            if(dataArr.length>0)
                            {
                                scope.isChecked=false;
                                scope.mulCheckAll();
                                for(var i=0;i<dataArr.length;i++)
                                {
                                    scope.data.forEach(function (item,index,arr) {
                                        if(item.Id==dataArr[i])
                                            item.Checked=true;
                                    })
                                }
                            }
                            else
                            {
                                scope.isChecked=true;
                                scope.mulCheckAll();
                            }
                        }
                        scope.$emit('mulSelect-down', {key:scope.columnName});
                    }

                    //重置
                    scope.$on('mulSelect-child', function (event, element) {
                        if(element=='')
                        {
                            if(scope.searchShow)
                                scope.inputText='';
                            scope.showText='全部';
                            scope.isChecked=true;
                            scope.dataValue='';
                           resetFun();
                        }
                        else if(scope.columnName==element)
                        {
                            scope.showText='全部';
                            scope.isChecked=true;
                            scope.dataValue='';
                        }
                    });
                    //显示隐藏
                    scope.$on('mulSelect-show', function (event, element) {
                        if(element.columnName!=scope.columnName)
                        {
                            scope.isDown=false;
                        }
                    });
                    //通知选中网元,控件不可操作
                    // scope.$on('mulSelect-ne', function (event, element) {
                    //     if(element!=''&&element!=null)
                    //     {
                    //         if(scope.columnName==element.column){
                    //             scope.nedisable=true;
                    //             scope.data.forEach(function (item,index,arr) {
                    //                 if(item.Id==element.neId)
                    //                 {
                    //                     scope.dataValue=item.Id;
                    //                     scope.showText=item.Name;
                    //                 }
                    //             })
                    //         }
                    //     }
                    // });
                }
            };
        });
})
