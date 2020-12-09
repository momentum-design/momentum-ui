import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import styles from "./scss/module.scss";
import "@/components/icon/Icon";
import "@/components/button/Button";
import * as Interact from "@interactjs/types";
import { nothing } from "lit-html";

@customElement("md-card")
export class Card extends LitElement {
  @property({ type: Boolean }) draggable = false;

  @query(".md-card-container") container!: HTMLDivElement;

  private interact: Interact.InteractStatic | null = null;

  static get styles() {
    return [reset, styles];
  }

  private async dynamicImportInteract() {
    if (this.draggable) {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        await import("@interactjs/auto-start");
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        await import("@interactjs/actions/drag");
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        await import("@interactjs/modifiers");
        const { default: interactInstance } = await import("@interactjs/interact/index");

        if (interactInstance) {
          this.interact = interactInstance;
          this.setInteractInstance();
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

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

  private setInteractInstance() {
    requestAnimationFrame(() => {
      if (this.interact && this.container) {
        this.interact(this.container).draggable({
          autoScroll: true,
          onmove: this.dragMoveListener
        });
      }
    });
  }

  private destroyInteractInstance() {
    if (this.container && this.interact!.isSet(this.container)) {
      this.interact!(this.container).unset();
    }
  }

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    if (changedProperties.has("draggable")) {
      this.dynamicImportInteract();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.draggable && this.interact) {
      this.destroyInteractInstance();
    }
  }

  render() {
    return html`
      <div class="md-card-container">
        <div class="md-card-header">
          <slot name="header">
            <md-avatar alt="avatar" label="avatar" title="Max"></md-avatar>
            <div class="md-card-header-container">
              <div class="md-card-header-title"></div>
              <div class="md-card-header-subtitle"></div>
            </div>
            <div class="md-card-header-menu">
              <md-icon name="icon-more-adr_16"></md-icon>
              ${this.draggable
                ? html`
                    <md-icon name="icon-drag_16"></md-icon>
                  `
                : nothing}
            </div>
          </slot>
        </div>
        <div class="md-card-image"></div>
        <div class="md-card-description">
          <slot name="description"></slot>
        </div>
        <div class="md-card-footer">
          <slot name="footer">
            <div class="md-card-footer-container">
              <md-link color="blue">Link Text</md-link>
              <md-button variant="primary">Button</md-button>
            </div>
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-card": Card;
  }
}
