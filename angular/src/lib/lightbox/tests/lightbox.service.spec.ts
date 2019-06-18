import {
  async,
  inject,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { Component, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LightboxComponent, LightboxModule, LightboxService } from '../index';

const lightboxConfigOnePage = {
  name: 'test',
  info: {
    sharedBy: 'Shared by test',
    sharedOn: 'At 6/6/2019, 09:17 AM',
    size: '34.4 KB'
  },
  index: 0,
  height: 250,
  width: 250,
  pages: [{
    decrypting: false,
    image: 'testImage',
    thumb: 'testImage'
  }],
  onDownload: () => {},
  onClose: () => {},
};

const lightboxConfigMultiple = {
  name: 'test',
  info: {
    sharedBy: 'Shared by test',
    sharedOn: 'At 6/6/2019, 09:17 AM',
    size: '34.4 KB'
  },
  index: 0,
  height: 250,
  width: 250,
  pages: [{
    decrypting: false,
    image: 'testImage',
    thumb: 'testImage'
  },
  {
    decrypting: false,
    image: 'testImage',
    thumb: 'testImage'
  }],
};

describe('LightboxService', () => {
  let lightboxService: LightboxService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let viewContainerFixture: ComponentFixture<ContainerComponent>;

  @Component({
    selector: 'view-container',
    template: ``,
  })
  class ContainerComponent {
    constructor() {}
  }

  @NgModule({
    imports: [CommonModule, LightboxModule],
    exports: [ContainerComponent],
    providers: [LightboxService],
    declarations: [ContainerComponent],
    entryComponents: [ContainerComponent],
  })
  class LightboxTestModule {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LightboxModule, LightboxTestModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(inject(
    [LightboxService, OverlayContainer],
    (service: LightboxService, container: OverlayContainer) => {
      lightboxService = service;
      overlayContainer = container;
      overlayContainerElement = container.getContainerElement();
    }
  ));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ContainerComponent);
    viewContainerFixture.detectChanges();
  });

  it('should match snapshot', () => {
    expect(overlayContainerElement).toMatchSnapshot();
  });

  it('when downloading is true the download button should turn to spinner', () => {
    const lightbox: LightboxComponent = lightboxService.open(lightboxConfigOnePage);
    lightbox.downloading = true;
    viewContainerFixture.detectChanges();

    const downloadButton = overlayContainerElement.querySelector('.md-lightbox__download-button');
    expect(downloadButton).toBeNull();
    const spinner = overlayContainerElement.querySelector('md-spinner');
    expect(spinner).not.toBeNull();
  });

  it('when downloading is false the download button should be visible', () => {
    lightboxService.open(lightboxConfigOnePage);
    viewContainerFixture.detectChanges();

    const downloadButton = overlayContainerElement.querySelector('.md-lightbox__control-download');
    expect(downloadButton).not.toBeNull();
    const spinner = overlayContainerElement.querySelector('md-spinner');
    expect(spinner).toBeNull();
  });

  it('should display file meta data and name', () => {
    lightboxService.open(lightboxConfigOnePage);
    viewContainerFixture.detectChanges();

    const sharedBy = overlayContainerElement.querySelector('.md-lightbox__header-sharer');
    const timestamp = overlayContainerElement.querySelector('.md-lightbox__header-timestamp');
    const name = overlayContainerElement.querySelector('.md-lightbox__header-name');
    expect(name.textContent).toEqual('test');
    expect(timestamp.textContent).toEqual('At 6/6/2019, 09:17 AM');
    expect(sharedBy.textContent).toEqual('Shared by test');
  });

  it('should change pages on click of next and previous', () => {
    const lightbox: LightboxComponent = lightboxService.open(lightboxConfigMultiple);
    viewContainerFixture.detectChanges();

    const rightControl = overlayContainerElement.querySelector('.md-lightbox__page-controls--right');
    const leftControl = overlayContainerElement.querySelector('.md-lightbox__page-controls--left');
    (rightControl as HTMLButtonElement).click();
    viewContainerFixture.detectChanges();
    expect(lightbox.index).toEqual(1);

    (leftControl as HTMLButtonElement).click();
    viewContainerFixture.detectChanges();
    expect(lightbox.index).toEqual(0);
  });

  it('should close the lightbox', () => {
    const lightbox: LightboxComponent = lightboxService.open(lightboxConfigOnePage);
    viewContainerFixture.detectChanges();

    spyOn(lightbox, 'destroy');
    const element = overlayContainerElement.querySelector('.md-lightbox__header-item--right');
    const closeIcon = element.querySelector('.md-lightbox__control');
    (closeIcon as HTMLButtonElement).click();
    viewContainerFixture.detectChanges();
    expect(lightbox.destroy).toHaveBeenCalled();
  });

  it('should zoom-in and zoom-out', () => {
    lightboxService.open(lightboxConfigOnePage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('.md-lightbox__viewer-controls .md-lightbox__control');
    const zoomIn = element[1];
    const zoomOut = element[0];
    let zoomValue = overlayContainerElement.querySelector('.md-lightbox__viewer-controls .md-lightbox__control-value');
    expect(zoomValue.textContent).toEqual('100%');
    (zoomIn as HTMLButtonElement).click();
    viewContainerFixture.detectChanges();
    zoomValue = overlayContainerElement.querySelector('.md-lightbox__controls .md-lightbox__control-value');
    expect(zoomValue.textContent).toEqual('125%');
    (zoomOut as HTMLButtonElement).click();
    viewContainerFixture.detectChanges();
    zoomValue = overlayContainerElement.querySelector('.md-lightbox__controls .md-lightbox__control-value');
    expect(zoomValue.textContent).toEqual('100%');
  });

  it('when content has only one page it should not display the content-list', () => {
    lightboxService.open(lightboxConfigOnePage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.md-lightbox__list');
    expect(element).toBeNull();
  });

  it('onDownload should be called when downloading the file', () => {
    let cnt = 0;
    const lightbox: LightboxComponent = lightboxService.open(lightboxConfigOnePage);
    viewContainerFixture.detectChanges();
    lightbox.config.onDownload = () => { cnt++; };
    viewContainerFixture.detectChanges();

    const downloadIcon = overlayContainerElement.querySelector('.md-lightbox__control-download');
    (downloadIcon as HTMLButtonElement).click();
    expect(cnt).toEqual(1);
  });

});
