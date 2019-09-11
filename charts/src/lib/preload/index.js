import core from '../utils/core';
import preloadGradient from './preloadGradient';

class Preload {

  constructor (dataUpdate, shapeLoader, board) {
    this.Guid = core.guid();
    this.Board = board;
    this.extendLoaders(shapeLoader);
    this.InstallList = {};
    this.ClipPaths = {};
    if (dataUpdate === undefined) {
      board.render();
    } else {
      board.render(dataUpdate);
    }
    this.attach();
  }

  /*
  {
    dataUrl: '',
    datum: [{},repeat],
    data: []
  }
  */
  extendData(dataUpdate) {
    dataUpdate.dataUrl = dataUpdate.dataUrl || '';
    dataUpdate.data = dataUpdate.data || this.fakeDataArr.apply(this, dataUpdate.datum);
    return dataUpdate;
  }

  /*
    {
      guid1: shape1,
      guid2: shape2
    }
    {
      shapes: {}
      loader: ''
    }
    [{
      shapes: {{}}
      loader: ''
    }] <-----this is final ShapeLoader
  */
  extendLoaders(shapeLoaders) {
    if (core.isArray(shapeLoaders)) {
      this.ShapeLoader = shapeLoaders;
    } else if (typeof shapeLoaders.loader === 'string') {
      this.ShapeLoader = [shapeLoaders];
    } else {
      this.ShapeLoader = [{ shapes: shapeLoaders }];
    }

    let c;
    for (let n in this.ShapeLoader) {
      c = this.ShapeLoader[n];
      // ---> convert ShapeLoader.shapes to Hash
      c.shapes = c.shapes.ShapeName ? { 0: c.shapes } : c.shapes;
      c.loader = c.loader || this.LoaderType.preloadGradient;
    }
  }

  _clearClipPath(name, shape) {
    let clipPathObj = this.ClipPaths[name];
    if (clipPathObj !== undefined) {
      // --
      if (clipPathObj.use > 0) {
        clipPathObj.use--;
      }
      // remove mask
      if (clipPathObj.use === 0) {
        for (var n in clipPathObj.rects) {
          clipPathObj.rects[n].remove();
        }
      }
      // move shape
      this.moveNode(shape.G.node(), shape.Selection.nodes());
    }
  }

  _appendClipPath(defs, name, shape, preloadName) {
    let clipPath,
      clipPathObj,
      clipPathId = this._clipPathId(name),
      clipPathIdUrl = 'url(#' + clipPathId + ')',
      preloadUrl = 'url(#' + preloadName + ')';
    // create clipPathObj
    if (this.ClipPaths[name] === undefined) {
      clipPath = defs.append('clipPath');
      clipPath.attr('id', clipPathId);
      this.ClipPaths[name] = {
        clipPath: clipPath,
        use: 0
      };
    }
    clipPathObj = this.ClipPaths[name];
    clipPath = clipPathObj.clipPath;
    // add mask
    if (clipPathObj.use === 0) {
      let r1 = this.Board.Layer.n(10000).append('rect');
      let r2 = this.Board.Layer.n(10000).append('rect');
      r1.attr('width', '100%').attr('height', '100%')
        .attr('clip-path', clipPathIdUrl).attr('fill', "#e9e9e9");
      r2.attr('width', '100%').attr('height', '100%')
        .attr('clip-path', clipPathIdUrl).attr('fill', preloadUrl);
      clipPathObj.rects = [r1, r2];
    }
    this.ClipPaths[name].use++;
    this.moveNode(clipPath.node(), shape.Selection.nodes());
  }

  moveNode(target, sel) {
    let i, l;
    for (i = 0, l = sel.length; i < l; i++) {
      target.append(sel[i]);
    }
  }

  _clipPathId(name) {
    return 'clipPath_' + name + '_' + this.Guid;
  }

  attach() {
    let loadName,
      shapes,
      defs = this.Board.Defs;
    for (let n in this.ShapeLoader) {
      loadName = this.ShapeLoader[n].loader;
      shapes = this.ShapeLoader[n].shapes;
      // perpare style
      if (this.InstallList[loadName] === undefined) {
        this.InstallList[loadName] = this.Loaders[loadName].install(defs, this.Guid);
      }
      // perpare clip
      for (let g in shapes) {
        this._appendClipPath(defs, loadName, shapes[g], this.Loaders[loadName].getId(this.Guid));
      }
    }
  }

  detach() {
    const l = this.ShapeLoader.length;
    let i = 0,
      shapeLoader,
      shape,
      loader;
    for (; i < l; i++) {
      shapeLoader = this.ShapeLoader[i];
      shape = shapeLoader.shapes;
      loader = shapeLoader.loader;
      for (let g in shape) {
        this._clearClipPath(loader, shape[g]);
      }
    }
    delete this.Board.PreloadStack[this.Guid];
  }

  fakeDataArr(data, repeat) {
    const arr = [],
      l = repeat || 1;
    for (let i = 0; i < l; i++) {
      arr.push(data);
    }
    return arr;
  }

}

Preload.prototype.LoaderType = {};
Preload.prototype.Loaders = {
  'preloadGradient': preloadGradient
};

for (let NAME in Preload.prototype.Loaders) {
  Preload.prototype.LoaderType[NAME] = NAME;
}

export default Preload;

/*
  board.preloader.fakeData();
  board.preload(data, );
  board.preload = function(dataArgs, shapes){
    this.PreLoad = new PreLoad();
    this.data(this.Preload.buildFakeData());
  }
   fill="url(#Gradient01)"
*/
