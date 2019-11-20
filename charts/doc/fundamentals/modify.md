# Fundamentals

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Modify

Modify object is used to set the properties of SVG node in Momentum Charts. You can pass set the following properties. Their properties should accept both value and function.

+ style
+ attr
+ classed
+ property
+ text
+ html

#### Example

![Modify](https://screenshot.codepen.io/3315115.MWWZEjP.small.66af414e-8a91-48de-805f-b48203677607.png)

### Board & Shape

If you do not know what's board and shape. Read this [article](./getStart/yourFirstChart.md). They just like  body and the other dom tags in HTML. Board and shape offers an easier way to manager data and dom.

### Modify Board

In Board, Modify is passed as the second argument. 

This example will adjust the 'box-shadow' and 'class' of an board instance.

```
var board = MomentumCharts.board('#app', {
  attr: {
    width: '1200',
    height: '700',
    viewBox: "0 0 1200 700"
  },
  style: {
    'box-shadow':'0 1px 2px 0 rgba(0,0,0,0.2),0 2px 4px 0 rgba(0,0,0,0.2)',
  },
  classed: {
    'my-class': function() {
      return ifShowClass;
    }
  }
 }, [5,18,40,50,30]);
```

### Modify Shapes

In Shapes, Modify is passed as a property of the config. In SVG, the style will overwrite the attr.

This example shows how to apply dash-array style to line chart.

```
board.line({
  generator: {
    x: function(d, i) {
      return 100 + i * 250;
    },
    y: function(d) {
      return 650-d*10;
    }
  },
  modify: {
    attr: {
      stroke: '#0090C4',
      'stroke-width': 2
    },
    style: {
      'stroke-dasharray':"10 5"
    }
  }
});
```

[Try it yourself >>](https://codepen.io/arthusliang/pen/MWWZEjP)
