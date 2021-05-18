/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { html, internalProperty, LitElement, property, PropertyValues, query, queryAll } from "lit-element";
import Sortable from "sortablejs";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { debounce } from "@/utils/helpers";
import { customElementWithCheck, ResizeMixin, RovingTabIndexMixin, SlottedMixin } from "@/mixins";
import { DraggableTab, TabClickEvent, TabKeyDownEvent } from "./DraggableTab";
import { DraggableTabPanel } from "./DraggableTabPanel";
import { nanoid } from "nanoid";
import { classMap } from "lit-html/directives/class-map";
import { MenuOverlay } from "../menu-overlay/MenuOverlay"; // Keep type import as a relative path
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { repeat } from "lit-html/directives/repeat";
import { styleMap } from "lit-html/directives/style-map";
import "@/components/icon/Icon";
import "@/components/menu-overlay/MenuOverlay";
import { threadId } from "worker_threads";
import { Key } from "@/constants";

const MORE_MENU_TAB_TRIGGER_ID = "tab-more";
const MORE_MENU_WIDTH = "264px"; // Designed width
export const MORE_MENU_TAB_COPY_ID_PREFIX = "more-menu-copy-";

export namespace DraggableTabs {
  type TabViewportData = {
    isTabInViewportHidden: boolean;
    tabOffsetWidth: number;
  };
  type TabsViewportDataList = TabViewportData[];

  type TabId = Element["id"];
  @customElementWithCheck("md-draggable-tabs")
  export class ELEMENT extends ResizeMixin(RovingTabIndexMixin(SlottedMixin(LitElement))) {
    @property({ type: Boolean }) justified = false;
    @property({ type: String }) overlowLabel = "More";
    @property({ type: Number, attribute: "more-items-scroll-limit" }) moreItemsScrollLimit = Number.MAX_SAFE_INTEGER;

    @query("slot[name='tab']") tabSlotElement!: HTMLSlotElement;
    @query("slot[name='panel']") panelSlotElement?: HTMLSlotElement;
    @query(".md-tab__list[part='tabs-list']") tabsListElement?: HTMLDivElement;
    @query(".md-menu-overlay__more_tab") moreTabMenuElement?: DraggableTab.ELEMENT;
    @query("md-menu-overlay") menuOverlayElement?: MenuOverlay.ELEMENT;

    @query(".md-tab__list[part='hidden-tabs-list']") tabsMoreListElement?: HTMLDivElement;
    @queryAll(".md-menu-overlay__more_list md-tab") tabsCopyHiddenListElements?: NodeListOf<DraggableTab.ELEMENT>;

    @query("#visible-tabs-list") visibleTabsContainerElement?: HTMLElement;
    @query("#hidden-tabs-list") hiddenTabsContainerElement?: HTMLElement;

    @internalProperty() private isMoreTabMenuVisible = false;
    @internalProperty() private isMoreTabMenuMeasured = false;
    @internalProperty() private isMoreTabMenuOpen = false;
    @internalProperty() private isMoreTabMenuSelected = false;
    @internalProperty() private isMoreTabMenuScrollable = false;
    @internalProperty() private moreTabMenuOffsetWidth = 0;
    @internalProperty() private moreTabMenuMaxHeight: string | null = null;
    @internalProperty() private tabsViewportDataList: TabsViewportDataList = [];
    @internalProperty() private tabsFilteredAsVisibleList: DraggableTab.ELEMENT[] = [];
    @internalProperty() private tabsFilteredAsHiddenList: DraggableTab.ELEMENT[] = [];

    @property({ type: Number }) delay = 0;
    @property({ type: Number }) animation = 100;
    @property({ type: String }) direction: "horizontal" | "vertical" = "horizontal";
    @property({ type: String, attribute: "draggable-items" }) draggableItems = "md-draggable-tab";
    @property({ type: String, attribute: "ghost-class" }) ghostClass = "";
    @property({ type: String, attribute: "chosen-class" }) chosenClass = "";
    @property({ type: Boolean, reflect: true }) sort = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    internalSwitch: boolean;
    
    private generateOptions() {
      return {
        group: "shared",
        disabled: this.disabled,
        animation: 100,
        delay: 0,
        draggable: this.draggableItems,
        direction: this.direction,
        ghostClass: this.ghostClass,
        chosenClass: this.chosenClass,
        onEnd: this.handleOnEnd,
        onUpdate: this.handleOnUpdate,
        onRemove: this.handleOnRemove
      };
    }

