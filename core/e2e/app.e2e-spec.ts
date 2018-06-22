import { CollabUiDocsAngularPage } from './app.po';

describe('collab-ui-docs-angular App', () => {
  let page: CollabUiDocsAngularPage;

  beforeEach(() => {
    page = new CollabUiDocsAngularPage();
  });

  it('should display Hero title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Collab UI');
  });
});
