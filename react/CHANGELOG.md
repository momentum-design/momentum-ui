## Change Log
All notable changes to this project will be documented in this file.

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
