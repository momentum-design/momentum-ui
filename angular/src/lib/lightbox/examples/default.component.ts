import { Component } from '@angular/core';
import { LightboxComponent, LightboxService } from '@momentum-ui/angular';

@Component({
  selector: 'example-lightbox-default',
  template: `
    <button md-button (click)="onClick()" aria-label="Show Lightbox">
      Default
    </button>
  `,
})
export class ExampleLightboxDefaultComponent {
  lightbox: LightboxComponent;

  constructor(private lightboxService: LightboxService) {}

  onClick() {
    this.lightbox = this.lightboxService.open({
      name: 'Screen Shot 2018-04-11 at 7.32.51 PM.png',
      info: {
        sharedBy: 'Shared by test',
        sharedOn: 'At 4/17/2018, 10:02 AM',
        size: '34.4 KB'
      },
      index: 0,
      height: 250,
      width: 250,
      pages: [{
        decrypting: false,
        image: 'https://momentum.design/momentum.jpg',
        thumb: 'https://momentum.design/momentum.jpg',
      }],
      onDownload: () => {
        this.lightbox.downloading = true;
        setTimeout(() => this.lightbox.downloading = false, 2000);
      },
      onClose: () => {},
    });
  }
}
