import { Key } from "@/constants";
import { fixture, html } from "@open-wc/testing-helpers";
import { fireEvent } from "@testing-library/dom";
import { screen } from "shadow-dom-testing-library";
import { ListItemV2 } from "./list-item-v2";
import { ListV2 } from "./list-v2";

describe("<md-list-v2>", () => {
  let list: ListV2.ELEMENT;
  let firstItem: ListItemV2.ELEMENT;
  let secondItem: ListItemV2.ELEMENT;
  let thirdItem: ListItemV2.ELEMENT;

  beforeEach(async () => {
    list = await fixture(
      html`<md-list-v2>
        <md-list-item-v2 label="Item 1"></md-list-item-v2>
        <md-list-item-v2 label="Item 2"></md-list-item-v2>
        <md-list-item-v2 label="Item 3"></md-list-item-v2>
      </md-list-v2>`
    );
    [firstItem, secondItem, thirdItem] = screen.getAllByRole("listitem");
  });

  it("should render", async () => {
    expect(list).toBeVisible();
    expect(list).toBeInstanceOf(ListV2.ELEMENT);
    expect(list).toHaveAttribute("role", "list");
  });

  describe("when an item is clicked", () => {
    it("should put soft focus on the clicked item", async () => {
      firstItem.focus();
      fireEvent.click(secondItem);

      // Clicking with a mouse does not show focus until we use keyboard navigation
      expect(secondItem).toHaveAttribute("tabindex", "0");
      expect(firstItem).toHaveAttribute("tabindex", "-1");
    });
  });

  describe("when navigating with keyboard", () => {
    describe("And there are no items", () => {
      it("should not throw an error", async () => {
        const emptyList = await fixture(html`<md-list-v2></md-list-v2>`);
        expect(emptyList).toBeVisible();

        expect(() => {
          fireEvent.keyDown(emptyList, { key: Key.ArrowDown });
        }).not.toThrow();
      });
    });

    describe("and first item is focused", () => {
      beforeEach(() => {
        firstItem.focus();
      });

      it("pressing ArrowDown should move focus to the second item", async () => {
        fireEvent.keyDown(firstItem, { key: Key.ArrowDown });

        expect(secondItem).toHaveFocus();
      });

      it("pressing End should move focus to the last item", async () => {
        fireEvent.keyDown(list, { key: Key.End });

        expect(thirdItem).toHaveFocus();
      });

      it("pressing ArrowUp should move focus to the last item", async () => {
        fireEvent.keyDown(firstItem, { key: Key.ArrowUp });

        expect(thirdItem).toHaveFocus();
      });

      describe("and second item is disabled", () => {
        it("pressing arrowDown should move focus to the last item", async () => {
          secondItem.disabled = true;
          await list.updateComplete;

          fireEvent.keyDown(firstItem, { key: Key.ArrowDown });

          expect(thirdItem).toHaveFocus();
        });
      });
    });

    describe("and last item is focused", () => {
      beforeEach(() => {
        thirdItem.focus();
      });

      it("pressing ArrowUp should move focus to the second item", async () => {
        fireEvent.keyDown(thirdItem, { key: Key.ArrowUp });

        expect(secondItem).toHaveFocus();
      });

      it("pressing Home should move focus to the first item", async () => {
        fireEvent.keyDown(thirdItem, { key: Key.Home });

        expect(firstItem).toHaveFocus();
      });

      it("pressing End should keep focus on the last item", async () => {
        fireEvent.keyDown(thirdItem, { key: Key.End });

        expect(thirdItem).toHaveFocus();
      });
    });
  });
});
