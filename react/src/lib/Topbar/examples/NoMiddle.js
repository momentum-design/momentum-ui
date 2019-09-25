/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Button,
  Icon,
  Topbar,
  TopbarMobile,
  TopbarRight,
} from '@momentum-ui/react';

export default class TopbarNoMiddle extends React.Component {
  render() {
    return (
      <Topbar
        color='light'
        brandAnchorElement={
          <a
            href='javascript:void(0)'
            title='Momentum UI'
          >
            <Icon name='cisco-logo' />
          </a>
        }
      >
        <TopbarRight>
          <div className='md-top-bar__user' />
          <div className='md-top-bar__logged-out'>
            <a href='javascript:void(0)'>Log In</a>
            <Button color='blue' ariaLabel='myAriaLabel'>
              Button
            </Button>
          </div>
        </TopbarRight>
        <TopbarMobile shouldCloseOnClick={false}>
          <a
            href='javascript:void(0)'
            title='Momentum UI'
          >
            <Icon name='cisco-logo' />
          </a>
        </TopbarMobile>
      </Topbar>
    );
  }
}
/* eslint-enable jsx-a11y/anchor-is-valid */
