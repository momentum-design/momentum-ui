import "@/components/button/Button";
import "@/components/icon/Icon";
import { Key } from "@/constants";
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { debounce } from "@/utils/helpers";
import reset from "@/wc_scss/reset.scss";
import "@interactjs/actions/drag";
import "@interactjs/actions/resize";
import "@interactjs/auto-start";
import interact from "@interactjs/interact/index";
import "@interactjs/modifiers";
import * as Interact from "@interactjs/types";
import { html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";

export namespace FloatingMinimizedModal {
  @customElementWithCheck("md-floating-modal-minimized")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: String }) heading = "";
    @property({ type: String }) label = "";
    @property({ type: Boolean, reflect: true }) show = false;
    @property({ type: String, attribute: "close-aria-label" }) closeAriaLabel = "Close Modal";
    @property({ type: Boolean, reflect: true }) minimize = false;
    @property({ type: String, attribute: "maximize-icon-aria-label" }) maximizeIconAriaLabel = "Maximize Modal";

    @property({ type: Object }) minPosition:
      | {
          x: number;
          y: number;
        }
      | undefined;

    @query(".md-floating") container?: HTMLDivElement;
    @query(".md-floating__header") header!: HTMLDivElement;

    // To distinguish between click and drag
    @internalProperty() private dragOccured: boolean | false = false;
    @internalProperty() private containerTransform = "";

    private applyInitialPosition = true;

    static get styles() {
      return [reset, styles];
    }

    connectedCallback() {
      super.connectedCallback();
      window.addEventListener(
        "resize",
        debounce(() => this.setInteractInstance(), 250)
      );
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("show")) {
        if (this.container && this.show) {
          this.applyInitialPosition = true;
          this.setContainerRect();
          this.setInteractInstance();
          this.setFocusOnContainer();
        } else {
          this.cleanContainerStyles();
          this.destroyInteractInstance();
        }
      }
      if (this.container && changedProperties.has("minPosition") && !changedProperties.has("show")) {
        this.setInitialTargetPosition();
      }
      if (changedProperties.has("minimize") && changedProperties.get("minimize") !== undefined) {
        this.setFocusOnContainer();
      }
    }

    private getInitialPosition = () => {
      if (this.applyInitialPosition && this.minPosition) {
        return { initialX: Number(this.minPosition?.x), initialY: Number(this.minPosition?.y) };
      }
      return { initialX: 0, initialY: 0 };
    };

    private isNewPositionNotSame() {
      if (this.container) {
        return (
          Number(this.container?.getAttribute("data-x")) !== this.minPosition?.x ||
          Number(this.container?.getAttribute("data-y")) !== this.minPosition?.y
        );
      }
    }

    private setInitialTargetPosition() {
      if (this.container && this.isNewPositionNotSame()) {
        this.setTargetPosition(this.container, Number(this.minPosition?.x), Number(this.minPosition?.y));
      }
    }

    private setFocusOnContainer() {
      if (this.container) {
        this.container.setAttribute("tabindex", "0");
        this.container.focus();
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
          new CustomEvent("floating-modal-minimize-location", {
            composed: true,
            bubbles: true,
            detail: {
              transform: { x: dataX, y: dataY }
            }
          })
        );
        return `translate(${dataX}px, ${dataY}px)`;
      }
      return this.container!.style.transform;
    }

    private setContainerRect() {
      requestAnimationFrame(async () => {
        await this.updateComplete;
        this.containerTransform = this.getContainerTransform();
      });
    }

    private setInteractInstance() {
      requestAnimationFrame(() => {
        if (this.container) {
          interact(this.container).draggable({
            autoScroll: true,
            allowFrom: this.header,
            listeners: {
              move: this.dragMoveListener,
              end: this.dragEndListener
            },
            modifiers: [
              interact.modifiers.restrictRect({
                restriction: document.body.getBoundingClientRect(),
                endOnly: true
              })
            ]
          });
        }
      });
    }

    handleKeyDown(event: KeyboardEvent) {
      if (event.code === Key.Enter || event.code === Key.Space) {
        this.handleMinimize(event);
      }
    }

    handleClose(event: MouseEvent) {
      this.show = false;

      this.dispatchEvent(
        new CustomEvent("floating-modal-close", {
          composed: true,
          bubbles: true,
          detail: {
            srcEvent: event
          }
        })
      );
      event.stopPropagation();
    }

    handleMinimize(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      if (!this.dragOccured) {
        this.dispatchEvent(
          new CustomEvent("floating-min-modal-minimize", {
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

    private getTransformValues(event: Interact.InteractEvent) {
      const { target, dx, dy } = event;
      const { initialX, initialY } = this.getInitialPosition();
      const x = (parseFloat(target.getAttribute("data-x") as string) || 0) + dx + initialX;
      const y = (parseFloat(target.getAttribute("data-y") as string) || 0) + dy + initialY;
      return { x, y };
    }

    private dragMoveListener = (event: Interact.InteractEvent) => {
      const { target } = event;
      const { x, y } = this.getTransformValues(event);
      this.setTargetPosition(target, x, y);
      this.applyInitialPosition = false;
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
      window.removeEventListener(
        "resize",
        debounce(() => this.setInteractInstance(), 250)
      );
    }

    render() {
      return html`
        ${this.show
          ? html`
              <div
                class="md-floating ${!this.minimize ? "hide" : ""} md-floating-minimize"
                @click=${this.handleMinimize}
                @keydown="${this.handleKeyDown}"
                role="dialog"
                tabindex="-1"
                part="floating-minimized"
                aria-label=${ifDefined(this.label || undefined)}
                aria-modal="true"
                style=${ifDefined(
                  this.minPosition
                    ? `transform: ${`translate(${this.minPosition.x}px, ${this.minPosition.y}px)`} !important`
                    : `transform: ${this.containerTransform} !important`
                )}
              >
                <div tabindex="-1" class="md-floating__header ${this.minimize ? "md-floating__header-minimize" : ""}">
                  <div class="md-floating__header-text">
                    ${this.heading ? html` ${this.heading} ` : html` <slot></slot> `}
                  </div>
                  <md-button
                    color="color-none"
                    class="md-floating__resize"
                    ariaLabel="${this.maximizeIconAriaLabel}"
                    circle
                    @click=${this.handleMinimize}
                  >
                    <md-icon name="maximize-bold" size="16" iconSet="momentumDesign"></md-icon>
                  </md-button>

                  <md-button
                    color="color-none"
                    class="md-floating__close"
                    aria-label="${this.closeAriaLabel}"
                    circle
                    @click=${this.handleClose}
                  >
                    <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
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
