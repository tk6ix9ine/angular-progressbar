angular-progressbar
===================

Progressbar.js support for AngularJS http://kimmobrunfeldt.github.io/progressbar.js/

## Setup JavaScript

So far this is what I have found. 
On JavaScript, add the module as a dependency: 
``` JavaScript
angular.module('demo', ['angularProgressbar']);
```

## Setup HTML

On HTML, add the corresponding directive tag e.g.:
``` HTML
<!-- element form works -->
<pb-line progress-key="myLine"></pb-line>
<pb-circle progress-key="myCircle"></pb-circle>
<pb-square progress-key="mySquare"></pb-square>
<pb-path progress-key="myPath"></pb-path>
<!-- attribute form works too -->
<div pb-circle progress-key="myCircleDiv"></div>
<!-- I believe all forms work -->
```

The `progress-key` parameter is required

## Passing _options_ to directive

So far, to pass options you do the flowing, on the controller set a variable in the $scope to use as the options. In my case I named it options so I set `$scope.options`. You can set, say, `$scope.circleOptions` if you wish.

```JavaScript
angular.module('demo', ['angularProgressbar'])
.controller('demoCtrl', ['$scope', '$pbService',  
				function( $scope,   $pbService ){
	$scope.options = {
		color: '#FCB03C',
		duration: 3000,
		easing: 'easeInOut'};
	$scope.circleOptions = {
		color: '#FCBB33',
		duration: 2000,
		easing: 'easeInOut'};
}]);
```

In the HTML you add an attribute called `options` and you put the scope variable as the value. 

```HTML
<pb-line progress-key="myLine" options="options"></pb-line>
<!--  or, if your variable is called 'lineOptions' in your scope then -->\
<pb-circle progress-key="myLine" options="circleOptions"></pb-circle>
```

## `animate`, `set`, or `stop`

Turns out that you can handle the animate, set or stop through the controller, e.g.: 

### Javascript

```JavaScript
angular.module('demo', ['angularProgressbar'])
.controller('demoCtrl', ['$scope', '$pbService', '$timeout',  
				function( $scope,   $pbService,   $timeout ){
	$scope.options = {
		color: '#FCB03C',
		duration: 3000,
		easing: 'easeInOut'
	};
	$scope.lineProgress = 0;

	$scope.animateLine = function(){
		$scope.lineProgress = $scope.lineProgress + .05; 
		$pbService.animate('myLine', $scope.lineProgress, $scope.options);
	};
	$scope.setLine = function(){ 
		$scope.lineProgress = $scope.lineProgress + .05; 
		$pbService.set('myCircle', $scope.lineProgress);
	};
	$timeout(function() {
        $scope.setLine();
        $scope.animateLine();
        console.log('update progress bar')
    }, 3000);
}]);
```

### HTML

```html
<body ng-app="demo" ng-controller="demoCtrl">
    <div class="container">
        <h2>angular-progressbar.js samples</h2>
        <button ng-click="animateLine()">animate line to +5%s</button>
        <button ng-click="setLine()">set line to +5%s</button> Current progress value: {{lineProgress}}
        <div class="width">
<pb-line progress-key="myLine" options='options'></pb-line>
<pb-circle progress-key="myCircle"></pb-circle>
        </div>
    </div>
</body>
```

Fiddle coming soon...
