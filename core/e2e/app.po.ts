import { browser, by, element } from 'protractor';

export class CollabUiDocsAngularPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.hero__title')).getText();
  }
}
