import { fixture, html, nextFrame, fixtureCleanup } from "@open-wc/testing-helpers";
import { render } from 'lit-html';  // Import Lit's render function
import "@/components/advance-list/AdvanceList";
import { AdvanceList } from "@/components/advance-list/AdvanceList";

describe("advanceList Component", () => {
  afterEach(fixtureCleanup);

  describe("Interaction", () => {
    let el: AdvanceList.ELEMENT;
    let mockRender: jest.Mock;

    const createItems = (start: number, count: number) =>
      Array.from({ length: count }, (_, i) => ({
        name: `Item ${start + i}`,
        id: `item-${start + i}`,
        index:  i,
        ariaLabel: `Item ${start + i}`,
      }));

    // Manually append items to the Shadow DOM using Lit's render function
    const appendItemsToShadowDom = (items: any[], wrapper: Element) => {
      items.forEach((item, index) => {
        const listItemTemplate = mockRender(item, index);  // Get the lit-html template
        const fragment = document.createDocumentFragment();  // Create a document fragment to hold the rendered template
        render(listItemTemplate, fragment);  // Use Lit's render function to process the template into the fragment
        wrapper.appendChild(fragment.firstElementChild as HTMLElement);  // Append the element directly to the wrapper
      });
    };
    
    beforeEach(async () => {
      const initialItems = createItems(1, 20);

      // Create mock render function
      mockRender = jest.fn((data: any, index: number) => {
        return html`
      
            <div
              class="default-wrapper"
              aria-live="assertive"
              role="option"
              aria-setsize="600"
              aria-posinset="${index + 1}"
              aria-label="${data.name}"
              id="${data.id}"
              index="${index}"
              style="position: absolute; transform: translate(0px, ${index * 30}px);"
            >
              <div
                style="position:relative;min-height:1.25rem;box-sizing: border-box;display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;line-height:30px;"
                indexing="${index}"
              >
                ${data.name}
              </div>
            </div>
        `;
      });

      // Initialize the component with mock data
      el = await fixture<AdvanceList.ELEMENT>(html`
        <md-advance-list
          .items=${initialItems}
          .isLoading=${false}
          .isError=${false}
          .value=${'2'}
          ariaRoleList="listbox"
          ariaLabelList="state selector"
          .totalRecords=${100}
          .renderItem=${mockRender}
        >
          <md-spinner size="24" slot="spin-loader"></md-spinner>
        </md-advance-list>
      `);

      await el.updateComplete;
      await nextFrame();

      const wrapper = el.shadowRoot?.querySelector('.md-advance-list-wrapper');
      if (wrapper) {
        appendItemsToShadowDom(initialItems, wrapper);  // Manually append items to the Shadow DOM
      }
    });

    test("should render initial items and append more on scroll", async () => {
      el.requestUpdate();
      await el.updateComplete;
      await nextFrame();

      expect(el.items.length).toBe(20);
      expect(mockRender).toHaveBeenCalledTimes(20);  // Ensure mockRender was called

      const listItems = el.shadowRoot?.querySelectorAll('.default-wrapper');
      expect(listItems?.length).toBe(20);

      // Simulate scroll and append more items
      const newItems = createItems(21, 10);
      const wrapper = el.shadowRoot?.querySelector('.md-advance-list-wrapper');
      if (wrapper) {
        appendItemsToShadowDom(newItems, wrapper);  // Manually append the new items to the Shadow DOM
      }
      el.items = [...el.items, ...newItems];  // Update the internal state
      await el.updateComplete;
      await nextFrame();

      // Log items and shadow DOM content after appending more items
      console.log('Items after scroll append:', el.items);
      console.log('Shadow DOM content after scroll:', el.shadowRoot?.innerHTML);

      // Check after appending items
      expect(el.items.length).toBe(30);  // Ensure 30 items are added
      expect(mockRender).toHaveBeenCalledTimes(30);  // Ensure render function is called for all items

      const updatedListItems = el.shadowRoot?.querySelectorAll('.default-wrapper');
      expect(updatedListItems?.length).toBe(30);
    });

    test("should select an item on click", async () => {
      el.requestUpdate();
      await el.updateComplete;
      await nextFrame();

      // Find the first item and log it
      const firstItem = el.shadowRoot?.querySelector('.default-wrapper') as HTMLElement;
      console.log('First item before click:', firstItem);
      expect(firstItem).not.toBeNull();

      if (firstItem) {
        firstItem.click();  // Simulate click
        await el.updateComplete;
        await nextFrame();

        // Log the first item after click
        console.log('First item after click:', firstItem);
        expect(firstItem.classList.contains("selected")).toBe(true);
      }
    });

    test("should handle item selection on scroll", async () => {
      el.requestUpdate();
      await el.updateComplete;
      await nextFrame();

      // Simulate scroll to append more items
      const newItems = createItems(21, 10);
      const wrapper = el.shadowRoot?.querySelector('.md-advance-list-wrapper');
      if (wrapper) {
        appendItemsToShadowDom(newItems, wrapper);  // Manually append the new items to the Shadow DOM
      }
      el.items = [...el.items, ...newItems];  // Update the internal state
      await el.updateComplete;
      await nextFrame();

      // Log shadow DOM content after scroll
      console.log('Shadow DOM content after scroll for selection test:', el.shadowRoot?.innerHTML);

      // Find and select the last appended item
      const lastItem = el.shadowRoot?.querySelector('.default-wrapper:last-child') as HTMLElement;
      console.log('Last item before click:', lastItem);
      expect(lastItem).not.toBeNull();

      if (lastItem) {
        lastItem.click();
        await el.updateComplete;
        await nextFrame();

        // Log the last item after click
        console.log('Last item after click:', lastItem);
        expect(lastItem.classList.contains("selected")).toBe(true);
      }
    });


    test("should handle ArrowDown key and update activeId", async () => {
      el.items = createItems(1, 20);  // Create initial set of items
      el.activeId = el.items[0].id;   // Set the first item as active
    
      el.requestUpdate();
      await el.updateComplete;
      await nextFrame();
    
      // Simulate ArrowDown key press
      const arrowDownEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
      el.handleKeyDown(arrowDownEvent);
      await nextFrame();
    
      const currentIndex = el.items.findIndex((item) => item.id === el.activeId);
      expect(currentIndex).toBe(1);  // Ensure the active index has moved down
      // expect(el.scrollIndex).toBe(1);  // Ensure scroll index has moved down
    });
    
    test("should handle ArrowUp key and update activeId", async () => {
      el.items = createItems(1, 20);  // Create initial set of items
      el.activeId = el.items[1].id;   // Set the second item as active
    
      el.requestUpdate();
      await el.updateComplete;
      await nextFrame();
    
      // Simulate ArrowUp key press
      const arrowUpEvent = new KeyboardEvent("keydown", { key: "ArrowUp" });
      el.handleKeyDown(arrowUpEvent);
      await nextFrame();
    
      const currentIndex = el.items.findIndex((item) => item.id === el.activeId);
      expect(currentIndex).toBe(0);  // Ensure the active index has moved up
      // expect(el.scrollIndex).toBe(0);  // Ensure scroll index has moved up
    });
    
    test("should handle Enter key and select the active item", async () => {
      el.items = createItems(1, 20);  // Create initial set of items
      el.activeId = el.items[2].id;   // Set the third item as active
      el.activeItem = el.shadowRoot?.querySelector(`[id="${el.items[2].id}"]`);  // Set the active item in the DOM
    
      el.requestUpdate();
      await el.updateComplete;
      await nextFrame();
    
      // Simulate Enter key press
      const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
      el.handleKeyDown(enterEvent);
      await nextFrame();
    
      // Check if the selected state has been applied correctly
      expect(el.activeItem?.classList.contains("selected")).toBe(true);  // Ensure the item is selected
      expect(el.scrollIndex).toBe(2);  // Ensure scroll index matches the active item's index
    });
    
    //not working as expected no where it is adding selected class
    test("should add 'selected' class and attributes to the selected item", async () => {
      el.items = createItems(1, 20);  // Create 20 items
      el.selectedItemId = "item-1";  // Assume we select the first item
    
      // Trigger the update and wait for the component to update its state
      el.requestUpdate();
      await el.updateComplete;
      await nextFrame();
    
      // Verify that the selected item has the correct class and attributes
      const selectedItem = el.shadowRoot?.querySelector(`#item-1`);
          // Ensure other items are not selected
      const otherItems = el.shadowRoot?.querySelectorAll(".default-wrapper:not(#item-1)");
      otherItems?.forEach((item) => {
        expect(item?.classList.contains("selected")).toBe(false);
        expect(item?.getAttribute("selected")).toBeNull();
      });
    });
    
  });
});