    private tabs: DraggableTab.ELEMENT[] = [];
    private panels: DraggableTabPanel.ELEMENT[] = [];

    private tabsCopy: DraggableTab.ELEMENT[] = [];

    private tabsHash: Record<TabId, DraggableTab.ELEMENT> = {};
    private tabsCopyHash: Record<TabId, DraggableTab.ELEMENT> = {};

    private tabsIdxHash: Record<TabId, number> = {};

    private tabsVisibleIdxHash: Record<TabId, number> = {};
    private tabsHiddenIdxHash: Record<TabId, number> = {};
    private tabHiddenIdPositiveTabIndex?: TabId;
    private tabVisibleIdPositiveTabIndex?: TabId;

    private visibleTabsSortableInstance: Sortable | null = null;
    private hiddenTabsSortableInstance: Sortable | null = null;

    private getCopyTabId(tab: DraggableTab.ELEMENT) {
      if (tab.id.startsWith(MORE_MENU_TAB_COPY_ID_PREFIX) === false) {
        return `${MORE_MENU_TAB_COPY_ID_PREFIX}${tab.id}`;
      } else {
        return tab.id;
      }
    }

    private getNormalizedTabId(id: TabId) {
      return id.replace(MORE_MENU_TAB_COPY_ID_PREFIX, "");
    }

    static get styles() {
      return [reset, styles];
    }

    private async ensureTabsUpdateComplete(tabs: DraggableTab.ELEMENT[]) {
      const tabUpdatesCompletesPromises = tabs
        .map(tab => {
          if (typeof tab.updateComplete !== "undefined") {
            return tab.updateComplete;
          }
          return null;
        })
        .filter(promise => promise !== null);

      tabUpdatesCompletesPromises.length && (await Promise.all(tabUpdatesCompletesPromises));
    }

    // This operation may affect render performance when using frequently. Use careful!
    private measureTabsOffsetWidth() {
      return !this.justified && this.direction !== "vertical"
        ? this.tabs.map((tab, idx) => tab.offsetWidth)
        : this.tabs.map((tab, idx) => {
            tab.setAttribute("measuringrealwidth", "");
            const offsetWidth = tab.offsetWidth;
            tab.removeAttribute("measuringrealwidth");
            return offsetWidth;
          });
    }

    private measureHiddenTabsCopiesOffsetHeight() {
      return this.tabsCopy.map((tab, idx) => tab.offsetHeight);
    }

    private async manageOverflow() {
      if (this.direction !== "vertical") {
        let tabList;
        if (this.tabsFilteredAsVisibleList.length === 0 && this.tabsFilteredAsHiddenList.length === 0)
          tabList = [...this.tabs];
        else tabList = [...this.tabsFilteredAsVisibleList, ...this.tabsFilteredAsHiddenList];

        const tabsCount = tabList.length;
        if (this.tabsListElement && tabsCount > 1) {
          const tabsListViewportOffsetWidth = this.tabsListElement.offsetWidth;

          // Awaiting all tabs updates
          await this.ensureTabsUpdateComplete(this.tabs);

          const tabsOffsetsWidths = this.measureTabsOffsetWidth();

          // All tabs total offsetsWidth
          const tabsTotalOffsetWidth = tabList.reduce((acc, tab, idx) => {
            acc += tabsOffsetsWidths[idx];
            return acc;
          }, 0);

          if (tabsTotalOffsetWidth) {
            // more
            await this.setupMoreTab();

            let isTabsFitInViewport = true;
            if (tabsListViewportOffsetWidth < tabsTotalOffsetWidth) {
              // console.log("Applied More button");
              isTabsFitInViewport = false;
            } else {
              // console.log("Removed More button");
            }

            const newTabsViewportList: TabsViewportDataList = [];
            let tabsOffsetWidthSum = 0;
            tabList.forEach((tab, idx) => {
              tabsOffsetWidthSum += tabsOffsetsWidths[idx];

              const isTabInViewportHidden = isTabsFitInViewport
                ? false
                : tabsOffsetWidthSum + (idx < tabsCount - 1 ? this.moreTabMenuOffsetWidth : 0) >
                  tabsListViewportOffsetWidth;

              newTabsViewportList.push({
                isTabInViewportHidden: isTabInViewportHidden,
                tabOffsetWidth: tabsOffsetsWidths[idx]
              });
            });

            this.tabsViewportDataList = newTabsViewportList;

            // Make real tabs viewportHidden update
            this.tabsViewportDataList.forEach(
              (tvd, idx) => (this.tabs[idx].viewportHidden = tvd.isTabInViewportHidden)
            );

            // Make more button hidden update
            this.isMoreTabMenuVisible = !!this.tabsViewportDataList.find(tvd => tvd.isTabInViewportHidden);

            // Only tabs going visible
            this.tabsFilteredAsVisibleList = tabList.filter(
              (t, idx) => !this.tabsViewportDataList[idx].isTabInViewportHidden
            );
            this.tabsVisibleIdxHash = this.tabsFilteredAsVisibleList.reduce((acc, tab, idx) => {
              acc[tab.id] = idx;
              return acc;
            }, {} as Record<TabId, number>);

            // Only tabs going hidden
            this.tabsFilteredAsHiddenList = tabList.filter(
              (t, idx) => this.tabsViewportDataList[idx].isTabInViewportHidden
            );
            this.tabsHiddenIdxHash = this.tabsFilteredAsHiddenList.reduce((acc, tab, idx) => {
              acc[tab.id] = idx;
              return acc;
            }, {} as Record<TabId, number>);
          }
        }

        this.updateIsMoreTabMenuSelected();

        const firstNotDisabledHiddenTab = this.tabsFilteredAsHiddenList.find(t => !t.disabled);
        this.updateHiddenIdPositiveTabIndex(firstNotDisabledHiddenTab);

        const firstNotDisabledVisibleTab = this.tabsFilteredAsVisibleList.find(t => !t.disabled);
        this.updateVisibleIdPositiveTabIndex(firstNotDisabledVisibleTab);
      }
    }

