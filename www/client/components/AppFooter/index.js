import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Footer from '../../momentum-ui/Footer';
import FooterSection from '../../momentum-ui/Footer/FooterSection';

import { List, ListItem } from '@momentum-ui/react';

const AppFooter = () => {
  return (
    <Footer>
      <FooterSection>
        <div>
          <div className="docs-footer__main-title">
            Didn’t find what you need? Have feedback for us? Let us know!
          </div>
          <div className="docs-footer--centered">
            {/* <Button color="blue"> */}
              <Link className="md-button md-button--blue" to="/feedback">
              Send feedback
              </Link>
            {/* </Button> */}
          </div>
        </div>
      </FooterSection>

      {/* Footer Mid */}
      {/* <FooterSection>
        <div className="docs-footer__list-container">
          <div>
            <h5 className="docs-footer__list-item-title">Connect</h5>
            <List>
              <ListItem label="24/7 Support" />
              <ListItem label="Developer Events" />
              <ListItem label="Contact Sales" />
            </List>
          </div>
          <div>
            <h5 className="docs-footer__list-item-title">Handy Links</h5>
            <List>
              <ListItem label="Cisco Webex Ambassadors" />
              <ListItem label="Cisco Webex Control Hub" />
              <ListItem label="Cisco Webex Innovation Fund" />
            </List>
          </div>
          <div>
            <h5 className="docs-footer__list-item-title">Resources</h5>
            <List>
              <ListItem label="Open Source Bot Starter Kits" />
              <ListItem label="Download Cisco Webex Teams" />
              <ListItem label="Devnet Learning Labs" />
            </List>
          </div>
          <div>
            <List>
              <ListItem label="Terms Of Service" />
              <ListItem label="Privacy Policy" />
              <ListItem label="Cookie Policy" />
              <ListItem label="Trademarks" />
            </List>
          </div>
        </div>
      </FooterSection> */}

      {/* Footer Bottom */}
      <FooterSection isBottom={true}>
        <div className="docs-footer__bottom--left">
          <i className="icon icon-cisco-logo" />
          <span>© 2018 Cisco and/or its affiliates. All rights reserved.</span>
        </div>
        <div className="docs-footer__bottom-list">
          <List
            className="docs-footer--flex-item"
            focusFirst={false}
            tabType="horizontal"
          >
            <ListItem
              customAnchorNode={
                <NavLink
                  activeClassName='md-active-nav'
                  className='docs-footer__link md-link--nav'
                  to="/feedback"
                >
                  Support & Feedback
                </NavLink>
              }
            />
            <ListItem
              link="https://www.cisco.com/c/en/us/about/legal/privacy.html"
              className='docs-footer__link md-link--nav'
              target="_blank"
            >
              Privacy Policy
            </ListItem>
            <ListItem
              link="https://www.cisco.com/c/en/us/about/legal/privacy.html#cookies"
              className='docs-footer__link md-link--nav'
              target="_blank"
            >
              Cookie Policy
            </ListItem>
          </List>

          {/* <SocialList className="docs-footer--flex-item">
            <List
              className="social-list"
              focusFirst={false}
              tabType="horizontal"
            >
              <ListItem
                link="https://www.facebook.com/CiscoCollab/"
                className='md-link--nav'
                target="_blank"
              >
                <i className="icon icon-facebook-circle_24" />
              </ListItem>
              <ListItem
                link="https://twitter.com/ciscowebexdev"
                className='md-link--nav'
                target="_blank"
              >
                <i className="icon icon-twitter-circle_24" />
              </ListItem>
              <ListItem
                link="https://github.com/momentum-design"
                className='md-link--nav'
                target="_blank"
              >
                <i className="icon icon-github-circle_24" />
              </ListItem>
            </List>
          </SocialList> */}
        </div>
      </FooterSection>
    </Footer>
  );
};

AppFooter.displayName = 'AppFooter';

export default AppFooter;
