# Scale

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/main.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/main/charts/LICENSE)

> @momentum-ui/charts/scale

Define how to map real data to position value

# Instructor

```
let scaleX = new MomentumChart.Scale('scaleLinear', {
  range: [0, 1000],
  domain: [2000, 2020]
});
```

## arguments

+ name - scale type

+ config - scale config

### range

  The range refers to the position value.

### domain

  The domain refers to the real value.
