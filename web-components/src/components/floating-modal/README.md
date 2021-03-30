# Floating Modal

Floating Modal provides a movable and scalable modal for more dynamic UI.

### Attributes
- `heading` : String - Text content for the modal header
- `label` : String - text content for the `aria-label` attribute for A11y
- `aspect-ratio` : Boolean - Preserves width/height ratio of modal on resize
- `fixed-strategy` : Boolean - Allows user to enable `fixed` position style for the modal element.
- `full-screen` : Boolean - Toggles full screen modal mode

### Styling
The wrapping container of the modal can be reached via CSS by using the `::part()` selector. For example, in your application's stylesheet you can say:
```CSS
md-floating-modal::part(floating) {
  min-height: 400px;
  min-width: 600px;
} 
```

### Slots
#### Unnamed Slots
The Unnamed `<slot>` will render any content you pass between the `<md-floating-modal></md-floating-modal>` tags.
#### Named Slots
`<slot name="header"></slot>` will render header text if provided in the component's `header` attribute.
