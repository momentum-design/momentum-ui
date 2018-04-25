import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { merge } from 'lodash';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../shared/data/data.service';
import { NavService } from '../../shared/nav/nav.service';

@Injectable()
export class CategoryService {
  category: any = {};

  constructor(
    private dataService: DataService,
    private navService: NavService,
  ) { }

  getCategoryData(id) {
    return Observable.forkJoin(
      this.dataService.getData()
        .map(data => {
          console.log(data);
          return data;
        }),
      this.navService.getNav()
        .map(nav => {
          console.log(nav);
          return nav;
        }),
    )
      .map(responses => {
        console.log(responses);
        merge(this.category, responses[0][id]);
        console.log(this.category);
        this.category.nav = responses[1][id];
        console.log(this.category);
        return this.category;
      });
  }
}
