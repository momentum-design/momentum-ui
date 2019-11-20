# Momentum UI Charts

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/angular/LICENSE)

> @momentum-ui/charts

Momentum UI Charts is a UI framework for implementing Cisco Momentum Design into web apps and sites.

## Table of Contents
- [Background](#background)
- [Install](#install)
- [Get Start](#get-start)
- [Fundamentals](#fundamentals)
- [Techniques](#techniques)
- [API](#api)
- [Template](#template)
- [Contribute](#contribute)
- [License](#license)

## Background

This guide explains how to using Momenmtum Charts Library. The get start section shows an example which covers most usage of Momentum Charts. Foundmamentals section will show the programming principle. The Api section shows the detail usage of each component and class insite Momentum.

Momentum Charts is based on Momentum Design System. The template module in Momentum Charts offers an easier way to draw charts which follows Momentum Design. The template also keep the flexibility of coding.


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

## Get Start

Before reading the documents, make sure you have imported Momentum Charts to your application.

``` js
import MomentumCharts from '@momentum-ui/charts';
//or
import { Board } from '@momentum-ui/charts';
```
You can also ran `yarn build` to get complied files in `./bundles`, `./es` or `./lib`.
You need add [d3.js](https://d3js.org/d3.v5.js) if you use `<script>` tag to link the files under `./bundles`

In this section, you will create examples step by step. 

+ [Your first Chart](./doc/getStart/yourFirstChart.md)
+ [Add more charts](./doc/getStart/addMoreCharts.md)
+ [Use Momentum Colors](./doc/getStart/useMomentumColors.md)
+ [Axis And Scale](./doc/getStart/axisAndScale.md)
+ [Make legends](./doc/getStart/makeLegends.md)
+ [Add animation](./doc/getStart/addAnimation.md)
+ [Responsive Design](./doc/getStart/responsiveDesign.md)

## Fundamentals

In this section, we will introduce base rule and principle of Momentum Charts. 

+ [Dom Structor](./doc/fundamentals/dataManagement.md)
+ [Modify](./doc/fundamentals/modify.md)
+ [Generator](./doc/fundamentals/generator.md)
+ [Data Management](./doc/fundamentals/domStructor.md)
+ [Life Circle](./doc/fundamentals/lifeCircle.md)
+ [Event Control](./doc/fundamentals/eventControl.md)

## Techniques

This section will give a brief introduce of some other techniques.

### D3

[D3.js](https://d3js.org/) is a JavaScript library for manipulating documents based on data. Mementum Charts use part of the features from D3. You can also use D3 when using Momentum Charts. We also expose some API from D3 as properties of config in Momentum Charts components.

### SVG

[SVG](https://www.w3schools.com/graphics/svg_intro.asp) defines vector-based graphics in XML format. Momentum Charts is designed based on SVG structor. You can also access SVG native doms inside Board and Shape with the API.

### Web Component

[Web Components](https://www.webcomponents.org/) are a set of features that provide a standard component model for the Web allowing for encapsulation and interoperability of individual HTML elements. There is a built in convert system for Web Component in Momentum. All the files whose name is start with '_' are used for this system. 

## API

### Components

+ [arc](./doc/api/arc.md)
+ [area](./doc/api/area.md)
+ [axis](./doc/api/axis.md)
+ [board](./doc/api/board.md)
+ [break](./doc/api/break.md)
+ [colors](./doc/api/colors.md)
+ [legends](./doc/api/legends.md)
+ [line](./doc/api/line.md)
+ [preload](./doc/api/preload.md)
+ [rect](./doc/api/rect.md)
+ [scale](./doc/api/scale.md)
+ [shape](./doc/api/shape.md)
+ [symbol](./doc/api/symbol.md)
+ [template](./doc/api/template.md)
+ [text](./doc/api/text.md)

### utils

+ [responsive](./doc/api/responsive.md)
+ [database](./doc/api/database.md)
+ [eventControl](./doc/api/eventControl.md)
+ [layer](./doc/api/layer.md)

## Template

Template enables engineers to develop some reusable persets of charts. This also help shows full design example from Mementum Design system.

## Contribute

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

## License

[© 2014-2019 Cisco and/or its affiliates. All Rights Reserved.](../LICENSE)
