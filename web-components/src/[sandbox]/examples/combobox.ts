import { comboBoxObjectLongOptions, comboBoxObjectOptions, comboBoxOptions } from "@/[sandbox]/sandbox.mock";
import "@/components/combobox/ComboBox";
import "@/components/icon/Icon";
import "@/components/spinner/Spinner";
import { html } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { ComboBox } from "@/components/combobox/ComboBox";

const dropdownValue: string[] = [];
const testCustomValue = [
  { name: "blah", value: "123", __typename: "typename" },
  { name: "test", value: "456", __typename: "typename" }
];

const changeHandler = (e: CustomEvent) => {
  console.log("change-selected: ", e);
};

const comboboxOnExpand = (e: CustomEvent) => {
  console.log("combobox-on-expand: ", e);
};

const comboboxOnExpand2 = (e: CustomEvent) => {
  console.log("combobox-on-expand2: ", e.composedPath());
  const target = e.composedPath()[0] as HTMLElement | any;
  setTimeout(() => {
    target.options = comboBoxObjectOptions;
  }, 500);
};

const messageArr: ComboBox.Message = {
  message: "This is where the message would be.",
  type: "success"
};

export const comboBoxTemplate = html`
  <md-label htmlFor="comboboxid">
    <span>Label Combobox</span>
  </md-label>
  <md-combobox
    style="width: 220px; display: flex;"
    .options=${comboBoxOptions}
    placeholder="Placeholder"
    ariaLabel="Select the country"
    search-result-aria-label="Select the country, {{count}} results found."
    comboboxId="comboboxid"
  ></md-combobox>

  <h3>Default</h3>
  <md-combobox
    style="width: 240px; display: inline-block;"
    .options=${comboBoxOptions}
    placeholder="Placeholder"
    ariaLabel="Select the country"
    search-result-aria-label="Select the country, {{count}} results found."
  ></md-combobox>
  <h3>Default with trim space</h3>
  <md-combobox
    .options=${comboBoxOptions}
    placeholder="Placeholder"
    .value=${[comboBoxOptions[5]]}
    search-trim-space
  ></md-combobox>
  <h3>Default with Custom Values</h3>
  <md-combobox
    .options=${comboBoxOptions}
    placeholder="Placeholder"
    .value=${[comboBoxOptions[5]]}
    clear-icon-height="12px"
    allow-custom-value
  ></md-combobox>
  <h3>Invalid</h3>
  <md-combobox
    .options=${comboBoxOptions}
    placeholder="Placeholder"
    .value=${[comboBoxOptions[5]]}
    invalid
    invalid-text-i18n="This is error message"
  ></md-combobox>
  <br />
  <h3>Default (New Momentum)</h3>
  <md-combobox
    style="width: 240px; display: inline-block;"
    .options=${comboBoxOptions}
    placeholder="Placeholder"
    ariaLabel="Select the country"
    search-result-aria-label="Select the country, {{count}} results found."
    helpText="This is help text"
    newMomentum
  ></md-combobox>
  <h3>Read Only State (New Momentum)</h3>
  <md-combobox readOnly .options=${comboBoxOptions} placeholder="Placeholder" helpText="This is help text" searchable newMomentum> </md-combobox>
  </md-combobox>
  <h3>Disabled State (New Momentum)</h3>
  <md-combobox disabled .options=${comboBoxOptions} placeholder="Placeholder" helpText="This is help text" searchable newMomentum> </md-combobox>
  </md-combobox>
  <h3>Success Text (New Momentum)</h3>
  <md-combobox
    .options=${comboBoxOptions}
    .value=${[comboBoxOptions[5]]}
    htmlId="comboBoxError"
    .messageArr=${[{ ...messageArr } as ComboBox.Message]}
    placeholder="Enter Text"
    newMomentum
  ></md-combobox>
  <h3>Warning Text (New Momentum)</h3>
  <md-combobox
    .options=${comboBoxOptions}
    .value=${[comboBoxOptions[5]]}
    htmlId="comboBoxError"
    .messageArr=${[{ ...messageArr, ...{ type: "warning" } } as ComboBox.Message]}
    placeholder="Enter Text"
    newMomentum
  ></md-combobox>
  <h3>Error Text (New Momentum)</h3>
  <md-combobox
    .options=${comboBoxOptions}
    .value=${[comboBoxOptions[5]]}
    htmlId="comboBoxError"
    .messageArr=${[{ ...messageArr, ...{ type: "error" } } as ComboBox.Message]}
    placeholder="Enter Text"
    newMomentum
  ></md-combobox>
  <br />
  <h3>Multi Data with Custom Values</h3>
  <md-combobox
    .options=${comboBoxOptions}
    placeholder="Placeholder"
    .value=${[comboBoxOptions[1]]}
    allow-custom-value
    is-multi
  ></md-combobox>
  <h3>Disabled State</h3>
  <md-combobox disabled .options=${comboBoxOptions} placeholder="Placeholder" searchable> </md-combobox>
  <h3>Object Data</h3>
  <md-combobox placeholder="Placeholder" .options=${comboBoxObjectOptions} option-id="id" option-value="country">
  </md-combobox>
  <h3>Object Data With Virtual Scroll</h3>
  <md-combobox
    placeholder="Placeholder"
    .options=${comboBoxObjectOptions}
    option-id="id"
    option-value="country"
    use-virtual-scroll
  >
  </md-combobox>
  <h3>Object Data Predefined Value</h3>
  <md-combobox
    placeholder="Placeholder"
    .options=${comboBoxObjectLongOptions}
    option-id="id"
    option-value="country"
    .value=${[comboBoxObjectLongOptions[5]]}
    .useVirtualScroll=${true}
  >
  </md-combobox>
  <h3>Object Data Multi</h3>
  <md-combobox
    .options=${comboBoxObjectOptions}
    option-id="id"
    option-value="country"
    is-multi
    placeholder="Placeholder"
  >
  </md-combobox>
  <h3>Object Data Multi with virtual scroll</h3>
  <md-combobox
    .options=${comboBoxObjectOptions}
    option-id="id"
    option-value="country"
    is-multi
    placeholder="Placeholder"
    use-virtual-scroll
  >
  </md-combobox>
  <h3>Object Data Multi Predefined</h3>
  <md-combobox
    .options=${comboBoxObjectLongOptions}
    .value=${[comboBoxObjectLongOptions[0], comboBoxObjectLongOptions[1]]}
    option-id="id"
    option-value="country"
    is-multi
    placeholder="Placeholder"
  >
  </md-combobox>
  <h3>Slot Content</h3>
  <md-combobox with-custom-content>
    <div slot="one" aria-label="Facebook" display-value="Facebook">
      <span>Facebook</span>
      <md-icon name="icon-facebook_16"></md-icon>
    </div>
    <div slot="two" aria-label="Twitter" display-value="Twitter">
      <span class="company-value">Twitter</span>
      <md-icon name="icon-twitter_16"></md-icon>
    </div>
    <div slot="three" aria-label="Wikipedia" display-value="Wikipedia">
      <span class="company-value">Wikipedia</span>
      <md-icon name="icon-wikipedia_16"></md-icon>
    </div>
    <div slot="four" aria-label="Google" display-value="Google">
      <span class="company-value">Google</span>
      <md-icon name="icon-google_16"></md-icon>
    </div>
  </md-combobox>
  <h3>Slot Content Multi</h3>
  <md-combobox with-custom-content is-multi .value=${[{ id: "Wikipedia", value: "Wikipedia" }]}>
    <div slot="one" aria-label="Facebook" display-value="Facebook">
      <span>Facebook</span>
      <md-icon name="icon-facebook_16"></md-icon>
    </div>
    <div slot="two" aria-label="Twitter" display-value="Twitter">
      <span class="company-value">Twitter</span>
      <md-icon name="icon-twitter_16"></md-icon>
    </div>
    <div slot="three" aria-label="Wikipedia" display-value="Wikipedia">
      <span class="company-value">Wikipedia</span>
      <md-icon name="icon-wikipedia_16"></md-icon>
    </div>
    <div slot="four" aria-label="Google" display-value="Google">
      <span class="company-value">Google</span>
      <md-icon name="icon-google_16"></md-icon>
    </div>
  </md-combobox>
  <h3>Slot Complex Object Content Multi</h3>
  <md-combobox with-custom-content>
    ${repeat(
      testCustomValue,
      (item) => item.name,
      (item: { name: string; value: string }, index) => html`
        <div slot=${index} display-value=${item.name} aria-label="+${item.value}${item.name}">
          <span>${item.name}</span>
          <span>${item.value}</span>
        </div>
      `
    )}
  </md-combobox>
  <h3>Slot Complex Custom Object Content</h3>
  <md-combobox .custom-options=${JSON.stringify(dropdownValue)} with-custom-content> </md-combobox>
  <h3>Without Clear Icon</h3>
  <md-combobox .options=${comboBoxOptions} placeholder="Placeholder" no-clear-icon></md-combobox>

  <h3>With multi count and select all</h3>
  <md-combobox
    .options=${comboBoxOptions}
    shape=${"pill"}
    is-multi
    show-selected-count
    no-clear-icon
    allow-select-all
    placeholder="Select Queue"
    @change-selected=${changeHandler}
    select-all-i18n=${"All"}
  ></md-combobox>

  <h3>With multi count and select all for Object Data</h3>
  <md-combobox
    .options=${comboBoxObjectOptions}
    shape=${"pill"}
    option-id="id"
    is-multi
    option-value="country"
    show-selected-count
    allow-select-all
    placeholder="Select Queue"
    @change-selected=${changeHandler}
  >
  </md-combobox>

  <h3>With multi count and select all for virtual scroll</h3>
  <md-combobox
    .options=${[]}
    shape=${"pill"}
    option-id="id"
    option-value="country"
    is-multi
    show-selected-count
    no-clear-icon
    allow-select-all
    placeholder="Select Queue"
    @change-selected=${changeHandler}
    select-all-i18n=${"All"}
    use-virtual-scroll
    ariaLabel="Queue Name"
    @combobox-on-expand=${comboboxOnExpand2}
  ></md-combobox>

  <h3>Custom error</h3>
  <md-combobox
    .options=${comboBoxObjectOptions}
    option-id="id"
    option-value="country"
    placeholder="Select Queue"
    @change-selected=${changeHandler}
    show-custom-error
    shape=${"pill"}
  >
    <div
      slot="custom-error"
      aria-label="Wikipedia"
      display-value="Wikipedia"
      @click=${() => {
        console.log("clicked!");
      }}
    >
      <span class="company-value">Wikipedia</span>
      <md-icon name="icon-wikipedia_16"></md-icon>
    </div>
  </md-combobox>

  <h3>Custom Loader</h3>
  <md-combobox
    placeholder="Select Queue"
    @change-selected=${changeHandler}
    show-loader
    shape=${"pill"}
    @combobox-on-expand=${comboboxOnExpand}
  >
    <div slot="custom-loader">
      <md-spinner size="33"></md-spinner>
    </div>
  </md-combobox>

  <h3>Group Label ComboBox</h3>
  <md-combobox
    style="width: 250px; display: inline-block;"
    with-custom-content
    placeholder="Placeholder"
    visible-option="6"
  >
    <optgroup label="Countries">
      <div slot="Australia" aria-label="Australia" display-value="Australia">
        <span>Australia</span>
      </div>
      <div slot="Austria" aria-label="Austria" display-value="Austria">
        <span>Austria</span>
      </div>
      <div slot="India" aria-label="India" display-value="India">
        <span>India</span>
      </div>
    </optgroup>
    <optgroup label="Cites">
      <div slot="Ambala" aria-label="Ambala" display-value="Ambala">
        <span>Ambala</span>
      </div>
      <div slot="Banaras" aria-label="Banaras" display-value="Banaras">
        <span>Banaras</span>
      </div>
      <div slot="Banglore" aria-label="Banglore" display-value="Banglore">
        <span>Banglore</span>
      </div>
    </optgroup>
  </md-combobox>

  <h3>Group Label ComboBox With Multi Tag</h3>
  <md-combobox style="width: 250px; display: inline-block;" is-multi with-custom-content placeholder="Placeholder">
    <optgroup label="Countries">
      <div slot="Australia" aria-label="Australia" display-value="Australia">
        <span>Australia</span>
      </div>
      <div slot="Austria" aria-label="Austria" display-value="Austria">
        <span>Austria</span>
      </div>
    </optgroup>
    <optgroup label="Cites">
      <div slot="Ambala" aria-label="Ambala" display-value="Ambala">
        <span>Ambala</span>
      </div>
      <div slot="Banaras" aria-label="Banaras" display-value="Banaras">
        <span>Banaras</span>
      </div>
    </optgroup>
  </md-combobox>

  <h3>Group Label ComboBox With Multi Selected Count</h3>
  <md-combobox
    style="width: 250px; display: inline-block;"
    with-custom-content
    allow-select-all
    show-selected-count
    is-multi
    placeholder="Placeholder"
  >
    <optgroup label="Countries">
      <div slot="Australia" aria-label="Australia" display-value="Australia">
        <span>Australia</span>
      </div>
      <div slot="Austria" aria-label="Austria" display-value="Austria">
        <span>Austria</span>
      </div>
    </optgroup>
    <optgroup label="Cites">
      <div slot="Ambala" aria-label="Ambala" display-value="Ambala">
        <span>Ambala</span>
      </div>
      <div slot="Banaras" aria-label="Banaras" display-value="Banaras">
        <span>Banaras</span>
      </div>
    </optgroup>
  </md-combobox>
  <br />
  <br />
`;
