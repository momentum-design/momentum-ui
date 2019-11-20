# Get Start

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Axis and Scale

In this section, you will learn how to scale data to position. You will also learn a very important Component - Axis.

#### Example

![Axis and Scale](https://screenshot.codepen.io/3315115.pooqeoN.small.065646da-3d89-4fa7-94c3-8632d2da6315.png)

### Create Scale

The following code creates scale for horizontal and vertical coordinates. With Scale, you can easily put data into position.

+ domain

The range of data.

+ range

The range of position.

```
var scaleX = MomentumCharts.scale('scaleLinear', {
  domain: [0,4],
  range: [100,1000]
}).Scale;

var scaleY = MomentumCharts.scale('scaleLinear', {
  domain: [0,80],
  range: [600,100]
}).Scale;
```

### Apply scale for Shapes

In the previous example, we use variable to store the generator. So you only need update ```lineGenerator``` and ```dotGenerator```.


```
var lineGenerator = {
  x: function(d, i) {
    return scaleX(i);
  },
  y: function(d) {
    return scaleY(d);
  }
},dotGenerator = {
  x: function(d, i) {
    return scaleX(i);
  },
  y: function(d) {
    return scaleY(d);
  },      
  type: MomentumCharts.Symbol.type('circle'),
  size: 40
};
```

### create Axis with Scale

The axis is different from the other shapes. The first argument is the type of axis while the third is the dataUrl. You can also read the range/domain of the instance of scale by call the function.

```
board.axis('x', {
  generator: {
    scale: scaleX,
    y: scaleY.range()[0],
    tickFormat: function(){
      return '';
    },
    tickSize: -10
  },
  modify: {
    style: {
      stroke: '#A3A3A3'
    }
  }
});

board.axis('y', {
  generator: {
    scale: scaleY,
    x: scaleX.range()[0],
    tickSize: scaleX.range()[0] - scaleX.range()[1]
  },
  modify: {
    style: {
      stroke: '#A3A3A3'
    }
  }
});
```

[Try it yourself >>](https://codepen.io/arthusliang/pen/pooqeoN)
