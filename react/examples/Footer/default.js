import React from 'react';
import {
  Icon,
  Footer,
  List,
  ListItem,
  SocialList,
} from '@collab-ui/react';
export default class DefaultFooter extends React.PureComponent {
  render() {
    const copyright = '2018 Cisco and /or its affiliate';
    const social = (
      <SocialList>
        <List tabType='horizontal' className='social-list'>
          <ListItem link='https://www.facebook.com'>
            <i className='icon icon-facebook-circle_24' />
          </ListItem>
          <ListItem link='https://www.twitter.com'>
            <i className='icon icon-twitter-circle_24' />
          </ListItem>
          <ListItem link='https://www.linkedin.com'>
            <i className='icon icon-linkedin-circle_24' />
          </ListItem>
        </List>
      </SocialList>
    );
    return (
      <div className='row'>
        <Footer
          logo={<i className='icon icon-cisco-logo' />}
          copyright='2018 Cisco and /or its affiliate'
          social={social}
        >
          <div className='columns medium-3'>
            <h5 className='cui-footer__list-item-title'>Connect</h5>
            <List>
              <ListItem label='24/7 Support' />
              <ListItem label='Developer Events' />
              <ListItem label='Contact Sales' />
            </List>
          </div>
          <div className='columns medium-3'>
            <h5 className='cui-footer__list-item-title'>Handy Links</h5>
            <List>
              <ListItem label='Cisco Webex Ambassadors' />
              <ListItem label='Cisco Webex Control Hub' />
              <ListItem label='Cisco Webex Innovation Fund' />
            </List>
          </div>
          <div className='columns medium-3'>
            <h5 className='cui-footer__list-item-title'>Resources</h5>
            <List>
              <ListItem label='Open Source Bot Starter Kits' />
              <ListItem label='Download Cisco Webex Teams' />
              <ListItem label='Devnet Learning Labs' />
            </List>
          </div>
          <div className='columns medium-3'>
            <List>
              <ListItem label='Terms Of Service' />
              <ListItem label='Privacy Policy' />
              <ListItem label='Cookie Policy' />
              <ListItem label='Trademarks' />
            </List>
          </div>
        </Footer>
      </div>
    );
  }
}