import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AccordionService {

  private focus = new BehaviorSubject<any>(0);
  focus$ = this.focus.asObservable();

  constructor() { }

  setFocus(focusIndex: number): void {
    this.focus.next(focusIndex);
  }
}
