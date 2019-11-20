# Area

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/area

Use Area Component to create area chart.

# Example

![Area](https://screenshot.codepen.io/3315115.pooGjMy.small.408ac9ea-d1a7-4e59-883d-3f7f5e8e5cea.png)

[Try it yourself](https://codepen.io/arthusliang/pen/pooGjMy)

# Instructor

```
board.area(dataUrl, config);
```

You can ignore the dataUrl, then board will use the root data as the data of area

```
board.area(config);
```

## arguments

Refer to [Shape](./shape.md).

+ dataUrl
+ config

	You will be asked to pass modify and generator via config.
	
```
{
	generator: {
	
	},
	modify: {
    
	}
}
```

## generator

Generator defines how to create the shape with data. We use D3's [area](https://github.com/d3/d3-shape/blob/v1.3.5/README.md#areas) generator here. You can pass the funtion as properties.

## modify

Refer to the modify object in [modify](../fundamentals/modify.md).
