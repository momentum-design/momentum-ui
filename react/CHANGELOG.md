# [8.0.0](https://github.com/collab-ui/collab-ui-react/compare/v7.14.0...v8.0.0) (2018-07-14)


### Bug Fixes

* **Button:** add removeStyle prop to Button component ([6a4cce0](https://github.com/collab-ui/collab-ui-react/commit/6a4cce0))
* **Coachmark:** set isOpen state to false when prop changes to false ([ff71525](https://github.com/collab-ui/collab-ui-react/commit/ff71525))
* **EventOverlay:** remove keyup event handler if allowClickAway is false ([1de71b1](https://github.com/collab-ui/collab-ui-react/commit/1de71b1))
* **Icon:** change Icon onClick prop to mimic Avatar onClick prop ([74bed0d](https://github.com/collab-ui/collab-ui-react/commit/74bed0d))


### Features

* **Avatar:** add onClick prop to wrap Avatar in button ([c002457](https://github.com/collab-ui/collab-ui-react/commit/c002457))
* **DatePicker:** DatePicker component implementation ([98000db](https://github.com/collab-ui/collab-ui-react/commit/98000db))
* **Icon:** add clear button functionality ([3ae5556](https://github.com/collab-ui/collab-ui-react/commit/3ae5556))


### BREAKING CHANGES

* **Icon:** Icon isClickable prop has been removed and replaced with onClick. Remove isClickable prop.
* **Button:** Behavior of color="none" prop has changed. "removeStyle" prop now removes all button styles. color="none" prop only removes color styling. size="none" prop only removes size.

# [7.14.0](https://github.com/collab-ui/collab-ui-react/compare/v7.13.1...v7.14.0) (2018-07-12)


### Bug Fixes

* **SpaceListMeeting:** change join button to proper size ([b12b948](https://github.com/collab-ui/collab-ui-react/commit/b12b948))


### Features

* **Alerts:** add props to change ariaLabel ([02a4dcc](https://github.com/collab-ui/collab-ui-react/commit/02a4dcc))
* **Button:** add size prop/default for button ([14b081d](https://github.com/collab-ui/collab-ui-react/commit/14b081d))

## [7.13.1](https://github.com/collab-ui/collab-ui-react/compare/v7.13.0...v7.13.1) (2018-07-06)


### Bug Fixes

* **ModalHeader:** allow passing of children ([fc5ea53](https://github.com/collab-ui/collab-ui-react/commit/fc5ea53))

# [7.13.0](https://github.com/collab-ui/collab-ui-react/compare/v7.12.1...v7.13.0) (2018-07-06)


### Features

* **ModalHeader:** allow ModalHeader to be passed into Modal ([d862004](https://github.com/collab-ui/collab-ui-react/commit/d862004))

## [7.12.1](https://github.com/collab-ui/collab-ui-react/compare/v7.12.0...v7.12.1) (2018-07-03)


### Bug Fixes

* **Input:** remove required name prop, rename id prop ([200ff0a](https://github.com/collab-ui/collab-ui-react/commit/200ff0a))
* **TimePicker:** add inputId prop or create unique one ([691ce80](https://github.com/collab-ui/collab-ui-react/commit/691ce80))

# [7.12.0](https://github.com/collab-ui/collab-ui-react/compare/v7.11.0...v7.12.0) (2018-06-29)


### Bug Fixes

* **Coachmark:** made allowClickAway prop changeable ([cf492e3](https://github.com/collab-ui/collab-ui-react/commit/cf492e3))
* **Icon:** change method of creating unique Id's ([e5e7505](https://github.com/collab-ui/collab-ui-react/commit/e5e7505))
* **Popover:** handle anchor event handlers within Popover ([172a316](https://github.com/collab-ui/collab-ui-react/commit/172a316))
* **Topbar:** add branchAnchorElement prop for wrapping brand logo ([3ef41bf](https://github.com/collab-ui/collab-ui-react/commit/3ef41bf))


### Features

* **DatePicker:** Datepicker component - Phase 1 ([9c900eb](https://github.com/collab-ui/collab-ui-react/commit/9c900eb))

# [7.11.0](https://github.com/collab-ui/collab-ui-react/compare/v7.10.0...v7.11.0) (2018-06-27)


### Bug Fixes

* **ListItem:** allow EventOverlay as child with ListItemSections ([631b09d](https://github.com/collab-ui/collab-ui-react/commit/631b09d))
* **lodash:** destructured required lodash functions ([7794342](https://github.com/collab-ui/collab-ui-react/commit/7794342))
* **SpaceListMeeting:** added isBold prop for Header ([6126a85](https://github.com/collab-ui/collab-ui-react/commit/6126a85))
* **SpaceListMeeting:** typo ([7c98354](https://github.com/collab-ui/collab-ui-react/commit/7c98354))


### Features

* **EventOverlay:** horizontal dynamic positioning update ([c71a96c](https://github.com/collab-ui/collab-ui-react/commit/c71a96c))
* **Link:** created Link component/examples/tests ([a852a6f](https://github.com/collab-ui/collab-ui-react/commit/a852a6f))
* **Menu:** Added shouldCloseMenu functionality within Menu ([2acf749](https://github.com/collab-ui/collab-ui-react/commit/2acf749))

## Change Log
All notable changes to this project will be documented in this file.

### v7.10.0 (2018-6-20)

#### Features

* **ListItemMeeting**: component created
* **CompositeAvatar**: added size 84
* **ButtonGroup**:
  * ButtonGroup implementation
  * Added highlightSelected and justified prop
* **Icon**: added Icon type
* **Avatar**: added logic for 40px Self Avatar

#### Bug Fixes

* **ListItemMeeting**: refined examples
* **SpaceListMeeting**: stop event propagation
* **ButtonGroup**: change type to dark
* **Button**: loading reverted
* **ListItem**: add Title Prop to ListItem

### v7.9.0 (2018-6-13)

#### Features

* **Avatar**: add self type

### v7.8.0 (2018-6-11)

#### Features

* **AlertMeeting**: Add onClick handler and make snooze button optional.
* **Coachmark**: added base implementation

#### Bug Fixes

* **Icon**: change error to warning
* **List**: Made initial focus function optional
* **ListItemHeader**: clickable children
* **Avatar**: trim title added

### v7.7.0 (2018-6-8)

#### Features

* **EventOverlay**: Handling closeOnClick in bubble phase
* **AlertMeetingContainer**: Changed AlertMeetingContainer to accept alertList array prop.
* **AlertCallContainer**: Changed AlertCallContainer to accept alertList array prop.

### v7.6.0 (2018-6-6)

#### Features

* **avatar**: add avatar size options

#### Bug Fixes

* **AlertCallContainer**: add avatar support
* **Avatar**:
  * fixed className in img--hidden
  * remove hidden class
  * remove array of images returning

### v7.5.0 (2018-6-5)

#### Features

* **SubMenu**: add SubMenu Component
* **Menu**: Add separator prop in menuItem
* **ListItem**: Added an additional prop to display separator in ListItem
* **CallMeetingContainer**: Initial Implementation
* **AlertContainer**: Repurpose AlertContainer for displaying Alerts
* **AlertCallContainer**: Intitial implementation AlertCallContainer
* **SpaceListItem**: added filter,search, and tests
* **EventOverlay**: Adding global click listener with bubble phase
* **SocialList**:
  * add social list
  * update footer component with social list component

#### Bug Fixes

* **icon**: create icon examples
* **spacelistmeeting**: change header/subheader to nodes
* **SpaceListItem**: syntax formatting

### v7.4.1 (2018-5-31)

#### Bug Fixes

* **Input**: add email type and return event instead of value
* **build**: fix build scripts

### v7.4.0 (2018-5-31)

#### Features

* **EditableTextfield**: Added test cases for key handling
* **AlertCall**: Added device selection list.

#### Build

* **es**: created ES module directory and cleaned scripts

#### Bug Fixes

* **List**: make type cloning conditional
* **SpaceMeeting**: allow avatar to be passed in

### v7.3.0 (2018-5-23)

#### Features

* **Modal**: add renderTo Prop
* **Avatar**:
  * Changing xlarge avatar size
  * Changed default values
  * Review comments fixed
  * Sizing avatar based with ems and taking overrideSize an optional prop

#### Bug Fixes

* **ListItem**:
  * addedKeyPress to context
  * move handler to context
  * fixed unit tests

### v7.2.1 (2018-5-22)

#### Bug Fixes

* **Topbar**: remove Scss import

### v7.2.0 (2018-5-21)

#### Features

* **SpaceList**: added props for optional icons
* **AlertCall**: Initial implementation of AlertCall component
* **Accordion**:
  * Adding height as a modifier
  * Adding height prop to accordionHeader

#### Bug Fixes

* **Icon**: fix opacity calculation

### v7.1.0 (2018-5-11)

#### Features

* **Slider**:
  * Moved the position calculation of label to componentDidMount
  * removed the edge case handling
  * Fixing the alignment issue of slider label
* **Alert**: Updated Alert design
* **AlertMeeting**: Initial Meeting Alert implementation.
* **Avatar**: Adding bot, failure badge, typing types to Avatar
* **CollapseButton**: Implementation for collapse button
* **SpaceListMeeting**: added Component, adjusted EventOverlay
* **ListItemHeader**: created and added styles
* **Accordion**: showing separator based on a prop
* **Lightbox**: LightBox implementation

#### Bug Fixes

* **List**: fixed className and Popover
* **formatting**: formatting and snapshots updated

### v7.0.0 (2018-5-4)

#### Features

* **space-list**: added overview variation
* **sideNavigation**: add left side navigation
* **editInput**: new editable textfield

#### Bug Fixes

* **docs**: update Buttons in examples to have children
* **spacelist**: example code prop fixed
* **prop name**: change isSummary to isOverview
* **Breadcrumbs**: update className to cui prefixed class
* **editText**: comments
* **Footer**: add color and className props
* **Topbar**: add fixed prop

* **Button**:
  * added containerLarge prop and tests
  * button container class
  * adjusted tests and props
  * update Call Control Icon, Button children/label props

## Breaking Changes

* **Button**:
  * label prop changed to external label
  * Button requires children

### v6.0.0 (2018-4-25)

#### Chores

* **release:** initial release to new GitHub Repo
