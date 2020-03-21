import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-pagination-dynamic',
  template: `
    <div class='mleft'>
      <md-pagination
        [current]='currentPage'
        [total]='totalPages'
        [firstGroupNum]='firstGroupNum'
        [midGroupNum]='midGroupNum'
        [lastGroupNum]='lastGroupNum'
      ></md-pagination>
      <button (click)='addPage()'>Add Page</button>
      <button (click)='deletePage()'>Delete Page</button>
      <div>
        <input #textbox type="number" [(ngModel)]="_current"/>
        <button (click)='setCurrent()'>Set Current Page</button>
      </div>
      <div>
        <input #textbox type="number" [(ngModel)]="_firstGroup"/>
        <button (click)='setFirstGroup()'>Set firstGroupNum</button>
      </div>
      <div>
        <input #textbox type="number" [(ngModel)]="_midGroup"/>
        <button (click)='setMidGroup()'>Set midGroupNum</button>
      </div>
      <div>
        <input #textbox type="number" [(ngModel)]="_lastGroup"/>
        <button (click)='setLastGroup()'>Set lastGroupNum</button>
      </div>
    </div>
  `,
  styles: ['.mleft{margin-left:100px;}']
})
export class PaginationDynamicComponent implements OnInit {
  totalPages: number;
  currentPage: number;
  _current: number;
  firstGroupNum: number;
  _firstGroup: number;
  midGroupNum: number;
  _midGroup: number;
  lastGroupNum: number;
  _lastGroup: number;

  constructor() { }

  ngOnInit() {
    this.totalPages = 10;
    this.currentPage = 1;
    this.firstGroupNum = 2;
    this.midGroupNum = 3;
    this.lastGroupNum = 2;
  }

  public addPage() {
    this.totalPages++;
  }

  public deletePage() {
    (this.totalPages > 1) ? this.totalPages-- : this.totalPages = 1;
  }

  public setCurrent() {
    if (this._current) {
      this.currentPage = this._current;
    }
  }

  public setFirstGroup() {
    if (this._firstGroup) {
      this.firstGroupNum = this._firstGroup;
    }
  }

  public setMidGroup() {
    if (this._midGroup) {
      this.midGroupNum = this._midGroup;
    }
  }

  public setLastGroup() {
    if (this._lastGroup) {
      this.lastGroupNum = this._lastGroup;
    }
  }
}
