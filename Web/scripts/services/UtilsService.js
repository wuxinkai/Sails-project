/**
 * Created by cuishiyong on 2017/4/7.
 */
define(['angularAMD'], function (angularAMD) {
    'use strict';
    angularAMD.service('UtilsService',
        function ($http, $q) {
            return ({
                isExistArray:function(ary,e,f){
                    if(f){
                        for(var i=0;i<ary.length;i++){
                            return f(ary[i],e);
                        }
                    }else{
                        for(var i=0;i<ary.length;i++){
                            if(ary[i]==e)return true;
                        }
                    }
                    return false;
                },
                differenceTime:function(starttime,endtime){
                    var date3=starttime.getTime()-endtime.getTime()  //时间差的毫秒数
                    var days=Math.floor(date3/(24*3600*1000))
                    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
                    var hours=Math.floor(leave1/(3600*1000))
                    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
                    var minutes=Math.floor(leave2/(60*1000))
                    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                    var seconds=Math.round(leave3/1000);
                    var str = '';
                    if(days>0){
                        str +=days+'d\'';
                    }
                    if(hours>0){
                        str +=hours+'h\'';
                    }
                    if(minutes>0){
                        str +=minutes+'m';
                    }
                    return str;
                }
            });

        });
})