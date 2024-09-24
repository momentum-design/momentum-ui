import { LitElement, html, css, property, internalProperty, query, queryAll, PropertyValues } from "lit-element";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { scroll } from "lit-virtualizer";
import { Key } from "@/constants";
import styles from "./scss/module.scss";
import reset from "@/wc_scss/reset.scss";
import { FocusMixin } from "@/mixins/FocusMixin";

export namespace AdvanceList {
  export const prefixId = "item-";
  @customElementWithCheck("md-advance-list")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Array }) items: any[] = [];
    @property({ type: Boolean }) isLoading = false;
    @property({ type: String }) selectedItemId = "";
    @property({ type: String }) value = "";

    @property({ type: String }) ariaRoleList = "";
    @property({ type: String }) ariaLabelList = "";

    @property({ type: Boolean }) isError = false;
    @queryAll("div.default-wrapper") lists?: HTMLDivElement[];
    @query(".virtual-scroll") listContainer?: HTMLDivElement;
    @internalProperty() page = 1;
    @internalProperty() hasSlotContent = false;
    @property({ type: Number }) totalRecords = 0;
    @internalProperty() activeItem: HTMLElement | null | undefined = null;
    @internalProperty() scrollIndex = -1;
    @internalProperty() activeId: string = "";
    @internalProperty() selectedIndex = -1;

    connectedCallback(): void {
      super.connectedCallback();
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("click", this.handleClick);
    }

    static get styles() {
      return [reset, styles];
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("click", this.handleClick);
      this.removeEventListener("keydown", this.handleKeyDown);
    }

    updated(changedProperties: PropertyValues) {
      if (changedProperties.has("value")) {
        this.selectedItemId = `${prefixId}${this.value}`;
        // Wait for the update to complete before running your logic.
        this.requestUpdate().then(() => {
          this.updateSelectedState();
        });
      }
    }

    protected updateSelectedState() {
      const wrappers = Array.from(this.shadowRoot?.querySelectorAll(".default-wrapper") || []);
      wrappers.forEach((wrapper) => {
        const childWithDisabled = wrapper.querySelector("[disabled]");

        if (wrapper.id === this.selectedItemId) {
          wrapper.classList.add("selected");
          wrapper.setAttribute("selected", "true");
          wrapper.setAttribute("aria-selected", "true");
          wrapper.setAttribute("tabindex", "0");
        } else {
          wrapper.classList.remove("selected");
          wrapper.removeAttribute("selected");
          wrapper.setAttribute("aria-selected", "false");
          wrapper.setAttribute("tabindex", "-1");
        }

        if (childWithDisabled) {
          wrapper.setAttribute("disabled", "");
          wrapper.setAttribute("aria-disabled", "true");
        } else {
          wrapper.removeAttribute("disabled");
          wrapper.removeAttribute("aria-disabled");
        }
      });
    }

    findClickedItem(event: Event): HTMLElement | 0 | undefined {
      const wrappers = Array.from(this.shadowRoot?.querySelectorAll(".default-wrapper") || []);
      const eventPath = event.composedPath();

      const clickedItem = wrappers.find((wrapper) => eventPath.includes(wrapper)) as HTMLElement | undefined;

      if (clickedItem) {
        const isDisabled =
          Array.from(clickedItem.children).some((child) => child.hasAttribute("disabled")) ||
          clickedItem.getAttribute("aria-disabled") === "true";

        if (isDisabled) {
          return 0; // Indicate that the item is disabled and stop execution
        }
        return clickedItem;
      }
      return undefined;
    }

    clearSelectedState() {
      const wrappers = Array.from(this.shadowRoot?.querySelectorAll(".default-wrapper") || []);
      wrappers.forEach((wrapper) => {
        wrapper.classList.remove("selected");
        wrapper.removeAttribute("selected");
        wrapper.removeAttribute("tabindex");
      });
    }

    selectItem(item: HTMLElement) {
      item.classList.add("selected");
      item.setAttribute("selected", "true");
    }

    getVisibleElementById = (id: string) => {
      const elements: NodeListOf<HTMLElement> | undefined = this.shadowRoot
        ?.querySelector(`.virtual-scroll`)
        ?.querySelectorAll(`#${id}`);
      if (elements) {
        for (let element of elements) {
          if (window.getComputedStyle(element).display !== "none") {
            return element;
          }
        }
      }
      return null;
    };

    getVisibleElement = () => {
      const activeItem: HTMLElement | null = this.getVisibleElementById(`${prefixId}${this.activeId}`);
      return activeItem?.offsetHeight !== 0 ? activeItem : null;
    };

    resetFocusToVisibleElement() {
      this.clearFocusedState();
      const visibleElement = this.getVisibleElement();
      if (visibleElement) {
        this.focusItem(visibleElement);
      }
      return visibleElement;
    }

    resetSelectedState = (id: string, itemToBeSelected: HTMLElement) => {
      this.clearSelectedState();
      this.selectItem(itemToBeSelected);
      this.setSelected(id);
    };

    handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case Key.ArrowDown:
          {
            const currentIndex = this.items.findIndex((item) => item.id === this.activeId);
            if (currentIndex < this.totalRecords - 1) {
              this.activeId = this.items[currentIndex + 1].id;
              this.activeItem = this.resetFocusToVisibleElement();
              this.scrollIndex = parseInt(this.activeItem?.getAttribute("index") || currentIndex + "");
            }
          }
          break;
        case Key.ArrowUp:
          {
            const currentIndex = this.items.findIndex((item) => item.id === this.activeId);
            if (currentIndex > 0) {
              this.activeId = this.items[currentIndex - 1].id;
              this.activeItem = this.resetFocusToVisibleElement();
              this.scrollIndex = parseInt(this.activeItem?.getAttribute("index") || currentIndex + "") ?? 0;
            }
          }
          break;
        case Key.Enter:
          if (this.activeItem) {
            const isDisabled =
              Array.from(this.activeItem.children).some((child) => child.hasAttribute("disabled")) ||
              this.activeItem.getAttribute("aria-disabled") === "true";
            this.listContainer?.focus();
            if (!isDisabled) {
              this.resetSelectedState(`${prefixId}${this.activeId}`, this.activeItem);
              this.scrollIndex = parseInt(this.activeItem.getAttribute("index") || "0");
            }
          }
          break;
        default:
          break;
      }
    }

    handleClick(event: Event) {
      const clickedItem = this.findClickedItem(event);
      event.preventDefault();
      if (clickedItem) {
        this.resetSelectedState(clickedItem.id, clickedItem);
        this.activeId = clickedItem.id.substring(clickedItem.id.indexOf("-") + 1);
        this.resetFocusToVisibleElement();
        this.scrollIndex = parseInt(clickedItem.getAttribute("index") || "0");
        this.listContainer?.focus();
      }
    }

    handleRangeChange = (e: any) => {
      const { last } = e;
      this.clearSelectedState();
      this.updateSelectedState();
      this.resetFocusToVisibleElement();
      this.listContainer?.focus();


      if (this.items.length < this.totalRecords && last >= this.items.length - 1 && !this.isLoading && !this.isError) {
        this.scrollIndex = last;
        this.dispatchEvent(
          new CustomEvent("load-more", {
            detail: { page: this.page },
            bubbles: true,
            composed: true
          })
        );
        this.page += 1;
      }
    };

    clearFocusedState() {
      const wrappers = Array.from(this.shadowRoot?.querySelectorAll(".default-wrapper") || []);
      wrappers.forEach((wrapper) => {
        wrapper.classList.remove("focused");
      });
    }

    focusItem(item: HTMLElement) {
      item.classList.add("focused");
    }

    setSelected(newId: string) {
      if (this.selectedItemId !== newId) {
        this.selectedItemId = newId;
        this.requestUpdate();
        this.notifySelectedChange();
      }
    }


    notifySelectedChange() {
      this.dispatchEvent(
        new CustomEvent("list-item-change", {
          detail: { selected: this.selectedItemId },
          bubbles: true,
          composed: true
        })
      );
    }

    renderItem(item: any, index: number) {
      return html`
        <div
          class="default-wrapper"
          aria-setsize="${this.totalRecords}"
          aria-posinset="${index + 1}"
          role="option"
          aria-label=${item.name}
          id="${prefixId}${item.id}"
          index="${index}"
        >
          ${item.template(item, index)}
        </div>
      `;
    }

    render() {
      return html`
        <div
          class="md-advance-list-wrapper virtual-scroll"
          tabindex="0"
          aria-live="polite"
          aria-activedescendant=${this.activeId ? `${prefixId}${this.activeId}` : `${prefixId}${this.items[0].id}`}
          aria-label=${this.ariaLabelList}
          role=${this.ariaRoleList}
          @rangechange=${this.handleRangeChange}
        >
          ${scroll({
        items: this.items,
        renderItem: (item: any, index?: number) => this.renderItem(item, index || 0),
        useShadowDOM: true,
        scrollToIndex: {
          index: this.scrollIndex,
          position: this.scrollIndex === 0 ? "start" : "center"
        }
      })}
        </div>
            ${this.isLoading ?
          html`<slot class="spin-loader" name="spin-loader"></slot>` : null
        }     
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-advance-list": AdvanceList.ELEMENT;
  }
}
