'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (angular) {
  /**
   * AngularJS ellipsis 分页组件
   * @author 鸿则<hungtcs@163.com>
   */
  var PaginationModule = angular.module('pagination.module', []);

  /**
   * [description]
   * @return {[type]} [description]
   */
  PaginationModule.directive('pagination', [function () {
    var paging = function paging(page, size, step) {
      if (size < step * 2 + 6) {
        var from = 1;
        return Array.apply(null, Array(size)).map(function (item, index) {
          return from + index;
        });
      } else if (page < step * 2 + 1) {
        var _from = 1;
        var to = step * 2 + 3;
        var array = Array.apply(null, Array(to - _from)).map(function (item, index) {
          return _from + index;
        });
        return [].concat(_toConsumableArray(array), [NaN, size]);
      } else if (page > size - step * 2) {
        var _from2 = size - step * 2 - 1;
        var _to = size + 1;
        var _array = Array.apply(null, Array(_to - _from2)).map(function (item, index) {
          return _from2 + index;
        });
        return [1, NaN].concat(_toConsumableArray(_array));
      } else {
        var _from3 = page - step;
        var _to2 = page + step + 1;
        var _array2 = Array.apply(null, Array(_to2 - _from3)).map(function (item, index) {
          return _from3 + index;
        });
        return [1, NaN].concat(_toConsumableArray(_array2), [NaN, size]);
      }
    };
    var render = function render(types, value) {
      types = types.split(' ');
      if (types.includes('PAGE_NUMBER')) {
        if (types.includes('上一页')) {
          return '上一页';
        } else if (types.includes('下一页')) {
          return '下一页';
        } else {
          return isNaN(value) ? '...' : value;
        }
      }
    };
    var assignClasses = function assignClasses(types, value, page, size) {
      types = types.split(' ');
      if (types.includes('PAGE_NUMBER')) {
        var classes = new Array();
        if (types.includes('上一页') && page <= 1) {
          classes.push('disable');
        } else if (types.includes('下一页') && page >= size) {
          classes.push('disable');
        } else {
          isNaN(value) && classes.push('invalid');
          value === page && classes.push('active');
        }
        return classes;
      }
    };
    return {
      restrict: 'E',
      template: '\n        <div class="pagination-wrapper">\n          <ul class="pagination">\n            <li class="page-item previous-page" ng-class="assignClasses(\'PAGE_NUMBER 上一页\' ,null ,page ,size)" >\n              <a href="" ng-click="previous($event)" ng-bind="render(\'PAGE_NUMBER 上一页\' ,\'previous\')"></a>\n            </li>\n            <li class="page-item"\n              ng-class="assignClasses(\'PAGE_NUMBER\' ,item ,page ,size)"\n              ng-repeat="item in array track by $index" >\n              <a\n                href=""\n                ng-bind="render(\'PAGE_NUMBER\' ,item)"\n                ng-click="onClick($event ,item)">\n              </a>\n            </li>\n            <li class="page-item" next-page ng-class="assignClasses(\'PAGE_NUMBER 下一页\' ,null ,page ,size)">\n              <a href="#!" ng-click="next($event)" ng-bind="render(\'PAGE_NUMBER 下一页\' ,\'next\')"></a>\n            </li>\n          </ul>\n        </div>\n      ',
      replace: false,
      scope: {
        size: '=',
        page: '=',
        step: '=',
        changed: '&',
        overrideRender: '&?',
        overrideAssignClasses: '&?'
      },
      link: function link(scope, element, attrs, controller, linker) {
        scope.$watch('step', function (newValue, oldValue) {
          scope.step = newValue < 1 ? 1 : newValue;
          scope.array = paging(scope.page, scope.size, scope.step);
        });
        scope.$watch('page', function (newValue, oldValue) {
          if (newValue >= 0 && newValue <= scope.size) {
            scope.page = newValue;
            scope.array = paging(scope.page, scope.size, scope.step);
            scope.changed({ event: null, page: scope.page });
          } else {
            scope.page = oldValue;
          }
        });
        scope.$watch('size', function (newValue, oldValue) {
          if (newValue >= 0) {
            scope.size = newValue;
            if (scope.size < scope.page) {
              scope.page = scope.size;
            }
            scope.array = paging(scope.page, scope.size, scope.step);
          } else {
            scope.size = oldValue;
          }
        });
        scope.render = function (types, value) {
          if (scope.overrideRender) {
            return scope.overrideRender({ types: types, value: value });
          } else {
            return render(types, value);
          }
        };
        scope.assignClasses = function (types, value, page, size) {
          if (scope.overrideAssignClasses) {
            return scope.overrideAssignClasses({ types: types, value: value, page: page, size: size });
          } else {
            return assignClasses(types, value, page, size);
          }
        };
        scope.onClick = function ($event, page) {
          if (!isNaN(page) && page !== scope.page) {
            scope.page = page;
            scope.array = paging(scope.page, scope.size, scope.step);
            scope.changed({ event: $event, page: scope.page });
          }
        };
        scope.previous = function ($event) {
          if (scope.page > 1) {
            scope.page--;
            scope.array = paging(scope.page, scope.size, scope.step);
            scope.changed({ event: $event, page: scope.page });
          }
        };
        scope.next = function ($event) {
          if (scope.page < scope.size) {
            scope.page++;
            scope.array = paging(scope.page, scope.size, scope.step);
            scope.changed({ event: $event, page: scope.page });
          }
        };
      }
    };
  }]);
})(angular);