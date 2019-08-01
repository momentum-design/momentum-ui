import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SelectService {
  private selectionSource = new Subject();
  selectionSource$ = this.selectionSource.asObservable();

  onSelectionChange() {
    this.selectionSource.next();
  }
}
