import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidebarService {

  private tier = new BehaviorSubject<any>(false);
  tier$ = this.tier.asObservable();

  constructor() { }

  changeTier(level: boolean) {
    this.tier.next(level);
  }
}
