import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable()
export class TabsService {

  private Pane = 0;
  private Tabs = 0;
  private currentTabValue = 0;
  private TabDic = {};

  private current = new Subject<number>();
  current$ = this.current.asObservable();

  constructor() {
    this.current$.subscribe(currentIndex => {
      this.currentTabValue = currentIndex;
    });
  }

  public registerPane = () => {
    return this.Pane++;
  }
  public registerTab = () => {
    return this.Tabs++;
  }

  public registerKey = (key, value) => {
    key = key.toLowerCase();
    if ( this.TabDic[key] === undefined) {
      this.TabDic[key] = [];
    }
    this.TabDic[key].push(value);
  }

  public select = (index) => {
    this.current.next(index);
  }

  public selectPre = () => {
    this.select(Math.max(0, this.currentTabValue - 1));
  }

  public selectNext = () => {
    this.select(Math.min(this.Tabs, this.currentTabValue + 1));
  }

  public selectLast = () => {
    this.select(this.Tabs - 1);
  }

  public selectByFirstCharacter = (key) => {
    key = key.toLowerCase();
    const arr = this.TabDic[key];
    let index,
      length,
      tabIndex  = this.currentTabValue;
    if (arr !== undefined) {
      length = arr.length;
      index = arr.indexOf(this.currentTabValue);
      if (index !== -1 && length > 1 && index + 1 < length) {
        tabIndex = arr[index + 1];
      } else {
        tabIndex = arr[0];
      }
    }
    if (tabIndex !== this.currentTabValue) {
      this.select(tabIndex);
      return true;
    }
    return false;
  }
}
