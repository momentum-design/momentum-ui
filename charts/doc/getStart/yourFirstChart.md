# Get Start

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Your fisrt Chart

At first, we are going to teach you how to draw a simple line.

#### Example

![Get Start](https://screenshot.codepen.io/3315115.zYYmdrM.small.6a6d17fb-5393-4668-bbf1-87496971b1b3.png)

#### Code

Momentum Charts will create a SVG node and append it to a HTML dom. In our tutorial, we create an empty Div with the id of 'app'.

```
<body>
  <div id='app'></div>
</body>
```
With the following code, Momentum Charts will creat a line chart with the data of an array [10,25,55,65,40]. 

```
var data = [10,25,55,65,40];
var board = MomentumCharts.board('#app', {
  attr: {
    width: '1200',
    height: '700',
    viewBox: "0 0 1200 700"
  }
}, data);
board.line({
  generator: {
    x: function(d, i) {
      return 100 + i * 250;
    },
    y: function(d) {
      return 650-d*8;
    }
  },
  modify: {
    attr: {
      stroke: '#0090C4',
      'stroke-width': 2
    }
  }
});
board.render();
```

[Try it yourself >>](https://codepen.io/arthusliang/pen/zYYMGOg)

#### Board

Momentum Charts render all the charts in a SVG node. Before drawing charts, you need chart an instance of Board. The first argument is a string of dom querySelector. A SVG node will be created and appended to the selected dom. The second argument is a Modify Object which will be applied to the svg root node. The last argument is the data. 

The following code will create a 1200px*700px SVG canvas and append it to a div with the id of 'app'. The varible data will be used as the source data of this board.

```
var board = MomentumCharts.board('#app', {
  attr: {
    width: '1200',
    height: '700',
    viewBox: "0 0 1200 700"
  }
}, data);
```

#### Shape

All the chart compoents in the Momentum Charts is a subClass of the Shape Class. With these shapes, you can visualize the data inside Board. The first argument of these Shapes is a string which defines the dataUrl it uses. The second arugment configs the generator and the modify object of this shape.


```
board.line({
  generator: {
    x: function(d, i) {
      return 100 + i * 250;
    },
    y: function(d) {
      return 650-d*8;
    }
  },
  modify: {
    attr: {
      stroke: '#0090C4',
      'stroke-width': 2
    }
  }
});
```

#### render

`board.line` only define how to visualize data. The browser will only render the SVG node after you call ```render``` or ```transition```.

