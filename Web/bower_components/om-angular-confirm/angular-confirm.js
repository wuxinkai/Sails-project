(function (f, define) {
    define([], f);
}(function () {
   (function (angular) {
         angular.module('angular-confirm', ['ui.bootstrap.modal'])
          .controller('ConfirmModalController', ["$scope", "$uibModalInstance", "data", function ($scope, $uibModalInstance, data) {
              $scope.data = angular.copy(data);

              $scope.ok = function (closeMessage) {
                  $uibModalInstance.close(closeMessage);
              };

              $scope.cancel = function (dismissMessage) {
                  if (angular.isUndefined(dismissMessage)) {
                      dismissMessage = 'cancel';
                  }
                  $uibModalInstance.dismiss(dismissMessage);
              };

          }])
          .value('$confirmModalDefaults', {
              template: '<div class="modal-header"><h3 class="modal-title">{{data.title}}</h3></div>' +
              '<div class="modal-body">{{data.text}}</div>' +
              '<div class="modal-footer">' +
              '<button class="btn btn-primary" ng-click="ok()">{{data.ok}}</button>' +
              '<button class="btn btn-default" ng-click="cancel()" ng-show="!data.unShowCancle">{{data.cancel}}</button>' +
              '</div>',
              controller: 'ConfirmModalController',
              defaultLabels: {
                  title: '消息确认框',
                  ok: '确认',
                  cancel: '取消'
              }
          })
          .factory('$confirm', ["$uibModal", "$confirmModalDefaults", function ($uibModal, $confirmModalDefaults) {
              return function (data, settings) {
                  var defaults = angular.copy($confirmModalDefaults);
                  settings = angular.extend(defaults, (settings || {}));

                  data = angular.extend({}, settings.defaultLabels, data || {});

                  if ('templateUrl' in settings && 'template' in settings) {
                      delete settings.template;
                  }

                  settings.resolve = {
                      data: function () {
                          return data;
                      }
                  };

                  return $uibModal.open(settings).result;
              };
          }])
          .directive('confirm', ["$confirm", "$timeout", function ($confirm, $timeout) {
              return {
                  priority: 1,
                  restrict: 'A',
                  scope: {
                      confirmIf: "=",
                      ngClick: '&',
                      confirm: '@',
                      confirmSettings: "=",
                      confirmTitle: '@',
                      confirmOk: '@',
                      confirmCancel: '@'
                  },
                  link: function (scope, element, attrs) {;
                      function onSuccess() {
                          var rawEl = element[0];
                          if (["checkbox", "radio"].indexOf(rawEl.type) != -1) {
                              var model = element.data('$ngModelController');
                              if (model) {
                                  model.$setViewValue(!rawEl.checked);
                                  model.$render();
                              } else {
                                  rawEl.checked = !rawEl.checked;
                              }
                          }
                          scope.ngClick();
                      }

                      element.unbind("click").bind("click", function ($event) {

                          $event.preventDefault();

                          $timeout(function () {

                              if (angular.isUndefined(scope.confirmIf) || scope.confirmIf) {
                                  var data = { text: scope.confirm };
                                  if (scope.confirmTitle) {
                                      data.title = scope.confirmTitle;
                                  }
                                  if (scope.confirmOk) {
                                      data.ok = scope.confirmOk;
                                  }
                                  if (scope.confirmCancel) {
                                      data.cancel = scope.confirmCancel;
                                  }
                                  $confirm(data, scope.confirmSettings || {}).then(onSuccess);
                              } else {
                                  scope.$apply(onSuccess);
                              }

                          });

                      });

                  }
              }
          }]);
    }(angular));
},
typeof define == 'function' && define.amd ? define : function (a1, a2) {
    (a2 || a1)();
}));