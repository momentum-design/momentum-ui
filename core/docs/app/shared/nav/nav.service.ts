import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class NavService {
  private navUrl = '/data/nav.json';
  private nav;

  constructor(
    private http: HttpClient,
  ) { }

  getNav() {
    if (!this.nav) {
      return this.http
      .get(this.navUrl)
      .map(response => {
        console.log(response);
        this.nav = response['data'];
        return this.nav;
      });
    }
    return Observable.of(this.nav);
  }
}
