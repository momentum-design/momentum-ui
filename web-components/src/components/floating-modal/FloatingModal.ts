import { throttle } from "@/utils/helpers";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, internalProperty, LitElement, property } from "lit-element";
import { styleMap } from "lit-html/directives/style-map";
import "../button/Button";
import "../icon/Icon";
import styles from "./scss/module.scss";

@customElement("md-floating-modal")
export class FloatingModal extends LitElement {
  @property({ type: String }) heading = "";
  @property({ type: Boolean }) fullScreen = false;
  @property({ type: Boolean }) show = false;
  @property({ type: String }) arialabel = "";
  @property({ type: Boolean }) fixfull = false;
  @property({ type: Number }) x = 300;
  @property({ type: Number }) y = 100;
  @property({ type: Number }) width = 600;
  @property({ type: Number }) height = 300;

  @internalProperty() private resizer: any;
  @internalProperty() private px = 0;
  @internalProperty() private py = 0;
  @internalProperty() private minArea = 20000;
  @internalProperty() public draggingCorner = false;
  @internalProperty() public draggingWindow = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mousemove", this.onCornerMove as EventListener);
    this.addEventListener("mouseout", this.onCornerRelease);
    this.requestUpdate("show");
  }

  area() {
    return this.width * this.height;
  }

  onWindowPress(event: MouseEvent) {
    this.draggingWindow = true;
    this.px = event.clientX;
    this.py = event.clientY;
  }

  onWindowDrag(event: MouseEvent) {
    if (!this.draggingWindow) {
      return;
    }
    const offsetX = event.clientX - this.px;
    const offsetY = event.clientY - this.py;

    this.x += offsetX;
    this.y += offsetY;
    this.px = event.clientX;
    this.py = event.clientY;
  }

  onCornerRelease(event: MouseEvent) {
    this.draggingWindow = false;
    this.draggingCorner = false;
    event.preventDefault();
  }

  onResize() {
    this.fullScreen = !this.fullScreen;
  }

  topLeftResize(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.y += offsetY;
    this.width -= offsetX;
    this.height -= offsetY;
  }

  topRightResize(offsetX: number, offsetY: number) {
    this.y += offsetY;
    this.width += offsetX;
    this.height -= offsetY;
  }

  bottomLeftResize(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.width -= offsetX;
    this.height += offsetY;
  }

  bottomRightResize(offsetX: number, offsetY: number) {
    this.width += offsetX;
    this.height += offsetY;
  }

  onCornerClick = throttle((event: MouseEvent, func: Function) => {
    this.draggingCorner = true;
    this.draggingWindow = false;
    this.px = event.clientX;
    this.py = event.clientY;
    this.resizer = func;

    event.preventDefault();
    event.stopPropagation();
  });

  onCornerMove = throttle((event: MouseEvent) => {
    if (!this.draggingCorner) {
      return;
    }
    const offsetX = event.clientX - this.px;
    const offsetY = event.clientY - this.py;

    const lastX = this.x;
    const lastY = this.y;
    const pWidth = this.width;
    const pHeight = this.height;

    this.resizer.call(this, offsetX, offsetY);

    if (this.area() < this.minArea) {
      this.x = lastX;
      this.y = lastY;
      this.width = pWidth;
      this.height = pHeight;
    }

    this.px = event.clientX;
    this.py = event.clientY;

    event.preventDefault();
  });

  close() {
    if (this.show) {
      this.show = false;
      this.requestUpdate("show");
    }
    this.dispatchEvent(
      new CustomEvent("close-floating", {
        composed: true,
        bubbles: true
      })
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousemove", this.onCornerMove as EventListener);
    this.removeEventListener("mouseout", this.onCornerRelease);
  }

  headerTemplate() {
    return html`
      ${this.heading
        ? html`
            ${this.heading}
          `
        : html`
            <slot name="header"></slot>
          `}
    `;
  }

  topCloseBtn() {
    return html`
      <md-button color="color-none" class="md-floating__close" circle @click=${() => this.close()}>
        <md-icon name="cancel_16"></md-icon>
      </md-button>
    `;
  }

  resizeBtn() {
    return html`
      <md-button color="color-none" class="md-floating__resize" circle @click="${() => this.onResize()}">
        <md-icon name=${this.fullScreen ? "minimize_16" : "maximize_16"}></md-icon>
      </md-button>
    `;
  }

  static get styles() {
    return [reset, styles];
  }

  get resizeStyleMap() {
    return {
      width: `${this.fullScreen ? `100%` : `${this.width}px`}`,
      height: `${this.fullScreen ? `100%` : `${this.height}px`}`,
      top: `${this.fullScreen ? `0px` : `${this.y}px`}`,
      left: `${this.fullScreen ? `0px` : `${this.x}px`}`
    };
  }

  render() {
    return html`
      ${this.show
        ? html`
            <div
              class="${`md-floating ` + `${this.fixfull ? "fixed" : ""}`}"
              role="dialog"
              aria-label=${this.arialabel}
              aria-modal="true"
              style=${styleMap(this.resizeStyleMap)}
              @mousedown=${(event: MouseEvent) => this.onWindowPress(event)}
              @mousemove=${(event: MouseEvent) => this.onWindowDrag(event)}
              @mouseup=${(event: MouseEvent) => this.onCornerRelease(event)}
            >
              <div
                class="resizer top-left"
                @mousedown=${(e: MouseEvent) => this.onCornerClick(e, this.topLeftResize)}
                @mouseup=${(e: MouseEvent) => this.onCornerRelease(e)}
              ></div>
              <div
                class="resizer top-right"
                @mousedown=${(e: MouseEvent) => this.onCornerClick(e, this.topRightResize)}
                @mouseup=${(e: MouseEvent) => this.onCornerRelease(e)}
              ></div>
              <div
                class="resizer bottom-left"
                @mousedown=${(e: MouseEvent) => this.onCornerClick(e, this.bottomLeftResize)}
                @mouseup=${(e: MouseEvent) => this.onCornerRelease(e)}
              ></div>
              <div
                class="resizer bottom-right"
                @mousedown=${(e: MouseEvent) => this.onCornerClick(e, this.bottomRightResize)}
                @mouseup=${(e: MouseEvent) => this.onCornerRelease(e)}
              ></div>

              <div class="md-floating__header">
                <div class="md-floating__header-text">${this.headerTemplate()}</div>
                ${this.resizeBtn()} ${this.topCloseBtn()}
              </div>
              <div class="md-floating__body">
                <slot></slot>
              </div>
            </div>
          `
        : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-floating-modal": FloatingModal;
  }
}
