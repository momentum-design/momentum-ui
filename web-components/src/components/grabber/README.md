# Button

Button provides a easy-to-use web component that works well with Lumos design.

### Attributes

- `ariaLabel` : String - accessibility text that labels the button when text label is not visible on screen
- `ariaLabelledBy` : String - accessibility text that labels the button when there is visible text on screen
- `ariaExpanded` : Boolean - accessibility text to convey that the button's visibility can be toggled
- `ariaHaspopup` : Boolean - accessibility text that indicates availability/type of interactive popup element that the button can trigger.
- `ariaPressed` : Boolean - accessibility text that describes the state of the button

- `circle` : Boolean - value to set the button shape as a circle
- `color` : String - sets the background color of the button
- `containerLarge` : Boolean - sets the button container to a larger size, usually if you are including a button label
- `disabled` : Boolean - disabled the button visually and functionally

- `href` : String - adds hyperlink to button when the button property tag is set to anchor (`a`)
- `id` : String - sets the id property of the html button
- `value` : String - sets the value html property to the button when the button property tag is set to input

- `label` : String - renders text positioned below the button within container
- `loading` : Boolean - displays a loading spinner within button
- `outline` : Boolean - visually changes the button to have an outline correlating with the color property

- `hasRemoveStyle` : Boolean - removes all default styling to the button
- `size` : String - sets the size of the button
- `tag` : String - determines the button's html tag (button, input, a)

- `type` : String - sets the type property of the html button (button, reset, submit)
- `role` : String - sets the role property of the html button
- `variant` : String - sets the Lumos color variant of the button's background

- `activityType` : String - sets the activity type of the button visually
- `iconActive` : Boolean - sets the button visually for icon
- `clickFunction` : Function - set the function for the button's onClick

### Styling

The wrapping container of the button can be reached via CSS by using the `::part()` selector. For example, in your application's stylesheet you can say:

```CSS
md-button::part(button) {
    width: 100px;
    max-width: 600px;
    font-size: 14px;
}
```

### Slots

#### Unnamed Slots

The Unnamed `<slot>` will render any content you pass between the `<md-button></md-button>` tags.

```html
<md-button>
  <p>Click Me</p>
</md-button>
```

#### Button Named Slots

`text slot` will render text within the button with default padding
`icon slot` will render an icon within the button with default padding

```html
<md-button>
  <md-icon name="icon" name="cancel_16"></md-icon>
  <p name="text"></p>
</md-button>
```