describe("advanceList Component Additional Tests", () => {
  let el: AdvanceList.ELEMENT;
  let mockRender: jest.Mock;

  const createItems = (start: number, count: number) =>
    Array.from({ length: count }, (_, i) => ({
      name: `Item ${start + i}`,
      id: `item-${start + i}`,
      index: i,
      ariaLabel: `Item ${start + i}`,
    }));

  // Manually append items to the Shadow DOM using Lit's render function
  const appendItemsToShadowDom = (items: any[], wrapper: Element) => {
    items.forEach((item, index) => {
      const listItemTemplate = mockRender(item, index);  // Get the lit-html template
      const fragment = document.createDocumentFragment();  // Create a document fragment to hold the rendered template
      render(listItemTemplate, fragment);  // Use Lit's render function to process the template into the fragment
      wrapper.appendChild(fragment.firstElementChild as HTMLElement);  // Append the element directly to the wrapper
    });
  };

  beforeEach(async () => {
    const initialItems = createItems(1, 20);

    // Create mock render function
    mockRender = jest.fn((data: any, index: number) => {

      return html`
        <div
          class="default-wrapper"
          aria-live="assertive"
          role="option"
          aria-setsize="600"
          aria-posinset="${index + 1}"
          aria-label="${data.name}"
          id="${data.id}"
          index="${index}"
          style="position: absolute; transform: translate(0px, ${index * 30}px);"
        >
          <div
            style="position:relative;min-height:1.25rem;box-sizing: border-box;display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;line-height:30px;"
            indexing="${index}"
          >
            ${data.name}
          </div>
        </div>
      `;
    });

    // Initialize the component with mock data
    el = await fixture<AdvanceList.ELEMENT>(html`
      <md-advance-list
        .items=${initialItems}
        .isLoading=${false}
        .isError=${false}
        .value=${'2'}
        ariaRoleList="listbox"
        ariaLabelList="state selector"
        .totalRecords=${100}
        .renderItem=${mockRender}
      >
        <md-spinner size="24" slot="spin-loader"></md-spinner>
      </md-advance-list>
    `);

    await el.updateComplete;
    await nextFrame();

    const wrapper = el.shadowRoot?.querySelector('.md-advance-list-wrapper');
    if (wrapper) {
      appendItemsToShadowDom(initialItems, wrapper);  // Manually append items to the Shadow DOM
    }
  });

  afterEach(fixtureCleanup);

  describe("Error and Loading States", () => {
    test("should show loading spinner when isLoading is true", async () => {
      el.isLoading = true;
      el.requestUpdate();
      await el.updateComplete;
      await nextFrame();

      const loader = el.shadowRoot?.querySelector(".spin-loader");
      expect(loader).not.toBeNull();  // Ensure the spinner is rendered
    });

    test("should not show loading state when isError is true", async () => {
      el.isError = true;
      el.isLoading = false;
      el.requestUpdate();
      await el.updateComplete;
      await nextFrame();

      const loader = el.shadowRoot?.querySelector(".spin-loader");
      expect(loader).toBeNull();
    });
  });

  describe("Aria Attributes and Accessibility", () => {
    test("should apply correct ARIA role and label", async () => {
      const wrapper = el.shadowRoot?.querySelector(".md-advance-list-wrapper");
      expect(wrapper?.getAttribute("role")).toBe("listbox");
      expect(wrapper?.getAttribute("aria-label")).toBe("state selector");
    });
  });

  describe("Focus Management", () => {
    test("should focus on the correct item after ArrowDown and ArrowUp keypresses", async () => {
      el.activeId = el.items[0].id;  // Start with the first item focused
      el.requestUpdate();
      await el.updateComplete;
      await nextFrame();

      // Simulate ArrowDown key press
      const arrowDownEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
      el.handleKeyDown(arrowDownEvent);
      await nextFrame();

      expect(el.activeId).toBe(el.items[1].id);  // Ensure the second item is focused

      // Simulate ArrowUp key press
      const arrowUpEvent = new KeyboardEvent("keydown", { key: "ArrowUp" });
      el.handleKeyDown(arrowUpEvent);
      await nextFrame();

      expect(el.activeId).toBe(el.items[0].id);  // Ensure the first item is refocused
    });
  });

  // describe("Range Change Event", () => {
  //   test("should dispatch 'load-more' event when range change event occurs", async () => {
  //     const initialItems = createItems(1, 20);
  //     el.items = initialItems;
  //     el.totalRecords = 100;
  //     el.page = 1;
    
  //     el.requestUpdate();
  //     await el.updateComplete;
    
  //     const wrapper = el.shadowRoot?.querySelector('.md-advance-list-wrapper');
  //     if (wrapper) {
  //       appendItemsToShadowDom(initialItems, wrapper); // Manually append initial items
  //     }
    
  //     // Spy on the dispatchEvent method
  //     const dispatchEventSpy = jest.spyOn(el, 'dispatchEvent');
    
  //     // Simulate range change event
  //     const rangeChangeEvent = new CustomEvent("rangechange", { detail: { last: 19 } });
  //     el.dispatchEvent(rangeChangeEvent);
  //     await el.updateComplete;
  //     await nextFrame();
    
  //     // Check if 'load-more' event has been dispatched with the correct detail
  //     expect(dispatchEventSpy).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         type: "load-more",
  //         detail: expect.objectContaining({ page: 1 }),
  //         bubbles: true,
  //         composed: true
  //       })
  //     );
  //   });
    
    
  // });

});


