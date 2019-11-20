# Arc

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/arc

Use arc to creat Pie Chart, Donut Chart and Arc Chart in board.

# Example

### Pie Chart

![Pie Chart](https://screenshot.codepen.io/3315115.WNNPQdB.small.f055475d-6b11-4100-a267-5cb14a62dfa1.png)

[Try it yourself](https://codepen.io/arthusliang/pen/WNNPQdB)

### Donut Chart

![Donut Chart](https://screenshot.codepen.io/3315115.abbXvYJ.small.5d26ce28-8562-440e-b148-00a83ba92a77.png)

[Try it yourself](https://codepen.io/arthusliang/pen/abbXvYJ)

### Arc Chart

![Arc Chart](https://screenshot.codepen.io/3315115.qBBgOYX.small.3e877461-aeed-420a-b4da-a0a427b86c8f.png)

[Try it yourself](https://codepen.io/arthusliang/pen/qBBgOYX)


# Instructor

Refer to [Shape](./shape.md), you can create Arc with ```board.arc(dataUrl, config)```

You can ignore the dataUrl, then board will use the root data as the source data of arc

```
board.arc(config);
```

## arguments

Refer to [Shape](./shape.md).

+ dataUrl
+ config

Besides generator and modify, the config here contains property ```pie```. 

## generator

Generator defines how to create the shape with data. We use the D3 [arc](https://github.com/d3/d3/blob/master/API.md#arcs) generator here.

You can set the following prototoype according D3's settings.

+ innerRadius 
+ outerRadius 
+ cornerRadius
+ startAngle
+ endAngle
+ padAngle 
+ padRadius 


Beside that, you can also set up the following properties.

+ x *

	The x position of arc. Accept number or function.
	
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

	The y position of arc. Accept number or function.
	
```
{
	generator: {
		y: 100
	}
}
```

+ defined

	If defined is specified, sets the defined accessor to the specified function or boolean and returns this line generator. 

+ curve

	If curve is specified, sets the curve factory and returns this line generator.

+ context

## modify

Refer to the modify object in [modify](../fundamentals/modify.md).

## pie

Compute the necessary angles to represent a tabular dataset as a pie or donut chart. We use the D3 [Pies](https://github.com/d3/d3-shape/blob/v1.3.5/README.md#pies) generator here.

```
board.arc({
  generator: {
    x: 400,
    y: 400,
    outerRadius: 250
  },
  pie: {
    value: (d) => {
      return d.sum;
    },
    sortValues: (d1, d2) => {
      return d1.year - d2.year;
    }
  },
  modify: {
    attr: {
      fill: function(d, i) {
        return colors[i].toString();
      }
    }
  }
});

```

The Pie generator will generator value, startAngle, endAngle and padAngle for Arc.
If you do not set up pie. Arc will read its own generator settings.

# Method

## centroid

Get each arc's center.

```
arc.centroid();
```

### return center points

+ x - the x position of arc's center.
+ y - the y position of arc's center.
+ x0 - the x position of circle's center.
+ y0 - the y position of circle's center.


## centroidRelativeList

Get each arc's center with some displacement.

```
arc.centroidRelativeList(config, callback);
```

### arguments

+ config

Define how to move from arc's center.

+ callback

The callback function will be called after each arc's center has been calculated.


## centroidRelative

Get one selected arc's center with displacement.

```
arc.centroidRelative(data, index, {
	x: 10,
	y: 10,
	r: 5
}, callback);
```
