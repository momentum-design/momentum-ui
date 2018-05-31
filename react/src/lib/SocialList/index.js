/**
 * @category containers
 * @component social-list
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class SocialList extends React.Component {
  static displayName = 'SocialList';

  render() {
    const { children } = this.props;

    return <span className='cui-social__list'>{children}</span>
  }
}

SocialList.propTypes = {
  children: PropTypes.node
};

SocialList.defaultProps = {
  children: null
};

/**
* @name Default SocialList
* @description Default social list
*
* @category containers
* @component social-list
* @section default
*
* @js
import { List, ListItem } from '@collab-ui/react';

export default class SocialListDefault extends React.PureComponent {
  render() {
    return (
      <SocialList>
        <List tabType='horizontal' className='social-list'>
          <ListItem link='https://www.facebook.com'>
            <i className='icon icon-facebook-circle_40' />
          </ListItem>
          <ListItem link='https://www.twitter.com'>
            <i className='icon icon-twitter-circle_40' />
          </ListItem>
          <ListItem link='https://www.linkedin.com'>
            <i className='icon icon-linkedin-circle_40' />
          </ListItem>
        </List>
      </SocialList>
    );
  }
}
**/
