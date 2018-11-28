/**
 * @category containers
 * @component social-list
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';

class SocialList extends React.Component {

  render() {
    const { children } = this.props;

    return <span className='cui-social__list'>{children}</span>;
  }
}

SocialList.propTypes = {
  /** @prop Children nodes to render inside SocialList | null */
  children: PropTypes.node
};

SocialList.defaultProps = {
  children: null
};

SocialList.displayName = 'SocialList';

export default SocialList;

/**
* @component social-list
* @section default
* @react
import {
  List,
  ListItem,
  SocialList,
} from '@collab-ui/react';

export default class SocialListDefault extends React.PureComponent {
  render() {
    return (
      <SocialList>
        <List tabType='horizontal' className='social-list'>
          <ListItem>
            <i className='icon icon-facebook-circle_40' />
          </ListItem>
          <ListItem>
            <i className='icon icon-twitter-circle_40' />
          </ListItem>
          <ListItem>
            <i className='icon icon-linkedin-circle_40' />
          </ListItem>
        </List>
      </SocialList>
    );
  }
}
**/
