import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class PeopleService {

  people: Array<object> = [
    {'id': Math.random().toString(36).slice(2), 'age': 32, 'color': 'Orange'},
    {'id': Math.random().toString(36).slice(2), 'age': 12, 'color': 'Black'},
    {'id': Math.random().toString(36).slice(2), 'age': 23, 'color': 'Gray'},
    {'id': Math.random().toString(36).slice(2), 'age': 36, 'color': 'Black'},
    {'id': Math.random().toString(36).slice(2), 'age': 34, 'color': 'Yellow'},
    {'id': Math.random().toString(36).slice(2), 'age': 29, 'color': 'Orange'},
    {'id': Math.random().toString(36).slice(2), 'age': 32, 'color': 'Black'},
    {'id': Math.random().toString(36).slice(2), 'age': 27, 'color': 'Red'},
    {'id': Math.random().toString(36).slice(2), 'age': 32, 'color': 'Orange'},
    {'id': Math.random().toString(36).slice(2), 'age': 12, 'color': 'Black'}
  ];

  get() {
    return of(this.people);
  }
}