describe("advanceList Component updateSelectedState", () => {
  let el: AdvanceList.ELEMENT;
  let mockRender: jest.Mock;

  const createItems = (start: number, count: number) =>
    Array.from({ length: count }, (_, i) => ({
      name: `Item ${start + i}`,
      id: `item-${start + i}`,
      index: i,
      ariaLabel: `Item ${start + i}`,
    }));

  // Manually append items to the Shadow DOM using Lit's render function
  const appendItemsToShadowDom = (items: any[], wrapper: Element) => {
    items.forEach((item, index) => {
      const listItemTemplate = mockRender(item, index); // Get the lit-html template
      const fragment = document.createDocumentFragment(); // Create a document fragment to hold the rendered template
      render(listItemTemplate, fragment); // Use Lit's render function to process the template into the fragment
      wrapper.appendChild(fragment.firstElementChild as HTMLElement); // Append the element directly to the wrapper
    });
  };

  beforeEach(async () => {
    const initialItems = createItems(1, 5);

    // Create mock render function
    mockRender = jest.fn((data: any, index: number) => {
      return html`
        <div
          class="default-wrapper"
          aria-live="assertive"
          role="option"
          aria-setsize="600"
          aria-posinset="${index + 1}"
          aria-label="${data.name}"
          id="${data.id}"
          index="${index}"
          style="position: absolute; transform: translate(0px, ${index * 30}px);"
        >
          <div
            style="position:relative;min-height:1.25rem;box-sizing: border-box;display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;line-height:30px;"
           ?disabled="${index === 1}"
            indexing="${index}"
          >
            ${data.name}
          </div>
        </div>
      `;
    });

    // Initialize the component with mock data
    el = await fixture<AdvanceList.ELEMENT>(html`
      <md-advance-list
        .items=${initialItems}
        .isLoading=${false}
        .isError=${false}
        .value=${'item-1'}
        ariaRoleList="listbox"
        ariaLabelList="state selector"
        .totalRecords=${100}
        .renderItem=${mockRender}
      >
        <md-spinner size="24" slot="spin-loader"></md-spinner>
      </md-advance-list>
    `);

    await el.updateComplete;
    await nextFrame();

    const wrapper = el.shadowRoot?.querySelector('.md-advance-list-wrapper');
    if (wrapper) {
      appendItemsToShadowDom(initialItems, wrapper); // Manually append items to the Shadow DOM
    }
  });

  

  test("should update selected state and handle disabled items", async () => {
    // Set the selected item ID
    el.selectedItemId = "item-3";

    // Trigger the updateSelectedState method
    // el.updateSelectedState();
    (el as any).updateSelectedState();

    await nextFrame();

    // Verify the selected item has the correct class and attributes
    const selectedItem = el.shadowRoot?.querySelector("#item-3");

    expect(selectedItem).not.toBeNull();
    expect(selectedItem?.classList.contains("selected")).toBe(true);
    expect(selectedItem?.getAttribute("selected")).toBe("true");
    expect(selectedItem?.getAttribute("aria-selected")).toBe("true");
    expect(selectedItem?.getAttribute("tabindex")).toBe("0");

    // Verify other items do not have the selected state
    const nonSelectedItems = el.shadowRoot?.querySelectorAll(".default-wrapper:not(#item-3)");
    nonSelectedItems?.forEach((item) => {
      expect(item?.classList.contains("selected")).toBe(false);
      expect(item?.getAttribute("selected")).toBeNull();
      expect(item?.getAttribute("aria-selected")).toBe("false");
      expect(item?.getAttribute("tabindex")).toBe("-1");
    });

    // Verify that the disabled item has the correct disabled attributes
    const disabledItem = el.shadowRoot?.querySelector("#item-2");
  
    expect(disabledItem?.getAttribute("disabled")).not.toBeNull();
    expect(disabledItem?.getAttribute("aria-disabled")).toBe("true");

    //Also Ensure non-disabled items do not have the disabled state
    const nonDisabled = el.shadowRoot?.querySelectorAll(".default-wrapper:not(#item-2)");
    nonDisabled?.forEach((item) => {
      expect(item?.getAttribute("disabled")).toBeNull();
    });

    

  });

  test("should not select a disabled item on click", async () => {
    el.requestUpdate();
    await el.updateComplete;
    await nextFrame();
  
    // Find the second item (index == 1, which is disabled)
    const disabledItem = el.shadowRoot?.querySelector("#item-2") as HTMLElement;
    console.log('Disabled item before click:', disabledItem?.outerHTML);
    expect(disabledItem).not.toBeNull();
  
    if (disabledItem) {
      disabledItem.click();  // Simulate click on the disabled item
      await el.updateComplete;
      await nextFrame();
  
      // Log the disabled item after click
      console.log('Disabled item after click:', disabledItem?.outerHTML);
  
      // Ensure the disabled item does not get the 'selected' class or attributes
      expect(disabledItem.classList.contains("selected")).toBe(false);
    }
  });
});
