define([

], function () {
    return ['$scope', function ($scope) {

        var box = $(".navbar-nav li")
       function cookies() {
           if (jQuery.cookie('theme') == 4) {
               $("#color").css('background','green');
               box.removeClass('active');
               box.eq(4).addClass('active');
           }else if(jQuery.cookie('theme') == 1){
               $("#color").css('background','red');
               box.removeClass('active');
               box.eq(1).addClass('active');
           }else if(jQuery.cookie('theme') == 2){
               $("#color").css('background','yellow');
               box.removeClass('active');
               box.eq(2).addClass('active');
           }else if(jQuery.cookie('theme') == 3){
               $("#color").css('background','blue');
               box.removeClass('active');
               box.eq(3).addClass('active');
           }else {
               $("#color").css('background','#ccc');
               box.removeClass('active');
               box.eq(0).addClass('active');
           }
       }
        cookies()
        box.click(function () {
            jQuery.cookie('theme',$(this).index());
            $(this).addClass('active').siblings().removeClass('active');
            cookies()

        })
    }];
});