    private updateIsMoreTabMenuSelected() {
      // More menu selected check
      this.isMoreTabMenuSelected = !!this.tabsFilteredAsHiddenList.find(tab => tab.selected);
    }

    private updateHiddenIdPositiveTabIndex(hiddenTab?: DraggableTab.ELEMENT) {
      this.tabHiddenIdPositiveTabIndex = hiddenTab ? hiddenTab.id : undefined;
    }

    private updateVisibleIdPositiveTabIndex(visibleTab?: DraggableTab.ELEMENT) {
      this.tabVisibleIdPositiveTabIndex = visibleTab ? visibleTab.id : undefined;
    }

    private async linkPanelsAndTabs() {
      const { tabs, panels } = this;

      if (tabs.length === 0 || panels.length === 0) {
        console.warn(`The tabs or panels count should't be equal zero.`);
        return;
      }

      if (tabs.length !== panels.length) {
        console.warn(`The amount of tabs (${tabs.length}) doesn't match the amount of panels (${panels.length}).`);
      }
      console.log("LUFFY", tabs);

      tabs.forEach((tab, index) => {
        const id = nanoid();
        tab.setAttribute("id", id);
        tab.setAttribute("aria-controls", id);
        tab.selected = this.selected === index;

        const panel = panels[index];

        if (panel) {
          panel.setAttribute("id", id);
          panel.setAttribute("aria-labelledby", id);
          if (this.selected === index) {
            panel.toggleAttribute("selected", true);
          }
          // panel.selected = this.selected === index;
          if (tab.disabled) {
            panel.hidden = true;
          }
        } else {
          tab.disabled = true;
        }
      });

      console.log("LUFFY2", tabs, panels);

      this.tabsHash = this.tabs.reduce((acc, tab) => {
        acc[tab.id] = tab;
        return acc;
      }, {} as Record<TabId, DraggableTab.ELEMENT>);

      this.tabsIdxHash = this.tabs.reduce((acc, tab, idx) => {
        acc[tab.id] = idx;
        return acc;
      }, {} as Record<TabId, number>);
    }

    get slotElement() {
      return this.tabSlotElement;
    }

    protected filterSlotted() {
      return this.tabSlotElement!.assignedElements() as HTMLElement[];
    }

    protected async handleResize(contentRect: DOMRect) {
      super.handleResize && super.handleResize(contentRect);
      await this.manageOverflow();
    }

    private dispatchDragEvent(eventName: string, srcEvent: Sortable.SortableEvent | Sortable.MoveEvent) {
      this.dispatchEvent(
        new CustomEvent<{ srcEvent: Sortable.SortableEvent | Sortable.MoveEvent }>(eventName, {
          composed: true,
          bubbles: true,
          detail: {
            srcEvent
          }
        })
      );
    }

