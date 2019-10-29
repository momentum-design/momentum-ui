import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable()
export class TabsService {
  private Pane = -1;
  private Tabs = -1;
  private currentTabValue = 0;
  private currentFocusValue = 0;
  private TabDic = {};
  private TabDisables = {};

  private current = new Subject<number>();
  current$ = this.current.asObservable();

  private focusIndex = new Subject<number>();
  focusIndex$ = this.focusIndex.asObservable();

  private tabSize = new Subject<number>();
  tabSize$ = this.tabSize.asObservable();

  private paneSize = new Subject<number>();
  paneSize$ = this.paneSize.asObservable();

  constructor() {
    this.current$.subscribe(index => {
      this.currentTabValue = index;
    });
    this.focusIndex$.subscribe(index => {
      this.currentFocusValue = index;
    });
    this.tabSize$.subscribe(n => {
      this.Tabs = n;
    });
    this.paneSize$.subscribe(n => {
      this.Pane = n;
    });
  }

  public registerPane = () => {
    const index = this.Pane + 1;
    this.paneSize.next(index);
    return index;
  }
  public registerTab = () => {
    const index = this.Tabs + 1;
    this.tabSize.next(index);
    return index;
  }

  public registerDisable = (index: number, disable: boolean) => {
    this.TabDisables[index] = disable;
  }

  public registerKey = (key, value) => {
    key = key.toLowerCase();
    if (this.TabDic[key] === undefined) {
      this.TabDic[key] = [];
    }
    this.TabDic[key].push(value);
  }

  public select = (index: number, ifFocusSelect?: boolean) => {
    if (this.TabDisables[index] === false || ifFocusSelect) {
      this.setFocus(index);
      this.current.next(index);
    }
  }

  public selectFocus = (index: number) => {
    if (this.currentFocusValue !== this.currentTabValue) {
      this.current.next(this.currentFocusValue);
    }
  }

  public setFocus = (index: number) => {
    this.focusIndex.next(index);
  }

  public setFocusPre = () => {
    this.setFocus(Math.max(0, this.currentFocusValue - 1));
  }

  public setFocusNext = () => {
    this.setFocus(Math.min(this.Tabs, this.currentFocusValue + 1));
  }

  public setFocusLast = () => {
    this.setFocus(this.Tabs);
  }

  public setFocusByFirstCharacter = key => {
    key = key.toLowerCase();
    const arr = this.TabDic[key];
    let index,
      length,
      tabIndex = this.currentFocusValue;
    if (arr !== undefined) {
      length = arr.length;
      index = arr.indexOf(this.currentFocusValue);
      if (index !== -1 && length > 1 && index + 1 < length) {
        tabIndex = arr[index + 1];
      } else {
        tabIndex = arr[0];
      }
    }
    if (tabIndex !== this.currentFocusValue) {
      this.setFocus(tabIndex);
      return true;
    }
    return false;
  }
}
