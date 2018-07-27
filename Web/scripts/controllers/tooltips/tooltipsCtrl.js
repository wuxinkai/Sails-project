define(['scripts/services/httpService',
        'scripts/requireHelper/requireNotification',
        'ngload!ui-notification',
        'bower_components/angular-tooltips/dist/angular-tooltips.min.js'
    ],
    function () {
        return ['$scope','httpService','Notification',
            function ($scope,httpService,Notification) {


            }]
    });