    handleOnUpdate = (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      console.log("OnUpdate", event)
      this.dispatchDragEvent("drag-remove", event);
    };

    handleOnRemove = (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      console.log("OnRemove", event)
      this.dispatchDragEvent("drag-remove", event);
    };

    handleOnEnd = async (event: Sortable.SortableEvent) => {
      event.stopPropagation();
      const oldIndex = event.oldIndex;
      const newIndex = event.newIndex;

      const visibleTabElements = [...this.tabsFilteredAsVisibleList];
      const hiddenTabElements = [...this.tabsFilteredAsHiddenList];

      if (
        event.to === this.visibleTabsContainerElement &&
        event.from === this.hiddenTabsContainerElement &&
        oldIndex !== undefined &&
        newIndex !== undefined
      ) {
        this.visibleTabsContainerElement.querySelector("#" + event.item.id)?.remove();
        const draggedElement = hiddenTabElements[oldIndex];
        const autoMoveElement = visibleTabElements.slice(-1)[0];
        hiddenTabElements.splice(oldIndex, 1);
        hiddenTabElements.splice(0, 0, autoMoveElement);
        const newDraggedIndex = newIndex === this.tabsFilteredAsVisibleList.length ? newIndex - 1 : newIndex;

        visibleTabElements.splice(newDraggedIndex, 0, draggedElement);
        visibleTabElements.pop();

        this.tabsFilteredAsVisibleList = visibleTabElements;
        this.tabsFilteredAsHiddenList = hiddenTabElements;
      } else if (
        event.from === this.visibleTabsContainerElement &&
        event.to === this.hiddenTabsContainerElement &&
        oldIndex !== undefined &&
        newIndex !== undefined
      ) {
        this.hiddenTabsContainerElement.querySelector("#" + event.item.id)?.remove();
        const draggedElement = visibleTabElements[oldIndex];
        const autoMoveElement = hiddenTabElements.slice(-1)[0];
        const newDraggedIndex = newIndex === this.tabsFilteredAsHiddenList.length ? newIndex - 1 : newIndex;
        hiddenTabElements.splice(newDraggedIndex, 0, draggedElement);
        hiddenTabElements.pop();

        const newVisible = visibleTabElements.filter((element: any) => {
          return element.id !== this.getNormalizedTabId(event.item.id)
        });
        newVisible.push(autoMoveElement);
        this.tabsFilteredAsVisibleList = [...newVisible];
        this.tabsFilteredAsHiddenList = [...hiddenTabElements];
      } else if (
        event.from === this.visibleTabsContainerElement &&
        event.to === this.visibleTabsContainerElement &&
        oldIndex !== undefined &&
        newIndex !== undefined
      ) {
        const draggedElement = visibleTabElements[oldIndex];
        visibleTabElements.splice(oldIndex, 1)
        visibleTabElements.splice(newIndex, 0, draggedElement);
        this.tabsFilteredAsVisibleList = visibleTabElements;
        if(newIndex === this.tabsFilteredAsVisibleList.length-1) {
          this.visibleTabsContainerElement.children[this.visibleTabsContainerElement.children.length-1].remove();
          }
      } else if (
        event.from === this.hiddenTabsContainerElement &&
        event.to === this.hiddenTabsContainerElement &&
        oldIndex !== undefined &&
        newIndex !== undefined
      ) {
        const draggedElement = hiddenTabElements[oldIndex];
        hiddenTabElements.splice(oldIndex, 1);
        hiddenTabElements.splice(newIndex, 0, draggedElement);
        this.tabsFilteredAsHiddenList = hiddenTabElements;
        if(newIndex === this.tabsFilteredAsHiddenList.length-1) {
          this.hiddenTabsContainerElement.children[this.hiddenTabsContainerElement.children.length-1].remove();
          }
      }
      this.handleNewSelectedTab(event.item.id);
      this.requestUpdate();
      this.dispatchDragEvent("drag-end", event);
    };

    private makeTabCopyFocus(tabCopy: DraggableTab.ELEMENT) {
      if (tabCopy) {
        tabCopy.focus();
      }
    }

    handleTabClick(event: CustomEvent<TabClickEvent>) {
      const { id } = event.detail;
      this.handleNewSelectedTab(id);
    }

