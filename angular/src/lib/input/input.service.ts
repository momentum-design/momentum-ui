import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class InputService {

  private addBeforePadding = new Subject();
  addBeforePadding$ = this.addBeforePadding.asObservable();

  private addAfterPadding = new Subject();
  addAfterPadding$ = this.addAfterPadding.asObservable();

  onPaddingChange(position: string, value: boolean) {
    this[`add${position}Padding`].next(value);
  }
}

