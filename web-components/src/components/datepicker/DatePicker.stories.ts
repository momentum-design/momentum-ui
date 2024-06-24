import { now } from "@/utils/dateUtils";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { DatePicker as DP } from "./DatePicker"; // Keep type import as a relative path
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Date Picker",
  component: "md-datepicker",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-datepicker"
    }
  }
};

export const DatePicker = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const shouldCloseOnSelect = boolean("shouldCloseOnSelect", false);
  const weekStart = select("weekStart", DP.weekStartDays, "");
  const locale = text("locale", "en-US");
  const disabled = boolean("disabled", false);

  const minDate = text(
    "minimum date",
    now()
      .minus({ day: 5 })
      .toISODate()
  );

  const maxDate = text(
    "maximum date",
    now()
      .plus({ day: 30 })
      .toISODate()
  );

  const value = text("value", now().toISODate());

  return html`
    <md-theme class="theme-toggle" id="datepicker" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-datepicker
        ?disabled=${disabled}
        ?should-close-on-select=${shouldCloseOnSelect}
        value=${value}
        weekStart=${weekStart}
        locale=${locale}
        minDate=${minDate}
        maxDate=${maxDate}
      >
      </md-datepicker>
    </md-theme>
  `;
};
