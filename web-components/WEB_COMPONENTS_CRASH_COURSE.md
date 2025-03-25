# Web Components University

So you want to contribute to Momentum-UI Web Components? Join the club! Web Components are quickly becoming one of the strongest standards of the modern web, and with the help of savvy developers such as yourself Momentum-UI has the potential to be a first class UI kit that makes the most of this next-generation technology.

Web Components is a somewhat broad topic and I encourage first-timers to read [this great primer](https://css-tricks.com/an-introduction-to-web-components/) on the basics of web components from CSS Tricks. This introduction to the basic concepts and vanilla JavaScript application lays a good foundation to better uderstand and appreciate the Momentum approach that leverages LitElement, TypeScript, and some of our home-grown standards to make for a better Dev Experience and create complex functionality.

#### [READ: CSS Tricks Intro to Web Components](https://css-tricks.com/an-introduction-to-web-components/)

_**Note:** don't fret a deep understanding of the `<template>` and `document.importNode` usage. Many of these basics are abstracted away by LitElement, and a high-level understanding of vanilla Web Components is good enough to appreciate how LitElement improves developer experience._

<hr>

## Main Concepts (the short version)
#### 1. Extending the `HTMLElement` base class
Yep, you are basically just building on top of the native `HTMLElement` class and adding your own additions, like attributes and properties, methods, lifecycle control, HTML templates and CSS styles. In our library, we extend the `LitElement` class that provides more abstraction layers, but climb just a few steps up the prototype inheritance chain and you'll find `HTMLElement` right there providing the backbone.
#### 2. Registering a Custom Element
Once you have set up your new class with customizations, you must tell the browser to register your new component as a new HTML custom element. As a rule of the road, this must have at least one hyphen in it so `<my-custom-element>` is **good** but `<myelement>` is **bad**.

*To quote CSS Tricks:*

>Essentially, a custom element consists of two pieces: a tag name and a class that extends the built-in HTMLElement class. The most basic version of our custom element would look like this:

```javascript=
class MyCustomElement extends HTMLElement {
  connectedCallback() { // lifecycle that follows the class constructor()
    this.innerHTML = `<h1>Hello, World!</h1>`;
  }
}

customElements.define('my-custom-element', MyCustomElement);
```
#### 3. Shadow DOM
Your new custom element can be configured with its own `shadowRoot`, establishing a protected bubble of DOM called the ShadowDOM. This means that there is a impermeable boundary protecting private methods and properties from the outer DOM scope, and likewise protects the main DOM from ShadowDOM contents, like CSS styles that might otherwise invade the global namespace and unintentionally break styles.

---

Those are the "Big Three" ideas, each with their own tooling and best practices, but LitElement helps limit boilerplate and best practices used in the Momentum-UI library.

We will now go into more depth, using some examples to show handy aspects of LitElement, TypeScript, CSS Constructable Stylesheets, `part()` selectors, CSS Variables for theming, home-grown helper mixins, and more.
<br>
<br>

## Momentum-UI Web Components in Depth

1. TypeScript Decorators
2. Lifecycle Methods
3. ShadowDOM: Slotted Content
4. ShadowDOM: `::part()` Selector
5. ShadowDOM: CSS Variables / CSS Custom Properties
6. Constructable Stylesheets
7. Momentum-UI Mixins / Abstract Classes
8. CustomEvents
9. LitHTML, LitCSS

### TypeScript Decorators
LitELement with Typescript enables the use of decorators that abstract away much of the boilerplate operations that are necessary in vanilla web component development. Here are some common cases.


#### `@property()`
The`@property()` decorator helps you establish a new property on your new component class. The properties you set here will be accessible as attributes on the new custom element (for primitive values) , or via `.property` notation if rich data is expected.
This decorator effectively takes care of all the getter and setter methods, and eliminates the need of a constructor (in most cases).
Explore the TS intellisense to see more control `@property()` offers, like setting an attribute name, or ensuring values are reflected.

##### Example
`@property({ type: String, attribute: "alt-text" }) altText : string = "default"`

#### `@state()`
The `@state()` decorator serves a similar function, but does not expose an attribute interface for users. It could be accessed as an element property unless marked as `private`. Properties initialized with this decorator are good for a component's internal logic

##### Example
`@state() loadingState : boolean = false`

**NOTE:** you _can_ declare ordinary properties right within the class without a decorator, however `@property()` and `@state()` are wired to LitElement's lifecycle functions, and make it easier to trigger re-renders when those properties are updated.

#### `@query()`
The `@query()` decorator is a convenient way to grab a reference to an element that is within your web component's shadow root.

##### Example
`@query('div.special-class') divRef : HTMLElement | undefined = undefined`

<hr>

### Lifecycle Methods
Vanilla JavaScript provides some elemental lifecycle methods, and LitElement provides even further assistance to ensure fine control over a web component's update and render cycle. We will give brief explanations of the most common ones here, but [read the docs for more details about their calling order and sample cases.](https://lit-element.polymer-project.org/guide/lifecycle)

**NOTE:** All lifecycle methods must call `super()` to function.
```javascript=
connectedCallback() {
  super.connectedCallback()

  console.log('connected')
}
```

#### `constructor()`
Although many of the constructor's main duties are taken care of by property setting decorators discussed above, there may sometimes be special cases when you need to execute logic before the component has parsed any attributes or properties passed into it.
#### `connectedCallback()`
This is invoked when a component is added to the document’s DOM. A n example use case is when you need to add event listeners when LitElement binding patterns won't do.
#### `disconnectedCallback()`
Invoked when a component is removed from the document’s DOM. A good time to remove event listeners, for example
#### `render()`
Renders the HTML template within the web component's shadow DOM. *This method is an exception to the 'must call `super()`' rule*
#### `firstUpdated()`
This is called after the element’s DOM has been updated the first time, immediately before `updated` is called.
#### `updated()`
Called when the element’s DOM has been updated and rendered. Implement to perform some task after an update.

[Read this to see the exact execution order LitElement enforces for the lifecycle methods.](https://lit-element.polymer-project.org/guide/lifecycle#reference)

<hr>

### ShadowDOM: Slotted Content
The ShadowDOM is by its basic nature closed off from the surrounding DOM, protecting its elements and namespaces and concealing the functionality, structure and styles within the custom element. But we need an easy way to handle child elements with sufficient control.

Using `<slot></slot>` elements within a web component's template provides a placeholder for any elements that appear in the Light DOM as children of our custom element.

#### Unnamed Slot Example
Say I have a card type element that has a specific structure, adds an image, etc . . . but I want it to be composable, allowing a developer to just pass their text in as a child (as opposed to say a `text` attribute that passes a string into a pre-defined element).

So let us assume the web component's HTML template is like this:
```htmlembedded=
<div class="wrapper">
    <div class="upper-section">
        <img src=${this.imgSrc}>
    </div>
    <div class="text-section">
        <slot></slot>
    </div>
</div>
```
And then when we use it, we know that the `<p>` content will render in the `<slot>` left for it.
```htmlembedded=
<custom-card-element img-src="https://www.some-site.com/sample.jpg">
    <p>A bit of important text</p>
</custom-card-element>
```

#### Named Slot Example
But what if we have many places where we expect content insertion via child element? Consider this version:
```htmlembedded=
<div class="wrapper">
    <div class="upper-section">
        <img src=${this.imgSrc}>
    </div>
    <div class="text-section">
        <slot name="text"></slot>
    </div>
    <div class="card-footer">
        <slot name="footer"></slot>
    </div>
</div>
```
With named slots, we add additional control as to where we can expect our children to render. Notice the connection of the slot's `name` attribute to the child element's `slot` attribute:
```htmlembedded=
<custom-card-element img-src="https://www.some-site.com/sample.jpg">
    <p slot="text">A bit of important text</p>
    <p slot="footer">
        Copyright 2021 <a href="#">Learn More</a>
    </p>
</custom-card-element>
```

**NOTE:** The key aspect of this discussion is about *composability* for the developers using your web components. Child/parent relationships are an intuitive and efficient way to write HTML, and many web components should feel like native HTML elements, rather than complex or cryptic APIs. Child content is not required for a web component to work, and there may be use cases where passing an attribute value is a better approach. Choose whatever creates the most natural developer experience.

See this in action in `md-floating-modal`

### ShadowDOM: `::part()` Selector
As mentioned before, the CSS within a web component's shadow DOM is protected from the outer namespace, and likewise will not pollute the surrounding DOM with its style declarations. This is very helpful for fine control of your component's display, but it also makes it hard to do style changes or overrides when the component is used in an application.

Let's take our card component again:
```htmlembedded=
<div class="wrapper">
    <div class="upper-section">
        <img src=${this.imgSrc}>
    </div>
    <div class="text-section">
        <slot></slot>
    </div>
</div>
```
. . . and in usage:
```htmlembedded=
<custom-card-element img-src="https://www.some-site.com/sample.jpg">
    <p>A bit of important text</p>
</custom-card-element>
```
When I use this component, I will get whatever styles come with it. But say I need to override the height of the text section to better fit my particular use. There are a handful of tricky ways to get try to access the component's shadowRoot and query `div.text-section`, but many are too verbose, or brittle, or un-reachable via the CSS we have on our application. `::part()` allows the most direct way to style elements that are in the shadow DOM.

You have to first declare the part name within the web component's template, like this: (the part name can be anything, just be sure it makes sense ;)
```htmlembedded=
<div class="wrapper">
    <div class="upper-section">
        <img src=${this.imgSrc}>
    </div>
    <div class="text-section" part="text-section">
        <slot></slot>
    </div>
</div>
```
Which allows my consuming application to style like so:
```css=
custom-card-element::part(text-section) {
    height: 4rem;
}
```

See examples of this in action in `md-avatar`, `md-combobox`, `md-accoridan`, `md-tabs`, or just do a find-all in your IDE for `part="` and see more.

### ShadowDOM: CSS Variables / CSS Custom Properties
`::part()` is excellent for targeted overrides, but what if I want to make broad style changes, like a change-able theme? There is one other way to communicate some CSS through the shadowDOM boundary: CSS Custom Properties, AKA CSS Variables.

These are not styles per se, but with coordinating the variables used by our styles within the shadow DOM with the parent elements that set those variable values, we can successfully modify designs on the go.

This is the principle that powers the `<md-theme>` component and allows easy switching of light and dark modes in a shadow DOM world.

In a nutshell, the Momentum WC library executes token-generating scripting at build time that compiles down to a collection of different CSS Variable schemas, like `lmDark.scss` and `lmLight.scss`, for example. Each schema ultimately sets a style like this:

```css=
// LIGHT MODE SCHEMA from lmLight.scss
:root,
:host {
  --md-primary-text-color: #121212;
  --md-secondary-text-color: #545454;
}
```

```css=
// DARK MODE SCHEMA from lmDark.scss
:root,
:host {
  --md-primary-text-color: #f7f7f7;
  --md-secondary-text-color: #b2b2b2;
}
```
NOTICE: The `--` is syntax that means "here is a custom CSS property I am declaring, this is available in any location within the `:root/:host` where declared". Notice that they are the same. This means that down in the shadow DOM of my web component I can say:
```css=
.main-div {
    color: var(--md-primary-text-color);
}
```
And I will receiver the hue that is currently set to that property in the higher scope!

`<md-theme>` works by swapping out the CSS file that is loaded, changing the CSS custom property values that are declared, but keeping the property values unchanged.

### Constructable Stylesheets
**Brief:** By using Webpack to load the SMACSS based style system and LitElement's `static get styles()` method, Styles are added to the CSS Object Module only once and adopted for each component instance, saving the browser from repeating and styles in the resulting DOM and improving performance. Chrome and Edge fully supported, Firefox and Safari polyfilled.
### Momentum-UI Mixins / Abstract Classes
**Brief:** Utility components like `FocusTrap` are abstract classes that can be used as the extension basis of a new component. They can provide a set of methods and properties for common component scenarios, like Focus Trapping, De Duping, Roving Tab Index, and more.
### CustomEvents
**Brief:** Creating Custom Events in a LitElement component is easy, and can be a helpful tool for making complex components or micro front ends that need to have finer control of binding data up the DOM tree through ShadowDOM. Be aware of caveats in React when a custom event is expected to be publicly visible.
### LitHTML, LitCSS
**Brief:** LitElement makes full leverage of template strings to make writing HTML templates for shadow DOM rendering super simple and native. LitHTML is ideal for writing true native HTML with interpolation using `${someVariable}`. Likewise, litCSS provides the same specifically for native composed CSS.


THIS IS A LIVING DOCUMENT . . . if you have any feedback, requests for further information, or corrections please feel free to create an Issue ticket, or send an email to kehyde@cisco.com