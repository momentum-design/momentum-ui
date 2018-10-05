/**
 * @category layout
 * @component footer
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class Footer extends React.Component {

  render() {
    const { color, logo, copyright, social, className, children } = this.props;
    const footerTopSection =  children && (
      <section className='cui-footer__top'>{children}</section>
    );
    const footerBottomSection = (logo || copyright || social) && (
      <section className='cui-footer__bottom'>
        {
          (logo || copyright) &&
            <span className='cui-footer__bottom--position-left'>
              <span className='cui-footer__logo'>{logo}</span>
              {copyright}
            </span>
        }
        {
          social && <span className='cui-footer__bottom--position-right'>{social}</span>
        }
      </section>
    );

    return (
      <footer className={
        `cui-footer` +
        ` cui-footer--${color}` +
        ` ${className}`
      }>
        {footerTopSection}
        {footerBottomSection}
      </footer>
    );
  }
}

Footer.propTypes = {
  /** @prop Children nodes to render inside the Footer | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Optional color css styling | 'dark' */
  color: PropTypes.string,
  /** @prop Set the copyright within the Footer | '' */
  copyright: PropTypes.string,
  /** @prop Set the logo within the Footer | null */
  logo: PropTypes.node,
  /** @prop Node containing social media links | null */
  social: PropTypes.node
};

Footer.defaultProps = {
  children: null,
  className: '',
  color: 'dark',
  copyright: '',
  logo: null,
  social: null
};

Footer.displayName = 'Footer';

/**
* @name Footer
* @description default footer
*
* @category layout
* @component footer
* @section default
*
* @js
import { SocialList, Icon, List, ListItem } from '@collab-ui/react';

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
**/
