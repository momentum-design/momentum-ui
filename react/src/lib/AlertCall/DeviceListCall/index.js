import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import {
  Icon,
  List,
  ListItem,
  ListItemHeader,
  ListItemSection
} from '@collab-ui/react';

class DeviceListCall extends React.PureComponent {
  static displayName = 'DeviceListCall'

  state = {
    selectedIndex: this.props.defaultSelected,
    id: this.props.id || uniqueId('cui-device-list-call-'),
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
              title={ele.title || ele.name}
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
  defaultSelected: 0,
  id: null,
  onSelect: null
};

DeviceListCall.propTypes = {
  /** Default Index Value selected */
  defaultSelected: PropTypes.number,
  /** required list of devices to show in list */
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
      type: PropTypes.oneOf(['', 'device']),
      title: PropTypes.string
    })
  ).isRequired,
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** ListItem header */
  header: PropTypes.string.isRequired,
  /** HTML ID for associated input */
  id: PropTypes.string,
  /** optional function called when list item is selected */
  onSelect: PropTypes.func
};

export default DeviceListCall;