    handleNewSelectedTab(id: string) {
      const tab = this.tabsHash[this.getNormalizedTabId(id)];
      if (tab && !tab.disabled) {
        const newIndex = this.tabsIdxHash[tab.id];

        if (newIndex !== -1) {
          this.updateSelectedTab(newIndex);
        }

        // Setting up focus for tab copy (hidden menu)
        {
          const tabCopy = this.tabsCopyHash[this.getCopyTabId(tab)];
          tabCopy && this.makeTabCopyFocus(tabCopy);
          this.updateHiddenIdPositiveTabIndex(tab);
        }
      }
    }

    handleTabCrossClick(event: CustomEvent<TabClickEvent>) {
      const { id } = event.detail;

      const tab = this.tabsHash[this.getNormalizedTabId(id)];
      
      if (tab && !tab.disabled) {
        const crossTabIndex = this.tabsFilteredAsVisibleList.findIndex(
          element => this.getNormalizedTabId(element.id) === this.getNormalizedTabId(id)
        );
        this.tabsFilteredAsVisibleList = this.tabsFilteredAsVisibleList.filter((element: any) => {
          return this.getNormalizedTabId(element.id) !== this.getNormalizedTabId(id)
        })

        this.visibleTabsContainerElement?.querySelector("#" + id)?.remove()
        if (this.tabsFilteredAsHiddenList.length !== 0) {
          this.tabsFilteredAsVisibleList.push(this.tabsFilteredAsHiddenList[0]);
          this.tabsFilteredAsHiddenList.splice(0, 1);
        }
        if (this.tabsFilteredAsHiddenList.length === 0) {
          this.isMoreTabMenuVisible = false;
          this.isMoreTabMenuMeasured = false;
        }
        let newActivePanelIndex = crossTabIndex;
        if (crossTabIndex === this.tabsFilteredAsVisibleList.length) newActivePanelIndex = crossTabIndex - 1;

        const newSelectedIndex = this.tabs.findIndex(
          element => element.id === this.tabsFilteredAsVisibleList[newActivePanelIndex].id
        );
        this.changeSelectedTabIdx(crossTabIndex)
        this.updateSelectedTab(newSelectedIndex);
        this.requestUpdate();
      }
    }

    private updateSelectedTab(newSelectedIndex: number) {
      const { tabs, panels } = this;
      const oldSelectedIndex = this.tabs.findIndex(element => element.hasAttribute("selected"));
      if (oldSelectedIndex === newSelectedIndex) {
        return;
      }

      if (tabs && panels) {
        Array.from(Array(this.slotted.length).keys()).forEach(index => {
          const tab = tabs[index];
          tab && tab.toggleAttribute("selected", false);
          const panel = panels[index];
          panel && panel.toggleAttribute("selected", false);
          if (tab) {
            const tabCopy = this.tabsCopyHash[this.getCopyTabId(tab)];
            if (tabCopy) {
              tabCopy.toggleAttribute("selected", false);
              this.isMoreTabMenuSelected = true;
            } else {
              this.isMoreTabMenuSelected = false;
            }
          }
        });
      }

      const newtab = tabs[newSelectedIndex];
      newtab && newtab.toggleAttribute("selected", true);
      const newpanel = panels[newSelectedIndex];
      newpanel && newpanel.toggleAttribute("selected", true);
      if (newtab) {
        const tabCopy = this.tabsCopyHash[this.getCopyTabId(newtab)];
        if (tabCopy) {
          tabCopy.toggleAttribute("selected", true);
          this.isMoreTabMenuSelected = true;
        } else {
          this.isMoreTabMenuSelected = false;
        }
      }

      this.dispatchEvent(
        new CustomEvent("selected-changed", {
          detail: {
            value: newSelectedIndex
          },
          composed: true,
          bubbles: true
        })
      );

      this.changeSelectedTabIdx(newSelectedIndex);
    }

    private changeSelectedTabIdx(newSelectedTabIdx: number) {
      this.selected = newSelectedTabIdx;
      // this.tabsFilteredAsVisibleList[newSelectedTabIdx].selected = true
      this.updateIsMoreTabMenuSelected();
    }

    handleOverlayClose() {
      if (this.menuOverlayElement) {
        this.menuOverlayElement.isOpen = false;
      }
    }

