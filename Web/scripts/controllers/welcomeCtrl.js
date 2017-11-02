define([
    'bootstrap'
], function () {
        return ['$scope', function ($scope) {
            initStyleTopology();
            function initStyleTopology(){
                $('.welcome').css("height",($('#alarmConRight').height())+'px');
            }
            $(window).resize(function(){
                initStyleTopology();
            });

        }]
    });
