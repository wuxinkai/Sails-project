/******************************************************************

 * Copyright (C): 北京泰合佳通信息技术有限公司广东分公司
 *
 * 描述: 基于 Echarts 公共初始化文件
 *      1.加载Echarts核心文件
 *      2.定义样式 , 图表类型

 ******************************************************************/

define(['echarts3/echarts'], function (echarts) {
    'use strict';
    setTimeout(function () {
        console.log(echarts)
    }, 1000)
    return echarts;

});