    handleTabKeydown(event: CustomEvent<TabKeyDownEvent>) {
      const { id, key, ctrlKey, shiftKey, altKey, srcEvent } = event.detail;

      const isMoreTriggerTab = this.isMoreTabMenuVisible ? id === MORE_MENU_TAB_TRIGGER_ID : false;

      const tab =
        !isMoreTriggerTab || !this.isMoreTabMenuVisible
          ? this.tabsHash[this.getNormalizedTabId(id)]
          : this.moreTabMenuElement;

      const isVisibleTab = this.isMoreTabMenuVisible ? tab && this.tabsVisibleIdxHash[tab.id] > -1 : true;
      const isHiddenTab = this.isMoreTabMenuVisible ? tab && this.tabsHiddenIdxHash[tab.id] > -1 : false;

      const firstVisibleTabIdx = 0;
      const lastVisibleTabIdx = this.isMoreTabMenuVisible
        ? this.tabsFilteredAsVisibleList.length - 1
        : this.tabs.length - 1;

      const firstHiddenTabIdx = this.isMoreTabMenuVisible ? this.tabsFilteredAsVisibleList.length : -1;
      const lastHiddenTabIdx = this.isMoreTabMenuVisible
        ? this.tabsFilteredAsVisibleList.length + this.tabsFilteredAsHiddenList.length - 1
        : -1;

      const makeNextCopyTabFocusByHiddenIdx = (hiddenListIdx: number) => {
        const nextTab = this.tabsFilteredAsHiddenList[hiddenListIdx];
        if (nextTab) {
          const nextCopyTab = this.tabsCopyHash[this.getCopyTabId(nextTab)];
          nextCopyTab && this.makeTabCopyFocus(nextCopyTab);
          !nextTab.disabled && this.updateHiddenIdPositiveTabIndex(nextTab);
        }
      };

      switch (key) {
        case Key.Tab: {
          if (isMoreTriggerTab) {
            // Support Shift + Tab from More to last visible tab
            if (!this.isMoreTabMenuOpen && shiftKey) {
              srcEvent.preventDefault();
              this.changeSelectedTabIdx(lastVisibleTabIdx);
            }
          } else if (isVisibleTab) {
            const oldSelectedIndex = this.slotted.findIndex(element => element.hasAttribute("selected"));
            this.changeSelectedTabIdx(oldSelectedIndex);
          } else if (isHiddenTab) {
            //
          }
          break;
        }
        case Key.End: {
          if (isMoreTriggerTab) {
            //
          } else if (isVisibleTab) {
            this.changeSelectedTabIdx(lastVisibleTabIdx);
          } else if (isHiddenTab) {
            this.changeSelectedTabIdx(lastHiddenTabIdx);
            makeNextCopyTabFocusByHiddenIdx(this.tabsFilteredAsHiddenList.length - 1);
          }
          break;
        }
        case Key.Home: {
          if (isMoreTriggerTab) {
            this.changeSelectedTabIdx(firstVisibleTabIdx);
          } else if (isVisibleTab) {
            this.changeSelectedTabIdx(firstVisibleTabIdx);
          } else if (isHiddenTab) {
            this.changeSelectedTabIdx(firstHiddenTabIdx);
            makeNextCopyTabFocusByHiddenIdx(0);
          }
          break;
        }
        case Key.ArrowLeft: {
          if (isMoreTriggerTab) {
            //
          } else if (isVisibleTab) {
            this.changeSelectedTabIdx(this.selected === firstVisibleTabIdx ? lastVisibleTabIdx : this.selected - 1);
          } else if (isHiddenTab) {
            //
          }
          break;
        }
        case Key.ArrowRight: {
          if (isMoreTriggerTab) {
            //
          } else if (isVisibleTab) {
            console.log('Arrow Right')
            this.changeSelectedTabIdx(this.selected === lastVisibleTabIdx ? firstVisibleTabIdx : this.selected + 1);
          } else if (isHiddenTab) {
            //
          }
          break;
        }
        case Key.ArrowUp: {
          if (isMoreTriggerTab) {
            //
          } else if (isVisibleTab) {
            //
          } else if (isHiddenTab) {
            const idx = this.selected === firstHiddenTabIdx ? lastHiddenTabIdx : this.selected - 1;
            this.changeSelectedTabIdx(idx);
            makeNextCopyTabFocusByHiddenIdx(idx - this.tabsFilteredAsVisibleList.length);
          }
          break;
        }
        case Key.ArrowDown: {
          if (isMoreTriggerTab) {
            //
          } else if (isVisibleTab) {
            //
          } else if (isHiddenTab) {
            const idx = this.selected === lastHiddenTabIdx ? firstHiddenTabIdx : this.selected + 1;
            this.changeSelectedTabIdx(idx);
            makeNextCopyTabFocusByHiddenIdx(idx - this.tabsFilteredAsVisibleList.length);
          }
          break;
        }
        case Key.Enter:
        case Key.Space: {
          if (isMoreTriggerTab) {
            const tabsFilteredAsHiddenNonDisabledList = this.tabsFilteredAsHiddenList.filter(t => !t.disabled);
            const t =
              tabsFilteredAsHiddenNonDisabledList.find(t => t.selected) || tabsFilteredAsHiddenNonDisabledList.length
                ? tabsFilteredAsHiddenNonDisabledList[0]
                : undefined;
            this.updateHiddenIdPositiveTabIndex(t);
            if (t) {
              const idx = this.tabsIdxHash[this.getNormalizedTabId(t.id)];
              if (idx !== -1) {
                this.updateSelectedTab(idx);
              }
            }
          } else if (tab && !tab.disabled) {
            const idx = this.tabsIdxHash[this.getNormalizedTabId(tab.id)];
            if (idx !== -1) {
              this.updateSelectedTab(idx);
            }
          }
          break;
        }
      }
    }

