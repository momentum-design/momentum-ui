import { CollabUiDocsAngularPage } from './app.po';

describe('collab-ui-docs-angular App', () => {
  let page: CollabUiDocsAngularPage;

  beforeEach(() => {
    page = new CollabUiDocsAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('cs works!');
  });
});
