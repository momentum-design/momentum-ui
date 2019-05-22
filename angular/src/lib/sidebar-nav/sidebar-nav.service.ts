import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, startWith } from 'rxjs/operators';

interface IState {
  sidebarNavItems: any[];
  focusIndex: number;
}
@Injectable()
export class SidebarNavService {
  private actions = new Subject<Partial<IState>>();
  private state$ = this.actions.asObservable().pipe(
    startWith({
      sidebarNavItems: [],
      focusIndex: 0,
    }),
    scan((state, action) => ({ ...state, ...action })),
  );

  focus$ = this.state$.pipe(
    map(state => state.focusIndex),
    distinctUntilChanged(),
  );
  sidebarNavItems$ = this.state$.pipe(
    map(state => state.sidebarNavItems),
    distinctUntilChanged(),
  );

  constructor() {}

  setFocus(focusIndex: number): void {
    this.actions.next({
      focusIndex,
    });
  }

  setSidebarNavItems(sidebarNavItems: any[]): void {
    this.actions.next({
      sidebarNavItems,
    });
  }


}