    private setupTabsEvents() {
      this.addEventListener("tab-click", this.handleTabClick as EventListener);
      this.addEventListener("tab-cross-click", this.handleTabCrossClick as EventListener);
      this.addEventListener("tab-keydown", this.handleTabKeydown as EventListener);
    }

    private teardownTabsEvents() {
      this.removeEventListener("tab-click", this.handleTabClick as EventListener);
      this.removeEventListener("tab-cross-click", this.handleTabCrossClick as EventListener);
      this.removeEventListener("tab-keydown", this.handleTabKeydown as EventListener);
    }

    private setupPanelsAndTabs() {
      if (this.tabSlotElement) {
        this.tabs = this.tabSlotElement.assignedElements() as DraggableTab.ELEMENT[];
      }
      if (this.panelSlotElement) {
        this.panels = this.panelSlotElement.assignedElements() as DraggableTabPanel.ELEMENT[];
      }
    }

    private async setupMoreTab() {
      if (this.direction !== "vertical") {
        if (this.moreTabMenuElement && !this.isMoreTabMenuMeasured) {
          this.moreTabMenuElement.classList.add("md-menu-overlay__more_tab--measuring");
          await this.moreTabMenuElement.updateComplete;
          if (this.moreTabMenuElement.offsetWidth) {
            this.moreTabMenuOffsetWidth = this.moreTabMenuElement.offsetWidth;
            this.isMoreTabMenuMeasured = true;
          }
          this.moreTabMenuElement.classList.remove("md-menu-overlay__more_tab--measuring");
        }
      }
    }

    private initializeSortable() {
      if (this.visibleTabsContainerElement && this.hiddenTabsContainerElement) {
        this.visibleTabsSortableInstance = Sortable.create(this.visibleTabsContainerElement, this.generateOptions());
        this.hiddenTabsSortableInstance = Sortable.create(this.hiddenTabsContainerElement, this.generateOptions());
      }
    }

    connectedCallback() {
      super.connectedCallback();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.teardownTabsEvents();
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.setupTabsEvents();
      this.setupPanelsAndTabs();
      this.linkPanelsAndTabs();
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (!this.visibleTabsSortableInstance && !this.hiddenTabsSortableInstance) {
        this.initializeSortable();
      }
      if (changedProperties.has("tabsFilteredAsHiddenList")) {
        this.tabsCopy = Array.from(this.tabsCopyHiddenListElements?.values() || []);
        this.tabsCopyHash = this.tabsCopy.reduce((acc, tab) => {
          acc[tab.id] = tab;
          return acc;
        }, {} as Record<TabId, DraggableTab.ELEMENT>);
      }

      if (changedProperties.has("tabsFilteredAsVisibleList") || changedProperties.has("tabsFilteredAsHiddenList")) {
        this.tabsVisibleIdxHash = this.tabsFilteredAsVisibleList.reduce((acc, tab, idx) => {
          acc[tab.id] = idx;
          return acc;
        }, {} as Record<TabId, number>);
        this.tabsHiddenIdxHash = this.tabsFilteredAsHiddenList.reduce((acc, tab, idx) => {
          acc[tab.id] = idx;
          return acc;
        }, {} as Record<TabId, number>);
      }

      if (changedProperties.has("isMoreTabMenuOpen")) {
        if (this.isMoreTabMenuVisible) {
          const oldValue = changedProperties.get("isMoreTabMenuOpen");
          if (this.isMoreTabMenuOpen && !oldValue) {
            // Add/Remove more overlay scroll
            if (this.moreItemsScrollLimit < this.tabsCopy.length) {
              this.isMoreTabMenuScrollable = true;
              this.moreTabMenuMaxHeight = `${this.measureHiddenTabsCopiesOffsetHeight()
                .slice(0, this.moreItemsScrollLimit)
                .reduce((acc, h) => {
                  acc += h;
                  return acc;
                }, 0)}px`;
            } else {
              this.isMoreTabMenuScrollable = false;
              this.moreTabMenuMaxHeight = null;
            }
          }
        }
      }
    }

