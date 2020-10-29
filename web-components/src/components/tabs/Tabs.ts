/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import { ResizeMixin, RovingTabIndexMixin } from "@/mixins";
import { uuid } from "@/utils/helpers";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";
import { Tab, TabClickEvent, TabKeyDownEvent } from "./Tab";
import { TabPanel } from "./TabPanel";

enum Key {
  End = "End",
  Home = "Home",
  Enter = "Enter",
  Tab = "Tab",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowUp = "ArrowUp",
  Delete = "Delete",
  Space = "Space"
}

@customElement("md-tabs")
export class Tabs extends ResizeMixin(RovingTabIndexMixin(LitElement)) {
  @property({ type: Boolean }) justified = false;

  @query('slot[name="tab"]') tabSlot?: HTMLSlotElement;
  @query('slot[name="panel"]') panelSlot?: HTMLSlotElement;
  @query(".md-tab__list") scrollingBox?: HTMLDivElement;

  @internalProperty() private showLeftScroll = false;
  @internalProperty() private showRightScroll = false;

  private tabs: Tab[] | [] = [];
  private panels: TabPanel[] | [] = [];

  static get styles() {
    return [reset, styles];
  }

  private manageOverflow() {
    this.showLeftScroll = false;
    this.showRightScroll = false;

    if (this.scrollingBox) {
      const { scrollWidth, scrollLeft, offsetWidth } = this.scrollingBox;

      if (scrollLeft > 0) {
        this.showLeftScroll = true;
      }

      if (scrollLeft + offsetWidth < scrollWidth) {
        this.showRightScroll = true;
      }
    }
  }

  private linkPanelsAndTabs() {
    const { tabs, panels } = this;

    if (tabs.length === 0 || panels.length === 0) {
      console.warn(`The tabs or panels count should't equal zero.`);
      return;
    }

    if (tabs.length !== panels.length) {
      console.warn(`The amount of tabs (${tabs.length}) doesn't match the amount of panels (${panels.length}).`);
    }

    tabs.forEach((tab: Tab, index: number) => {
      const id = uuid();

      tab.setAttribute("id", id);
      tab.setAttribute("aria-controls", id);
      tab.selected = this.selected === index;

      const panel = panels[index];

      if (panel) {
        panel.setAttribute("id", id);
        panel.setAttribute("aria-labelledby", id);
        panel.selected = this.selected === index;
        if (tab.disabled) {
          panel.hidden = true;
        }
      } else {
        tab.disabled = true;
      }
    });

    const tabUpdateCompletes = (tabs as Tab[]).map((tab: Tab) => {
      if (typeof tab.updateComplete !== "undefined") {
        return tab.updateComplete;
      }
    });

    Promise.all(tabUpdateCompletes).then(() => {
      this.manageOverflow();
    });
  }

  get slotItem() {
    return this.tabSlot;
  }

  protected filterSlotted() {
    return this.tabSlot!.assignedElements() as HTMLElement[];
  }

  protected handleResize(contentRect: DOMRect) {
    super.handleResize && super.handleResize(contentRect);
    this.manageOverflow();
  }

  private updateSelected(newIndex: number) {
    const { tabs, panels } = this;

    const oldIndex = this.slotted.findIndex(element => element.hasAttribute("selected"));

    if (oldIndex === newIndex) {
      return;
    }

    if (tabs && panels) {
      [oldIndex, newIndex].forEach(index => {
        tabs[index].toggleAttribute("selected");
        panels[index].toggleAttribute("selected");
      });
    }

    this.dispatchEvent(
      new CustomEvent("selected-changed", {
        detail: {
          value: newIndex
        },
        composed: true,
        bubbles: true
      })
    );

    this.selected = newIndex;
  }

  handleTabClick(event: CustomEvent<TabClickEvent>) {
    const { id } = event.detail;
    const newIndex = this.slotted.findIndex(element => element.id === id && !(element as Tab).disabled);
    if (newIndex !== -1) {
      this.updateSelected(newIndex);
    }
  }

  private switchTabOnArrowPress(newIndex: number) {
    this.selected = newIndex;

    const tab = this.slotted[newIndex] as Tab;

    if (tab) {
      this.scrollToTab(tab);
    }
  }

