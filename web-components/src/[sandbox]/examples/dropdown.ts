import { DropdownEvents } from "@/components/dropdown/Dropdown";
import { html } from "lit-element";

const stringOptions = ["one", "two", "three", "   non-trimmed "];

const stringLongOptions = [
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

const objectKeyValueOptions = [{ one: "One" }, { two: "Two" }, { three: "Three" }];

const objectOptions = [
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

export const dropdownTemplate = html`
  <h3>Strings Options</h3>
  <md-dropdown
    .options="${stringOptions}"
    @dropdown-selected="${(e: CustomEvent<DropdownEvents["dropdown-selected"]>) => {
      console.log("[Strings Options] Selected: ", e.detail);
    }}"
  ></md-dropdown>
  <h3>Strings Options (Disabled)</h3>
  <md-dropdown .options="${stringOptions}" disabled></md-dropdown>
  <h3>Strings Options (Allow unselected)</h3>
  <md-dropdown
    .options="${stringOptions}"
    allow-unselected
    @dropdown-selected="${(e: CustomEvent<DropdownEvents["dropdown-selected"]>) => {
      console.log("[Strings Options (Allow unselected)] Selected: ", e.detail);
    }}"
  ></md-dropdown>
  <h3>Strings Long Options (Preselected)</h3>
  <md-dropdown
    .options="${stringLongOptions}"
    .defaultOption="${stringLongOptions[29]}"
    @dropdown-selected="${(e: CustomEvent<DropdownEvents["dropdown-selected"]>) => {
      console.log("[Strings Long Options (Preselected)] Selected: ", e.detail);
    }}"
  ></md-dropdown>
  <h3>Single KeyValue Objects Options</h3>
  <md-dropdown
    .options="${objectKeyValueOptions}"
    @dropdown-selected="${(e: CustomEvent<DropdownEvents["dropdown-selected"]>) => {
      console.log("[Single KeyValue Objects Options] Selected: ", e.detail);
    }}"
  ></md-dropdown>
  <h3>Multi KeyValue Objects Options</h3>
  <md-dropdown
    .options="${objectOptions}"
    option-id="user_id"
    option-value="full_name"
    @dropdown-selected="${(e: CustomEvent<DropdownEvents["dropdown-selected"]>) => {
      console.log("[Multi KeyValue Objects Options] Selected: ", e.detail);
    }}"
  ></md-dropdown>
`;
