import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import "@/components/button/Button";
import "@/components/icon/Icon";
import styles from "./scss/module.scss";
import { ifDefined } from "lit-html/directives/if-defined";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import "@interactjs/auto-start";
import "@interactjs/actions/drag";
import "@interactjs/modifiers";
import "@interactjs/actions/resize";
import * as Interact from "@interactjs/types";
import interact from "@interactjs/interact/index";
import './FloatingMinimizedModal';
import { number } from "@storybook/addon-knobs";
import { transcode } from "buffer";
import { SlottedMixin } from "@/mixins";

export namespace FloatingModal {
  @customElementWithCheck("md-floating-modal")
  export class ELEMENT extends SlottedMixin(LitElement) {
    @property({ type: String }) heading = "";
    @property({ type: String }) label = "";
    @property({ type: Boolean, reflect: true }) show = false;
    @property({ type: Boolean, reflect: true, attribute: "aspect-ratio" }) aspectRatio = false;
    @property({ type: Boolean, reflect: true, attribute: "fixed-strategy" }) fixed = false;
    @property({ type: Boolean, reflect: true, attribute: "full-screen" }) full = false;
    @property({ type: String, attribute: "close-aria-label" }) closeAriaLabel = "Close Modal";
    @property({ type: String, attribute: "resize-aria-label" }) resizeAriaLabel = "Resize Modal";
    @property({ type: String, attribute: "minimize-aria-label" }) minimizeAriaLabel = "Minimize Modal";
    @property({type: Object}) location: {
      x: number;
      y: number;
    } | undefined;
    @property({type: Object}) minlocation: {
      x: number;
      y: number;
    } | undefined;
    @property({ type: Boolean, reflect: true }) minimizable = false;
    


    @query(".md-floating") container?: HTMLDivElement;
    @query(".md-floating__body") body!: HTMLDivElement;
    @query(".md-floating__header") header!: HTMLDivElement;

    @query(".md-floating-min-parent") minimizedHeader! : HTMLDivElement;

    @internalProperty() private containerRect: DOMRect | null = null;
    @internalProperty() private minimize: boolean | false = false;
    @internalProperty() private dragOccured: boolean | false = false;
    @internalProperty() private minimizeLocation: String = '';

    @query('slot[name="header"]') headerSlot!: HTMLSlotElement;

    private containerTransform = this.location ? `translate(${this.location.x}px, ${this.location.y}px)`: '';

    private applyInitialPosition = true;

    static get styles() {
      return [reset, styles];
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("show")) {
        if (this.container && this.show) {
          this.applyInitialPosition = true;
          this.setContainerRect();
          this.setInteractInstance();
        } else {
          this.cleanContainerStyles();
          this.destroyInteractInstance();
        }
      }
      if (this.container &&changedProperties.has("location") && !changedProperties.has("show")) {
        if(Number(this.container?.getAttribute("data-x")) !== this.location?.x  || Number(this.container?.getAttribute("data-y")) !==this.location?.y) {
         this.setTargetPosition(this.container,  Number(this.location?.x), Number(this.location?.y));
        }
      } 
     
    }

    private cleanContainerStyles() {
      this.containerTransform = "";
    }

    private getContainerTransform() {
      const dataX = this.container!.getAttribute("data-x");
      const dataY = this.container!.getAttribute("data-y");
      if (dataX && dataY) {
        this.dispatchEvent(
          new CustomEvent("floating-modal-location", {
              composed: true,
              bubbles: true,
              detail: {
              transform: {x: dataX, y: dataY}
              }
          })
        );
        return `translate(${dataX}px, ${dataY}px)`;;
      }
      return this.container!.style.transform;
    }

    private setContainerRect() {
      requestAnimationFrame(async () => {
        await this.updateComplete;
      
        this.containerRect = this.container!.getBoundingClientRect();
       
        this.containerTransform = this.getContainerTransform();
      });
    }

    private setInteractInstance() {
      requestAnimationFrame(() => {
        if (this.container) {
          interact(this.container)
            .resizable({
              edges: { left: true, right: true, bottom: true, top: true },
              listeners: {
                end: this.resizeEndListener,
                move: this.resizeMoveListener
              },
              modifiers: this.aspectRatio
                ? [
                    interact.modifiers.aspectRatio({
                      ratio: "preserve",
                      equalDelta: true,
                      modifiers: [interact.modifiers.restrictSize({ max: "parent" })]
                    })
                  ]
                : undefined
            }).draggable({
              autoScroll: true,
              allowFrom: this.header,
              ignoreFrom: this.body,
              listeners: {
                move: this.dragMoveListener,
                end: this.dragEndListener
              }
            });
        }
      });
    }

    handleClose(event: MouseEvent) {
      this.show = false;
      this.full = false;

      this.dispatchEvent(
        new CustomEvent("floating-modal-close", {
          composed: true,
          bubbles: true,
          detail: {
            srcEvent: event
          }
        })
      );
    }

