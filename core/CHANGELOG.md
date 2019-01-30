# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [11.4.0](https://github.com/collab-ui/collab-ui/compare/@collab-ui/core@11.1.0...@collab-ui/core@11.4.0) (2019-01-30)


Note: Version bump only for package @collab-ui/core





# [11.3.0](https://github.com/collab-ui/collab-ui/compare/@collab-ui/core@11.1.0...@collab-ui/core@11.3.0) (2019-01-30)


Note: Version bump only for package @collab-ui/core





# [11.2.0](https://github.com/collab-ui/collab-ui/compare/@collab-ui/core@11.1.0...@collab-ui/core@11.2.0) (2019-01-29)


### Bug Fixes

* **cui-flags:** adding back the flags.png image - SPARK-29316 ([63bd7a9](https://github.com/collab-ui/collab-ui/commit/63bd7a9))
* **Input:** fix icon alignment issues ([e02d0ec](https://github.com/collab-ui/collab-ui/commit/e02d0ec))
* **PhoneNumber:** add missing flag images ([8ad4f32](https://github.com/collab-ui/collab-ui/commit/8ad4f32))
* **PhoneNumber:** update variable names to proper format ([0753f7c](https://github.com/collab-ui/collab-ui/commit/0753f7c))


### Features

* **colors:** add indigo-base, organize colors ([d74e321](https://github.com/collab-ui/collab-ui/commit/d74e321))
* **phone-number:** Updating cs-phone-number to new look/feel ([4264eef](https://github.com/collab-ui/collab-ui/commit/4264eef))





# [11.1.0](https://github.com/collab-ui/collab-ui/compare/@collab-ui/core@11.0.0...@collab-ui/core@11.1.0) (2019-01-23)


### Bug Fixes

* **alert:** change max-width to width to be IE compatible ([69f6585](https://github.com/collab-ui/collab-ui/commit/69f6585))
* **button-group:** remove direct descendant selectors ([54a21eb](https://github.com/collab-ui/collab-ui/commit/54a21eb))
* **CallControl:** fix colors for call controls ([cbfba8c](https://github.com/collab-ui/collab-ui/commit/cbfba8c))


### Features

* **Avatar:** add in call, in meeting, presenting types ([90c1a60](https://github.com/collab-ui/collab-ui/commit/90c1a60))





## [11.0.1](https://github.com/collab-ui/collab-ui/compare/@collab-ui/core@11.0.0...@collab-ui/core@11.0.1) (2019-01-16)

**Note:** Version bump only for package @collab-ui/core





# [11.0.0](https://github.com/collab-ui/collab-ui/compare/@collab-ui/core@10.43.3...@collab-ui/core@11.0.0) (2019-01-16)


### Bug Fixes

* **colors:** fix colorList in color settings file ([c01d6f2](https://github.com/collab-ui/collab-ui/commit/c01d6f2))
* **date-picker:** adding classes to allow date-picker calendar to adjust for modal scrolling and partial cut off like dropdowns - CIR-328 ([3ea65da](https://github.com/collab-ui/collab-ui/commit/3ea65da))
* **list-separator:** fix list separator color on dark backgrounds ([0d02e5b](https://github.com/collab-ui/collab-ui/commit/0d02e5b))


### Features

* **ButtonGroup:** adjust cloning so Buttons can be wrapped ([3f11979](https://github.com/collab-ui/collab-ui/commit/3f11979))
* **buttons:** add new colors ([5fb9ef3](https://github.com/collab-ui/collab-ui/commit/5fb9ef3))


### BREAKING CHANGES

* **ButtonGroup:** Coachmark - change buttonChildren to buttonProps to include all props to be passed to internal button
Popover - change to React.Fragment instead of span (adjust app css if necessary)
Tooltip - add popoverProps to pass any popoverProps to Popover instead of passing extra props to Popover
Coachmark - change to React.Fragment instead of span (adjust app css if necessary)





## [10.43.3](https://github.com/collab-ui/collab-ui/compare/@collab-ui/core@10.43.2...@collab-ui/core@10.43.3) (2019-01-11)

**Note:** Version bump only for package @collab-ui/core





## [10.43.2](https://github.com/collab-ui/collab-ui/compare/@collab-ui/core@10.43.1...@collab-ui/core@10.43.2) (2019-01-10)


### Bug Fixes

* update prepublish scripts and ignore sample apps ([c285588](https://github.com/collab-ui/collab-ui/commit/c285588))





## [10.43.1](https://github.com/collab-ui/collab-ui/compare/@collab-ui/core@9.0.1...@collab-ui/core@10.43.1) (2019-01-10)

**Note:** Version bump only for package @collab-ui/core





## 10.43.0 (2019-01-09)

**Note:** Version bump only for package
@collab-ui/core




# 10.42.0 (2018-12-20)


### Bug Fixes

* **fonts:** update font paths to target CDN by default
* **typography:** add !important to font utility classes
* **typography:** add namespace to H elements


### Features

* **spinner:** adding new sizes to cui-spinner - SPARK-29316





# 10.41.0 (2018-12-19)


### Features

* **accordion:** removing accordion from ng.scss - SPARK-29316
* **buttons:** removing button.scss from ng.scss - SPARK-29316
* **date-picker:** Updating date-picker scss for use in Atlas
* **formly:** removing formly from ng.scss since formly is no longer in use - SPARK-29316
* **overlay-panel:** Removing overlay-panel.scss from ng.scss file - SPARK-29316





# 10.40.0 (2018-12-15)


### Bug Fixes

* **Avatar:** fix active circle in IE 11


### Features

* **timepicker:** removing timepicker from ng.scss - SPARK-29316





## 10.39.2 (2018-12-06)


### Bug Fixes

* **core examples:** create examples for different sections
* **tabs:** Fixing Header/Sub-header tabs that were too high - SPARK-29316





## 10.39.1 (2018-12-05)


### Bug Fixes

* **images:** revert directory restructuring for webex logos





# 10.39.0 (2018-12-04)


### Bug Fixes

* **top-bar:** update logo padding and sizes


### Features

* **logos:** add calling, meetings and teams logos





# 10.38.0 (2018-11-30)


### Features

* **tabs:** Updating tabs to fix justified tabs and nav-tabs - SPARK-29316





## 10.37.5 (2018-11-28)


### Bug Fixes

* **modal:** update modal-body padding





## 10.37.4 (2018-11-27)


### Bug Fixes

* **alert:** styling in wrong place to be applied to all alert types - SPARK-29316





## 10.37.3 (2018-11-26)


### Bug Fixes

* **modals:** update min-height to auto





## 10.37.2 (2018-11-26)


### Bug Fixes

* **modal:** fix flex height issue on vertically short screens





## 10.37.1 (2018-11-21)


### Bug Fixes

* **page-sub-header:** fix padding for flex





# 10.37.0 (2018-11-20)


### Bug Fixes

* **content-item:** fix alignment when title/subtitle is null


### Features

* **alert:** Updating alerts for use in Atlas - SPARK-29316





## 10.36.2 (2018-11-19)


### Bug Fixes

* **modal:** move modal-padding properties to a mixin





## 10.36.1 (2018-11-16)


### Bug Fixes

* **content-item:** gifIcon placement fix, no-border on oneOne, file wide background-size to contain
* **modal:** remove minimum height on small screens
* **modal:** update body padding class to 32px





# 10.36.0 (2018-11-09)


### Features

* **modal:** restructure html and classnames for dialog update





## 10.35.1 (2018-11-09)


### Bug Fixes

* **content-item:** add text overflow ellipsis to avoid overlap, add position relative and box-shadow





# 10.35.0 (2018-11-07)


### Features

* **examples:** add new components json





# 10.34.0 (2018-11-06)


### Bug Fixes

* **npm:** remove post install script for non-bash installs
* **reveal:** adding reveal.scss file back in - SPARK-29316


### Features

* **content-item:** add title fix for overlap, gif icon, pointer cursor
* **modal:** Removing reveal.scss and adding cui-modal__body--padding class to modal.scss - SPARK-29316





## 10.33.2 (2018-11-02)


### Bug Fixes

* **Panel:** second attempt to fix input clear button within cui-panel





## 10.33.1 (2018-11-01)


### Bug Fixes

* **panel:** correct position of clear icon button within Input Component





# 10.33.0 (2018-10-31)


### Bug Fixes

* **content-item:** cursor pointer modifier, cursor global utility file
* **progress-bar:** update height and background color


### Features

* **content-item:** add title fix for overlap, gif icon, pointer cursor
* **list-item:** add flex wrap style to lists





## 10.32.5 (2018-10-29)


### Bug Fixes

* **icons:** bump icons version





## 10.32.4 (2018-10-29)


### Bug Fixes

* **tabs:** Fixing cui-tabs--justified being too small - SPARK-29316





## 10.32.3 (2018-10-25)


### Bug Fixes

* **typography:** remove placeholder overrides





## 10.32.2 (2018-10-25)


### Bug Fixes

* Fixing breadcrumb alignment & tokenfield appearance - SPARK-29316





## 10.32.1 (2018-10-18)


### Bug Fixes

* **setup-assistant:** pushing down btn-help text to prevent overlap with actual button - SPARK-29316





# 10.32.0 (2018-10-18)


### Features

* additional modal & search-filter fixes - SPARK-29316
* **badge:** add colors for call features
* **tokenfield:** Fixing tokenfield close button - SPARK-29316





# 10.31.0 (2018-10-12)


### Features

* Button updates for overlay and modals - SPARK-29613





## 10.30.1 (2018-10-11)


### Bug Fixes

* **avatar:** add hover/pressed states when clickable





# 10.30.0 (2018-10-05)


### Features

* **contrast:** adding more contrasting value variations
* **contrast:** factoring out contrast values from list





## 10.29.1 (2018-10-03)


### Bug Fixes

* **ng:** updates for collab-ui-ng





# 10.29.0 (2018-10-03)


### Features

* **typeahead:** typeahead fixes - SPARK-29613





# 10.28.0 (2018-09-28)


### Bug Fixes

* **ng:** missing variables for ng styles


### Features

* **checkbox:** add outline as the default checkbox
* **input:** add outline as the default input
* **radio:** add outline as the default radio





# 10.27.0 (2018-09-26)


### Features

* **content-item:** add style to content-item





## 10.26.1 (2018-09-20)


### Bug Fixes

* **contrast:** breaking commas at end of list





# 10.26.0 (2018-09-19)


### Features

* **contrast:** adding contrast state for inputs





## 10.25.1 (2018-09-14)


### Bug Fixes

* **typography:** update typography to latest spec, add cui prefix





# 10.25.0 (2018-09-12)


### Bug Fixes

* **list-item:** allow read only class to have click events
* **menu-item:** change height to min-height
* **select:** add max-height to combo-box and select
* **select:** add max-height to combo-box and select


### Features

* **combo-box:** add styles for list-item-header in combo-box
* **contrast:** adds new contrasting colors
* **utilities:** add blur style for decrypting state





# 10.24.0 (2018-08-31)


### Bug Fixes

* **buttonGroup:** change box-shadow and border to variables


### Features

* **buttonGroup:** add first-child last-child to pill class
* **buttonGroup:** add pill class for button group
* **buttonGroup:** add radius-pill variable
* **buttonGroup:** change to -pill modifier
* **chip:** add chip component





## 10.23.2 (2018-08-31)


### Bug Fixes

* **collab-ui-ng:** updates for AngularJS library





## 10.23.1 (2018-08-27)


### Bug Fixes

* **list:** list set to 100% width of container





# 10.23.0 (2018-08-27)


### Bug Fixes

* **listItemMeeting:** add date class to list item meeting
* **listItemMeeting:** remove --date class, not used
* **listItemMeeting:** remove comment of left-date


### Features

* **listItemMeeting:** add chip modifier
* **listSeparator:** add line color, text color, padding, margin





# 10.22.0 (2018-08-16)


### Features

* **avatar:** add notification badge
* **modal:** add message class in modal header





# 10.21.0 (2018-08-10)


### Bug Fixes

* **avatar:** apply factor sizing & fix ooo/dnd icon sizes
* **scrollbar:** remove IE body code, add & to selector


### Features

* **spinner:** add check class and ratio’s for circle to checkmark size.





# 10.20.0 (2018-08-09)


### Features

* **scrollbar:** add base scrollbar mixin





## 10.19.1 (2018-08-03)


### Bug Fixes

* **menu-overlay:** add separate class name for isHeader
* **menu-overlay:** remove hardcoded width for menu item





# 10.19.0 (2018-08-02)


### Features

* **combo-box:** ComboBox Implementation Phase 1/Phase 2





## 10.18.2 (2018-08-02)


### Bug Fixes

* **avatar:** apply after element for avatar presence ring
* **editable-textfield:** make default styling that of input
* **tooltip:** add white space wrap to tooltip text





## 10.18.1 (2018-07-27)


### Bug Fixes

* **coachmark:** remove stretch from container





# 10.18.0 (2018-07-24)


### Bug Fixes

* **avatar:** remove border and adjust box-shadow for avatar
* **coachmark:** add flex fix for IE 11 compatibility
* **list:** fix list to remove width and adjust flex-basis of list-item--sections


### Features

* **avatar:** add dark theme style for avatar





## 10.17.3 (2018-07-23)


### Bug Fixes

* **editable-textfield:** make styles consistent when switched between button/input
* **event-overlay:** update border and arrow positioning
* **tooltip:** update border and arrow positioning





## 10.17.2 (2018-07-23)


### Bug Fixes

* **modal:** fix modal sizing in ie





## 10.17.1 (2018-07-20)


### Bug Fixes

* **alert:** add flex-basis for content area(ie compatibility)
* **button:** change white button active color to gray-5
* **components:** fix ie compatibility
* **list-item:** change width in horizontal for ie compatibility





# 10.17.0 (2018-07-14)


### Bug Fixes

* **button:** add color-none and size-none as button classes
* **button:** fix conditional statements in button-circle-size
* **button:** make none class more specifc to overwrite defaults
* **input:** hide browser default clear button
* **modal:** content not growing to min-height
* **modal:** min-height issue on mobal breakpoint


### Features

* **avatar:** add avatar size 56
* **input:** add clear button





# 10.16.0 (2018-07-12)


### Bug Fixes

* **modal:** add min-height, max-height restrictions to modal


### Features

* **button:** add circle sizes(20, 28, 32, 40, 56, 68, 72, 84), add pill sizes(28, 40)





# 10.15.0 (2018-07-11)


### Bug Fixes

* **modal:** adjust dialog padding, modal header flex flow


### Features

* **date-picker:** Changes as per comments on DatePicker





## 10.14.2 (2018-07-09)


### Bug Fixes

* **modal:** move padding from container to internal selectors





## 10.14.1 (2018-07-06)


### Bug Fixes

* **close:** change close component colors





# 10.14.0 (2018-07-06)


### Features

* **modal:** update modal to Toolkit design





## 10.13.1 (2018-06-29)


### Bug Fixes

* **top-bar:** add cui-top-bar__brand container





# 10.13.0 (2018-06-27)


### Bug Fixes

* **SpaceListMeeting:** removed unused code


### Features

* **Menu:** className changes after component renaming





# 10.12.0 (2018-06-26)


### Features

* **link:** link style/examples created

## Change Log
All notable changes to this project will be documented in this file.





# 10.11.0 (2018-6-20)

### Features

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

### Bug Fixes

* **Checkbox**: Aligning subsequent lines of label with the first line of label
* **CheckBox/Radio**: Fix for text wrapping on Checkbox and RadioButton
* **ButtonGroup**: adjust styling
* **Button**: Loading reverted
* **ListItem**: changed base color
* **ListItemMeeting**: added progress bar





# 10.10.0 (2018-6-13)

### Features

* **avatar**: add self class
* **nav-side-admin**: change the padding of the logo in the nav header

### Bug Fixes

* **panel**: IE fix height of panel column flex container
* **modal**: IE fix width of .modal-body children





# 10.9.0 (2018-6-11)

### Features

* **AlertMeeting**: Adjust styles for absence of snooze button.
* **Coachmark**: added Coachmark styles

### Bug Fixes

* **List**: fix flex for vertical and listItem sizing
* **ListItemHeader**: children clickable
* **avatar**: update bg color for avatar with img





# 10.8.0 (2018-6-8)

### Features

* **focus**: changed focus state to mimic native





# 10.7.0 (2018-6-6)

### Features

* **sub-menu**:
  * Displaying arrow and selected value if the menu item has a submenu
  * Displaying arrow and selected value if the menu item has a submenu
* **avatar**: added sizes

### Bug Fixes

* **avatar**: fixed class name for img__hidden
* **space-list**: ellipsis overflow to attachment-bottom
* **list-item**: fix mixin issue for Sections





# 10.6.0 (2018-6-5)

### Features

* **list-item**:
  * Rebase from master
  * Add styling for list-item separator
* **button**: added white button style
* **alert-container**: Styles for displaying alerts
* **social-list**:
  * add social list style and fix footer style
  * add social list style
* **space-list**: added types

### Bug Fixes

* icon**: added to nav.json
* space-list**: fix header on filter type
* list-ltem**: removed SpaceList setting
* avatar**: display none for hidden

### Refactors

* **listItem**: split mixins





# 10.5.0 (2018-5-31)

### Features

* **sub-menu**:
  * Remove overflow auto default value for eventOverlay and using it only in required cases
  * add the docs changes for Menu
* **alert-call**: Add device selection list
* **avatar**:
  * Changing xlarge size of avatar
  * Sizing the avatars with ems
  * Review comments fixed

### Bug Fixes:

* **listItemSection** added back flex-shrink
* **button** remove all link styles





# 10.4.0 (2018-5-21)

### Features

* **AlertCall**: Styling for AlertCall component
* **accordion**:
  * Adding height as a modifier
  * Added dark style to accordion





## 10.3.3 (2018-5-18)

### Bug Fixes

* **panel**: ie11 flex fix for footer





## 10.3.2 (2018-5-14)

* **media**: fix height media query





## 10.3.1 (2018-5-14)

### Features

* **media**: add small and medium heigh media queries
* **blockquote**: make font color inherit and update border color

### Bug Fixes

* **panel**: update logo spacing for short screens






# 10.3.0 (2018-5-11)

### Features

* **avatar**: Add bot,failure badge, and typing types to Avatar





# 10.2.0 (2018-5-10)

### Features

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

### Bug Fixes

* **list**: added vertical list class
* **listItem**: fixed color since form label changed to inherit






## 10.1.3 (2018-5-7)

### Bug Fixes

* **panel**: update padding for input with icon





## 10.1.2 (2018-5-8)

### Features

* **panels**: update styles for new design





## 10.1.1 (2018-5-7)

### Bug Fixes

* **npm**: move cli-patch for post-install script





# 10.1.0 (2018-5-7)

### Features

* **panel**: add panels for login, sign up and error flows

### Bug Fixes

* **colors**: make black colors inherit for default text colors





# 10.0.0 (2018-5-4)

### Features

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

### Bug Fixes

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


### Refactors

* **popover**: update to current style standards
* **avatar**: replace class selector with variable
* **footer**: remove unused selectors

### Breaking changes

* **popover**: add cui prefix to popovers
* **breadcrumbs**: add cui prefix to breadcrumbs





## 9.0.1 (2018-4-27)

### Bug Fixes

* **icons:** update icon font name





# 9.0.0 (2018-4-25)

### Chores

* **release:** initial release to new GitHub Repo
