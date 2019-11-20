# Shape

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/shape

Parent class for all the components in Momentum Charts library.


# Instructor

Components should call the following init function when being created. 

## init

```
init(data, config) {
    this.Guid = core.guid();
    this.overrideViaConfig(config);
    this.Stack = [];
    this.extendConfig(config);
    this.Data = this.dataConvert(data);
}
```

## arguments

+ data

Usually, an array will be passed. The data will be used in generator and modify. You can also use dataConvert to format the data before being used.

```
var sourceData = {
	bar: [1, 2, 3],
	line: [4, 5, 6],
	teams: {
		bar: [0, 1, 2]
	}
};

var barChart = new MomentumCharts.rect(sourceData.bar, config);
```

You can only pass data url in board instance. The board instance will pass the real data according to the data source and data url you passed to it.
	
```
var sourceData = {
	bar: [1, 2, 3],
	line: [4, 5, 6],
	teams: {
		bar: [0, 1, 2]
	}
};

board.rect('bar', config); // will use [1, 2, 3]
board.rect('line', config); // will use [4, 5, 6]
board.rect('teams/bar', config); // will use [0, 1, 2]
```

+ config

	You will be asked to pass modify and generator via config.
	
```
{
	generator: {
	
	},
	modify: {
		classed: {
			'md-chart-rect': true
		}
	}
}
```

## generator

'generator' should be passed in the config. Generator defines how to create the shape with data. Each components will has its own property to set. These properties should accept both value and function. The following code shows how to pass 'x' and 'y' value in Rect. In our examples here, we only should the property we want to explain. In fact, you need to pass all the properties required.

+ x

	The x position of rect. Accept number or function.
	
```
{
	generator: {
		x: function(data, index) {
			return index * 10;
		}
	}
}
```
	
+ y

	The y position of rect. Accept number or function.
	
```
{
	generator: {
		y: 100
	}
}
```

## modify

Refer to the modify object in [modify](../fundamentals/modify.md).

## dataConvert

The default dataConvert will return the data directly. But sometime we want to change a litter bitter of the data. You can pass dataConvert as a property of config when you create components. The function dataConvert will be called when the components accept the new data.

+ default source code

```
dataConvert(data) {
	return data;
}
``` 

# Method

## renderSelection

The 'renderSelection' is the most important function when you created your own components based on Shape. You should defined how to convert data to shapes here. Let's look into the source ode of Line. In Line class, we only override the renderSelection, Momentum Charts will do rest of the work in Shape. 'render', 'transition' nad 'animate' will call this function.

### example

```
renderSelection(selection, config) {
    config && this.modifyUpdate(selection.main, config);
    this.Path = this.Generator(this.Data);
    this.Stack.push({
      path: this.Path
    });
    selection.attr('d', this.Path);
    return selection;
  }
```

### arguments

+ selection

	The SVG elements to be rendered. 

+ config

	Only used in 'animate'. Pass the arguments config in the function animate.
	
## attach

Append component's root node to a dom node.

```
rect.append(board);
```
	

## clear

Remove the selection nodes from the component's root.

```
rect.clear();
```

## detach

Remove the root node of the component from SVG.

```
rect.detach();
```
	
## fetchData

Get the data of this component.

```
// assume the data is [1,2,3]
rect.fetchData(); // return [1, 2, 3];
rect.fetchData(0); // return 1;
```

# Property

### D3Generator

+ boolean | object

If this component use the generator from D3.js

### Layer

+ number

Something like z-index in Css. Svg does not support this, so we use javascript to mock up the layer index.

### IsStatic

+ boolean

The Static component will not be rendered after updating the data.

### defaultConfig

+ object

Set the default config.

