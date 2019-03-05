import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {

  private isModalOpened = new Subject<boolean>();

  isModalOpened$ = this.isModalOpened.asObservable();

  constructor() { }

  setModalStatus(isOpen: boolean) {
    this.isModalOpened.next(isOpen);
  }

}
