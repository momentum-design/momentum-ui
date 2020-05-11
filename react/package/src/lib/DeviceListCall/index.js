import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { UIDConsumer } from 'react-uid';
import {
  Icon,
  List,
  ListItem,
  ListItemHeader,
  ListItemSection,
} from '@momentum-ui/react';

class DeviceListCall extends React.PureComponent {
  state = {
    selectedIndex: this.props.defaultSelected,
  };

  handleSelect = (e, opts) => {
    const { onSelect } = this.props;
    const { value, eventKey } = opts;

    e.preventDefault();
    return this.setState({
      selectedIndex: eventKey
    },
    () => (
      onSelect && onSelect(e, { eventKey, value })
    ));
  }

  render() {
    const {
      className,
      devices,
      header,
      ...props
    } = this.props;
    const { selectedIndex } = this.state;

    const otherProps = omit({...props}, [
      'defaultSelected',
      'onSelect'
    ]);

    const getLeftSection = deviceType => {
      switch(deviceType) {
        case 'device': return <Icon name='spark-board_20' />;
        default: return <Icon name='laptop_20'/>;
      }
    };

    const getRightSection = (uid, idx) => {
      if(!isNaN(selectedIndex)) {
        if (idx === selectedIndex) {
          return <Icon name='check_20' color='blue-50'/>;
        }
      } else if (uid === selectedIndex) {
        return <Icon name='check_20' color='blue-50'/>;
      }
    };

    return (
      <List
        className={className}
        onSelect={this.handleSelect}
        active={selectedIndex}
        {...otherProps}
      >
        <ListItemHeader header={header} />
        {
          devices.map(({
            eventKey,
            id,
            name,
            title,
            type,
            value,
            ...deviceProps
          }, idx) => (
              <UIDConsumer name={uid => `md-device-list-call-${uid}`} key={`device-${idx}`}>
                {uid => {
                  const uniqueKey = eventKey || id || uid;

                  return (
                    <ListItem
                      value={value}
                      label={name}
                      title={title || name}
                      id={uniqueKey}
                      {...deviceProps}
                    >
                      <ListItemSection position='left'>
                        {getLeftSection(type)}
                      </ListItemSection>
                      <ListItemSection position='center'>
                        <div className='md-list-item__header'>
                          {name}
                        </div>
                      </ListItemSection>
                      <ListItemSection position='right'>
                        {getRightSection(uniqueKey, idx)}
                      </ListItemSection>
                    </ListItem>
                  );
                }}
              </UIDConsumer>
          ))
        }
      </List>
    );
  }
}

DeviceListCall.defaultProps = {
  className: '',
  defaultSelected: null,
  onSelect: null
};

DeviceListCall.propTypes = {
  /** HTML Class for associated input | '' */
  className: PropTypes.string,
  /** Default Index Value selected | null */
  defaultSelected: PropTypes.oneOfType([ PropTypes.number, PropTypes.string]),
  /** Required list of devices to show in list */
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
      type: PropTypes.oneOf(['', 'device']),
      title: PropTypes.string
    })
  ).isRequired,
  /** ListItem header */
  header: PropTypes.string.isRequired,
  /** Optional function called when list item is selected | null */
  onSelect: PropTypes.func
};

DeviceListCall.displayName = 'DeviceListCall';

export default DeviceListCall;
