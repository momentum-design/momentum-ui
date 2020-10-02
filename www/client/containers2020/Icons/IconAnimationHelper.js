import Ash from '../../services/motion';

class IconAnimationHelper {
  constructor(container, pops, popHeight) {
    this.Con = container;
    this.Pops = pops || [];
    this.Nodes = [];
    this.Win = window;
    this.CurrentNodeIndex = -1;
    this.CurrentPopIndex = 0;
    this.Lock = false;
    this.PopHeight = popHeight || 460;
    this._resize;
    this._init();
  }

  _getDomPosition = (pObj, stopNode) => {
    let _left = pObj.offsetLeft || 0,
      _top = pObj.offsetTop || 0;
    while ((pObj = pObj.offsetParent) && pObj.offsetParent != stopNode) {
      _left += eval(pObj.offsetLeft);
      _top += pObj.offsetTop;
    }
    return { x: _left, y: _top };
  };
  _init = () => {
    this.__resize = () => {
      this._resize();
    };
    window.addEventListener('resize', this.__resize);
  };

  _resize = () => {
    let nodeLength = this.Nodes.length,
      hasNodes = nodeLength > 0,
      conWidth = this.Con.clientWidth,
      availableHeight = document.documentElement.clientHeight,
      nodeWidth = hasNodes ? this.Nodes[0].clientWidth : 0,
      conLeft = this.Con.offsetLeft,
      nodeMarginLeft = hasNodes ? ( this.Nodes[0].offsetLeft - conLeft ) : 0,
      nodeHeight = hasNodes ? this.Nodes[0].clientHeight : 0,
      colNum = (conWidth / (nodeWidth+nodeMarginLeft)) >> 0,
      rowNum = Math.ceil(nodeLength / colNum);

    this.LeftNavWidth = conLeft;

    this.Args = {
      nodeLength,
      hasNodes,
      conWidth,
      availableHeight,
      nodeWidth,
      nodeHeight,
      colNum,
      rowNum,
    };
    this._setStatic();
  };

  _getPopupPosition = i => {
    if (this.Args) {
      let { colNum, nodeLength, nodeWidth } = this.Args,
        rowIndex = (i / colNum) >> 0,
        colIndex = i % colNum,
        insertPosition = (rowIndex + 1) * colNum,
        arrowPosition;
      insertPosition = insertPosition > nodeLength - 1 ? nodeLength : insertPosition;
      arrowPosition = this._getDomPosition(this.Nodes[i], this.Con).x + ((nodeWidth / 2) >> 0) - this.LeftNavWidth;
      return {
        rowIndex,
        colIndex,
        insertPosition,
        arrowPosition,
      };
    } else {
      return {};
    }
  };

  _insertPopUp = (insertPosotion, dom) => {
    if (insertPosotion > this.Nodes.length - 1) {
      this.Con.appendChild(dom);
    } else {
      this.Con.insertBefore(dom, this.Nodes[insertPosotion]);
    }
  };

  _hasCurrent = () => {
    return typeof this.CurrentNodeIndex == 'number' && this.CurrentNodeIndex >= 0;
  };

  _setStatic = () => {
    let i = this.CurrentNodeIndex;
    if (this._hasCurrent()) {
      let { insertPosition } = this._getPopupPosition(i);
      this._insertPopUp(insertPosition, this.Pops[this.CurrentPopIndex]);
    }
  };

  release = () => {
    window.removeEventListener('resize', this.__reset);
  };

  reset = nodes => {
    this.Nodes = nodes || [];
    this._resize();
  };

  getNextPopIndex = i => {
    let { insertPosition, arrowPosition } = this._getPopupPosition(i),
      nextPopIndex = this.CurrentPopIndex,
      needAnimation = true;

    if (this.CurrentNodeIndex > -1) {
      let perInsertPosition = this._getPopupPosition(this.CurrentNodeIndex).insertPosition;
      if (perInsertPosition !== insertPosition) {
        nextPopIndex = 1 - this.CurrentPopIndex;
      } else {
        needAnimation = false;
      }
    }

    return {
      nextPopIndex,
      arrowPosition,
      needAnimation,
    };
  };

  sel = (i, pops) => {
    if (!this.Lock && (i !== this.CurrentNodeIndex || i == -1)) {
      this.Pops = pops || this.Pops || [];
      this.Lock = true;
      let me = this,
        time = 12,
        tween = 'easeOutInt',
        nextPopArgs = {
          nextPopIndex: this.CurrentPopIndex,
          arrowPosition: 0,
          needAnimation: true,
        },
        preNodeIndex = this.CurrentNodeIndex;

      if (i != -1) {
        nextPopArgs = this.getNextPopIndex(i);
      } // else close

      if (nextPopArgs.needAnimation) {
        let ashArr = [],
          closeIndex = i !== -1 ? 1 - nextPopArgs.nextPopIndex : nextPopArgs.nextPopIndex;
        //close
        if (preNodeIndex != -1) {
          ashArr.push({
            dom: this.Pops[closeIndex],
            css: [
              {
                height: this.PopHeight + 'px',
                overflow: 'hidden',
              },
              {
                height: '0px',
                display: 'none',
              },
            ],
            time: 8,
            tween: 'easeInInt',
          });
          this.CurrentNodeIndex = -1;
        }
        //open
        if (i !== -1) {
          this.CurrentPopIndex = nextPopArgs.nextPopIndex;
          this.CurrentNodeIndex = i;
          this._setStatic();

          let domTop = this._getDomPosition(this.Nodes[i]).y,
            scrollTop = window.pageYOffset || window.scrollTop || 0,
            availableHeight = this.Args.availableHeight,
            aimTop = domTop - (availableHeight - this.PopHeight) / 2;

          if (preNodeIndex != -1) {
            let _colNum = this.Args.colNum,
              _preRowIndex = (preNodeIndex / _colNum) >> 0,
              _nowIndex = (i / _colNum) >> 0;
            if (_preRowIndex < _nowIndex) {
              aimTop = aimTop - this.PopHeight;
            }
          }

          ashArr.push({
            dom: this.Pops[nextPopArgs.nextPopIndex],
            css: [
              {
                height: '0px',
                display: 'block',
              },
              {
                height: this.PopHeight + 'px',
                overflow: 'visible',
              },
            ],
            time: time,
            tween: tween,
          });
          ashArr.push({
            dom: document.documentElement,
            prop: [
              {
                scrollTop: scrollTop,
              },
              {
                scrollTop: aimTop,
              },
            ],
            time: time,
            tween: tween,
          });
        }

        Ash.play(ashArr, 1, function() {
          me.Lock = false;
        });
      } else {
        this.CurrentNodeIndex = i;
        this._setStatic();
        this.Lock = false;
      }
    }
  };
}

IconAnimationHelper.displayName = 'IconAnimationHelper';

export default IconAnimationHelper;
