define(['angularAMD'], function (angularAMD) {
    'use strict';
    angularAMD.directive('collection',
        function ($q) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    collection: '='
                },
                template: "<member ng-repeat='member in collection' member='member'></member>",
            }
        })
        .directive('member', function ($compile) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    member: '='
                },
                template: "<li>" +
                "<a href='{{member.src}}'>" +
                "<i class='{{member.Icon}}'></i>" +
                "<span style='color:#fff'>{{member.text}}</span>" +
                "</a>" +
                " </li>",
                link: function (scope, element, attrs) {
                    if (angular.isArray(scope.member.list) && scope.member.list.length > 0) {
                        element.addClass('treeview');
                        element.find('a').append("<i class='fa fa-angle-left pull-right'></i>");
                        element.append("<ul class='treeview-menu'><collection collection='member.list'></collection></ul>");
                        $compile(element.contents())(scope);
                    }
                }
            }
        }).directive('menuDirective', function ($compile) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                child: '='
            },
            template: "<li><a href='{{child.src}}' style='cursor:pointer;color:#fff'>{{child.text}}</a></li>",
            controller: function ($scope) {
                if (angular.isArray($scope.child.list) && $scope.child.list.length > 0) {
                    $scope.menuItems = $scope.child.list;
                }
            },
            link: function (scope, element, attrs) {
                if (angular.isArray(scope.child.list) && scope.child.list.length > 0) {
                    var a = $(element[0]).find('a');
                    a.parent().html('<a href="javascript:void(0);" style="cursor:pointer;color:#fff" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + a.text() + ' <span class="caret"></span></a><ul menu-item-directive menus="menuItems"></ul>');

                    //$(element[0]).bind('mouseenter', function () {
                    //    $(this).find('ul').css({
                    //        display: 'block'
                    //    });
                    //});
                    //$(element[0]).bind('mouseleave', function () {
                    //    $(this).find('ul').css({
                    //        display: 'none'
                    //    });
                    //});
                    $compile(element.contents())(scope);
                }
            }
        }

    }).directive('menuItemDirective', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                menus: '='
            },
            template: "<ul class='dropdown-menu'><li ng-repeat='item in menus' ><a href='{{item.src}}'>{{item.text}}</a></li></ul>",
            link: function (scope, element, attrs) {
            }
        }

    });
});