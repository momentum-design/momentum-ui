# LEGENDS

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/legends

Use legends to creat legends in board

# Instructor

```
legends(dataUrl, config);
```

## arguments

Refer to Shape.

+ dataUrl
+ config

## generator

Generator defines how to create the shape with data.

+ x *

	The x position of line. Accept number or function.
	
```
{
	generator: {
		x: function(data, index) {
			return index * 10;
		}
	}
}
```

+ y *

	The y position of line. Accept number or function.
	
```
{
	generator: {
		y: 100
	}
}
```

+ text *

	The text inside the legend

+ type

	Define how legends arrange. It could be the following string.

	- horizontal (default)
	- vertical

+ lingHeight

	The lineHeight of text. Default value is 12.

+ lineWidth

	The the line width of legends in one line. The default value is Infinity.

+ textLength

	The default value is 100. If the lineWidth is not Infinity, this component will use 'textLength' as the width of the text area in each legend.

+ marginTop

	The margin-top for each legend. The default value is 12.

+ marginLeft

	The margin-left for each legend. The default value is 26.

+ iconType

	The icon shape. It could be the following string.

	- squrre (default)
	- dot
	- line

+ iconColor

	The icon color. The default value is #FFB159.

+ iconContainerWidth

	The icon container width.


## modify

Refer to the modify object in [modify](../fundamentals/modify.md).
