export interface LightboxInfo {
  sharedBy: string;
  sharedOn: string;
  size: string;
}

export interface LightboxPage {
  decrypting: boolean;
  image: string;
  thumb: string;
  content?: any;
}

export class LightboxTooltips {
  download: string = 'Download';
  downloading: string = 'Downloading...';
  exit: string = 'Exit';
  previous: string = 'Previous';
  next: string = 'Next';
  zoomIn: string = 'Zoom in';
  zoomOut: string = 'Zoom out';
}

/**
 * Configuration used when opening a lightbox.
 */
export class LightboxConfig {
  /** Determines if info is decrypting | false */
  decrypting?: boolean = false;
  /** Optional downloading css styling | false */
  downloading?: boolean = false;
  /** Set Height value of Lightbox */
  height: number;
  /** Initial index of start page | 0 */
  index: number = 0;
  /** Lightbox information Object | {} */
  info: LightboxInfo;
  /** Required name prop for Lightbox */
  name: string = '';
  /** Callback function invoked by user when interact with Lightbox | null */
  onChange?: Function;
  /** Callback function invoked by user closing the Lightbox | null */
  onClose?: Function;
  /** Callback function invoked by the download action of Lightbox | null */
  onDownload?: Function;
  /** Array of Lightbox pages */
  pages: Array<LightboxPage>;
  /** Collection of predefined tootips for various Lightbox actions | { download: 'Download', etc } */
  tooltips?: LightboxTooltips = new LightboxTooltips();
  /** Set Width value for Lightbox */
  width: number;
}
