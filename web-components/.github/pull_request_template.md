## Types of changes
<!--- What types of changes does your code introduce? Put an `x` in all the boxes that apply: -->
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)

## Please check if any of the following apply
- [ ] Awating dependency on `agentx-services`, `uuip-sdk` or other and has a label added (please specify PR link below in *Other* section)
- [ ] Is a dependency for PR up the chain (in `AgentX` repo) (please specify the PR link below in *Other* section, optional for non-breaking change)
- [ ] Has a design wiki (please add a link below in *Other* section)
- [ ] Is relying on Declarative data model (e.g. not subscribing to individual Web Socket events outside of the SERVICE Promise unless truly asynchronous. If not, explain why below in *Other* section)


## What kind of change does this PR introduce?
#### (Bug fix, feature, docs update, etc...)

`[Type here]`

## Other relevant information
#### (Dependency PR link, asynchronous SERVICE event subscription call out, wiki, etc...)

<details>
<summary>
## If this is a bug fix:
</summary>

## What is the current behavior?
#### (You can link to an open issue)

`[Type here]`

## What is the new behavior
#### (if this is a feature change)?

`[Type here]`
</details>

## The Gold Standard Checklist for Web Components
<details>
<summary>Is it a new Web Component/custom element? Please assure you are following the checklist below (click to expand)</summary>

### Loading