  handleTabKeydown(event: CustomEvent<TabKeyDownEvent>) {
    const { key, id } = event.detail;

    switch (key) {
      case Key.End:
        this.switchTabOnArrowPress(this.slotted.length - 1);
        break;
      case Key.Home:
        this.switchTabOnArrowPress(0);
        break;
      case Key.ArrowLeft:
        if (this.selected === 0) {
          this.switchTabOnArrowPress(this.slotted.length - 1);
        } else {
          this.switchTabOnArrowPress(this.selected - 1);
        }
        break;
      case Key.ArrowRight:
        if (this.selected === this.slotted.length - 1) {
          this.switchTabOnArrowPress(0);
        } else {
          this.switchTabOnArrowPress(this.selected + 1);
        }
        break;
      case Key.Enter:
      case Key.Space:
        // eslint-disable-next-line no-case-declarations
        const tabIndex = this.slotted.findIndex(element => element.id === id && !(element as Tab).disabled);
        if (tabIndex !== -1) {
          this.updateSelected(tabIndex);
        }
        break;
    }
  }

  private setupEvents() {
    this.addEventListener("tab-click", this.handleTabClick as EventListener);
    this.addEventListener("tab-keydown", this.handleTabKeydown as EventListener);
  }

  private teardownEvents() {
    this.removeEventListener("tab-click", this.handleTabClick as EventListener);
    this.removeEventListener("tab-keydown", this.handleTabKeydown as EventListener);
  }

  private scrollTabsContent(distance: number) {
    requestAnimationFrame(() => {
      this.scrollingBox!.scrollLeft += distance;
    });
  }

  private scrollToTab(tab: Tab) {
    const index = this.slotted.indexOf(tab);
    if (index !== -1 && this.scrollingBox) {
      let distance = 0;
      const { left, right } = this.scrollingBox.getBoundingClientRect();
      const nextTab = (this.slotted[index + 1] || tab).getBoundingClientRect();
      const prevTab = (this.slotted[index - 1] || tab).getBoundingClientRect();

      if (nextTab.right > right) {
        distance = nextTab.right - right + 10;
      } else if (prevTab.left < left) {
        distance = prevTab.left - left - 10;
      }
      this.scrollTabsContent(distance);
    }
  }

  private handleLeftScroll() {
    if (this.scrollingBox) {
      this.scrollTabsContent(-this.scrollingBox.offsetWidth);
    }
  }

  private handleRightScroll() {
    if (this.scrollingBox) {
      this.scrollTabsContent(this.scrollingBox.offsetWidth);
    }
  }

  private handleScroll() {
    this.manageOverflow();
  }

  private setupPanelsAndTabs() {
    if (this.tabSlot) {
      this.tabs = this.tabSlot.assignedElements() as Tab[];
    }
    if (this.panelSlot) {
      this.panels = this.panelSlot.assignedElements() as TabPanel[];
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.teardownEvents();
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    this.setAttribute("role", "tablist");
    this.setupEvents();
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("slotted")) {
      this.setupPanelsAndTabs();
      this.linkPanelsAndTabs();
    }
    if (changedProperties.has("selected")) {
      const tab = this.slotted[this.selected] as Tab;
      if (tab) {
        this.scrollToTab(tab);
      }
    }
  }

  get leftArrowClassMap() {
    return {
      show: this.showLeftScroll
    };
  }

  get rightArrowClassMap() {
    return {
      show: this.showRightScroll
    };
  }

  render() {
    return html`
      <span class="arrow left ${classMap(this.leftArrowClassMap)}" @click=${this.handleLeftScroll}>
        <md-icon name="arrow-left_24"></md-icon>
      </span>
      <div
        part="tabs-list"
        class="${`md-tab__list ` + `${this.justified ? "md-tab__justified" : ""}`}"
        role="tablist"
        @scroll=${this.handleScroll}
      >
        <slot name="tab"></slot>
      </div>
      <span class="arrow right ${classMap(this.rightArrowClassMap)}" @click=${this.handleRightScroll}>
        <md-icon name="arrow-right_24"></md-icon>
      </span>
      <div part="tabs-content" class="md-tab__content">
        <slot name="panel"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-tabs": Tabs;
  }
}
