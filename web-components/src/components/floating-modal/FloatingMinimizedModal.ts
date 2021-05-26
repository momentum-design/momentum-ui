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

export namespace FloatingMinimizedModal {
  @customElementWithCheck("md-floating-modal-minimized")
  export class ELEMENT extends LitElement {
    @property({ type: String }) heading = "";
    @property({ type: String }) label = "";
    @property({ type: Boolean, reflect: true }) show = false;
    @property({ type: Boolean, reflect: true, attribute: "aspect-ratio" }) aspectRatio = false;
    @property({ type: Boolean, reflect: true, attribute: "fixed-strategy" }) fixed = false;
    @property({ type: Boolean, reflect: true, attribute: "full-screen" }) full = false;
    @property({ type: String, attribute: "close-aria-label" }) closeAriaLabel = "Close Modal";
    @property({ type: String, attribute: "resize-aria-label" }) resizeAriaLabel = "Resize Modal";
    @property({ type: Boolean, reflect: true }) minimize = false;
    @property({ type: String, attribute: "container-transform" }) containerTransform = "";

    @query(".md-floating-min") container?: HTMLDivElement;
    @query(".md-floating__body") body!: HTMLDivElement;
    @query(".md-floating__header") header!: HTMLDivElement;

    @internalProperty() private containerRect: DOMRect | null = null;
    @internalProperty() private dragOccured: Boolean | false = false;

    private minimizeTransform: string= "";

    get floatingClassMap() {
      return {
        fixed: this.fixed
      };
    }

    static get styles() {
      return [reset, styles];
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("show")) {
        if (this.container && this.show) {
          this.setContainerRect();
          this.setInteractInstance();
        } else {
          this.cleanContainerStyles();
          this.destroyInteractInstance();
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
        return `translate(${dataX}px, ${dataY}px)`;
      }
      return this.container!.style.transform;
    }

    private setContainerRect() {
      requestAnimationFrame(async () => {
        await this.updateComplete;
      
        this.containerRect = this.container!.getBoundingClientRect();
       
        this.containerTransform = this.getContainerTransform();
        this.dispatchEvent(
            new CustomEvent("floating-modal-minimize-position", {
              composed: true,
              bubbles: true,
              detail: {
                srcEvent: this.containerTransform
              }
            })
          );
      });
    }

    private setInteractInstance() {
      requestAnimationFrame(() => { 
        if (this.container) {
          interact(this.container)
            .draggable({
              autoScroll: true,
              allowFrom: this.header,
              ignoreFrom: this.body,
              listeners: {
                move: this.dragMoveListener,
                end: this.dragEndListener
              },
              modifiers: [
                interact.modifiers.restrictRect({
                  restriction:  document.body.getBoundingClientRect(),
                  endOnly: true
                })]
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
      if(!this.dragOccured) {
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
      this.dragOccured = false;
    }


    handleToggleExpandCollapse() {
      this.full = !this.full;
    }

    private dragMoveListener = (event: Interact.InteractEvent) => {
      const { target, dx, dy } = event;
      const x = (parseFloat(target.getAttribute("data-x") as string) || 0) + dx;
      const y = (parseFloat(target.getAttribute("data-y") as string) || 0) + dy;

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
                class="md-floating-min ${!this.minimize ? 'hide' : ''} md-floating-minimize"   
                role="dialog"
                part="floating-minimized"
                aria-label=${ifDefined(this.label || undefined)}
                aria-modal="true"
                style=${ifDefined(
                  this.containerTransform
                    ? `
                  ${this.containerTransform !== '' ? `transform: ${this.containerTransform} !important` : ""};`
                    : undefined
                )}
              >
                <div class="md-floating__header ${this.minimize ? 'md-floating__header-minimize' : ""}">
                  <div class="md-floating__header-text" @click=${this.handleMinimize}>
                    ${this.heading
                      ? html`
                          ${this.heading}
                        `
                      : html`
                          <slot name="header"></slot>
                        `}
                  </div>
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
              </div>
            `
          : nothing}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-floating-modal-minimized": FloatingMinimizedModal.ELEMENT;
  }
}
