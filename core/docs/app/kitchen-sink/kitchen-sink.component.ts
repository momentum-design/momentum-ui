import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { forEach, get } from 'lodash';
import * as docs from '../../../data/docs.json';
import

@Component({
  selector: 'docs-sink',
  templateUrl: './kitchen-sink.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class KitchenSinkComponent implements OnInit {
  public title = 'KitchenSink';
  public description = 'Use this page to develop and test components for the toolkit.';
  public examples = [];

  constructor() {}

  ngOnInit() {
    forEach(docs, (category, key) => {
      forEach(category.children, (component, key) => {
        forEach(component.sections, (section, key) => {
          if (section.examples && get(section.examples, 'html')) {
            this.examples.push(section.examples.html[0].example);
          }
        });
      });
    });
    console.log(this.examples)
  }
}
