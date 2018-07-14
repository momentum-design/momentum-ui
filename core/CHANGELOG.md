# [10.17.0](https://github.com/collab-ui/collab-ui-core/compare/v10.16.0...v10.17.0) (2018-07-14)


### Bug Fixes

* **button:** add color-none and size-none as button classes ([f8b311c](https://github.com/collab-ui/collab-ui-core/commit/f8b311c))
* **button:** fix conditional statements in button-circle-size ([06e773f](https://github.com/collab-ui/collab-ui-core/commit/06e773f))
* **button:** make none class more specifc to overwrite defaults ([9ac99ae](https://github.com/collab-ui/collab-ui-core/commit/9ac99ae))
* **input:** hide browser default clear button ([74b0e85](https://github.com/collab-ui/collab-ui-core/commit/74b0e85))
* **modal:** content not growing to min-height ([64c51ff](https://github.com/collab-ui/collab-ui-core/commit/64c51ff))
* **modal:** min-height issue on mobal breakpoint ([ea19e3c](https://github.com/collab-ui/collab-ui-core/commit/ea19e3c))


### Features

* **avatar:** add avatar size 56 ([d570024](https://github.com/collab-ui/collab-ui-core/commit/d570024))
* **input:** add clear button ([ec933f5](https://github.com/collab-ui/collab-ui-core/commit/ec933f5))

# [10.16.0](https://github.com/collab-ui/collab-ui-core/compare/v10.15.0...v10.16.0) (2018-07-12)


### Bug Fixes

* **modal:** add min-height, max-height restrictions to modal ([4c70c72](https://github.com/collab-ui/collab-ui-core/commit/4c70c72))


### Features

* **button:** add circle sizes(20, 28, 32, 40, 56, 68, 72, 84), add pill sizes(28, 40) ([1ad3cc1](https://github.com/collab-ui/collab-ui-core/commit/1ad3cc1))

# [10.15.0](https://github.com/collab-ui/collab-ui-core/compare/v10.14.2...v10.15.0) (2018-07-11)


### Bug Fixes

* **modal:** adjust dialog padding, modal header flex flow ([5d53756](https://github.com/collab-ui/collab-ui-core/commit/5d53756))


### Features

* **date-picker:** Changes as per comments on DatePicker ([ab4bffb](https://github.com/collab-ui/collab-ui-core/commit/ab4bffb))

## [10.14.2](https://github.com/collab-ui/collab-ui-core/compare/v10.14.1...v10.14.2) (2018-07-09)


### Bug Fixes

* **modal:** move padding from container to internal selectors ([c39c951](https://github.com/collab-ui/collab-ui-core/commit/c39c951))

## [10.14.1](https://github.com/collab-ui/collab-ui-core/compare/v10.14.0...v10.14.1) (2018-07-06)


### Bug Fixes

* **close:** change close component colors ([6afda58](https://github.com/collab-ui/collab-ui-core/commit/6afda58))

# [10.14.0](https://github.com/collab-ui/collab-ui-core/compare/v10.13.1...v10.14.0) (2018-07-06)


### Features

* **modal:** update modal to Toolkit design ([d08e345](https://github.com/collab-ui/collab-ui-core/commit/d08e345))

## [10.13.1](https://github.com/collab-ui/collab-ui-core/compare/v10.13.0...v10.13.1) (2018-06-29)


### Bug Fixes

* **top-bar:** add cui-top-bar__brand container ([e7718e7](https://github.com/collab-ui/collab-ui-core/commit/e7718e7))

# [10.13.0](https://github.com/collab-ui/collab-ui-core/compare/v10.12.0...v10.13.0) (2018-06-27)


### Bug Fixes

* **SpaceListMeeting:** removed unused code ([a31731a](https://github.com/collab-ui/collab-ui-core/commit/a31731a))


### Features

* **Menu:** className changes after component renaming ([5c63e98](https://github.com/collab-ui/collab-ui-core/commit/5c63e98))

# [10.12.0](https://github.com/collab-ui/collab-ui-core/compare/v10.11.0...v10.12.0) (2018-06-26)


### Features

* **link:** link style/examples created ([081b847](https://github.com/collab-ui/collab-ui-core/commit/081b847))

## Change Log
All notable changes to this project will be documented in this file.

### v10.11.0 (2018-6-20)

#### Features

* **ListItemMeeting**: component created
* **CompositeAvatar**: added 84 size
* **Menu**:
  * Rounded edges to last elements and first elements of menu
  * Added MenuContent and MenuBar as composable components
  * Seperated Menu into composable components
* **ButtonGroup**:
  * Review comments fixed
  * Using mixins to color buttons used in button-group
  * Added highlightSelected and justified prop
* **Button**: added button icon class

#### Bug Fixes

* **Checkbox**: Aligning subsequent lines of label with the first line of label
* **CheckBox/Radio**: Fix for text wrapping on Checkbox and RadioButton
* **ButtonGroup**: adjust styling
* **Button**: Loading reverted
* **ListItem**: changed base color
* **ListItemMeeting**: added progress bar

### v10.10.0 (2018-6-13)

#### Features

* **avatar**: add self class
* **nav-side-admin**: change the padding of the logo in the nav header

#### Bug Fixes

* **panel**: IE fix height of panel column flex container
* **modal**: IE fix width of .modal-body children

### v10.9.0 (2018-6-11)

#### Features

* **AlertMeeting**: Adjust styles for absence of snooze button.
* **Coachmark**: added Coachmark styles

#### Bug Fixes

* **List**: fix flex for vertical and listItem sizing
* **ListItemHeader**: children clickable
* **avatar**: update bg color for avatar with img

### v10.8.0 (2018-6-8)

#### Features

* **focus**: changed focus state to mimic native

### v10.7.0 (2018-6-6)

#### Features

* **sub-menu**:
  * Displaying arrow and selected value if the menu item has a submenu
  * Displaying arrow and selected value if the menu item has a submenu
* **avatar**: added sizes

#### Bug Fixes

* **avatar**: fixed class name for img__hidden
* **space-list**: ellipsis overflow to attachment-bottom
* **list-item**: fix mixin issue for Sections

### v10.6.0 (2018-6-5)

#### Features

* **list-item**:
  * Rebase from master
  * Add styling for list-item separator
* **button**: added white button style
* **alert-container**: Styles for displaying alerts
* **social-list**:
  * add social list style and fix footer style
  * add social list style
* **space-list**: added types

#### Bug Fixes

* icon**: added to nav.json
* space-list**: fix header on filter type
* list-ltem**: removed SpaceList setting
* avatar**: display none for hidden

#### Refactors

* **listItem**: split mixins

### v10.5.0 (2018-5-31)

#### Features

* **sub-menu**:
  * Remove overflow auto default value for eventOverlay and using it only in required cases
  * add the docs changes for Menu
* **alert-call**: Add device selection list
* **avatar**:
  * Changing xlarge size of avatar
  * Sizing the avatars with ems
  * Review comments fixed

#### Bug Fixes:

* **listItemSection** added back flex-shrink
* **button** remove all link styles

### v10.4.0 (2018-5-21)

#### Features

* **AlertCall**: Styling for AlertCall component
* **accordion**:
  * Adding height as a modifier
  * Added dark style to accordion

### v10.3.3 (2018-5-18)

#### Bug Fixes

* **panel**: ie11 flex fix for footer

### v10.3.2 (2018-5-14)

* **media**: fix height media query

### v10.3.1 (2018-5-14)

#### Features

* **media**: add small and medium heigh media queries
* **blockquote**: make font color inherit and update border color

#### Bug Fixes

* **panel**: update logo spacing for short screens


### v10.3.0 (2018-5-11)

#### Features

* **avatar**: Add bot,failure badge, and typing types to Avatar

### v10.2.0 (2018-5-10)

#### Features

* **logos**: add cisco and webex logos to package
* **SpaceListMeeting**: added styling
* **MeetingAlert**: Styles for Meeting Alert.
* **Alert**: Updated design for Alert
* **ListItemHeader**: created SparkUI styles
* **CollapseButton**:
  * Adjusted style according to mocks
  * Implementation for CollapseButton
* **Accordion**:
  * Controlling separator by a prop
  * Adding group separator or accordion

#### Bug Fixes

* **list**: added vertical list class
* **listItem**: fixed color since form label changed to inherit


### v10.1.3 (2018-5-7)

#### Bug Fixes

* **panel**: update padding for input with icon

### v10.1.2 (2018-5-8)

#### Features

* **panels**: update styles for new design

### v10.1.1 (2018-5-7)

#### Bug Fixes

* **npm**: move cli-patch for post-install script

### v10.1.0 (2018-5-7)

#### Features

* **panel**: add panels for login, sign up and error flows

#### Bug Fixes

* **colors**: make black colors inherit for default text colors

### v10.0.0 (2018-5-4)

#### Features

* **focus**: add remove focus mixin
* **space-list**: added overview variation
* **sideNav**: code refactor
* **sideNav**: add left side navigation style
* **slider**: Fixing alignment of sliderlabel
* **sites**: add layout styles for collab sites
* **editText**: nav.json entry for editable textfield
* **Lightbox**: changes as per comments in collabui/react
* **docs**: Added back the missing docs
* **light-box**: light-box implementation

#### Bug Fixes

* **badge**: move unprefixed badge class to ng
* **typography**: remove default H tag colors
* **class name**: change summary to overview
* **avatar**: remove unecessary flex mixin
* **docs**: add missing footer section
* **spelling**: change backround to background
* **button**:
  * added mozilla prefix back in
  * per PR comments
  * abstract mixins and fix dark states
  * remove last button selector
* **buttonContainer**:
  * selectors and variables
  * applied size to button container
* **footer**: update styles to match design
* **top-bar**: update styles for sites top-bar


#### Refactors

* **popover**: update to current style standards
* **avatar**: replace class selector with variable
* **footer**: remove unused selectors

### Breaking changes

* **popover**: add cui prefix to popovers
* **breadcrumbs**: add cui prefix to breadcrumbs

### v9.0.1 (2018-4-27)

#### Bug Fixes

* **icons:** update icon font name

### v9.0.0 (2018-4-25)

#### Chores

* **release:** initial release to new GitHub Repo
