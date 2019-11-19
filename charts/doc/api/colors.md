# Colors

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/colors

Help to get an array of color with Momentum Style

# Example

```
let colorsSet = new MomentumChart.Colors(colorPersets);
let colors = colorsSet.scheme(num);
console.log(colors[i].toString());
```

# Instructor

## arguments

+ colorPersets - the name of colorPersets inside Momentum.

## colorPersets

The default colors are based on 'Hcl' color system. You can input the following names directly. If you want to use 'Rgb' or 'Hsl' system, just append 'Rgb' or 'Hsl' at the end of the string.

  - ColorWheel
  - 12Colors
  - 10Colors
  - 8Colors
  - 3Colors
  - jmt
  - quality
  - quality2
  - red
  - AudioSourcesColors
  - AudioColors
  - MeetingTypeColors
  - Meetings
  - MeetingMinutes
  - ParticipantsAndHosts
  - GoodBad
  - SuccessFailure
  - AreaLightAndDarkGreen
  - AreaLightAndDarkBlue
  - FilesShared

# Method

## static buildPreset

Create you own color preset.

## static addPresets

Append you own color preset.

## static allPersets

Return all the presets in Momentum.

## scheme

Return an array of colors with the length you input.
