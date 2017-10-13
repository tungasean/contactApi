(function (angular) {
    /*
     anh.nguyen
     */
    'use strict';
    angular.module('validation', [])
        .directive('validation', ['$document', function ($document) {
            return {
                link: function (scope, element, attr) {
                    var target = element[0];
                    var container = document.getElementById('validationError');
                    if (!container) {
                        container = document.createElement('div');
                        container.id = 'validationError';
                        document.body.appendChild(container);
                    }
                    var error = null;

                    function apply() {
                        scope.$digest();
                    }

                    function addClass() {
                        if (!target.classList.contains('changed')) {
                            target.className += ' changed';
                            target.updateError();
                        }
                        apply();
                    }

                    document.addEventListener('mousemove', apply);
                    target.addEventListener('focus', function () {
                        if (target.classList.contains('changed')) {
                            target.updateError();
                            try {
                                apply();
                            } catch (ex) {

                            }
                        }
                    });
                    target.addEventListener('input', addClass);
                    target.addEventListener('blur', addClass, true);
                    target.validationRule = attr.validation;
                    target.valueForWatch = function () {
                        if (error) {
                            error.style.display = target.disabled || !target.clientWidth || !target.clientHeight ? 'none' : 'block';
                        }
                        return attr.ngNumber ? target['__' + attr.ngNumber] : scope.$eval(attr.ngModel);
                    }
                    var watchPosition = null;
                    target.updateError = function () {
                        var html = $validation.validation(target.valueForWatch(), scope.$eval('[' + target.validationRule + ']'));
                        if (html && target.classList.contains('changed')) {
                            if (!error) {
                                watchPosition = scope.$watch(function () {
                                    if (!error) return '0|0';
                                    var offset = target.getBoundingClientRect();
                                    var top = offset.top || 0;
                                    var left = offset.left || 0;
                                    return top + '|' + (left + target.clientWidth + 10);
                                }, function (offset) {
                                    offset = offset.split('|');
                                    error.style.top = offset[0] + 'px';
                                    error.style.left = offset[1] + 'px';
                                });
                                error = document.createElement('span');
                                error.className = "validationError";
                                if(target.id) error.id = "validationError" + target.id;
                                error.setAttribute('for', attr.ngNumber ? attr.ngNumber : attr.ngModel);
                                container.appendChild(error);
                            }
                            error.innerHTML = html;
                            if (!target.classList.contains('error')) target.className += ' error';
                            return true;
                        } else {
                            if (watchPosition) watchPosition();
                            if (error) container.removeChild(error);
                            error = null;
                            target.className = target.className.replace(/\s*\berror\b/, '');
                            return false;
                        }
                    }
                    var watchValue = scope.$watch(target.valueForWatch, target.updateError);
                    scope.$on('$destroy', function () {
                        document.removeEventListener('mousemove', apply);
                        watchValue();
                        if (watchPosition) watchPosition();
                        setTimeout(function () {
                            if (error) container.removeChild(error);
                        }, 100);
                    });
                }
            };
        }]);
})(window.angular);
