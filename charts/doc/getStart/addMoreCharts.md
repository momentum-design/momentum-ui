# Get Start

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Add more charts

In this section, you will learn how to use dataUrl to add more than one charts in board.

#### Example

![Add more charts](https://screenshot.codepen.io/3315115.oNNQXEW.small.42ab46b4-2942-4432-a8a6-1cdef88a84de.png)

## Prepare more data

First, we need create the second array data for the other line chart.

```
var boardData = {
      d1: [10,25,55,65,40],
      d2: [15,30,35,55,60]
    };
```

We also update the third argument for board.

```
var board = MomentumCharts.board('#app', {
  attr: {
    width: '1200',
    height: '700',
    viewBox: "0 0 1200 700"
  }
}, boardData);
```

Momentum Charts will map a url to a property of board's data. We use a varible 'lineGenerator' to store the common generator. ```'d1'``` refers to ```boardData.d1```

```
board.line('d1', {
  generator: lineGenerator,
  modify: {
    attr: {
      stroke: '#0090C4',
      'stroke-width': 2
    }
  }
});

board.line('d2', {
  generator: lineGenerator,
  modify: {
    attr: {
      stroke: '#BA2F00',
      'stroke-width': 2
    }
  }
});
```	

## Add dot

Now you know how to use line chart. This example will use any Shape - Symbol. The property x and y define how to map data to the shape's position. Symbol's generator requires two more properties.

```
dotGenerator = {
  x: function(d, i) {
    return 100 + i * 250;
  },
  y: function(d) {
    return 650-d*8;
  },      
  type: MomentumCharts.Symbol.type('circle'),
  size: 40
};
```
Here is all the code for this example. You can also try this online.

#### code

```
var lineGenerator = {
  x: function(d, i) {
    return 100 + i * 250;
  },
  y: function(d) {
    return 650-d*8;
  }
},dotGenerator = {
  x: function(d, i) {
    return 100 + i * 250;
  },
  y: function(d) {
    return 650-d*8;
  },      
  type: MomentumCharts.Symbol.type('circle'),
  size: 40
};
var boardData = {
      d1: [10,25,55,65,40],
      d2: [15,30,35,55,60]
    };
var board = MomentumCharts.board('#app', {
  attr: {
    width: '1200',
    height: '700',
    viewBox: "0 0 1200 700"
  }
}, boardData);

board.line('d1', {
  generator: lineGenerator,
  modify: {
    attr: {
      stroke: '#0090C4',
      'stroke-width': 2
    }
  }
});

board.line('d2', {
  generator: lineGenerator,
  modify: {
    attr: {
      stroke: '#BA2F00',
      'stroke-width': 2
    }
  }
});

board.symbol('d1', {
  generator: dotGenerator,
  modify: {
    attr: {
      stroke: '#0090C4',
      fill: 'white',
      'stroke-width': 2
    }
  }
});

board.symbol('d2', {
  generator: dotGenerator,
  modify: {
    attr: {
      stroke: '#BA2F00',
      fill: 'white',
      'stroke-width': 2
    }
  }
});

board.render();
```

[Try it yourself >>](https://codepen.io/arthusliang/pen/oNNQXEW)