import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { Button, Input } from '@collab-ui/react';

class LoginPage extends React.PureComponent {
  state = {
    email: '',
    formErrors: { email: '' },
    emailValid: false,
    formValid: false,
    formTouched: false,
    formDisabled: false,
  };

  handleEmailInput = e => {
    const value = e.target.value;
    this.setState({ email: value }, () => {
      this.validateEmail('email', value);
    });
  };

  validateEmail = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;

    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    fieldValidationErrors.email = emailValid
      ? ''
      : `${value} is not a valid email address.`;

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
      },
      this.validateForm
    );
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.emailValid,
    });
  };

  handleBlur = () => {
    this.setState({
      formTouched: true,
    });
  };

  handleSubmit = e => {
    e && e.preventDefault();
    this.setState({
      formDisabled: true,
    });
    // console.log(this);
    // this.props.actions.loginUser(this.state.email);
    location.href = `https://idbroker.webex.com/idb/oauth2/v1/authorize?response_type=token&email=${encodeURIComponent(this.state.email)}&client_id=C91a3236803b211d7f07716f32a840f93dcf3f65b4428cef7a96193f1c824508a&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000&scope=Identity%3ASCIM&state=this-should-be-a-random-string-for-security-purpose`;

    // this.props.history.push('/');

  };

  isFormError = () =>
    this.state.formTouched && (!this.state.formValid && this.state.email);

  render() {
    const webexLogo = require('@collab-ui/core/images/cisco-webex/wordmark/cisco-webex-wordmark-black.svg');
    const {formDisabled, formErrors, formValid} = this.state;

    return (
      <div className="md-panel md-panel--form md-panel--full">
        <div className="md-panel__main">
          <img className="md-panel__image" src={webexLogo} alt="Cisco Webex" />
          <div className="md-panel__title">Enter your email address</div>
          <form className="md-panel__form">
            {/* {touched && (error && <span className="text-danger">{error}</span>)} */}
            <div
              className="md-input__messages error"
              style={{
                display: this.isFormError() ? 'block' : 'none',
              }}>
              <div className="message">{formErrors.email}</div>
            </div>
            <Input
              htmlId="email"
              name="email"
              type="text"
              placeholder="Email Address"
              onDoneEditing={this.handleBlur}
              onChange={this.handleEmailInput}
              className={`${this.isFormError() ? ` error` : ''}`}
              disabled={formDisabled}
            />
            <div className="md-panel__cta">
              <Button
                type="submit"
                color="blue"
                disabled={!formValid || formDisabled}
                onClick={this.handleSubmit}
              >
                Next
              </Button>
            </div>
          </form>
          <div className="md-panel__secondary-action">
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            Need help signing in? <a href="#">Contact Support</a>
          </div>
        </div>
        <div className="md-panel__footer">
          <div className="footer__logo">
            <i className="icon icon-cisco-logo" />
          </div>
          <div className="footer__copyright">
            By using Webex Teams you accept the
            <a href="#">Terms of Service</a>,{' '}
            <a href="#">Privacy Statement, Notices & Disclaimers</a>.
            {/* eslint-enable jsx-a11y/anchor-is-valid */}
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
