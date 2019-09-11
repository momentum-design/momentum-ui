# Board

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/angular/LICENSE)

> @momentum-ui/chart/board

Use board to create a svg element in document. 

## Usage

### create an instance and add a line

``` js
import { Board } from '@momentum-ui/chart';

cosnt board = new Board('#Id');

board.add('line', [data], {
	generator: {
		// refer to d3.js 's generator sets
		x: function(d, i) {
			return 10 + i * 30;
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
	duration: 3000,
	ease: d3.easeCubicOut
}, [newData]);

```

### modify
Use function modify to update the style the svg root node

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

### zoom
Pass the zoom range as an array for svg element.

```
board.zoom([0.5,4]);
```

### axis
Add an axis in the svg

```
board.axis('axisBottom', {
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