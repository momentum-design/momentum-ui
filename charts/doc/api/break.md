# Break

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/break

Use break to an overlay shape when you break the data.

# Example

![Break](https://screenshot.codepen.io/3315115.XWWOXRz.small.b52f2159-5c38-424a-baf7-9e391f391b8d.png)

[Try it yourself](https://codepen.io/arthusliang/pen/XWWOXRz)

Codepen does not support Css in SVG, so we hidden the breaks shape. You can add the following Css in your own demo.


# Instructor

## arguments

+ name - should be the following string.

+ config

## generator

'generator' in the Config defines how to create the shape with data. 

+ x * - x position. Accept number or function.
+ y * - y position. Accept number or function.
+ h * - the height of the whole components.
+ w * - the width of the whole components.
	
```
{
	generator: {
		y: 100,
    x: 10,
    h: 300,
    w: 100
	}
}
```

+ direction - 'y' or 'x'. Along the Y/X axis

+ size - the size of each curve in the line

+ deep - the height of each curve  

## modify

Refer to the modify object in [modify](../fundamentals/modify.md).
