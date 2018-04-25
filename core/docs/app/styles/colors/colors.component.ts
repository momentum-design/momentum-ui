import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import colors from '../../../../data/colors.json';

@Component({
  selector: 'docs-colors',
  template: `
    <docs-header [title]="header" [description]="description"></docs-header>
    <div class="row">
      <div class="paint-chip-group medium-6 large-4 xlarge-3 columns end" *ngFor="let color of colorData">
        <div class="paint-chips" *ngIf="color.name !== 'black' && color.name !== 'white'" [style.backgroundColor]="color.variations[0].hex"
          [ngClass]="{'paint-chips--light': color.text === 'dark'}">
          <h2 class="paint-chips__name">{{color.name}}</h2>
          <div
            class="paint-chip"
            *ngFor="let chip of color.variations"
            [style.backgroundColor]="chip.hex"
            [ngClass]="{'paint-chip--light': chip.text === 'dark'}">
            <span class="paint-chip__variable">{{chip.variable}}</span>
            <span *ngIf="chip.hex" class="paint-chip__hex">{{chip.hex}}</span>
            <span *ngIf="chip.opacity" class="paint-chip__opacity">{{chip.opacity}}&#37;</span>
          </div>
        </div>
        <div class="paint-chips" *ngIf="color.name === 'black' || color.name === 'white'"
          [ngClass]="{'paint-chips--light': color.text === 'dark', 'paint-chips--opacity': color.opacity}">
          <h2 class="paint-chips__name" [style.backgroundColor]="color.name">{{color.name}}</h2>
          <div
            class="paint-chip"
            *ngFor="let chip of color.variations"
            [style.backgroundColor]="getBackgroundColor(color, chip)"
            [ngClass]="{'paint-chip--light': chip.text === 'dark'}">
            <span class="paint-chip__variable">{{chip.variable}}</span>
            <span *ngIf="chip.hex" class="paint-chip__hex">{{chip.hex}}</span>
            <span *ngIf="chip.opacity" class="paint-chip__opacity">opacity: {{chip.opacity}}&#37;</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./colors.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ColorsComponent implements OnInit {
  public colorData: Array<any> = [];
  public header = 'Colors';
  public description = 'Color brings a design to life. Color is versatile; it\'s used to express emotion and tone, as well as place emphasis and create associations. When using these colors, use the SCSS variable rather than referencing the hex code directly.';

  constructor() {}

  ngOnInit() {
    this.colorData = colors;
  }

  public getBackgroundColor(color, chip) {
    const rgb = color.name === 'black' ? '0,0,0' : '255,255,255';
    const opacity = chip.opacity / 100;
    return `rgba(${rgb},${opacity})`;
  }
}