- [ ] [Expressed Dependencies](https://github.com/webcomponents/gold-standard/wiki/Expressed-Dependencies) — Does the component import or otherwise load all of its own dependencies?

- [ ] [Load Order Independence](https://github.com/webcomponents/gold-standard/wiki/Load-Order-Independence) — Can you load the component at any point?

- [ ] [Relative Paths](https://github.com/webcomponents/gold-standard/wiki/Relative-Paths) — Are all paths relative to required resources (images, etc.) relative to the component source?

### DOM Presence

- [ ] [Plain Tag](https://github.com/webcomponents/gold-standard/wiki/Plain-Tag) — Can you instantiate the component with just a plain tag (<my-element>)?

- [ ] [Parent/Child Independence](https://github.com/webcomponents/gold-standard/wiki/Parent-Child-Independence) — Can you use the component inside any type of parent element, or with any type of child elements?

- [ ] [Declared Semantics](https://github.com/webcomponents/gold-standard/wiki/Declared-Semantics) — Does the component expose its semantics by wrapping/extending a native element, or using ARIA roles, states, and properties? *Accessibility*

- [ ] [Meaningful Structure](https://github.com/webcomponents/gold-standard/wiki/Meaningful-Structure) — Does the component's DOM structure reflect the meaningful relationship between elements, such that those relationships are clear to a user relying on an assistive device? [*Accessibility*](https://github.com/webcomponents/gold-standard/wiki#accessibility)

- [ ] [Labels](https://github.com/webcomponents/gold-standard/wiki/Labels) — Are the component's significant elements labeled such that a user relying on an assistive device can understand what those elements are for? [*Accessibility*](https://github.com/webcomponents/gold-standard/wiki#accessibility)

- [ ] [Local Effects](https://github.com/webcomponents/gold-standard/wiki/Local-Effects) — Does the component limit its effects to itself (or a designated target element)?

- [ ] [Detached Instantiation](https://github.com/webcomponents/gold-standard/wiki/Detached-Instantiation) — Can the component be instantiated without being part of the document?

- [ ] [Detachment](https://github.com/webcomponents/gold-standard/wiki/Detachment) — If the component is detached, does it stop listening to page events, and generally suspend non-essential tasks?

- [ ] [Reattachment](https://github.com/webcomponents/gold-standard/wiki/Reattachment) — Can a detached component be added back to the page?

### Content

- [ ] [Children Visible](https://github.com/webcomponents/gold-standard/wiki/Children-Visible) — If the component is visible and given an initial set of children, are those children visible without any attributes, methods, event handlers, or styles required?

- [ ] [Content Assignment](https://github.com/webcomponents/gold-standard/wiki/Content-Assignment) — Can you place a `<slot>` element inside a component instance and have the component treat the assigned content as if it were directly inside the component?

- [ ] [Content Changes](https://github.com/webcomponents/gold-standard/wiki/Content-Changes) — Will the component respond to runtime changes in its content (including distributed content)?

- [ ] [Child Independence](https://github.com/webcomponents/gold-standard/wiki/Child-Independence) — Can you use the component with a wide range of child element types?

- [ ] [Auxiliary Content](https://github.com/webcomponents/gold-standard/wiki/Auxiliary-Content) — Does the component permit the use of child elements that perform auxiliary functions?

- [ ] [Back-End Independence](https://github.com/webcomponents/gold-standard/wiki/Back-End-Independence) — Can the component retrieve its content from a variety of a back-end services?

### Interaction

- [ ] [Focusable](https://github.com/webcomponents/gold-standard/wiki/Focusable) — If the component is interactive, can you navigate to/through it with Tab and Shift+Tab? [*Accessibility*](https://github.com/webcomponents/gold-standard/wiki#accessibility)

- [ ] [Keyboard Support](https://github.com/webcomponents/gold-standard/wiki/Keyboard-Support) — Can you use the basic aspects of component exclusively with the keyboard? [*Accessibility*](https://github.com/webcomponents/gold-standard/wiki#accessibility)

- [ ] [Redundant Sound](https://github.com/webcomponents/gold-standard/wiki/Redundant-Sound) — If the component uses sound to communicate information, does it also provide the same information another way? [*Accessibility*](https://github.com/webcomponents/gold-standard/wiki#accessibility)

### Styling

- [ ] [Presentable](https://github.com/webcomponents/gold-standard/wiki/Presentable) — If the component is instantiated with no explicit styling, is it reasonably attractive, such that someone could feel comfortable presenting it as is?

- [ ] [Generic Styling](https://github.com/webcomponents/gold-standard/wiki/Generic-Styling) — Generally speaking, is the component’s default appearance straightforward and subdued?

- [ ] [Informational Animation](https://github.com/webcomponents/gold-standard/wiki/Informational-Animation) — Does the component’s default styling only use animation to communicate visually what is happening, rather than for purely artistic effects?

- [ ] [Static Initial Render](https://github.com/webcomponents/gold-standard/wiki/Static-Initial-Render) — Does the component avoid initial animated transitions?

- [ ] [Default Font](https://github.com/webcomponents/gold-standard/wiki/Default-Font) — By default, does the component use the inherited font face, size, style, and weight?

- [ ] [Default Colors](https://github.com/webcomponents/gold-standard/wiki/Default-Colors) — By default, does the component make use of the inherited forecolor and backcolor?

- [ ] [Focus Visible](https://github.com/webcomponents/gold-standard/wiki/Focus-Visible) — Can you easily see when the component has focus? [*Accessibility*](https://github.com/webcomponents/gold-standard/wiki#accessibility)

- [ ] [Redundant Color](https://github.com/webcomponents/gold-standard/wiki/Redundant-Color) — If the component uses color to communicate information, does it also provide the same information another way? [*Accessibility*](https://github.com/webcomponents/gold-standard/wiki#accessibility)

- [ ] [Size to Content](https://github.com/webcomponents/gold-standard/wiki/Size-to-Content) — Does the component automatically size itself to contain its content by default?

- [ ] [Stretch to Fit](https://github.com/webcomponents/gold-standard/wiki/Stretch-to-Fit) — If you stretch the component (e.g., with absolute positioning or CSS flex), do its elements appropriately stretch as well?

- [ ] [Sufficient Contrast](https://github.com/webcomponents/gold-standard/wiki/Sufficient-Contrast) — Are labels, icons, etc. perceivable and usable by low vision users? [*Accessibility*](https://github.com/webcomponents/gold-standard/wiki#accessibility)

- [ ] [High Contrast](https://github.com/webcomponents/gold-standard/wiki/High-Contrast) — Is the component perceivable and usable when High Contrast Mode is enabled? [*Accessibility*](https://github.com/webcomponents/gold-standard/wiki#accessibility)

- [ ] [Automatic Positioning](https://github.com/webcomponents/gold-standard/wiki/Automatic-Positioning) — Does the component automatically calculate positions for its elements?

- [ ] [Child Positioning](https://github.com/webcomponents/gold-standard/wiki/Child-Positioning) — Can child elements be positioned relative to their container within the component?

- [ ] [Responsive](https://github.com/webcomponents/gold-standard/wiki/Responsive) — Does the component scale well to standard mobile, tablet, and desktop screen sizes?

- [ ] [Magnification](https://github.com/webcomponents/gold-standard/wiki/Magnification) — Does the component render correctly when magnified? [*Accessibility*](https://github.com/webcomponents/gold-standard/wiki#accessibility)

- [ ] [Style Recalc](https://github.com/webcomponents/gold-standard/wiki/Style-Recalc) — Can you apply styles to a component instance even after it’s attached to the document?

- [ ] [Size Recalc](https://github.com/webcomponents/gold-standard/wiki/Size-Recalc) — If the component manually positions any subelements relative to its own size, does it appropriately recalc these positions when its own size changes?

### API

- [ ] [Member Order Independence](https://github.com/webcomponents/gold-standard/wiki/Member-Order-Independence) — Can you set or invoke the component’s attributes, properties, and methods in any order?

- [ ] [Member Combinations](https://github.com/webcomponents/gold-standard/wiki/Member-Combinations) — Can you generally use all the component’s attributes, properties, and methods in any combination?

- [ ] [Member Stability](https://github.com/webcomponents/gold-standard/wiki/Member-Stability) — If you change a component property or contents, then immediately get that property or contents, do you generally get the same result back?

- [ ] [Required Properties](https://github.com/webcomponents/gold-standard/wiki/Required-Properties) — Does the component avoid requiring properties to be set unless absolutely necessary?

- [ ] [Exposed Methods](https://github.com/webcomponents/gold-standard/wiki/Exposed-Methods) — Can you programmatically trigger all of the component’s key functionality through methods, rather than relying on user interaction?

- [ ] [Exposed Events](https://github.com/webcomponents/gold-standard/wiki/Exposed-Events) — Does the component raise events for all key points in its use?

- [ ] [Property Change Events](https://github.com/webcomponents/gold-standard/wiki/Property-Change-Events) — Does the component raise property change events when — and only when — properties change in response to internal component activity?

- [ ] [Documented API](https://github.com/webcomponents/gold-standard/wiki/Documented-API) — Does the component document its public API?

- [ ] [Hide Internal Members](https://github.com/webcomponents/gold-standard/wiki/Hide-Internal-Members) — Does the component avoid exposing internal members in its public API?

### Performance

- [ ] [Computational Performance](https://github.com/webcomponents/gold-standard/wiki/Computational-Performance) — Generally speaking, does the component perform its core functions reasonably quickly?

- [ ] [Network Performance](https://github.com/webcomponents/gold-standard/wiki/Network-Performance) — If the component uses the network, does it do so efficiently?

- [ ] [Render Performance](https://github.com/webcomponents/gold-standard/wiki/Render-Performance) — Is the component quick to get pixels on the screen when first loading and when updating?

- [ ] [Vector Graphics](https://github.com/webcomponents/gold-standard/wiki/Vector-Graphics) — Where possible and appropriate, are the component’s graphics in a scalable vector form?

- [ ] [Progress Feedback](https://github.com/webcomponents/gold-standard/wiki/Progress-Feedback) — For long operations, can the component provide appropriate feedback?

### Localization

- [ ] [Localizable Strings](https://github.com/webcomponents/gold-standard/wiki/Localizable-Strings) — Can text presented by the component be replaced for use in other languages?

- [ ] [Date+Time Format](https://github.com/webcomponents/gold-standard/wiki/Date+Time-Format) — If the component accepts or renders dates and/or times, can you change the date/time format?

- [ ] [Currency Format](https://github.com/webcomponents/gold-standard/wiki/Currency-Format) — If the component accepts or renders currency amounts, can you change the currency format?

- [ ] [Right-to-Left](https://github.com/webcomponents/gold-standard/wiki/Right-to-Left) — Can the component be configured to flip its presentation for use in right-to-left languages like Arabic and Hebrew?

### Factoring

- [ ] [Base Class](https://github.com/webcomponents/gold-standard/wiki/Base-Class) — If the component is a special case of another component, does it appropriately subclass from (or at least compose an instance of) that base class?

- [ ] [Composition](https://github.com/webcomponents/gold-standard/wiki/Composition) — Does the component appropriately delegate responsibilities to existing standard components when possible?

- [ ] [Subclassable](https://github.com/webcomponents/gold-standard/wiki/Subclassable) — Is the component subclassable?

- [ ] [Overridable Methods](https://github.com/webcomponents/gold-standard/wiki/Overridable-Methods) — Does the component provide internal methods for key functionality, such that a subclass can override those methods to refine their behavior?

### Development

- [ ] [Code Style Guide](https://github.com/webcomponents/gold-standard/wiki/Code-Style-Guide) — Does the source code comply with a standard source code style guide?

- [ ] [Open License](https://github.com/webcomponents/gold-standard/wiki/Open-License) — If the component presents itself as open source, has it been assigned a standard form of a common open source license?

- [ ] [Clean Console](https://github.com/webcomponents/gold-standard/wiki/Clean-Console) — Does the component avoid writing to the debug console unless specifically requested to do so?

- [ ] [Prefixed Name](https://github.com/webcomponents/gold-standard/wiki/Prefixed-Name) — Does the component have a name prefixed with a project name, element collection name, organization, or something with semantic meaning?
</details>