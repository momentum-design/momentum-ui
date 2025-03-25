import { Dropdown } from "@/components/dropdown/Dropdown";
import { html } from "lit";

export const dropdownStringOptions = ["one", "two", "three", "   non-trimmed-with-spaces "];

export const dropdownStringLongOptions = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40"
];

export const dropdownObjectKeyValueOptions = [{ one: "One" }, { two: "Two" }, { three: "Three" }];

export const dropdownObjectOptions = [
  {
    user_id: "xxx-111",
    user_name: "jd",
    full_name: "John Doe"
  },
  {
    user_id: "xxx-222",
    user_name: "as",
    full_name: "Adam Smith"
  },
  {
    user_id: "xxx-333",
    user_name: "ba",
    full_name: "Boris Anderson"
  }
];

export const dropdownObjectLongOptions = [
  { id: "0", country: "Afghanistan" },
  { id: "1", country: "Aland Islands" },
  { id: "2", country: "Albania" },
  { id: "3", country: "Algeria" },
  { id: "4", country: "American Samoa" },
  { id: "5", country: "Andorra" },
  { id: "6", country: "Angola" },
  { id: "7", country: "Anguilla" },
  { id: "8", country: "Antarctica" },
  { id: "9", country: "Antigua and Barbuda" },
  { id: "10", country: "Argentina" },
  { id: "11", country: "Australia" },
  { id: "12", country: "Austrian Empire" },
  { id: "13", country: "Austria" },
  { id: "14", country: "Azerbaijan" },
  { id: "15", country: "Bahrain" },
  { id: "16", country: "Bangladesh" },
  { id: "17", country: "Barbados" },
  { id: "18", country: "Bavaria" },
  { id: "19", country: "Belarus" },
  { id: "20", country: "Belgium" },
  { id: "21", country: "Belize" },
  { id: "22", country: "Cabo Verde" },
  { id: "23", country: "Cambodia" },
  { id: "24", country: "Cameroon" },
  { id: "25", country: "Canada" },
  { id: "26", country: "Cayman Islands" },
  { id: "27", country: "The Central African Republic" },
  { id: "28", country: "Chad" }
];

const messageArr: Dropdown.Message = {
  message: "This is where the message would be.",
  type: "success"
};

export const dropdownTemplate = html`
  <h3>Strings Options</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
  ></md-dropdown>

  <h3>passing left icon with out searchable props</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    left-icon="search-bold"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
  ></md-dropdown>

  <h3>Strings Options (Disabled)</h3>
  <md-dropdown .options="${dropdownStringOptions}" disabled></md-dropdown>
  <h3>Strings Options (Allow unselected)</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    allow-unselected
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options (Allow unselected)] Selected: ", e.detail);
    }}"
  ></md-dropdown>
  <h3>Strings Long Options (Preselected)</h3>
  <md-dropdown
    .options="${dropdownStringLongOptions}"
    .defaultOption="${dropdownStringLongOptions[29]}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Long Options (Preselected)] Selected: ", e.detail);
    }}"
  ></md-dropdown>
  <h3>Single KeyValue Objects Options</h3>
  <md-dropdown
    .options="${dropdownObjectKeyValueOptions}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Single KeyValue Objects Options] Selected: ", e.detail);
    }}"
  ></md-dropdown>
  <h3>Multi KeyValue Objects Options</h3>
  <md-dropdown
    .options="${dropdownObjectOptions}"
    option-id="user_id"
    option-value="full_name"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Multi KeyValue Objects Options] Selected: ", e.detail);
    }}"
  ></md-dropdown>
  <h3>Multi KeyValue Objects Long Options</h3>
  <md-dropdown
    .options="${dropdownObjectLongOptions}"
    option-id="id"
    option-value="country"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Multi KeyValue Objects Long Options] Selected: ", e.detail);
    }}"
  ></md-dropdown>
  <div class="pills-dropdown">
    <h3>Pill shaped dropdown</h3>
    <md-dropdown
      .options="${dropdownStringOptions}"
      @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
        console.log("[Strings Options] Selected: ", e.detail);
      }}"
    ></md-dropdown>
  </div>
  <h3>Dropdown Icon Searchable</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
    left-icon="search-bold"
    helpText="This is help text"
    searchable
  ></md-dropdown>
  <h3>Dropdown Icon Searchable Disabled</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
    left-icon="search-bold"
    helpText="This is help text"
    searchable
    disabled
  ></md-dropdown>
  <br />
  <h3>Dropdown Default (New Momentum)</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
    newMomentum
  ></md-dropdown>
  <h3>Dropdown Disabled (New Momentum)</h3>
  <md-dropdown .options="${dropdownStringOptions}" disabled newMomentum></md-dropdown>
  <h3>Dropdown Searchable (New Momentum)</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
    helpText="This is help text"
    searchable
    newMomentum
  ></md-dropdown>
  <h3>Dropdown Icon Searchable (New Momentum)</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
    left-icon="search-bold"
    helpText="This is help text"
    searchable
    newMomentum
  ></md-dropdown>
  <h3>Dropdown Searchable Disabled (New Momentum)</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    helpText="This is help text"
    disabled
    searchable
    newMomentum
    left-icon="search-bold"
  ></md-dropdown>
  <h3>Dropdown Searchable ReadOnly (New Momentum)</h3>
  <md-dropdown .options="${dropdownStringOptions}" readOnly searchable newMomentum></md-dropdown>
  <h3>Dropdown Searchable Success Text (New Momentum)</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
    htmlId="dropDownSuccess"
    .messageArr=${[{ ...messageArr } as Dropdown.Message]}
    searchable
    newMomentum
  ></md-dropdown>
  <h3>Dropdown Searchable Warning Text (New Momentum)</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
    htmlId="dropDownWarning"
    .messageArr=${[{ ...messageArr, ...{ type: "warning" } } as Dropdown.Message]}
    searchable
    newMomentum
  ></md-dropdown>
  <h3>Dropdown Searchable Error Text (New Momentum)</h3>
  <md-dropdown
    .options="${dropdownStringOptions}"
    @dropdown-selected="${(e: CustomEvent<Dropdown.EventDetail["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
    htmlId="dropDownError"
    .messageArr=${[{ ...messageArr, ...{ type: "error" } } as Dropdown.Message]}
    searchable
    newMomentum
  ></md-dropdown>
`;
