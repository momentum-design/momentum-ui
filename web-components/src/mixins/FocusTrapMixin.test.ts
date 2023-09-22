import "@/components/combobox/ComboBox";
import "@/components/input/Input";
import { Key } from "@/constants";
import {
  defineCE,
  elementUpdated,
  fixture,
  fixtureCleanup,
  fixtureSync,
  nextFrame,
  oneEvent
} from "@open-wc/testing-helpers";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { AnyConstructor, FocusTrapMixin } from "./FocusTrapMixin";

Object.defineProperties(Element.prototype, {
  getBoundingClientRect: {
    value: jest.fn().mockReturnValue({
      width: 10,
      height: 10,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    })
  },
  getClientRects: {
    value: jest.fn().mockReturnValue(["1", "2"])
  }
});

Object.defineProperties(HTMLElement.prototype, {
  offsetWidth: {
    value: jest.fn().mockReturnValue(10)
  },
  offsetHeight: {
    value: jest.fn().mockReturnValue(10)
  }
});

document.hasFocus = jest.fn().mockImplementation(() => true);

describe("FocusTrap Mixin", () => {
  @customElement("focusable-child")
  class FocusableChild extends LitElement {
    @property({ type: Boolean }) isHidden = false;
    render() {
      return html`
        <input type="text" ?hidden=${this.isHidden} aria-hidden=${this.isHidden} />
        <md-input label="Default" placeholder="Enter Text"></md-input>
      `;
    }
  }

  @customElement("focusable-element")
  class FocusableElement extends LitElement {
    render() {
      return html`
        <p>Here's some <a href="#">focusable</a> <a href="#">parts</a> outside the trap.</p>
        <focus-trap>
          <button tabindex="-1"></button>
          <div tabindex="0"></div>
          <div>
            <button>Slotted Content</button>
          </div>
          <focusable-child></focusable-child>
          <focusable-child isHidden></focusable-child>
          <textarea disabled aria-disabled="true"></textarea>
          <audio></audio>
          <audio controls></audio>
          <img />
          <img usemap />
        </focus-trap>
        <p>Here's some more <a href="#">focusable</a> <a href="#">parts</a> outside the trap.</p>
      `;
    }
  }

  afterEach(fixtureCleanup);
  let el: FocusableElement;
  beforeEach(async () => {
    el = await fixture<FocusableElement>(
      html`
        <focusable-element></focusable-element>
      `
    );
  });

  @customElement("focus-trap")
  class FocusTrap extends FocusTrapMixin(FocusTrapMixin(LitElement)) {
    @query(".deactivate") disable!: HTMLButtonElement;
    @query(".activate") enable!: HTMLButtonElement;
    render() {
      return html`
        <p>Here's a focus trap <a href="#">with</a> <a href="#">some</a> <a href="#">focusable</a> parts.</p>
        <slot></slot>
        <button class="deactivate" @click=${this.deactivateFocusTrap}>Disable focus trap</button>
        <button class="activate" @click=${this.activateFocusTrap}>Enable focus trap</button>
      `;
    }
  }

  test("should applying to component", async () => {
    const tag = defineCE(class extends FocusTrapMixin(FocusTrap) {});
    const element = await fixture<FocusTrap>(`<${tag}></${tag}>`);
    expect(element).toBeDefined();
  });

  test("should traverse all nested shadow roots, slots and html elements", async () => {
    const focusTrap = el.shadowRoot!.querySelector<FocusTrap>("focus-trap")!;

    focusTrap.activeFocusTrap = true;
    focusTrap["activateFocusTrap"]!();
    await elementUpdated(focusTrap);

    focusTrap["activateFocusTrap"]!();
    focusTrap["setFocusableElements"]!();

    await elementUpdated(focusTrap);

    expect(focusTrap["focusableElements"]!.length).toEqual(12);
  });

  test("should initialize focusableElements on firstUpdated lifecycle", async () => {
    const mixin = (superclass: AnyConstructor) =>
      class extends superclass {
        protected firstUpdated(changedProperties: PropertyValues) {
          super.firstUpdated(changedProperties);
          this.dispatchEvent(new CustomEvent("first-updated"));
        }
      };
    const Tag = defineCE(class extends mixin(FocusTrap) {});
    const element = fixtureSync(`<${Tag}></${Tag}>`);
    const event = await oneEvent(element, "first-updated");
    expect(event).toBeDefined();
  });

  test("should handle lifecycle callbacks", async () => {
    const tag = defineCE(
      class extends FocusTrap {
        connectedCallback() {
          super.connectedCallback();
          this.dispatchEvent(new CustomEvent("connected-callback"));
        }
        disconnectedCallback() {
          super.disconnectedCallback();
          this.dispatchEvent(new CustomEvent("disconnected-callback"));
        }
      }
    );
    const element = document.createElement(`${tag}`) as FocusTrap;
    setTimeout(() => element.connectedCallback());
    const connectedEvent = await oneEvent(element, "connected-callback");
    expect(connectedEvent).toBeDefined();

    const focusTrap = await fixture<FocusTrap>(element);
    focusTrap.parentNode!.removeChild(element);
    setTimeout(() => focusTrap.disconnectedCallback());
    const disconnectedEvent = await oneEvent(focusTrap, "disconnected-callback");
    expect(disconnectedEvent).toBeDefined();
  });

  test("should handle internal event listeners", async () => {
    const focusTrap = el.shadowRoot!.querySelector<FocusTrap>("focus-trap")!;

    focusTrap["activateFocusTrap"]!();
    focusTrap["setFocusableElements"]!();

    await elementUpdated(focusTrap);

    const event = new MouseEvent("click");
    focusTrap.enable.dispatchEvent(event);

    await elementUpdated(focusTrap);

    const keyEvent = new KeyboardEvent("keydown", {
      code: Key.Tab
    });
    const shiftKeyEvent = new KeyboardEvent("keydown", {
      code: Key.Tab,
      shiftKey: true
    });

    const arrowEvent = new KeyboardEvent("keydown", {
      code: Key.ArrowDown
    });

    focusTrap.dispatchEvent(keyEvent);

    await nextFrame();
    await elementUpdated(el);

    expect(focusTrap.focusTrapIndex).toEqual(0);
    expect(focusTrap["getDeepActiveElement"]!()).toEqual(focusTrap["focusableElements"]![0]);

    focusTrap.focusTrapIndex = 0;
    await elementUpdated(focusTrap);

    focusTrap.dispatchEvent(shiftKeyEvent);

    await nextFrame();
    await elementUpdated(el);

    expect(focusTrap.focusTrapIndex).toEqual(11);
    expect(focusTrap["getDeepActiveElement"]!()).toEqual(focusTrap["focusableElements"]![11]);

    focusTrap.focusTrapIndex = 11;
    await elementUpdated(focusTrap);

    focusTrap.dispatchEvent(arrowEvent);

    await nextFrame();
    await elementUpdated(el);

    expect(focusTrap.focusTrapIndex).toEqual(11);
    expect(focusTrap["getDeepActiveElement"]!()).toEqual(focusTrap["focusableElements"]![11]);

    focusTrap.focusTrapIndex = 11;

    await elementUpdated(focusTrap);

    const clickEvent = new MouseEvent("click");

    document.dispatchEvent(clickEvent);
    focusTrap.blur();

    await nextFrame();
    await elementUpdated(el);

    expect(focusTrap.focusTrapIndex).toEqual(null);
  });

  test("should deactivate focus trap is property is provided", async () => {
    const focusTrap = el.shadowRoot!.querySelector<FocusTrap>("focus-trap")!;

    focusTrap["activateFocusTrap"]!();
    focusTrap["setFocusableElements"]!();

    await elementUpdated(focusTrap);

    const event = new MouseEvent("click");
    focusTrap.enable.dispatchEvent(event);

    await elementUpdated(focusTrap);
    expect(focusTrap.activeFocusTrap).toBeTruthy();

    focusTrap.disable.dispatchEvent(event);
    await elementUpdated(focusTrap);

    expect(focusTrap.activeFocusTrap).toBeFalsy();
    expect(focusTrap.focusTrapIndex).toBeNull();

    const keyEvent = new KeyboardEvent("keydown", {
      code: Key.Tab
    });
    focusTrap.dispatchEvent(keyEvent);

    await elementUpdated(focusTrap);

    expect(focusTrap.activeFocusTrap).toBeFalsy();

    focusTrap.enable.dispatchEvent(event);

    await elementUpdated(focusTrap);

    expect(focusTrap.activeFocusTrap).toBeTruthy();
  });

  test("should focus custom element", async () => {
    const focusTrap = el.shadowRoot!.querySelector<FocusTrap>("focus-trap");
    const focusableChild = focusTrap!.querySelector<FocusableChild>("focusable-child");

    focusableChild!.tabIndex = 0;
    focusTrap!["activateFocusTrap"]!();
    focusTrap!["setFocusableElements"]!();

    await elementUpdated(focusTrap!);

    const keyEvent = new KeyboardEvent("keydown", {
      code: Key.Tab
    });

    const event = new MouseEvent("click");
    focusTrap!.enable.dispatchEvent(event);

    await elementUpdated(focusTrap!);

    focusTrap!.dispatchEvent(keyEvent);

    await nextFrame();
    await elementUpdated(el);

    focusTrap!.dispatchEvent(keyEvent);

    await nextFrame();
    await elementUpdated(el);

    focusTrap!.dispatchEvent(keyEvent);

    await nextFrame();
    await elementUpdated(el);

    focusTrap!.dispatchEvent(keyEvent);

    await nextFrame();
    await elementUpdated(el);

    focusTrap!.dispatchEvent(keyEvent);

    await nextFrame();
    await elementUpdated(el);

    focusTrap!.dispatchEvent(keyEvent);

    await nextFrame();
    await elementUpdated(el);
    expect(focusTrap!["getDeepActiveElement"]!()).toEqual(focusableChild);
  });

  test("should prefer autofocus element in tab sequence", async () => {
    const focusTrap = el.shadowRoot!.querySelector<FocusTrap>("focus-trap");
    const focusableChild = focusTrap!.querySelector<FocusableChild>("focusable-child");
    const mdInput = focusableChild!.shadowRoot!.querySelector("md-input");

    mdInput!.autofocus = true;

    focusTrap!["activateFocusTrap"]!();
    focusTrap!["setFocusableElements"]!();

    await nextFrame();
    await elementUpdated(el);

    focusTrap!["setInitialFocus"]!();
    await nextFrame();
    await elementUpdated(el);

    const input = mdInput!.shadowRoot!.querySelector("input");

    expect(focusTrap!["getDeepActiveElement"]!()).toEqual(input);
  });

  test("should change focus trap index on click", async () => {
    const focusTrap = el.shadowRoot!.querySelector<FocusTrap>("focus-trap");

    focusTrap!["activateFocusTrap"]!();
    focusTrap!["setFocusableElements"]!();
    focusTrap!["initialFocusComplete"] = true;

    await elementUpdated(focusTrap!);

    const button = focusTrap!.querySelector<HTMLButtonElement>("div button");

    await elementUpdated(focusTrap!);
    button!.click();

    await nextFrame();
    expect(focusTrap!.focusTrapIndex).toEqual(4);
    expect(focusTrap!["getDeepActiveElement"]!()).toEqual(button);
  });

  test("should change focus trap index if focus-visible event was dispatched", async () => {
    const focusTrap = el.shadowRoot!.querySelector<FocusTrap>("focus-trap");
    const focusableChild = focusTrap!.querySelector<FocusableChild>("focusable-child");

    focusTrap!["activateFocusTrap"]!();
    focusTrap!["setFocusableElements"]!();
    focusTrap!["initialFocusComplete"] = true;
    document.dispatchEvent(new CustomEvent("on-widget-update"));


    await nextFrame();
    await elementUpdated(el);

    const mdInput = focusableChild!.shadowRoot!.querySelector("md-input");
    const input = mdInput!.shadowRoot!.querySelector("input");

    input!.click();

    await nextFrame();
    expect(focusTrap!.focusTrapIndex).toEqual(6);
    expect(focusTrap!["getDeepActiveElement"]!()).toEqual(input);
  });

  test("szhould change focus trap index if new focusable element was clicked", async () => {
    const focusTrap = el.shadowRoot!.querySelector<FocusTrap>("focus-trap");
    const focusableChild = focusTrap!.querySelector<FocusableChild>("focusable-child");
    const mdInput = focusableChild!.shadowRoot!.querySelector("md-input");
    const input = mdInput!.shadowRoot!.querySelector("input");

    mdInput!.tabIndex = -1;
    input!.tabIndex = -1;

    await elementUpdated(el);

    focusTrap!["activateFocusTrap"]!();
    focusTrap!["setFocusableElements"]!();

    await nextFrame();
    await elementUpdated(el);

    input!.focus();
    await nextFrame();
    await elementUpdated(el);

    expect(focusTrap!["getDeepActiveElement"]!()).toEqual(input);
  });

  test("should skip child focus for combobox only ul list", async () => {
    @customElement("combobox-element")
    class comboboxElement extends LitElement {
      render() {
        return html`
          <focus-trap>
            <md-combobox .options=${["Option1", "Option2", "Option3"]}></md-combobox>
          </focus-trap>
        `;
      }
    }
    const elWithCB = await fixture<comboboxElement>(
      html`
        <combobox-element></combobox-element>
      `
    );
    const focusTrap = elWithCB.shadowRoot!.querySelector<FocusTrap>("focus-trap");
    const combobox = focusTrap!.querySelector("md-combobox");

    const input = combobox!.shadowRoot?.querySelector("input");

    await elementUpdated(elWithCB);

    input!.click(); // Click on input to show the ul and re-evaluate focusable elements

    await nextFrame();
    await elementUpdated(elWithCB);

    focusTrap!["activateFocusTrap"]!();
    focusTrap!["setFocusableElements"]!();

    expect(focusTrap!["getDeepActiveElement"]!()).toEqual(input);

  });

  test("should handle focusTrap when activeIndex is last and focusTrapIndex is 0", async () => {
    const focusTrap = el.shadowRoot!.querySelector<FocusTrap>("focus-trap");
    const focusableChild = focusTrap?.shadowRoot?.querySelectorAll<FocusableChild>("button");

    focusTrap!["activateFocusTrap"]!();
    focusTrap!["setFocusableElements"]!();
    focusTrap!["initialFocusComplete"] = true;
    focusTrap!.focusTrapIndex = 0;

    if(focusableChild){
      focusableChild[focusableChild.length-1].autofocus = true;
      focusableChild[focusableChild.length-1].focus()
    }

    focusTrap!["activateFocusTrap"]!();
    focusTrap!["setFocusableElements"]!();
    document.dispatchEvent(new CustomEvent("on-widget-update"));

    await nextFrame();
    await elementUpdated(el);
  
    await nextFrame();
    await elementUpdated(el);
  
    const tabKeyEvent = new KeyboardEvent("keydown", {
      code: Key.Tab
    });
    
    focusTrap!.dispatchEvent(tabKeyEvent);
  
    await nextFrame();
    await elementUpdated(el);

    expect(focusTrap!.focusTrapIndex).toEqual(0);
    expect(focusTrap!["getDeepActiveElement"]!()).toEqual(focusTrap!["focusableElements"]![0]);
  });
});
