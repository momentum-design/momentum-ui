# Template

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/template

Use template to develtop charting application faster.

# Instructor

```
board.template('SingleRect', {
    rect: [{
      data: '',
      value: function (d) {
        return d.profit;
      }
    }],
    _responsive: true
  });
board.render();
```

## arguments

+ template name

  We will keep developing templates according to Momentum Design system. You can using the following template currently.

  - SingleRect

+ config

  The key starts with ```_``` will be settings.
  
  The key starts without ```_``` will be the data usage of each Shape in the template.

# Method

## add

  You can write your own template which should inherit from MomentumCharts.Preset. Before using your own template, use the following code to add your template into Momentum Charts. 

```
  MomentumCharts.Template.add(yourPreset);
```
