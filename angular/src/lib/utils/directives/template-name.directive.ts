import {
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';

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
