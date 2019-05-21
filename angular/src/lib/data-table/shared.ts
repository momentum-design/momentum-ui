import {
  NgModule,
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Directive({
  selector: '[mdTemplateName]',
  host: {}
})
export class TemplateNameDirective {

  @Input() type: string;
  @Input('mdTemplateName') name: string;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name;
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [TemplateNameDirective],
  declarations: [TemplateNameDirective]
})
export class SharedModule { }

