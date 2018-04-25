import { Injectable } from '@angular/core';
import { find } from 'lodash';
import * as docs from '../../../../data/docs.json';

@Injectable()
export class DataService {

  getCategory(id) {
    return new Promise((resolve) => {
      resolve(docs[id]);
    });
  }

  getComponent(catId, compId): Promise<any> {
    return new Promise((resolve, reject) => {
      const category = docs[catId];
      const component = find(category.children, ['component', compId]);
      if (!component) {
        reject(`${compId} does not exist`);
      } else {
        resolve(component);
      }
    });
  }
}
