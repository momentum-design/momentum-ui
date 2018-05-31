## Change Log
All notable changes to this project will be documented in this file.

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
