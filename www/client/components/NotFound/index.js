import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="cui-panel cui-panel--message cui-panel--full">
      <div className="cui-panel__main">
        <i className="cui-panel__image icon icon-warning_100" />
        <div className="cui-panel__title">404 Not Found</div>
        <div className="cui-panel__message">
          The page you requested cannot be found.
        </div>
        <div className="cui-panel__cta">
          <Link className="cui-button cui-button--blue" to="/">
            Go back to homepage
          </Link>
        </div>
        <div className="cui-panel__secondary-action">
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <a href="#">Contact Support</a>
          {/* eslint-enable jsx-a11y/anchor-is-valid */}
        </div>
      </div>
      <div className="cui-panel__footer">
        <div className="footer__logo">
          <i className="icon icon-cisco-logo" />
        </div>
        <div className="footer__copyright">
          &copy; 2018 Cisco and/or affiliates. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
