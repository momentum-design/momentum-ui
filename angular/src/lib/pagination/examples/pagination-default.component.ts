import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-pagination-default',
  template: `
    <div class='mleft'>
      <md-pagination [current]='1' [href]='"?page=$page$"'></md-pagination>
      <md-pagination [current]='2' (whenClick)='handleClick($event)'></md-pagination>
      <md-pagination [current]='3'></md-pagination>
      <md-pagination [current]='4'></md-pagination>
      <md-pagination [current]='5'></md-pagination>
      <md-pagination [current]='6'></md-pagination>
      <md-pagination [current]='7'></md-pagination>
      <md-pagination [current]='8'></md-pagination>
      <md-pagination [current]='9'></md-pagination>
      <md-pagination [current]='10'></md-pagination>
    </div>
    <div class='mleft'>
      <md-pagination [current]='1' total='1'></md-pagination>
    </div>
    <div class='mleft'>
      <md-pagination [current]='1' [total]='100'
      [firstGroupNum]='3' [midGroupNum]='6' [lastGroupNum]='3'></md-pagination>
    </div>
    <div class='mleft'>
      <md-pagination [current]='1' [total]='1'></md-pagination>
      <md-pagination [current]='1' [total]='2'></md-pagination>
      <md-pagination [current]='1' [total]='3'></md-pagination>
    </div>
  `,
  styles: ['.mleft{margin-left:100px;}']
})
export class PaginationDefaultComponent implements OnInit {

  constructor() { }

  handleClick(index) {
    console.info(index);
  }

  ngOnInit() {
  }

}
