import "@/components/icon/Icon";
import "@/components/input/Input";
import { Input } from "@/components/input/Input";
import { html } from "lit-element";

const messageArr: Input.Message = {
  message: "This is where the message would be.",
  type: "success"
};

function copyText(event: MouseEvent) {
  const target = event.composedPath()[0] as Element;
  const targetRoot = target.getRootNode() as ShadowRoot;
  const targetHost = targetRoot.host;
  const input = targetHost.previousSibling as Input.ELEMENT;
  input!.select();
}

export const inputTemplate = html`
  <style>
    section {
      margin: 2rem 0;
    }
    .column {
      width: 45%;
      margin-right: 1rem;
    }
    .row {
      width: 100%;
      display: flex;
      justify-items: flex-start;
    }
  </style>
  <h2>md-input</h2>
  <section id="pill-shape" class="section">
    <div class="row">
      <div class="column">
        <md-input label="Normal" containerSize="small-12" shape="pill" clear autofocus></md-input>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <md-input
          label="Search Pill"
          htmlId="inputSearchClearPill"
          containerSize="small-12"
          placeholder="Enter Text"
          shape="pill"
          searchable
          autofocus
        ></md-input>
      </div>
      <div class="column">
        <md-input
          label="Search Clear Pill"
          htmlId="inputSearchClearPill"
          containerSize="small-12"
          placeholder="Enter Text"
          searchable
          shape="pill"
          clear
        ></md-input>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <md-input label="Read Only" value="Read Only" readonly containerSize="small-12" shape="pill"></md-input>
      </div>
      <div class="column">
        <md-input label="Disabled" value="Disabled" disabled containerSize="small-12" shape="pill"></md-input>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <md-input
          label="Multi Line"
          value="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by ..."
          multiline
          containerSize="small-12"
          shape="pill"
        ></md-input>
      </div>
      <div class="column">
        <md-input
          label="Multi Line ReadOnly"
          value="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by ..."
          multiline
          containerSize="small-12"
          shape="pill"
          readOnly
        ></md-input>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <md-input
          label="Multi Line with Clear"
          value="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by ..."
          multiline
          containerSize="small-12"
          shape="pill"
          clear
        ></md-input>
      </div>
    </div>
  </section>

  <h3>Rectangle Shape</h3>
  <section id="rectangle" class="section">
    <div class="row">
      <div class="column">
        <md-input label="Normal" containerSize="small-12"></md-input>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <md-input
          label="Search Rectangle"
          htmlId="inputSearchClearRectangle"
          containerSize="small-12"
          placeholder="Enter Text"
          searchable
          shape="rectangle"
        ></md-input>
      </div>
      <div class="column">
        <md-input
          label="Search Clear Rectangle"
          htmlId="inputSearchClearRectangle"
          containerSize="small-12"
          placeholder="Enter Text"
          searchable
          shape="rectangle"
          clear
        ></md-input>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <md-input label="Read Only" value="Read Only" readonly containerSize="small-12"></md-input>
      </div>
      <div class="column">
        <md-input label="Disabled" value="Disabled" disabled containerSize="small-12"></md-input>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <md-input
          label="Multi Line"
          value="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by ..."
          multiline
          containerSize="small-12"
        ></md-input>
      </div>
    </div>
  </section>

  <h3>New Momentum</h3>
  <section id="rectangle" class="section">
    <div class="row">
      <div class="column">
        <md-input label="Normal" containerSize="small-12" newMomentum helpText="Help Text"></md-input>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <md-input
          label="Search"
          htmlId="inputSearchClearRectangle"
          containerSize="small-12"
          placeholder="Enter Text"
          searchable
          shape="rectangle"
          newMomentum
        ></md-input>
      </div>
      <div class="column">
        <md-input
          label="Search Clear"
          htmlId="inputSearchClearRectangle"
          containerSize="small-12"
          placeholder="Enter Text"
          searchable
          shape="rectangle"
          clear
          newMomentum
        ></md-input>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <md-input
          label="Read Only"
          value="Read Only"
          readonly
          containerSize="small-12"
          helpText="Help Text"
          newMomentum
        ></md-input>
      </div>
      <div class="column">
        <md-input
          label="Disabled"
          value="Disabled"
          disabled
          containerSize="small-12"
          newMomentum
          helpText="Help Text"
        ></md-input>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <md-input
          label="Multi Line"
          value="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by ..."
          multiline
          containerSize="small-12"
          newMomentum
          helpText="Help Text"
        ></md-input>
      </div>
    </div>
  </section>

  <h3>Error Message</h3>
  <section id="error" class="section">
    <div class="row pill">
      <div class="column">
        <md-input
          label="Error"
          containerSize="small-12"
          shape="pill"
          .messageArr=${[{ ...messageArr, ...{ type: "error" } } as Input.Message]}
          value="Error Text"
          placeholder="Enter Text"
        ></md-input>
      </div>
    </div>
    <div class="row rectangle">
      <div class="column">
        <md-input
          label="Error"
          containerSize="small-12"
          .messageArr=${[
            {
              ...messageArr,
              ...{
                type: "error",
                message:
                  "This is where the message would be if it were a long message would be this the message that would be.."
              }
            } as Input.Message
          ]}
          value="Error Text"
          placeholder="Enter Text"
        ></md-input>
      </div>
    </div>
  </section>
  <md-input
    label="Success"
    htmlId="inputSuccess"
    containerSize="small-12"
    .messageArr=${[messageArr]}
    value="Success Text"
    placeholder="Enter Text"
  ></md-input>
  <md-input
    label="Warning"
    htmlId="inputWarning"
    containerSize="small-12"
    .messageArr=${[{ ...messageArr, ...{ type: "warning" } } as Input.Message]}
    value="Warning Text"
    placeholder="Enter Text"
  ></md-input>
  <md-input
    label="Error"
    htmlId="inputError"
    containerSize="small-12"
    .messageArr=${[{ ...messageArr, ...{ type: "error" } } as Input.Message]}
    value="Error Text"
    placeholder="Enter Text"
  ></md-input>
  <md-input
    label="Priority"
    htmlId="inputPriority"
    containerSize="small-12"
    .messageArr=${[{ ...messageArr, ...{ type: "priority" } } as Input.Message]}
    value="Priority Text"
    placeholder="Enter Text"
    newMomentum
  ></md-input>
  <hr />
  <md-label>Copy to Clipboard example</md-label>
  <md-input label="Default" containerSize="small-12" id="input"></md-input
  ><md-icon class="md-input__copy" name="copy_14" @click=${(e: MouseEvent) => copyText(e)}></md-icon>
  <hr />
  <md-input label="Pill" containerSize="small-12" shape="pill"></md-input>
  <md-input label="Multiline" containerSize="small-12" multiline></md-input>
  <md-input label="Nested Level 1" containerSize="small-12" nestedLevel="1"></md-input>
  <md-input label="Nested Level 2" containerSize="small-12" nestedLevel="2"></md-input>
  <md-input label="Nested Level 3" containerSize="small-12" nestedLevel="3"></md-input>
  <md-input label="Disabled" containerSize="small-12" placeholder="Disabled Text Placeholder" disabled></md-input>
  <md-input label="Disabled Text" containerSize="small-12" value="Disabled Text Value" disabled></md-input>
  <md-input label="Readonly" containerSize="small-12" value="Readonly Text" readOnly></md-input>
  <md-input
    label="Disabled Readonly"
    containerSize="small-12"
    value="Disabled Readonly Text"
    disabled
    readOnly
  ></md-input>
  <md-input label="Placeholder" containerSize="small-12" Placeholder="Placeholder Text"></md-input>
  <md-input label="Clear" containerSize="small-12" placeholder="Enter Text" clear></md-input>
  <md-input
    label="Clear with Value"
    containerSize="small-12"
    placeholder="Enter Text"
    value="Clear Text"
    clear
  ></md-input>
  <md-input label="Right Icon" containerSize="small-12" placeholder="Enter Text">
    <md-icon slot="input-section-right" name="accessibility_16"></md-icon>
  </md-input>
  <md-input label="Left Icon" containerSize="small-12" placeholder="Enter Text" auxiliaryContentPosition="before">
    <md-icon slot="input-section" name="accessibility_16"></md-icon>
  </md-input>
  <md-input
    label="Left Icon Disabled"
    containerSize="small-12"
    placeholder="Enter Text"
    auxiliaryContentPosition="before"
    disabled
  >
    <md-icon slot="input-section" name="accessibility_16"></md-icon>
  </md-input>
  <md-input
    label="Left Icon with Clear"
    containerSize="small-12"
    placeholder="Enter Text"
    auxiliaryContentPosition="before"
    clear
  >
    <md-icon slot="input-section" name="accessibility_16"></md-icon>
  </md-input>
  <md-input
    label="Help Text"
    containerSize="small-12"
    placeholder="Enter Text"
    helpText="This is help text for the input."
  >
  </md-input>
  <md-input label="Secondary Label" containerSize="small-5" placeholder="Enter Text" secondaryLabel="Secondary Label">
  </md-input>
  <md-input
    label="Secondary Label Disabled"
    containerSize="small-5"
    placeholder="Enter Text"
    secondaryLabel="Secondary Label Disabled"
    disabled
  >
  </md-input>
  <md-input
    label="Secondary Label Help Text"
    containerSize="small-12"
    placeholder="Enter Text"
    secondaryLabel="Secondary Label"
    helpText="Help Text"
  >
  </md-input>
  <md-input
    label="Default Search"
    htmlId="inputDefault"
    containerSize="small-12"
    placeholder="Enter Text"
    searchable
  ></md-input>
  <md-input
    label="Loading Search"
    htmlId="inputLoading"
    containerSize="small-12"
    placeholder="Enter Text"
    searchable
    isLoading
  ></md-input>
  <md-input
    label="Search Clear"
    htmlId="inputSearchClear"
    containerSize="small-12"
    placeholder="Enter Text"
    searchable
    clear
  ></md-input>
  <md-input
    label="Search Clear Pill"
    htmlId="inputSearchClearPill"
    containerSize="small-12"
    placeholder="Enter Text"
    searchable
    shape="pill"
    clear
  ></md-input>
  <md-input
    label="Search Filled"
    htmlId="inputSearchFilled"
    containerSize="small-12"
    placeholder="Enter Text"
    searchable
    isFilled
  ></md-input>
  <md-input
    label="Search Filled Loading"
    htmlId="inputSearchFilledLoading"
    containerSize="small-12"
    placeholder="Enter Text"
    searchable
    isFilled
    isLoading
  ></md-input>
  <md-input
    label="Search Filled Clear"
    htmlId="inputSearchFilledClear"
    containerSize="small-12"
    placeholder="Enter Text"
    searchable
    isFilled
    clear
  ></md-input>
  <md-input
    label="Search Filled Clear Pill"
    htmlId="inputSearchFilledClearPill"
    containerSize="small-12"
    placeholder="Enter Text"
    shape="pill"
    searchable
    isFilled
    clear
  ></md-input>
`;
