/*
angular-progressbar 0.1.0 - Progressbar.js support for AngularJS http://kimmobrunfeldt.github.io/progressbar.js/
Copyright (C) 2014 - Felipe Campos Clarke <felipecamposclarke@gmail.com> and contributors
License: MIT
Source: https://github.com/felipecamposclarke/angular-progressbar
Date Compiled: 2014-10-28
*/

 (function (root) {
  'use strict';

  function factory(angular, ProgressBar) {

    var angularProgressbar = angular.module('angularProgressbar', []),
	ProgressbarTypes = ['line', 'circle', 'square', 'path'];

    angularProgressbar.factory('$pbService', ['$rootScope', function ($rootScope) {

      var config = {};

      config.animate = function (key, progress, options, cb) {
	$rootScope.$broadcast('progressbar:animate', key, progress, options, cb);
      };

      config.stop = function (key) {
	$rootScope.$broadcast('progressbar:stop', key);
      };

      config.set = function (key, progress) {
	$rootScope.$broadcast('progressbar:stop', key, progress);
      };

      return config;
    }])

    angular.forEach(ProgressbarTypes, function(type){
      var name = type.charAt(0).toUpperCase() + type.slice(1);
      var directiveName = 'pb' + name;

      angularProgressbar.directive(directiveName, ['$window', '$timeout', function ($window, $timeout) {
	return {
	  scope: {
	    options: "="
	  },
	  link: function (scope, element, attr) {

	    if(typeof scope.options !== 'object' && attr.options)
	      throw new Error("the options aren't correct!");

	    if(!angular.isDefined(attr.progressKey))
	      throw new Error("the progress key is not defined");

	    var ProgressBarConstructor = ProgressBar || $window.ProgressBar;
	    var el = element[0];

	    scope.progressbar = null;
	    scope.key = attr.progressKey;

	    scope.animate = function (progress, options, cb) {
	      options = options || {};
	      if (scope.progressbar)
		scope.progressbar.animate(progress, options, cb);
	    };

	    scope.stop = function () {
	      scope.progressbar.stop();
	    };

	    scope.set = function (progress) {
	      scope.progressbar.set(progress);
	    };

	    scope.$on('progressbar:animate', function (event, key, progress, options, cb) {
	      if (key === scope.key)
		$timeout(function () {
		  scope.animate(progress, options, cb);
		});
	    });

	    scope.$on('progressbar:stop', function (event, key) {
	      if (key === scope.key)
		$timeout(function () {
		  scope.stop();
		});
	    });

	    scope.$on('progressbar:set', function (event, key, progress) {
	      if (key === scope.key)
		$timeout(function () {
		  scope.set(progress);
		});
	    });

	    scope.$on('$destroy', function () {
	      el.innerHTML = '';
	      scope.progressbar = null;
	    });

	    scope.$watchCollection('options', function (options) {
	      el.innerHTML = '';
	      scope.progressbar = new ProgressBarConstructor[name](el, options);
	    });

	  }
	};
      }]);
    });
}

if (typeof define === 'function' && define.amd) {
  /* AMD module */
  define(['angular', 'progressbar'], factory);
} else {
  /* Browser global */
  factory(root.angular);
}
}(window));
