import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
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
import { styleMap } from "lit-html/directives/style-map";

@customElement("md-floating-modal")
export class FloatingModal extends LitElement {
  @property({ type: String }) heading = "";
  @property({ type: String }) label = "";
  @property({ type: Boolean, reflect: true }) show = false;
  @property({ type: Boolean, reflect: true, attribute: "aspect-ratio" }) aspectRatio = false;
  @property({ type: Boolean, reflect: true, attribute: "fixed-strategy" }) fixed = false;
  @property({ type: Boolean, reflect: true, attribute: "full-screen" }) full = false;

  @query(".md-floating") container?: HTMLDivElement;
  @query(".md-floating__body") body!: HTMLDivElement;
  @query(".md-floating__header") header!: HTMLDivElement;

  private containerRect: DOMRect | null = null;

  get floatingClassMap() {
    return {
      fixed: this.fixed
    };
  }

  get containerStyleMap() {
    const { top, left, bottom, right, width, height } = this.containerRect!;
    return {
      width: `${this.full ? `100%` : `${width}px`}`,
      height: `${this.full ? `100%` : `${height}px`}`,
      top: `${this.full ? `0px` : `${top}px`}`,
      left: `${this.full ? `0px` : `${left}px`}`,
      bottom: `${this.full ? `0px` : `${bottom}px`}`,
      right: `${this.full ? `0px` : `${right}px`}`
    };
  }

  static get styles() {
    return [reset, styles];
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("show")) {
      if (this.container && this.show) {
        this.setInteractInstance();
        this.setContainerRect();
      } else {
        this.destroyInteractInstance();
      }
    }
  }

  private setContainerRect() {
    requestAnimationFrame(async () => {
      await this.updateComplete;
      this.containerRect = this.container!.getBoundingClientRect();
    });
  }

  private setInteractInstance() {
    requestAnimationFrame(() => {
      if (this.container) {
        interact(this.container)
          .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
              move: this.resizeMoveListener
            },
            modifiers: this.aspectRatio
              ? [
                  interact.modifiers.aspectRatio({
                    ratio: "preserve",
                    equalDelta: true
                  })
                ]
              : undefined
          })
          .draggable({
            autoScroll: true,
            allowFrom: this.header,
            ignoreFrom: this.body,
            onmove: this.dragMoveListener
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

  handleToggleExpandCollapse() {
    this.full = !this.full;
  }

  private resizeMoveListener = (event: Interact.ResizeEvent) => {
    const { target } = event;
    let x = parseFloat(target.getAttribute("data-x") as string) || 0;
    let y = parseFloat(target.getAttribute("data-y") as string) || 0;

    target.style.width = `${event.rect.width}px`;
    target.style.height = `${event.rect.height}px`;

    x += event.deltaRect!.left;
    y += event.deltaRect!.top;

    this.setTargetPosition(target, x, y);
  };

  private dragMoveListener = (event: Interact.InteractEvent) => {
    const { target, dx, dy } = event;
    const x = (parseFloat(target.getAttribute("data-x") as string) || 0) + dx;
    const y = (parseFloat(target.getAttribute("data-y") as string) || 0) + dy;

    this.setTargetPosition(target, x, y);
  };

  private setTargetPosition(target: Interact.Element, x: number, y: number) {
    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute("data-x", `${x}`);
    target.setAttribute("data-y", `${y}`);
  }

  private destroyInteractInstance() {
    if (this.container && interact.isSet(this.container)) {
      interact(this.container).unset();
      this.containerRect = null;
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
              class="md-floating ${classMap(this.floatingClassMap)}"
              part="floating"
              role="dialog"
              aria-label=${ifDefined(this.label || undefined)}
              aria-modal="true"
              style=${ifDefined(this.containerRect ? styleMap(this.containerStyleMap) : undefined)}
            >
              <div class="md-floating__header">
                <div class="md-floating__header-text">
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
                  class="md-floating__resize"
                  circle
                  @click=${this.handleToggleExpandCollapse}
                >
                  <md-icon name=${this.full ? "minimize_16" : "maximize_16"}></md-icon>
                </md-button>
                <md-button color="color-none" class="md-floating__close" circle @click=${this.handleClose}>
                  <md-icon name="cancel_16"></md-icon>
                </md-button>
              </div>
              <div class="md-floating__body">
                <slot></slot>
              </div>
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-floating-modal": FloatingModal;
  }
}
