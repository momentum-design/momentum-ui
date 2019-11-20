# Fundamentals

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Generator

Generator is used to define how to map the data to the shape's properies. The Generator is passed as a property of the config in Shape. The properties should accept both value and function. Different shape acceopt different properties.


#### Example

![Generator](https://screenshot.codepen.io/3315115.XWWoeRw.small.6b9cbf37-ad27-41be-8261-1923aacd75d3.png)

The example shows how to create a bar chart based on an array.

```
board.rect({
    generator: {
        x: function(d, i) {
            return 200 + i * 100;
        },
        y: function(d) {
            return 650-d*10;
        },
        w: 40,
        h: function(d) {
            return d*10;
        },
        rx: [4,4,0,0],
        ry: [4,4,0,0]
    },
    modify: {
        attr: {
            fill: '#0090C4'
        }
    }
});
```

### arugment

The fisrt arugment ```d``` here refers to the data for current shape.

The second arugment ```i``` refers to the index of the data.

[Try it yourself >>](https://codepen.io/arthusliang/pen/XWWoeRw)
