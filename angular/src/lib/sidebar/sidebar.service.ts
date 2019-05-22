import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class SidebarService {

  private tier = new BehaviorSubject<any>(false);
  tier$ = this.tier.asObservable().pipe(
    distinctUntilChanged(),
  );

  constructor() { }

  changeTier(level: boolean) {
    this.tier.next(level);
  }
}
