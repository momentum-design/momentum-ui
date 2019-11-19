# Get Start

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Responsive Design

In this section, you will learn how to scale data to position. You will also learn a very important Component - Axis.

#### Example

![Responsive Design](https://screenshot.codepen.io/3315115.gOOZRrj.small.20bb896d-af73-480d-9bba-e1b78fecf666.png)

### Create bar chart

In order to show more details of responsive design in Momentum Charts, this example will use bar chart. In Momentum Charts, we use 'rect' class to create bar charts.


```
var rect1 = board.rect('d1', {
  generator: {
    x: function(d,i) {
      return scaleX(i) - 35;
    },
    y: function(d, i) {
      return scaleY(d);
    },
    w: 30,
    h: function(d,i) {
      return scaleY.range()[0] - scaleY(d);
    }
  },
  modify: {
    attr: {
      fill: color1
    }
  }
});

var rect2 = board.rect('d2', {
  generator: {
    x: function(d,i) {
      return scaleX(i) + 5;
    },
    y: function(d, i) {
      return scaleY(d);
    },
    w: 30,
    h: function(d,i) {
      return scaleY.range()[0] - scaleY(d);
    }
  },
  modify: {
    attr: {
      fill: color2
    }
  }
});

```

### Svg's native responsive

The easiest way to implement responsive effect is to using viewBox in SVG. And this is also the fisrt step to use the responsive class in Momentum Charts.

You need use percentage units to define the width/height of board.

```
var board = MomentumCharts.board('#app', {
  attr: {
    width: '1200',
    height: '700',
    viewBox: "0 0 1200 700"
  },
  style: {
    width: '100%'
  }
}, boardData);
```

### Create responsive Object

Now you need create an instance of the responsive class in Momentum Charts. You also need using variable to the instance of axis and rect.

```
var Res = board.responsive();
```

### Make Axis responsive

The usage of responsive class is similar to the Media-Query in Css.

```w``` defines horizontal responsive design while ```h``` defines vertical responsive design. 

The fisrt argument wll be the instance of axis.

The second arugment defines how to do responsive effect. The key is the max value of width. The value is the config which will be applied to the shape which board's width is in the range.

```
Res.w(axisX, {
  800: {
    generator: {
      scale: scaleX2
    }
  },
  1000: {
    generator: {
      scale: scaleX1
    }
  },
  1200: {
    generator: {
      scale: scaleX
    }
  }
});

Res.w(axisY, {
  800: {
    generator: {
      tickSize: -500
    }
  },
  1000: {
    generator: {
      tickSize: -700
    }
  },
  1200: {
    generator: {
      tickSize: -900
    }
  }
});
```

### Make Bar Chart

You can define config just as what you do when creating rect.

```
Res.w(rect1, {
  800: {
    generator: {
      x: function(d,i) {
        return scaleX2(i) - 20;
      },
      w: 15
    }
  },
  1000: {
    generator: {
      x: function(d,i) {
        return scaleX1(i) - 25;
      },
      w: 20
    }
  },
  1200: {
    generator: {
      x: function(d,i) {
        return scaleX(i) - 35;
      }
    }
  }
});

Res.w(rect2, {
  800: {
    generator: {
      x: function(d,i) {
        return scaleX2(i) + 5;
      },
      w: 15
    }
  },
  1000: {
    generator: {
      x: function(d,i) {
        return scaleX1(i) + 5;
      },
      w: 20
    }
  },
  1200: {
    generator: {
      x: function(d,i) {
        return scaleX(i) + 5;
      }
    }
  }
});
```

[Try it yourself >>](https://codepen.io/arthusliang/pen/gOOZRrj)
