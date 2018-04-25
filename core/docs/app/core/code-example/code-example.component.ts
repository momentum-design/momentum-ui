import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'docs-code-example',
  template: `
    <div class="docs-code" *ngIf="section.examples && showCode">
      <div class="docs-code--html">
        <pre><code highlight [innerHTML]="section.examples.html[0].escaped | keepHtml"></code></pre>
      </div>
    </div>
  `,
  styles: [],
})
export class CodeExampleComponent {
  @Input() section;
  @Input() showCode;

  constructor(private elementRef: ElementRef) {}

}
