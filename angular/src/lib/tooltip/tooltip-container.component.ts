import {
  Component,
  Input,
  TemplateRef,
  ElementRef,
  OnInit,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';



@Component({
  selector: 'md-tooltip-container',
  styleUrls: ['tooltip-container.scss'],
  template: `
  <div [ngClass]="classList" class="md-event-overlay">
    <div *ngIf="showArrow" class="md-event-overlay__arrow" ></div>
    <div  class="md-event-overlay__children">
        <md-tooltip
          #mdtooltip
          id={{this.id}}
          text={{this.text}}
          maxWidth={{this.maxWidth}}
          [tooltipTemplate]="tooltipTemplate"
        ></md-tooltip>
    </div>
  </div>
  `
})
export class TooltipContainerComponent implements OnInit {

  /** @prop Sets text in the tooltip */
  @Input() text: string;

   /** @prop Sets a component in the tooltip */
  @Input() tooltipTemplate?: TemplateRef<any>;

  /** @prop Sets direction of the tooltip | null */
  @Input()
  set direction(direction: string) {
    this.classList['md-event-overlay--top'] = direction === 'top';
    this.classList['md-event-overlay--bottom'] = direction === 'bottom';
    this.classList['md-event-overlay--left'] = direction === 'left';
    this.classList['md-event-overlay--right'] = direction === 'right';
  }

   /** @prop Allows tooltip to stay open when you hover over the tooltip | false  */
  @Input() allowHover: boolean;

  /** @prop shows the arrow or not */
  @Input() showArrow: boolean  = true;

  /** @prop Sets the id for screen reader */
  @Input() id: string;

  /** @prop Sets the max-width */
  @Input() maxWidth: number;

  @Output() mouseLeaveEvent = new EventEmitter();
  @Output() mouseEnterEvent = new EventEmitter();

  public classList: {[key: string]: boolean} = {};
  public isTooltip: boolean = true;

  @HostListener('mouseleave')
  closeNow() {
    this.mouseLeaveEvent.emit(false);
  }

  @HostListener('mouseenter')
  stayOpen() {
    this.mouseEnterEvent.emit(true);
  }


  ngOnInit() {
    this.classList['md-tooltip'] = this.isTooltip;
    this.classList['md-event-overlay--arrow'] = this.showArrow;
  }

  constructor(private elementRef: ElementRef) {}
}
