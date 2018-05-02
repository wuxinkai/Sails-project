define([
    'scripts/requireHelper/truncate',
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {
        $scope.text = 'Web前端工程师，相信大家都不陌生，主要是完成客户端程序（也就是浏览器端）的开发，开发JavaScript以及Flash模块，同时结合后台开发技术模拟整体效果，进行丰富互联网的Web开发，致力于通过技术改善用户体验。现如今也叫前端工程师。在这里我还是要推荐下我自己建的web前端开发学习群：731669587，群里都是学web前端开发的，如果你正在学习前端 ，小编欢迎你加入，今天分享的这个案例已经上传到群文件，大家都是软件开发党，不定期分享干货（只有前端软件开发相关的），包括我自己整理的一份2018最新的前端进阶资料和高级开发教程，欢迎进阶中和进想深入前端的小伙伴';
        $scope.numChars = 120;

        $scope.breakOnWord = false;

    }];
});