import "../button/Button";
import "../icon/Icon";
import "../tooltip/Tooltip";
import { Key } from "@/constants";
import { FocusMixin, SlottedMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import "@interactjs/actions/drag";
import "@interactjs/actions/resize";
import "@interactjs/auto-start";
import interact from "@interactjs/interact/index";
import "@interactjs/modifiers";
import * as Interact from "@interactjs/types";
import { html, LitElement, nothing, PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "./FloatingMinimizedModal";
import styles from "./scss/module.scss";

export namespace FloatingModal {
  @customElementWithCheck("md-floating-modal")
  export class ELEMENT extends FocusMixin(SlottedMixin(LitElement)) {
    @property({ type: String }) heading = "";
    @property({ type: String }) label = "";
    @property({ type: Boolean, reflect: true }) show = false;
    @property({ type: Boolean, reflect: true, attribute: "aspect-ratio" }) aspectRatio = false;
    @property({ type: Boolean, reflect: true, attribute: "centered" }) centered = false;
    @property({ type: Boolean, reflect: true, attribute: "fixed-strategy" }) fixed = false;
    @property({ type: Boolean, reflect: true, attribute: "full-screen" }) full = false;
    @property({ type: String, attribute: "close-aria-label" }) closeAriaLabel = "Close Modal";
    @property({ type: String, attribute: "resize-aria-label" }) resizeAriaLabel = "Resize Modal";
    @property({ type: String, attribute: "maximize-aria-label" }) maximizeScreenLabel = "Maximize Modal";
    @property({ type: String, attribute: "minimize-aria-label" }) minimizeAriaLabel = "Minimize Modal";
    @property({ type: String, attribute: "move-aria-label" }) moveAriaLabel = "Move Modal";
    @property({ type: Boolean, attribute: "hide-move-button" }) hideMoveButton = false;
    @property({ type: Boolean, reflect: true }) maximizable = true;
    @property({ type: Boolean, reflect: true }) resizable = true;
    @property({ type: Boolean, reflect: true }) private minimize = false;
    @property({ type: Object }) position:
      | {
          x: number;
          y: number;
        }
      | undefined;
    @property({ type: Object }) minPosition:
      | {
          x: number;
          y: number;
        }
      | undefined;
    @property({ type: Boolean, reflect: true }) minimizable = false;
    @property({ type: Object }) containerRect: DOMRect | null = null;

    @state() private dragOccured: boolean | false = false;

    @query(".md-floating") container?: HTMLDivElement;
    @query(".md-floating__body") body!: HTMLDivElement;
    @query(".md-floating__header") header!: HTMLDivElement;
    @query(".md-floating-min-parent") minimizedHeader!: HTMLDivElement;
    @query('slot[name="header"]') headerSlot!: HTMLSlotElement;

    private containerTransform = "";
    private previouslyFocusedElement: HTMLElement | null = null;

    private applyInitialPosition = true;
    private readonly DRAG_HANDLE_SELECTOR =
      ".md-floating__header, .md-floating__header *, [slot='header'], [slot='header'] *";
    private readonly DRAG_IGNORE_SELECTOR = [
      "md-button:not(.md-floating__move)",
      "md-tooltip:not(.md-floating__move-tooltip)",
      "button",
      "a[href]",
      "input",
      "select",
      "textarea",
      "[contenteditable='true']",
      "[role='button']",
      "[data-floating-modal-ignore-drag]",
      "[data-floating-modal-ignore-drag] *"
    ].join(", ");
    private readonly RESIZE_IGNORE_SELECTOR = [
      "md-button",
      "md-tooltip",
      "button",
      "a[href]",
      "input",
      "select",
      "textarea",
      "[contenteditable='true']",
      "[role='button']",
      "[data-floating-modal-ignore-resize]",
      "[data-floating-modal-ignore-resize] *"
    ].join(", ");

    static get styles() {
      return [reset, styles];
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("show")) {
        if (this.container && this.show) {
          this.capturePreviouslyFocusedElement();
          this.applyInitialPosition = true;
          this.setContainerRect();
          this.setInteractInstance();
          this.focusModalOnOpen();
        } else {
          this.cleanContainerStyles();
          this.destroyInteractInstance();
          this.restoreFocusAfterClose();
        }
      }
      if (this.container && changedProperties.has("position") && !changedProperties.has("show")) {
        this.setInitialTargetPosition();
      }

      if (
        changedProperties.has("minimize") &&
        changedProperties.get("minimize") === true &&
        this.minimize === false &&
        this.show
      ) {
        this.focusModalOnOpen();
      }
    }

    private getDeepActiveElementFromDocument(): HTMLElement | null {
      let activeElement = document.activeElement as HTMLElement | null;
      while (activeElement?.shadowRoot?.activeElement) {
        activeElement = activeElement.shadowRoot.activeElement as HTMLElement | null;
      }
      return activeElement;
    }

    private capturePreviouslyFocusedElement() {
      const activeElement = this.getDeepActiveElementFromDocument();
      if (!activeElement || activeElement === document.body) {
        this.previouslyFocusedElement = null;
        return;
      }

      if (this.shadowRoot?.contains(activeElement) || this.contains(activeElement)) {
        return;
      }

      this.previouslyFocusedElement = activeElement;
    }

    private focusModalOnOpen() {
      requestAnimationFrame(() => {
        if (!this.show || !this.container) return;

        const firstHeaderButton = this.shadowRoot?.querySelector(
          ".md-floating__header md-button.md-floating__header-button"
        ) as HTMLElement | null;

        if (firstHeaderButton) {
          firstHeaderButton.focus();
          return;
        }

        this.container.setAttribute("tabindex", "-1");
        this.container.focus();
      });
    }

    private restoreFocusAfterClose() {
      const elementToFocus = this.previouslyFocusedElement;
      this.previouslyFocusedElement = null;
      if (!elementToFocus || !elementToFocus.isConnected) return;

      requestAnimationFrame(() => {
        if (elementToFocus.isConnected) {
          elementToFocus.focus();
        }
      });
    }

    private isNewPositionNotSame() {
      if (this.container) {
        return (
          Number(this.container?.getAttribute("data-x")) !== this.position?.x ||
          Number(this.container?.getAttribute("data-y")) !== this.position?.y
        );
      }
    }

    private setInitialTargetPosition() {
      if (this.container && this.isNewPositionNotSame()) {
        this.setTargetPosition(this.container, Number(this.position?.x), Number(this.position?.y));
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
        if (!this.show || !this.container) return;

        this.containerRect = this.container!.getBoundingClientRect();
        this.dispatchEvent(
          new CustomEvent("floating-modal-resize", {
            composed: true,
            bubbles: true,
            detail: {
              size: this.containerRect
            }
          })
        );

        this.containerTransform = this.getContainerTransform();
      });
    }

    private getResizeMinimumRect = (): Interact.Rect => {
      const style = this.container ? getComputedStyle(this.container) : null;
      const width = Number.parseFloat(style?.minWidth ?? "") || 0;
      const height = Number.parseFloat(style?.minHeight ?? "") || 0;

      // interact restrictSize accepts a static size, but its dynamic callback must return a rect.
      return {
        top: 0,
        left: 0,
        right: width,
        bottom: height,
        width,
        height
      };
    };

    private getResizeModifiers() {
      const minSizeModifier = interact.modifiers.restrictSize({ min: this.getResizeMinimumRect });

      if (!this.aspectRatio) {
        return [minSizeModifier];
      }

      return [
        interact.modifiers.aspectRatio({
          ratio: "preserve",
          equalDelta: true,
          modifiers: [minSizeModifier, interact.modifiers.restrictSize({ max: "parent" })]
        })
      ];
    }

    private setInteractInstance() {
      requestAnimationFrame(() => {
        if (!this.show || !this.container) return;

        interact(this).draggable({
          autoScroll: true,
          allowFrom: this.DRAG_HANDLE_SELECTOR,
          ignoreFrom: this.DRAG_IGNORE_SELECTOR,
          listeners: {
            move: this.dragMoveListener,
            end: this.dragEndListener
          }
        });

        if (this.resizable) {
          interact(this.container)
            .resizable({
              edges: { left: true, right: true, bottom: true, top: true },
              ignoreFrom: this.RESIZE_IGNORE_SELECTOR,
              listeners: {
                end: this.resizeEndListener,
                move: this.resizeMoveListener
              },
              modifiers: this.getResizeModifiers()
            })
            .preventDefault("always");
        }
      });
    }

    handleClose(event: Event) {
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

    private handleModalKeyDown = (event: KeyboardEvent) => {
      if (!this.show || event.code !== Key.Escape) return;

      event.preventDefault();
      event.stopPropagation();
      this.handleClose(event);
    };

    handleMinimize() {
      if (this.minimizable) {
        if (!this.dragOccured) {
          this.minimize = !this.minimize;
          this.dispatchEvent(
            new CustomEvent("floating-modal-minimize", {
              composed: true,
              bubbles: true,
              detail: {
                minimize: this.minimize
              }
            })
          );
        }
        this.dragOccured = false;
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
      const { initialX, initialY } = this.getInitialPosition();
      x += event.deltaRect!.left + initialX;
      y += event.deltaRect!.top + initialY;
      this.setTargetPosition(target, x, y);
      this.applyInitialPosition = false;
    };

    private resizeEndListener = () => {
      this.setContainerRect();
    };

    private getInitialPosition = () => {
      if (this.applyInitialPosition && this.position) {
        return { initialX: Number(this.position?.x), initialY: Number(this.position?.y) };
      }
      return { initialX: 0, initialY: 0 };
    };

    private getTransformValues(event: Interact.InteractEvent, target: Interact.Element) {
      const { dx, dy } = event;
      const { initialX, initialY } = this.getInitialPosition();
      const x = (parseFloat(target.getAttribute("data-x") as string) || 0) + dx + initialX;
      const y = (parseFloat(target.getAttribute("data-y") as string) || 0) + dy + initialY;
      return { x, y };
    }

    private dragMoveListener = (event: Interact.InteractEvent) => {
      const target = this.container ?? event.target;
      const { x, y } = this.getTransformValues(event, target);
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

    private readonly MOVE_STEP = 10;

    private handleMoveKeyDown = (event: KeyboardEvent) => {
      if (!this.container) return;

      const { code } = event;
      let dx = 0;
      let dy = 0;

      switch (code) {
        case "ArrowUp":
          dy = -this.MOVE_STEP;
          break;
        case "ArrowDown":
          dy = this.MOVE_STEP;
          break;
        case "ArrowLeft":
          dx = -this.MOVE_STEP;
          break;
        case "ArrowRight":
          dx = this.MOVE_STEP;
          break;
        default:
          return;
      }

      event.preventDefault();
      event.stopPropagation();

      const x = parseFloat(this.container.getAttribute("data-x") || "0") + dx;
      const y = parseFloat(this.container.getAttribute("data-y") || "0") + dy;
      this.setTargetPosition(this.container, x, y);
      this.containerTransform = `translate(${x}px, ${y}px)`;

      this.dispatchEvent(
        new CustomEvent("floating-modal-location", {
          composed: true,
          bubbles: true,
          detail: {
            transform: { x: `${x}`, y: `${y}` }
          }
        })
      );
    };

    private handleHeaderMoveKeyDown = (event: KeyboardEvent) => {
      if (!this.hideMoveButton || event.target !== this.header) return;

      this.handleMoveKeyDown(event);
    };

    private destroyInteractInstance() {
      if (interact.isSet(this)) {
        interact(this).unset();
      }
      if (this.container && interact.isSet(this.container)) {
        interact(this.container).unset();
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.destroyInteractInstance();
    }

    renderedCallback() {
      this.containerTransform = this.position ? `translate(${this.position.x}px, ${this.position.y}px)` : "";
    }

    render() {
      return html`
        ${this.show
          ? html`
              <div
                class="md-floating ${this.fixed ? "fixed" : ""} ${this.minimize ? "hide" : ""}"
                part="floating"
                role="dialog"
                aria-label=${ifDefined(this.heading || this.label || undefined)}
                aria-modal="true"
                @keydown=${this.handleModalKeyDown}
                style=${ifDefined(
                  this.containerRect
                    ? this.centered
                      ? `
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    ${this.full ? "width: 100% !important; height: 100% !important;" : ""}
                  `
                      : `width: ${this.full ? "100% !important" : `${this.containerRect.width}px !important`};
                  height: ${this.full ? "100% !important" : `${this.containerRect.height}px !important`};
                  top: ${this.full ? "0 !important" : ""};
                  left: ${this.full ? "0 !important" : ""};
                  bottom: ${this.full ? "0 !important" : ""};
                  right: ${this.full ? "0 !important" : ""};
                  ${this.full ? "transform: none !important" : ""};
                  ${!this.full ? `transform: ${this.position ? `translate(${this.position.x}px, ${this.position.y}px)` : this.containerTransform} !important` : ""};`
                    : undefined
                )}
              >
                <div
                  class="md-floating__header ${this.hideMoveButton && !this.full
                    ? "md-floating__header--move-handle"
                    : ""}"
                  tabindex=${ifDefined(this.hideMoveButton && !this.full ? "0" : undefined)}
                  role=${ifDefined(this.hideMoveButton && !this.full ? "group" : undefined)}
                  aria-label=${ifDefined(this.hideMoveButton && !this.full ? this.moveAriaLabel : undefined)}
                  @keydown=${this.handleHeaderMoveKeyDown}
                >
                  <div class="md-floating__header-text" aria-hidden="true">
                    ${this.heading
                      ? html` ${this.heading} `
                      : html`
                          ${!this.minimize && this.headerSlot}
                          <slot name="header"></slot>
                        `}
                  </div>
                  ${!this.full && !this.hideMoveButton
                    ? html` <md-tooltip
                        class="md-floating__move-tooltip"
                        message=${this.moveAriaLabel}
                        placement="bottom"
                        ?disabled=${!this.moveAriaLabel}
                      >
                        <md-button
                          color="color-none"
                          size="20"
                          class="md-floating__move md-floating__header-button"
                          ariaLabel="${this.moveAriaLabel}"
                          circle
                          @keydown=${this.handleMoveKeyDown}
                        >
                          <md-icon name="drag-bold" size="16" iconSet="momentumDesign" aria-hidden="true"></md-icon>
                        </md-button>
                      </md-tooltip>`
                    : nothing}
                  ${this.minimizable
                    ? html` <md-tooltip
                        message=${this.minimizeAriaLabel}
                        placement="bottom"
                        ?disabled=${!this.minimizeAriaLabel}
                      >
                        <md-button
                          color="color-none"
                          size="20"
                          class="md-floating__minimize md-floating__header-button"
                          ariaLabel="${this.minimizeAriaLabel}"
                          circle
                          @click=${this.handleMinimize}
                        >
                          <md-icon name="minus-bold" size="16" iconSet="momentumDesign" ariaHidden="true"></md-icon>
                        </md-button>
                      </md-tooltip>`
                    : nothing}
                  ${!this.minimize && this.maximizable
                    ? html` <md-tooltip
                        message=${this.full ? this.resizeAriaLabel : this.maximizeScreenLabel}
                        placement="bottom"
                        ?disabled=${!(this.full ? this.resizeAriaLabel : this.maximizeScreenLabel)}
                      >
                        <md-button
                          color="color-none"
                          size="20"
                          class="md-floating__resize md-floating__header-button"
                          ariaLabel="${this.full ? this.resizeAriaLabel : this.maximizeScreenLabel}"
                          circle
                          @click=${this.handleToggleExpandCollapse}
                        >
                          <md-icon
                            name=${this.full ? "minimize-bold" : "maximize-bold"}
                            size="16"
                            iconSet="momentumDesign"
                          ></md-icon>
                        </md-button>
                      </md-tooltip>`
                    : ""}

                  <md-tooltip message=${this.closeAriaLabel} placement="bottom" ?disabled=${!this.closeAriaLabel}>
                    <md-button
                      color="color-none"
                      size="20"
                      class="md-floating__close md-floating__header-button"
                      ariaLabel="${this.closeAriaLabel}"
                      circle
                      @click=${this.handleClose}
                    >
                      <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
                    </md-button>
                  </md-tooltip>
                </div>
                <div class="md-floating__body" part="floating-body">
                  <slot></slot>
                </div>
              </div>
              ${this.minimizable
                ? html` <div class="md-floating-min-parent" part="minimize-floating">
                    <md-floating-modal-minimized
                      class="float-modal-min"
                      part="floating-minimized"
                      heading=${this.heading}
                      .minimize=${this.minimize}
                      .minPosition=${this.minPosition}
                      .maximizeIconAriaLabel="${this.maximizeScreenLabel}"
                      .closeAriaLabel="${this.closeAriaLabel}"
                      @floating-min-modal-minimize=${() => this.handleMinimize()}
                      @floating-modal-close=${this.handleClose}
                      ?show=${this.show}
                    >
                      ${this.minimize && this.headerSlot}
                    </md-floating-modal-minimized>
                  </div>`
                : nothing}
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
