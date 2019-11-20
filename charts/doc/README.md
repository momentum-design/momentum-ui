# Introduction to the Momentum Charts Docs

This guide explains how to using Momenmtum Charts Library. The get start section shows an example which covers most usage of Momentum Charts. Foundmamentals section will show the programming principle. The Api section shows the detail usage of each component and class insite Momentum.

Momentum Charts is based on Momentum Design System. The template module in Momentum Charts offers an easier way to draw charts which follows Momentum Design. The template also keep the flexibility of coding.

# Setup

## Install

### Npm or yarn

Install and manage the Momentum Charts using NPM. You may use yarn or npm. By default, yarn/npm installs packages to node_modules/.

```npm install @momentum-ui/charts --save```

or

```yarn add @momentum-ui/charts```

### Github

You can clone Momentum Charts from [github](https://github.com/momentum-design/momentum-ui/tree/master/charts).

After you download and go to charts folder, you can run ```yarn build``` to generate different files for usage.

```/bundles``` javascript file for script usage

```/lib``` built folder

```/es``` es6 version

```/src/lib``` source file

## Usage

### Node

Default usage

```import MomentumCharts from '@momentum-ui/charts';```

Import source file and build in your own application

```import MomentumCharts from '@momentum-ui/charts/src/lib/index';```

### Web

```
<script src='../js/d3.v5.js' type="text/javascript"></script>
<script src='../js/momentum-ui-charts-min.js' type="text/javascript"></script>
```

You can access the library via global varible 'MomentumCharts' or '$c'.

# Get Start

In this section, you will create examples step by step.

[Your first Chart](./getStart/yourFirstChart.md)

[Add more charts](./getStart/addMoreCharts.md)

[Use Momentum Colors](./getStart/useMomentumColors.md)

[AxisAndScale](./getStart/axisAndScale.md)

[Make legends](./getStart/makeLegends.md)

[Add animation](./getStart/addAnimation.md)

[Responsive Design](./getStart/responsiveDesign.md)

# Fundamentals

In this section, we will introduce base rule and principle of Momentum Charts. 

[Dom Structor](./fundamentals/dataManagement.md)

[Modify](./fundamentals/modify.md)

[Generator](./fundamentals/generator.md)

[Data Management](./fundamentals/domStructor.md)

[Life Circle](./fundamentals/lifeCircle.md)

[Event Control](./fundamentals/eventControl.md)

# Techniques

This section will give a brief introduce of some other techniques.

### D3

[D3.js](https://d3js.org/) is a JavaScript library for manipulating documents based on data. Mementum Charts use part of the features from D3. You can also use D3 when using Momentum Charts. We also expose some API from D3 as properties of config in Momentum Charts components.

### SVG

[SVG](https://www.w3schools.com/graphics/svg_intro.asp) defines vector-based graphics in XML format. Momentum Charts is designed based on SVG structor. You can also access SVG native doms inside Board and Shape with the API.

### Web Component

[Web Components](https://www.webcomponents.org/) are a set of features that provide a standard component model for the Web allowing for encapsulation and interoperability of individual HTML elements. There is a built in convert system for Web Component in Momentum. All the files whose name is start with '_' are used for this system. 


# Api

[board](./api/board.md)

### Components

[arc](./api/arc.md)

[area](./api/area.md)

[break](./api/break.md)

[colors](./api/colors.md)

[legends](./api/legends.md)

[line](./api/line.md)

[preload](./api/preload.md)

[rect](./api/rect.md)

[scale](./api/scale.md)

[shape](./api/shape.md)

[symbol](./api/symbol.md)

[template](./api/template.md)

[text](./api/text.md)

### utils

[responsive](./api/responsive.md)

[database](./api/database.md)

[eventControl](./api/eventControl.md)

[layer](./api/layer.md)

# Template

Template enables engineers to develop some reusable persets of charts. This also help shows full design example from Mementum Design system.