    render() {
      return html`
        <div
          part="tabs-list"
          class="md-tab__list ${classMap({
            "md-tab__justified": this.justified && !this.isMoreTabMenuVisible
          })}"
          aria-disabled=${this.disabled}
          role="tablist"
        >
          <slot name="tab" style="visibility: hidden;display: block;width: 0;"></slot>
          <div id="visible-tabs-list" style="display: flex;flex-direction: row;width: 100%">
            ${repeat(
              this.tabsFilteredAsVisibleList,
              tab => nanoid(),
              tab => html`
                <md-draggable-tab
                  slot="draggable-item"
                  .closable="${tab.closable}"
                  .disabled="${tab.disabled}"
                  .selected="${tab.selected}"
                  id="${this.getCopyTabId(tab)}"
                  aria-label=${tab.ariaLabel}
                  aria-controls="${tab.id}"
                  .isCrossVisible=${true}
                  tabIndex="${this.tabsFilteredAsVisibleList[this.selected]?.id === tab.id ? 0 : -1}"
                >
                  ${unsafeHTML(tab.innerHTML)}
                </md-draggable-tab>
              `
            )}
          </div>

          <md-menu-overlay
            custom-width="${MORE_MENU_WIDTH}"
            class="md-menu-overlay__more ${classMap({
              "md-menu-overlay__more--hidden": this.isMoreTabMenuMeasured && !this.isMoreTabMenuVisible
            })}"
            placement="bottom-end"
            @menu-overlay-open="${() => (this.isMoreTabMenuOpen = true)}"
            @menu-overlay-close="${() => (this.isMoreTabMenuOpen = false)}"
          >
            <md-draggable-tab
              slot="menu-trigger"
              id="${MORE_MENU_TAB_TRIGGER_ID}"
              aria-label="${this.overlowLabel}"
              aria-haspopup="true"
              tabindex="${this.isMoreTabMenuVisible ? 0 : -1}"
              .selected=${this.isMoreTabMenuVisible ? this.isMoreTabMenuSelected : false}
              class="md-menu-overlay__more_tab ${classMap({
                "md-menu-overlay__more_tab--hidden": !this.isMoreTabMenuVisible
              })}"
            >
              <span>${this.overlowLabel}</span>
              <md-icon name="${!this.isMoreTabMenuOpen ? "arrow-down_16" : "arrow-up_16"}"></md-icon>
            </md-draggable-tab>
            <div
              id="hidden-tabs-list"
              part="hidden-tabs-list"
              class="md-tab__list md-menu-overlay__more_list"
              style="${styleMap(
                this.isMoreTabMenuScrollable && this.moreTabMenuMaxHeight
                  ? {
                      "overflow-y": "auto",
                      height: this.moreTabMenuMaxHeight,
                      "max-height": this.moreTabMenuMaxHeight
                    }
                  : {}
              )}"
            >
              <!-- <md-draggable sort> -->
              ${repeat(
                this.tabsFilteredAsHiddenList,
                tab => nanoid(),
                tab => html`
                  <md-draggable-tab
                    slot="draggable-item"
                    .disabled="${tab.disabled}"
                    .selected="${tab.selected}"
                    id="${this.getCopyTabId(tab)}"
                    aria-label=${tab.ariaLabel}
                    aria-controls="${tab.id}"
                    @click="${() => this.handleOverlayClose()}"
                    tabIndex="${this.tabHiddenIdPositiveTabIndex === tab.id ? 0 : -1}"
                  >
                    ${unsafeHTML(tab.innerHTML)}
                  </md-draggable-tab>
                `
              )}
            </div>
          </md-menu-overlay>
        </div>
        <div part="tabs-content" class="md-tab__content">
          <slot name="panel"></slot>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-tabs": DraggableTabs.ELEMENT;
  }
}
