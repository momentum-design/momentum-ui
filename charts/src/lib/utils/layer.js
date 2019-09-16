import * as d3 from "d3";
import core from './core';

// add before data
class Layer {

  constructor (root) {
    this.Root = root;
    this.Layer = {

    };
    this.Order = [];
  }

  _sort(a, b) {
    return a - b;
  }

  searchOrder(index) {
    this.Order.unshift(index);
    this.Order.sort(this._sort);
    let i = this.Order.indexOf(index);
    return i + 1 === this.Order.length ? false : this.Order[i + 1];
  }

  node(index) {
    if (this.Layer[index] === undefined) {
      this.Layer[index] = core.create('g');
      let i = this.searchOrder(index);
      if (i === false) {
        this.Root.appendChild(this.Layer[index]);
      } else {
        this.Root.insertBefore(this.Layer[index], this.Layer[i]);
      }
      this.Layer[index].setAttribute('Layer', index);
    }
    return this.Layer[index];
  }

  n(index) {
    if (this.Layer[index] === undefined) {
      let i = this.searchOrder(index);
      this.Layer[index] = this.Root.append('g');
      if (typeof i === 'number') {
        this.Root.node().insertBefore(this.Layer[index].node(), this.Layer[i].node());
      }
      this.Layer[index].attr('Layer', index);
    }
    return this.Layer[index];
  }

}

export default Layer;