    handleMinimize(event: MouseEvent) {
      if(this.minimizable) {
        if(!this.dragOccured) {
          this.minimize = !this.minimize;
          this.dispatchEvent(
              new CustomEvent("floating-modal-minimize", {
                  composed: true,
                  bubbles: true,
                  detail: {
                  srcEvent: event
                  }
              })
            );
            }
            this.dragOccured =false;
      }
    }

    handleToggleExpandCollapse() {
      this.full = !this.full;
    }


    private resizeMoveListener = (event: Interact.ResizeEvent) => {
      const { target } = event;
      let x = parseFloat(target.getAttribute("data-x") as string) || 0;
      let y = parseFloat(target.getAttribute("data-y") as string) || 0;

      target.style.setProperty("width", `${event.rect.width}px`, "important");
      target.style.setProperty("height", `${event.rect.height}px`, "important");

      x += event.deltaRect!.left;
      y += event.deltaRect!.top;

      this.setTargetPosition(target, x, y);
    };

    private resizeEndListener = () => {
      this.setContainerRect();
    };

    private dragMoveListener = (event: Interact.InteractEvent) => {
      const { target, dx, dy } = event;
      const x = (parseFloat(target.getAttribute("data-x") as string) || 0) + dx + (this.applyInitialPosition && this.location ? Number(this.location?.x) : 0);
      const y = (parseFloat(target.getAttribute("data-y") as string) || 0) + dy + (this.applyInitialPosition  && this.location ? Number(this.location?.y) : 0);
      this.applyInitialPosition = false;

      this.setTargetPosition(target, x, y);
    };

    private dragEndListener = () => {
      this.dragOccured = true;
      this.setContainerRect();
    };

    private setTargetPosition(target: Interact.Element, x: number, y: number) {
      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute("data-x", `${x}`);
      target.setAttribute("data-y", `${y}`);
    }

    private destroyInteractInstance() {
      if (this.container && interact.isSet(this.container)) {
        interact(this.container).unset();
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.destroyInteractInstance();
    }


    render() {
      
      return html`
        ${this.show
          ? html`
              <div
                class="md-floating ${this.fixed ? "fixed" : ''} ${this.minimize ? "hide" : ''}"
                part="floating"
                role="dialog"
                aria-label=${ifDefined(this.label || undefined)}
                aria-modal="true"
                style=${ifDefined(
                  this.containerRect
                    ? `width: ${this.full ? "100% !important" : `${this.containerRect.width}px !important`};
                  height: ${this.full ? "100% !important" : `${this.containerRect.height}px !important`};
                  top: ${this.full ? "0 !important" : ""};
                  left: ${this.full ? "0 !important" : ""};
                  bottom: ${this.full ? "0 !important" : ""};
                  right: ${this.full ? "0 !important" : ""};
                  ${this.full ? "transform: none !important" : ""};
                  ${!this.full? `transform: ${this.location? `translate(${this.location.x}px, ${this.location.y}px)` : this.containerTransform} !important` : ""};`
                    : undefined
                )}
              >
                <div class="md-floating__header">
                  <div class="md-floating__header-text" @click=${this.handleMinimize}>
                    ${this.heading
                      ? html`
                          ${this.heading}
                        `
                      : html` 
                          ${!this.minimize && this.headerSlot}
                          <slot name="header"></slot>
                        `}
                  </div>
                  ${this.minimizable ? html `
                    <md-button
                      color="color-none"
                      class="md-floating__minimize"
                      aria-label="${this.minimizeAriaLabel}"
                      circle
                      @click=${this.handleMinimize}
                    >
                    <md-icon name="minus_16"></md-icon>
                  </md-button>` : nothing}

                  ${!this.minimize ? html` <md-button
                    color="color-none"
                    class="md-floating__resize"
                    aria-label="${this.resizeAriaLabel}"
                    circle
                    @click=${this.handleToggleExpandCollapse}
                  >
                    <md-icon name=${this.full ? "minimize_16" : "maximize_16"}></md-icon>
                  </md-button>` : ''}

                 
                  <md-button
                    color="color-none"
                    class="md-floating__close"
                    aria-label="${this.closeAriaLabel}"
                    circle
                    @click=${this.handleClose}
                  >
                    <md-icon name="cancel_16"></md-icon>
                  </md-button>
                </div>
                <div class="md-floating__body">
                  <slot></slot>
                </div>
              </div>
              ${this.minimizable ? html`
                <div class="md-floating-min-parent" part="minimize-floating">
                  <md-floating-modal-minimized
                      class="float-modal-min"
                      part="floating-minimized"
                      heading=${this.heading}
                      .minimize=${this.minimize}
                      .location=${this.minlocation}
                      @floating-modal-minimize=${(event: MouseEvent) => this.handleMinimize(event)}
                      @floating-modal-close=${this.handleClose}
                      ?show=${this.show}
                      >
                      ${this.minimize && this.headerSlot}
                  </md-floating-modal-minimized>
              </div>` : nothing}
             
            `
          : nothing}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-floating-modal": FloatingModal.ELEMENT;
  }
}
