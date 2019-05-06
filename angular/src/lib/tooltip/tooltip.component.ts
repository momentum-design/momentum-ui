import { Component, Input, TemplateRef, OnInit, ViewContainerRef} from '@angular/core';


@Component({
  selector: 'md-tooltip',
  styles: [],
  template: `<div id="{{id}}">
  <span class="md-tooltip__text" role="tooltip">{{ text }}</span>
  <ng-content></ng-content>
  </div>
  `,
})
export class TooltipComponent implements OnInit {

  @Input() text: string;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() id: string;

  constructor( public _vcr: ViewContainerRef ) {}

  ngOnInit() {
      if ( this.tooltipTemplate ) {
          this._vcr.createEmbeddedView(this.tooltipTemplate);

      }
  }
}
