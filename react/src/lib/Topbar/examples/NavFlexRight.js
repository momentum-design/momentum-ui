/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Button,
  Icon,
  ListItem,
  ListSeparator,
  Topbar,
  TopbarMobile,
  TopbarNav,
  TopbarRight,
} from '@momentum-ui/react';

export default class TopbarBlue extends React.Component {
  render() {
    return (
      <Topbar
        color='blue'
        title='test'
        brandAnchorElement={
          <a
            href='javascript:void(0)'
            title='Momentum UI'
          >
            <Icon name='cisco-logo' />
          </a>
        }
      >
        <TopbarNav alignment='right'>
          <ListItem separator>Develop</ListItem>
          <ListItem>Styles</ListItem>
          <ListSeparator direction='horizontal'/>
          <ListItem>Layout</ListItem>
          <ListItem>Navigation</ListItem>
        </TopbarNav>
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
          <ListItem>Develop</ListItem>
          <ListItem>Styles</ListItem>
          <ListItem>Layout</ListItem>
          <ListItem>Navigation</ListItem>
        </TopbarMobile>
      </Topbar>
    );
  }
}
/* eslint-enable jsx-a11y/anchor-is-valid */
