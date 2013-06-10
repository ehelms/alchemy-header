'use strict';

angular.module('alchemy').directive('alchMenu', ['$window', function($window){
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {
            'menu': '=alchMenu',
            'compact' : '@'
        },
        templateUrl: 'component/templates/menu.html',

        controller: ['$scope', function($scope) {
            $scope.items = [];

            this.addItem = function(item) {
                $scope.items.push(item);
            };
        }],
        link: function(scope, element, attrs) {
            var elementOriginalOffset;

            if (attrs.compact !== undefined) {
                elementOriginalOffset = $(element).offset().top;

                angular.element($window).bind('scroll', function() {
                    var windowScrollTop = $($window).scrollTop();

                    if (windowScrollTop > elementOriginalOffset + 2) {
                        element.parent().addClass('compact');
                    } else if (windowScrollTop < elementOriginalOffset) {
                        element.parent().removeClass('compact');
                    }
                 });
            }
        }
    };
}]);

angular.module('alchemy').directive('alchMenuItem', [function() {
    return {
        restrict: 'EA',
        transclude: 'element',
        replace: true,
        require: '^alchMenu',
        scope: {
            'href': '@alchMenuItem',
            'dropdown': '@',
        },
        templateUrl: 'component/templates/menu-item.html',

        link: function(scope, element, attrs, alchMenuController) {
            var dropdownElement;

            alchMenuController.addItem(scope);

            if (attrs.dropdown !== undefined) {
                dropdownElement = element.find('[alch-dropdown]').remove();
                element.append(dropdownElement);
            }
        },

        controller: ['$scope', function($scope) {
            var showDropdown = this.showDropdown = function(show) {
                if ($scope.dropdown) {
                    $scope.dropdown.show = show;
                }
            };

            this.addDropdown = function(dropdown) {
                $scope.dropdown = dropdown;
            };

            $scope.handleHover = function(mousein) {
                if (mousein) {
                    $scope.active = mousein;
                    showDropdown(mousein);
                } else {
                    $scope.active = mousein;
                    showDropdown(mousein);
                }
            };

        }]
    };
}]);
