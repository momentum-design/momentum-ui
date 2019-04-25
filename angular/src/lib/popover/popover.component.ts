import { Component, Input, TemplateRef, OnInit, ViewContainerRef} from '@angular/core';


@Component({
  selector: 'md-popover',
  styles: [],
  template: `
  <span>{{ text }}</span>
  <ng-content></ng-content>
  `,
})
export class PopoverComponent implements OnInit {

  @Input() text: string;
  @Input() popoverTemplate: TemplateRef<any>;

  constructor( private _vcr: ViewContainerRef ) {}

  ngOnInit() {
      if ( this.popoverTemplate ) {
          this._vcr.createEmbeddedView(this.popoverTemplate);

      }
  }
}
