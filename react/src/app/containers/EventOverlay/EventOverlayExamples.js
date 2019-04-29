import React from 'react';

import {
  Avatar,
  Button,
  Coachmark,
  ComboBox,
  DatePicker,
  EditableTextfield,
  List,
  Select,
  SelectOption,
  ToggleSwitch,
  ListItem,
  ListItemMeeting,
  ListItemSection,
  Menu,
  MenuContent,
  MenuItem,
  MenuOverlay,
  Popover,
  SubMenu,
} from '@collab-ui/react';
import { AutoSizer, List as Clist } from 'react-virtualized';

export default class PlaygroundComponent extends React.Component {
  state = {
    isCoachmarkOpen: true,
    isContained: true,
    checkOverflow: true,
    direction: 'bottom-center',
    showArrow: true,
    targetOffset: { horizontal: 0, vertical: 0 },
    showPopoverExamples: false,
    shouldMonitorScroll: true,
  };
  render() {
    const {
      isCoachmarkOpen,
      isContained,
      checkOverflow,
      direction,
      showArrow,
      targetOffset,
      shouldMonitorScroll,
      showPopoverExamples,
    } = this.state;

    const rowRenderer = ({ index, key, style }) => (
      <ListItem
        style={{ ...style }}
        type={style.height}
        key={key}
        eventKey={key}
      >
        <ListItemSection position="left" />
        <ListItemSection position="center">
          {getPopover(simpleDiv, index, { scrollParentID: 'test-list-1' })}
        </ListItemSection>
      </ListItem>
    );

    const getListItem = (popover, label) => (
      <ListItem>
        <ListItemSection position="left">{getPopover(popover)}</ListItemSection>
        <ListItemSection position="center">{label}</ListItemSection>
      </ListItem>
    );

    const getPopover = (node, buttonLabel, other) => (
      <Popover
        content={node}
        direction={direction}
        popoverTrigger="Click"
        checkOverflow={checkOverflow}
        isContained={isContained}
        showArrow={showArrow}
        targetOffset={targetOffset}
        shouldMonitorScroll={shouldMonitorScroll}
        {...other}
      >
        <Button
          color="blue"
          ariaLabel={buttonLabel ? `${buttonLabel}` : 'Click'}
        >
          {buttonLabel ? buttonLabel : 'Click'}
        </Button>
      </Popover>
    );

    const simpleDiv = <div>Robs poppity poppity Popover</div>;

    const h500 = (
      <span key="1" style={{ height: '500px' }}>
        Popover(height: 500px)
      </span>
    );
    const h1800 = (
      <span key="1" style={{ height: '1800px' }}>
        Popover(height: 1800px)
      </span>
    );
    const h3000 = (
      <span key="1" style={{ height: '3000px' }}>
        Popover(height: 3000px)
      </span>
    );
    const h30w1600 = (
      <span key="1" style={{ height: '30px', width: '1600px' }}>
        Popover(height: 30px, width: 1600px)
      </span>
    );
    const h1600w1900 = (
      <span key="1" style={{ height: '1900px', width: '1600px' }}>
        Popover(height: 1900px, width: 1600px)
      </span>
    );
    const w100 = (
      <span key="1" style={{ height: '100px' }}>
        Popover(width: 100px)
      </span>
    );

    const varyingContent = (
      <List style={{ height: '100%', width: '100%', overflow: 'auto' }}>
        {getListItem(simpleDiv, 'Simple Div')}
        {getListItem(h500, '500px Tall Popover')}
        {getListItem(h1800, '1800px Tall Popover')}
        {getListItem(h3000, '3000px Tall Popover')}
        {getListItem(w100, '100px Wide Popover')}
        {getListItem(h30w1600, '1600px Wide Popover')}
        {getListItem(h1600w1900, '1600px Tall, 1900px Wide Popover')}
      </List>
    );

    const popoverExamples = (
      <React.Fragment>
        {getPopover(simpleDiv, 'div')}
        {getPopover(h500, 'h500')}
        {getPopover(h1800, 'h1800')}
        {getPopover(h3000, 'h3000')}
        {getPopover(w100, 'w100')}
        {getPopover(h30w1600, 'h30w1600')}
        {getPopover(h1600w1900, 'h1600w1900')}
      </React.Fragment>
    );

    return (
      <div>
        <div>
          <h1>Toggle Options</h1>
          <ToggleSwitch
            checked={isContained}
            label="isContained"
            htmlId="testToggleSwitch1"
            onChange={() => this.setState({ isContained: !isContained })}
          />
          <ToggleSwitch
            checked={checkOverflow}
            label="checkOverflow"
            htmlId="testToggleSwitch2"
            onChange={() => this.setState({ checkOverflow: !checkOverflow })}
          />
          <ToggleSwitch
            checked={showArrow}
            label="showArrow"
            htmlId="testToggleSwitch3"
            onChange={() => this.setState({ showArrow: !showArrow })}
          />
          <ToggleSwitch
            checked={showPopoverExamples}
            label="Show Popover Examples"
            htmlId="testToggleSwitch4"
            onChange={() =>
              this.setState({ showPopoverExamples: !showPopoverExamples })
            }
          />
          <ToggleSwitch
            checked={shouldMonitorScroll}
            label="Should Monitor Scroll"
            htmlId="testToggleSwitch5"
            onChange={() =>
              this.setState({ shouldMonitorScroll: !shouldMonitorScroll })
            }
          />
          <ToggleSwitch
            checked={!!targetOffset.horizontal}
            label="Add horizontal offset"
            htmlId="testToggleSwitch6"
            onChange={() =>
              this.setState(state => ({
                ...state,
                targetOffset: {
                  ...state.targetOffset.vertical,
                  horizontal: 20,
                },
              }))
            }
          />
          <ToggleSwitch
            checked={!!targetOffset.vertical}
            label="Add vertical offset"
            htmlId="testToggleSwitch7"
            onChange={() =>
              this.setState(state => ({
                targetOffset: {
                  ...state.targetOffset.horizontal,
                  vertical: 20,
                },
              }))
            }
          />
          <Select
            onSelect={e => this.setState({ direction: e[0].value })}
            defaultValue="Select Item Here"
          >
            <SelectOption value="top-center" label="top" />
            <SelectOption value="bottom-center" label="bottom" />
            <SelectOption value="left-center" label="left" />
            <SelectOption value="right-center" label="right" />
          </Select>
        </div>

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div
          className="docs-example docs-example--spacing"
          style={{ marginTop: '10px' }}
        >
          <h5>List with Popovers, Overflow Auto</h5>
          <div style={{ width: '50%', height: '200px' }}>{varyingContent}</div>
        </div>

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div className="docs-example docs-example--spacing">
          <h5>List using React Virtualized (checkOverflow should be false)</h5>
          <div style={{ height: '200px', width: '50%', display: 'flex' }}>
            <AutoSizer>
              {({ width, height }) => (
                <Clist
                  width={width}
                  height={height}
                  overscanRowsCount={10}
                  rowCount={50}
                  rowHeight={52}
                  rowRenderer={rowRenderer}
                  id={'test-list-1'}
                />
              )}
            </AutoSizer>
          </div>
        </div>

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div className="docs-example docs-example--spacing">
          <h5>Absolute Container, No Overflow</h5>
          <div style={{ position: 'relative', height: '200px' }}>
            <div
              style={{
                position: 'absolute',
                border: '1px solid red',
                height: '190px',
                width: '50%',
                top: '10px',
                left: '0px',
              }}
            >
              {popoverExamples}
            </div>
          </div>
        </div>

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div className="docs-example docs-example--spacing">
          <h5>Absolute Container, Overflow</h5>
          <div style={{ position: 'relative', height: '200px' }}>
            <div
              style={{
                overflow: 'auto',
                position: 'absolute',
                border: '1px solid red',
                height: '190px',
                width: '50%',
                top: '10px',
                left: '0px',
              }}
            >
              {popoverExamples}
            </div>
          </div>
        </div>

        {showPopoverExamples && (
          <React.Fragment>
            <div
              style={{
                width: '100%',
                border: '10px gray solid',
                margin: '20px 0',
              }}
            />
            <div className="docs-example docs-example--spacing">
              <h5>Popover Examples</h5>
              <React.Fragment>
                {getPopover(simpleDiv, 'Hover', {
                  popoverTrigger: 'MouseEnter',
                })}
                {getPopover(simpleDiv, 'Delay', {
                  popoverTrigger: 'MouseEnter',
                  delay: 500,
                })}
                {getPopover(simpleDiv, 'Click')}
                {getPopover(simpleDiv, 'No Toggle', {
                  doesAnchorToggle: false,
                })}
                {getPopover(simpleDiv, 'AlwaysOpen', {
                  popoverTrigger: 'None',
                  doesAnchorToggle: false,
                  startOpen: true,
                  allowClickAway: false,
                })}
                {getPopover(simpleDiv, 'Focus', { popoverTrigger: 'Focus' })}
              </React.Fragment>
            </div>
          </React.Fragment>
        )}

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div className="docs-example docs-example--spacing">
          <h5>Various Popover Examples</h5>
          {popoverExamples}
        </div>

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div className="docs-example docs-example--spacing">
          <h5>Overflow Container</h5>
          <div
            className="docs-example docs-example--spacing"
            style={{
              border: '2px solid #666666',
              width: '100%',
              height: '300px',
              overflow: 'scroll',
              padding: '125px',
            }}
          >
            <div
              style={{
                height: '1000px',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              {popoverExamples}
            </div>
          </div>
        </div>

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div className="docs-example docs-example--spacing">
          <h5>Coachmark</h5>
          <Coachmark
            isOpen={isCoachmarkOpen}
            maxWidth={272}
            buttonProps={{ children: 'Default' }}
            header={`Header prop(node)`}
            subheader={`Subheader prop(node)`}
            direction="bottom-center"
            ariaLabel="Open Coachmark"
          >
            <Button
              ariaLabel="test"
              onClick={() =>
                this.setState({ isCoachmarkOpen: !isCoachmarkOpen })
              }
            >
              Coachmark Anchor
            </Button>
          </Coachmark>
        </div>

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div className="docs-example docs-example--spacing">
          <h5>ComboBox</h5>
          <ComboBox options={['a', 'ab', 'abc']} />
        </div>

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div className="docs-example docs-example--spacing">
          <h5>DatePicker</h5>
          <DatePicker>
            <Button children="Pick a Date" ariaLabel="DatePicker" />
          </DatePicker>
        </div>

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div className="docs-example docs-example--spacing">
          <h5>ListItemMeeting</h5>
          <ListItemMeeting
            isAllDay
            header="ListItemMeeting (isAllDay)"
            anchorLabel="SpaceString"
            anchorOnClick={() => alert('anchor clicked')}
            childrenRight={<Avatar title="NA" />}
            popoverContent={'test'}
          />
        </div>

        <div
          style={{ width: '100%', border: '10px gray solid', margin: '20px 0' }}
        />

        <div className="docs-example docs-example--spacing">
          <h5>MenuOverlay</h5>
          <MenuOverlay
            menuTrigger={<Button ariaLabel="Show Menu">Show Menu</Button>}
          >
            <MenuContent>
              <EditableTextfield inputText="Content Area" />
            </MenuContent>
            <Menu>
              <SubMenu
                selectedValue="Out of office until 2:00pm"
                label="Status"
                keyboardKey="Status"
              >
                <MenuItem isHeader label="Set Do Not Disturb:" />
                <MenuItem
                  disabled
                  label="1 hour"
                  onClick={this.onClick}
                  value="1 hour"
                />
                <MenuItem
                  keepMenuOpen
                  label="5 hour"
                  onClick={this.onClick}
                  value="5 hour"
                />
                <MenuItem keepMenuOpen label="8 hour" />
              </SubMenu>
              <SubMenu
                selectedValue="English"
                label="Language"
                keyboardKey="Language"
              >
                <MenuItem label="English" />
                <MenuItem label="Spanish" />
              </SubMenu>
              <MenuItem label="Settings" />
            </Menu>
          </MenuOverlay>
        </div>

        <div style={{ width: '100%', height: '200px', margin: '20px 0' }} />

        <div
          style={{
            position: 'fixed',
            zIndex: 8,
            margin: '12px',
            width: '25%',
            height: '300px',
            top: 0,
            right: 0,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backgroundColor: '#000000',
              boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                height: '25%',
                width: '100%',
                right: 0,
                overflow: 'hidden',
                background: 'gray',
                zIndex: 3,
              }}
            >
              Top Section
            </div>
            <div
              style={{
                position: 'absolute',
                top: '25%',
                height: '50%',
                width: '100%',
                right: 0,
                overflow: 'hidden',
                background: 'black',
                zIndex: 3,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              {popoverExamples}
            </div>
            <div
              style={{
                position: 'absolute',
                top: '75%',
                height: '25%',
                width: '100%',
                right: 0,
                overflow: 'hidden',
                background: 'gray',
                zIndex: 3,
              }}
            >
              Bottom Section
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'fixed',
            zIndex: 8,
            margin: '12px',
            width: '25%',
            height: '300px',
            top: 0,
            right: 0,
            transform: 'translate(0px, 320px)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backgroundColor: '#000000',
              boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                height: '25%',
                width: '100%',
                right: 0,
                overflow: 'hidden',
                background: 'gray',
                zIndex: 3,
              }}
            >
              WITH Transform
            </div>
            <div
              style={{
                position: 'absolute',
                top: '25%',
                height: '50%',
                width: '100%',
                right: 0,
                overflow: 'auto',
                background: 'black',
                zIndex: 3,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  height: '500px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                {popoverExamples}
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '75%',
                height: '25%',
                width: '100%',
                right: 0,
                overflow: 'hidden',
                background: 'gray',
                zIndex: 3,
              }}
            >
              Bottom Section
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'fixed',
            zIndex: 8,
            margin: '12px',
            width: '25%',
            height: '300px',
            top: 0,
            right: 0,
            transform: 'translate(0px, 640px)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backgroundColor: '#000000',
              boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                height: '25%',
                width: '100%',
                right: 0,
                overflow: 'hidden',
                background: 'gray',
                zIndex: 3,
              }}
            >
              No Overflow
            </div>
            <div
              style={{
                position: 'absolute',
                top: '25%',
                height: '50%',
                width: '100%',
                right: 0,
                background: 'black',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              {popoverExamples}
            </div>
            <div
              style={{
                position: 'absolute',
                top: '75%',
                height: '25%',
                width: '100%',
                right: 0,
                overflow: 'hidden',
                background: 'gray',
                zIndex: 3,
              }}
            >
              Bottom Section
            </div>
          </div>
        </div>
      </div>
    );
  }
}
