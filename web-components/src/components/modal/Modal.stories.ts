import "@/components/modal/Modal";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Modal",
  component: "md-modal",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-modal"
    }
  }
};

const content = html`
  <p>
    This pattern may seem inefficient, since the same style sheet is reproduced in a each instance of an element.
    However, the browser can deduplicate multiple instances of the same style sheet, so the cost of parsing the style
    sheet is only paid once.
  </p>
`;

export const Modal = () => {
  const show = boolean("show", false);
  const headerLabel = text("headerLabel", "Test header text");
  const headerMessage = text("message", "Test message in header");
  const closeBtnName = text("closeBtnName", "Save");
  const showCloseButton = boolean("showCloseButton", true);
  const backdropClickExit = boolean("OutsideClick", false);
  const hideFooter = boolean("hideFooter", false);
  const hideHeader = boolean("hideHeader", false);

  return html`
    <md-modal
      size="default"
      .show=${show}
      headerLabel="${headerLabel}"
      headerMessage="${headerMessage}"
      closeBtnName="${closeBtnName}"
      .showCloseButton="${showCloseButton}"
      .backdropClickExit="${backdropClickExit}"
      ?hideFooter=${hideFooter}
      ?hideHeader=${hideHeader}
    >
      <div slot="header">
        <span>Test slot header</span>
      </div>
      ${content}
      <div slot="footer">
        <span>Test slot footer</span>
      </div>
    </md-modal>
  `;
};
