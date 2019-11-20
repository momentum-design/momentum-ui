# Fundamentals

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Dom Structor

If you have read the get start section, you should have used board and shape. In this section, you will get a high level map of Momentum Charts dom structor.

#### Example

![Dom Structor](https://screenshot.codepen.io/3315115.ExxGvdO.small.831d976f-abc1-41ea-bcf2-5339cf35c458.png)

### Board & Shape

If you do not know what's board and shape. Read this [article](./getStart/yourFirstChart.md). They just like  body and the other dom tags in HTML. Board and shape offers an easier way to manager data and dom.

### Layer

It is very convenient for us to use z-index in HTML. But SVG does not support this property, svg only arrange layers according to when you insert the dom into SVG node.

Momentum Charts has a built in class Layer ```./utils/layer.js``` to arrange layers

#### Shape's Layer attribute

The default layer value for shapes is 100.

```
Shape.prototype.Layer = 100;
```

Axis has the lowest layer value - 10.

```
Axis.prototype.Layer = 10;
```

If you check the source code of current example, you will notice that Momentum Charts use G tags with different Layer value to arrange shapes.

```
<g Layer='10'></g>
<g Layer='100'></g>
```

#### Layer Instance in Board

Board will create an Layer instance in its constructor. 

```
this.Layer = new Layer(this.Svg);
```
When board adding shapes, it can also define the layer of the shape. In most situations, you will reach `append` function in Shape.

```
append(shape, n) {
	const i = typeof n === 'number' ? n : shape.Layer;
	shape.attach(this.Layer.n(i));
}

```

#### preload defs

When using perload system in board, it will create a defs node to contain doms.



[Try it yourself >>](https://codepen.io/arthusliang/pen/ExxGvdO)
