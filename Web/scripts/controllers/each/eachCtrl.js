define([

], function () {
    return ['$scope', function ($scope) {


        $.ajax({
            type:'get',
            url:'http://lorempixel.com/400/200',
            dataType:'jsonp',
            success:function(data){
            console.log(data)

            }
        });



        var arrProvince=[
            {
                isHaveData:true,
                isSelect:true,
                name:'两个条件都满足'
            },
            {
                isHaveData:true,
                isSelect:false,
                name:'isHaveData满足'
            },
            {
                isHaveData:false,
                isSelect:true,
                name:'isHaveData满足'
            }
        ]
        //js的数据插入
        var html = "";  //上面还有很多判断条件
        for (var i = 0; i < arrProvince.length; i++) {
            if (arrProvince[i].isHaveData && arrProvince[i].isSelect)  //条件1成立，条件2也成立 走这行
                html += "<li class='current' ng-click='projectDateClick($event," + arrProvince[i].id + ")'> <a href='javascript:;' >" + arrProvince[i].name + "</a></li>";
            else if (arrProvince[i].isHaveData && !arrProvince[i].isSelect) //条件一成立 条件2不成立 走这个
                html += "<li ng-click='projectDateClick($event," + arrProvince[i].id + ")'> <a href='javascript:;' >" + arrProvince[i].name + "</a></li>";
            else                                                        //其他原因就走这行
                html += "<li ng-click='projectDateClick($event," + arrProvince[i].id + ")'> <a href='javascript:;' >" + arrProvince[i].name + "</a></li>";
        }
        $("#htProjectBelong").append(html); //插入到页面

        $(".siwcbottomUl").click(function(e){
            if($(e.target).parent().hasClass("disabled")){
                //查看当前元素的父亲有没disabled这个属性，有就不管他，
            }else{
                $(e.target).parent().addClass("current").siblings().removeClass("current") //没有事可以选中的
            }

        })

    }];
});