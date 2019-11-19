# Board

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/board

Use board to create a svg element in document. 

# Example

+ Importing module

``` js
import { Board } from '@momentum-ui/charts';
cosnt board = new Board(id, config, data);
```

+ Using script tag

``` js
cosnt board = new MomentumCharts.Board(id, config, data);
```

or

``` js
cosnt board = MomentumCharts.board(id, config, data);
```

# Instructor

## arguments

+ id *

	A string which will be used in querySelector.

+ config

	The modify object in our library.

+ data

	If an array is passed, the board will use the data directionly.
	If a json object is passed, the board will map the data by url when updating.

# Draw Charts

You can add our components to board after creating the instance. We will show the detail in each components. Here is an example for line.

``` js
import { Board } from '@momentum-ui/charts';

cosnt board = new Board('#Id', {
	attr: {
		width: '1000',
		height: '400',
		viewBox: "0 0 1000 400"
	}
},[{n:1},{n:2}]);

board.line({
	generator: {
		// refer to d3.js 's generator sets
		x: function(d, i) {
			return 10 + d.n * 30;
		},
		y: 20
	},
	modify: {
		attr: {
			stroke: 'red',
			'stroke-width': 2
		}
	}
});

board.render();
board.transition({
	delay: 1000,
	duration: 3000
}, [{n:3},{n:4}]);

```

# Method

## render

Board will not render components until you call render or tranistion. 

+ render all components

```
board.render();
```

+ render with url
```
board.render('root/path/path2');
```

+ update all the data and render all

```
board.render({
	data1: [],
	data2: []
});
```

+ update part of the data and render that part

```
board.render('root/path/path2', {
	data1: [],
	data2: []
});
```


## transition

Board will not render components until you call render or tranistion. Comparing with render,  transition require one more arguments as the config of motion.


```
board.transition({
	delay: 1000,
	duration: 3000
}, [{n:3},{n:4}]);
```

## clear

clear None static Shape inside board.


```
board.clear();
```

## modify

Use function modify to update the style the svg root node. Refer to the Modify in Shape.


```
board.modify({
	'style': {},
	'attr': {},
	'classed': {},
	'property': {},
	'text': {},
	'html': {}
});
```

## zoom

Pass the zoom range as an array for svg element.


```
board.zoom([0.5,4]);
```

## axis

Add an axis in the svg, check more in axis.


```
board.axis('x', {
	generator: {
		scale: scaleX,
		ticks: 16,
		y: 190,
		tickPadding: 10,
		tickSize: 0,
		tickValues: [1,2,3,10],
		tickFormat: function(d){
			return d + ' year';
		}
	},
	modify: {
		classed: {
			'canvasAxis': true
		}	
	}
});
```