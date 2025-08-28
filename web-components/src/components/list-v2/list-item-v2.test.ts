import "@/components/button/Button";
import { Key } from "@/constants";
import { fixture, html } from "@open-wc/testing-helpers";
import { fireEvent } from "@testing-library/dom";
import { screen } from "shadow-dom-testing-library";
import "./list-item-v2";
import { ListItemV2 } from "./list-item-v2";

describe("<md-list-item-v2>", () => {
  let listItem: ListItemV2.ELEMENT;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(async () => {
    listItem = await fixture(html`<md-list-item-v2></md-list-item-v2>`);
  });

  it("should render", async () => {
    expect(listItem).toBeInTheDocument();
    expect(listItem).toBeInstanceOf(ListItemV2.ELEMENT);
    expect(listItem).toHaveAttribute("role", "listitem");
    expect(listItem).toHaveAttribute("tabindex", "0");
  });

  it("should render label attribute", async () => {
    const label = "Test Label";
    listItem.label = label;
    await listItem.updateComplete;

    expect(screen.getByShadowText(label)).not.toBeNull();
  });

  describe("slotted panel content", () => {
    it("should not dispatch click events", async () => {
      listItem = await fixture(
        html`<md-list-item-v2>
          <md-button slot="panel">Content Button</md-button>
        </md-list-item-v2>`
      );
      const clickHandler = jest.fn();
      listItem.addEventListener("list-item-click", clickHandler);

      fireEvent.click(screen.getByShadowRole("button", { name: "Content Button" }));
      await listItem.updateComplete;

      expect(clickHandler).not.toHaveBeenCalled();
    });

    it("should not dispatch arrow key down event", async () => {
      listItem = await fixture(
        html`<md-list-item-v2>
          <md-button slot="panel">Content Button</md-button>
        </md-list-item-v2>`
      );
      const keyDownHandler = jest.fn();
      listItem.addEventListener("list-item-expanded", keyDownHandler);

      fireEvent.keyDown(screen.getByShadowRole("button", { name: "Content Button" }), { key: Key.ArrowDown });
      await listItem.updateComplete;

      expect(keyDownHandler).not.toHaveBeenCalled();
    });
  });

  describe("when expandable", () => {
    beforeEach(async () => {
      listItem = await fixture(html`<md-list-item-v2 expandable></md-list-item-v2>`);
    });

    it("should show expand button with default label", async () => {
      expect(screen.getByShadowRole("button", { name: "Expand" })).not.toBeNull();
    });

    it("should show expand button with custom label", async () => {
      listItem.expandLabel = "Custom Expand";
      await listItem.updateComplete;

      expect(screen.getByShadowRole("button", { name: "Custom Expand" })).not.toBeNull();
    });
  });

  describe("leading controls", () => {
    it("should render", async () => {
      listItem = await fixture(
        html`<md-list-item-v2><md-button slot="leading-controls">Leading Control</md-button></md-list-item-v2>`
      );

      expect(screen.getByShadowRole("button", { name: "Leading Control" })).toBeInTheDocument();
    });

    it("should not dispatch click events", async () => {
      listItem = await fixture(
        html`<md-list-item-v2>
          <md-button slot="leading-controls">Leading Control</md-button>
        </md-list-item-v2>`
      );
      const clickHandler = jest.fn();
      listItem.addEventListener("list-item-click", clickHandler);

      fireEvent.click(screen.getByShadowRole("button", { name: "Leading Control" }));
      await listItem.updateComplete;

      expect(clickHandler).not.toHaveBeenCalled();
    });

    it("should not trigger expand when pressing ArrowRight Key", async () => {
      listItem = await fixture(
        html`<md-list-item-v2 expandable>
          <md-button slot="leading-controls">Leading Control</md-button>
        </md-list-item-v2>`
      );
      const button = screen.getByShadowRole("button", { name: "Leading Control" });

      fireEvent.keyDown(button, { key: Key.ArrowRight });
      await listItem.updateComplete;

      expect(listItem.expanded).toBe(false);
    });

    it("should not trigger collapse when pressing ArrowLeft Key", async () => {
      listItem = await fixture(
        html`<md-list-item-v2 expandable expanded>
          <md-button slot="leading-controls">Leading Control</md-button>
        </md-list-item-v2>`
      );
      const button = screen.getByShadowRole("button", { name: "Leading Control" });

      fireEvent.keyDown(button, { key: Key.ArrowLeft });
      await listItem.updateComplete;

      expect(listItem.expanded).toBe(true);
    });
  });

  describe("trailing controls", () => {
    it("should render", async () => {
      listItem = await fixture(
        html`<md-list-item-v2>
          <md-button slot="trailing-controls">Trailing Control</md-button>
        </md-list-item-v2>`
      );

      expect(screen.getByShadowRole("button", { name: "Trailing Control" })).toBeInTheDocument();
    });

    it("should not dispatch click events", async () => {
      listItem = await fixture(
        html`<md-list-item-v2>
          <md-button slot="trailing-controls">Trailing Control</md-button>
        </md-list-item-v2>`
      );
      const clickHandler = jest.fn();
      listItem.addEventListener("list-item-click", clickHandler);

      fireEvent.click(screen.getByShadowRole("button", { name: "Trailing Control" }));
      await listItem.updateComplete;

      expect(clickHandler).not.toHaveBeenCalled();
    });

    it("should not trigger expand when pressing ArrowRight Key", async () => {
      listItem = await fixture(
        html`<md-list-item-v2 expandable>
          <md-button slot="trailing-controls">Trailing Control</md-button>
        </md-list-item-v2>`
      );
      const button = screen.getByShadowRole("button", { name: "Trailing Control" });

      fireEvent.keyDown(button, { key: Key.ArrowRight });
      await listItem.updateComplete;

      expect(listItem.expanded).toBe(false);
    });

    it("should not trigger collapse when pressing ArrowLeft Key", async () => {
      listItem = await fixture(
        html`<md-list-item-v2 expandable expanded>
          <md-button slot="trailing-controls">Trailing Control</md-button>
        </md-list-item-v2>`
      );
      const button = screen.getByShadowRole("button", { name: "Trailing Control" });

      fireEvent.keyDown(button, { key: Key.ArrowLeft });
      await listItem.updateComplete;

      expect(listItem.expanded).toBe(true);
    });
  });

  describe("Interactions", () => {
    beforeEach(async () => {
      listItem = await fixture(html`<md-list-item-v2 expandable></md-list-item-v2>`);
    });

    describe("when clicked", () => {
      it("should emit list-item-click event", async () => {
        const clickHandler = jest.fn();
        listItem.addEventListener("list-item-click", clickHandler);

        fireEvent.click(listItem);
        await listItem.updateComplete;

        expect(clickHandler).toHaveBeenCalled();
      });

      describe("and disabled", () => {
        it("should not emit list-item-click event", async () => {
          listItem.disabled = true;
          await listItem.updateComplete;

          const clickHandler = jest.fn();
          listItem.addEventListener("list-item-click", clickHandler);

          fireEvent.click(listItem);
          await listItem.updateComplete;

          expect(clickHandler).not.toHaveBeenCalled();
        });
      });
    });

    describe("when expandable", () => {
      it("should emit list-item-expanded event", async () => {
        const expandHandler = jest.fn();
        listItem.addEventListener("list-item-expanded", expandHandler);

        fireEvent.click(screen.getByShadowRole("button", { name: "Expand" }));
        await listItem.updateComplete;

        expect(expandHandler).toHaveBeenCalled();
      });

      describe("and interacting with the keyboard", () => {
        it("should expand when pressing ArrowRight Key", async () => {
          fireEvent.keyDown(listItem, { key: Key.ArrowRight });

          await listItem.updateComplete;

          expect(listItem.expanded).toBe(true);
        });

        it("should collapse when pressing ArrowLeft Key", async () => {
          listItem.expanded = true;
          await listItem.updateComplete;

          fireEvent.keyDown(listItem, { key: Key.ArrowLeft });
          await listItem.updateComplete;

          expect(listItem.expanded).toBe(false);
        });
      });

      describe("and interacting with the expand button", () => {
        it("should expand on click when collapsed", async () => {
          const expandButton = screen.getByShadowRole("button", { name: "Expand" });
          fireEvent.click(expandButton);
          await listItem.updateComplete;

          expect(listItem.expanded).toBe(true);
        });

        it("should collapse on click when expanded", async () => {
          listItem.expanded = true;
          await listItem.updateComplete;

          const collapseButton = screen.getByShadowRole("button", { name: "Expand" });
          fireEvent.click(collapseButton);
          await listItem.updateComplete;

          expect(listItem.expanded).toBe(false);
        });

        it("should not emit list-item-click event", async () => {
          const clickHandler = jest.fn();
          listItem.addEventListener("list-item-click", clickHandler);

          fireEvent.click(screen.getByShadowRole("button", { name: "Expand" }));
          await listItem.updateComplete;

          expect(clickHandler).not.toHaveBeenCalled();
        });
      });
    });
  });
});
