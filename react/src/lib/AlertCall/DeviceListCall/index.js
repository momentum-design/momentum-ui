import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  List,
  ListItem,
  ListItemHeader,
  ListItemSection
} from '@collab-ui/react';
import { uniqueId } from 'lodash';

export default class DeviceListCall extends React.PureComponent {
  static displayName = 'DeviceListCall'

  state = {
    selectedIndex: this.props.defaultSelected,
    id: uniqueId(this.props.id && `${this.props.id}-` || 'cui-device-list-call-'),
  };

  handleSelect = (e, value, index) => {
    const { onSelect, devices } = this.props;
    const currentIndex = devices.length < index - 1
      ? 0
      : index - 1;

    e.preventDefault();
    return this.setState({
      selectedIndex: currentIndex
    },
    () => (
      onSelect && onSelect(e, currentIndex, value)
    ));
  }

  render() {
    const { className, header, devices } = this.props;
    const { selectedIndex, id } = this.state;

    const getLeftSection = deviceType => {
      switch(deviceType) {
        case 'device': return <Icon name='spark-board_20' />;
        default: return <Icon name='laptop_20'/>;
      }
    };

    const getRightSection = (device, idx) => {
      if (idx === selectedIndex) {
        return <Icon name='check_20' color='blue'/>;
      }
    };

    return (
      <List
        className={className}
        onSelect={this.handleSelect}
        active={selectedIndex}
      >
        <ListItemHeader header={header} />
        {
          devices.map((ele, idx) => (
            <ListItem
              key={`device-${idx}`}
              id={id}
              value={ele}
              label={ele.name}
            >
              <ListItemSection position='left'>
                {getLeftSection(ele.type)}
              </ListItemSection>
              <ListItemSection position='center'>
                <div className='cui-list-item__header'>
                  {ele.name}
                </div>
              </ListItemSection>
              <ListItemSection position='right'>
                {getRightSection(ele, idx)}
              </ListItemSection>
            </ListItem>
          ))
        }
      </List>
    );
  }
}

DeviceListCall.defaultProps = {
  className: '',
  childrenLeft: null,
  childrenRight: null,
  id: null,
  onSelect: null,
  defaultSelected: 0
};

DeviceListCall.propTypes = {
  defaultSelected: PropTypes.number,
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** ListItem header */
  header: PropTypes.string.isRequired,
  /** HTML ID for associated input */
  id: PropTypes.string,
  /** optional function called when list item is selected */
  onSelect: PropTypes.func,
  /** required list of devices to show in list */
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
      type: PropTypes.oneOf(['', 'device'])
    })
  ).isRequired
};