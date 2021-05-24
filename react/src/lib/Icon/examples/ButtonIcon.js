import React from 'react';
import { Icon } from '@momentum-ui/react';
export default class Default extends React.PureComponent {
  render() {
    return(
      <div>
        <Icon
          name='icon-settings_12'
          ariaLabel='Settings'
          onClick={() => alert('Settings 12 - clicked')}
        />
      </div>
    );
  }
}
