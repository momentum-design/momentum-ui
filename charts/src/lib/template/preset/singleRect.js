import Preset from '../preset';
import Colors from '../../colors/index';

class SingleRect extends Preset {

  constructor (board, config) {
    super();
    super.init(board, config);
  }

  build() {
    let rectConfig = this.Config.rect[0],
      url = rectConfig.data,
      value = rectConfig.value,
      board = this.Board,
      data = board.data(url),
      colorsSet = new Colors('ColorWheel'),
      colors = colorsSet.scheme(10),
      size = board.size(),
      size_height = size.height,
      axis_y = size_height - 50,
      axis_x = 10;

    let Res = board.responsive();

    let rect = board.rect(url, {
      generator: {
        x: function (d, i) {
          return axis_x + i * 30 - 2;
        },
        y: function (d) {
          return axis_y - value(d);
        },
        h: function (d) {
          return value(d);
        },
        w: 10,
        rx: [2, 2, 0, 0],
        ry: [2, 2, 0, 0]
      },
      modify: {
        attr: {
          fill: colors[0].toString()
        }
      }
    });

    var fakelen = data.length;

    Res.w(rect, {
      400: {
        generator: {
          x: function (d, i) {
            return axis_x + i * (Res.width() - axis_x) / fakelen;
          },
          w: 10
        },
        modify: {
          style: {
            display: function (d, i) {
              return i % 2 === 0 ? 'none' : '';
            }
          }
        }
      },
      700: {
        generator: {
          x: function (d, i) {
            return axis_x + i * (Res.width() - axis_x) / fakelen;
          },
          w: 15
        }
      },
      1000: {
        generator: {
          x: function (d, i) {
            return axis_x + i * (Res.width() - axis_x) / fakelen;
          },
          w: 20
        }
      },
      1200: {
        generator: {
          x: function (d, i) {
            return axis_x + i * (Res.width() - axis_x) / fakelen;
          },
          w: 25
        },
        modify: {
          style: {
            display: ''
          }
        }
      }
    });

    Res.resize(true);

  }

}

export default SingleRect;
