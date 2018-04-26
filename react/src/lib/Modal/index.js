import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalHeader } from '@collab-ui/react';
/** Library that manages Tabbing and Accessibility for Modal
 *   https://github.com/davidtheclark/react-aria-modal
 */
import AriaModal from 'react-aria-modal';

/**
 * @category containers
 * @component modal
 * @variations collab-ui-react
 */

class Modal extends Component {
  static displayName = 'Modal';

  state = {
    animationClass: '',
  };

  componentWillReceiveProps(nextProps) {
    this.props.show !== nextProps.show &&
      nextProps.show &&
      setTimeout(() => {
        this.setState({ animationClass: 'in' });
      }, 0);
  }

  closeModal = () => {
    this.setState({ animationClass: '' });

    return setTimeout(() => {
      this.props.onHide();
    }, 300);
  }

  render() {
    const {
      show,
      className,
      size,
      backdrop,
      backdropClickExit,
      escapeExits,
      htmlId,
      headerLabel,
      showCloseButton,
      applicationId,
      icon,
      focusDialog
    } = this.props;

    const getIcon = () => {
      if (icon.type.displayName === 'Icon') {
        return icon;
      }
      throw new Error(`icon prop needs to be of type Icon.`);
    };

    const modalContent = (
      <div className={`cui-modal__content`}>
        {icon && size === 'dialog' && getIcon() && (
          <div className="cui-modal__left-pane">
            {icon}
          </div>
        )}
        <div className="cui-modal__right-pane">
          {headerLabel && (
            <ModalHeader
              showCloseButton={showCloseButton}
              headerLabel={headerLabel}
              onHide={this.closeModal}
              />
          )}
          {this.props.children}
        </div>
      </div>
    );

    const renderModal = () => {
      return (
        show && (
          <AriaModal
            onExit={this.closeModal}
            getApplicationNode={() => document.querySelector(`#${applicationId}`)}
            dialogClass={
              `cui-modal` +
              ` cui-modal--${size}` +
              ` ${this.state.animationClass}` +
              `${(className && ` ${className}`) || ''}`
            }
            includeDefaultStyles={false}
            titleId={htmlId}
            underlayClass={
              backdrop
                ? `cui-modal__backdrop fade` + ` ${this.state.animationClass}`
                : ''
            }
            underlayClickExits={backdropClickExit}
            escapeExits={escapeExits}
            focusDialog={focusDialog}
          >
            {modalContent}
          </AriaModal>
        )
      );
    };

    return renderModal();
  }
}

Modal.defaultProps = {
  children: null,
  show: false,
  size: 'default',
  backdrop: true,
  className: '',
  showCloseButton: true,
  headerLabel: '',
  backdropClickExit: false,
  escapeExits: true,
  icon: null,
  focusDialog: true,
};

Modal.propTypes = {
  /** Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing. */
  htmlId: PropTypes.string.isRequired,
  /**
   * Children components
   */
  children: PropTypes.node,
  /**
   * show/hide modal.
   */
  show: PropTypes.bool.isRequired,
  /**
   * size of the modal.
   */
  size: PropTypes.oneOf(['default', 'small', 'full', 'dialog']),
  /**
   * callback function invoked on close of the modal. modal can be closed on click of cross button or esc key.
   * onHide is mandatory props, if not passed modal can not be closed.
   */
  onHide: PropTypes.func.isRequired,
  /**
   * css class names
   */
  className: PropTypes.string,
  /**
   *  To show/hide backdrop of the modal.
   *  if backdrop is false then modal will become normal popup without backdrop and user can perform any action in parent screen.
   */
  backdrop: PropTypes.bool,
  /**
   *  To enable/disable clicking on underlay to exit modal
   *
   */
  backdropClickExit: PropTypes.bool,
  /**
   *  To enable/disable escape to exit modal
   *
   */
  escapeExits: PropTypes.bool,
  /**
   * header label.
   */
  headerLabel: PropTypes.string,
  /**
   * show/hide close button
   */
  showCloseButton: PropTypes.bool,

  /**
   * application DOM id, used to set aria-hidden to true when modal is open.
   */
  applicationId: PropTypes.string.isRequired,

  /**
   * Icon node to be rendered for Dialog
   */
  icon: PropTypes.element,

  /**
   * To set focus to the entire modal rather than elements within modal
   */
  focusDialog: PropTypes.bool,
};

export default Modal;

/**
* @name Default Modal
* @description Modal with default size.
* @category containers
* @component modal
* @section default
*
* @js

import {
  Button,
  ModalBody,
  ModalFooter
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal: false
  }

  render() {
    return (
      <section>
        <div className='row'>
          <div>
            <Button
              label='Default Modal'
              onClick={() => this.setState({showModal: true})}
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
          </div>
        </div>
        <div>
          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal: false})}
            headerLabel='Default Modal'
            show={this.state.showModal}
            ref={modal1 => this.modal1 = modal1}
            htmlId='modal1'
          >
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                label='Cancel'
                onClick={() => this.modal1.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                label='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal1.closeModal();
                }}
                ariaLabel='Submit Form'
                color='primary'
              />
            </ModalFooter>
          </Modal>
        </div>
      </section>
    );
  }
}

**/

/**
* @name Dialog Modal
* @description Modal with dialog size.
* @category containers
* @component modal
* @section dialog
*
* @js

import {
  Button,
  ModalBody,
  ModalFooter,
  Icon
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal2: false
  }

  render() {
    return (
      <section>
        <div className='row'>
          <div>
            <Button
              label='Dialog Modal'
              onClick={() => this.setState({showModal2: true})}
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
          </div>
        </div>
        <div>
          <Modal
            icon={<Icon name="warning_72" color="$yellow"/>}
            applicationId='app'
            onHide={() => this.setState({showModal2: false})}
            headerLabel='Dialog Modal'
            show={this.state.showModal2}
            ref={modal2 => this.modal2 = modal2}
            size='dialog'
            htmlId='modal2'
          >
            <ModalBody>
              <span>I'm just a dialog box</span>
            </ModalBody>
            <ModalFooter>
              <Button
                label='Cancel'
                onClick={() => this.modal2.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                label='OK'
                onClick={() => this.modal2.closeModal()}
                ariaLabel='Submit Form'
                color='primary'
              />
            </ModalFooter>
          </Modal>
        </div>
      </section>
    );
  }
}

**/

/**
* @name Small Modal
* @description Modal with small size.
* @category containers
* @component modal
* @section small
*
* @js

import {
  Button,
  ModalBody,
  ModalFooter,
  Form
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal3: false
  }

  render() {
    return (
      <section>
        <div className='row'>
          <div>
            <Button
              label='Small Modal'
              onClick={() => this.setState({showModal3: true})}
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
          </div>
        </div>
        <div>
          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal3: false})}
            headerLabel='Small Modal'
            show={this.state.showModal3}
            ref={modal3 => this.modal3 = modal3}
            size='small'
            htmlId='modal3'
          >
            <ModalBody>
              <form ref={moform2 => this.moform2 = moform2} />
            </ModalBody>
            <ModalFooter>
              <Button
                label='Cancel'
                onClick={() => this.modal3.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                label='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault;
                  this.modal3.closeModal();
                }}
                ariaLabel='Submit Form'
                color='primary'
              />
            </ModalFooter>
          </Modal>
        </div>
      </section>
    );
  }
}
**/

/**
* @name Full Modal
 * @description Modal with full size.
* @category containers
* @component modal
* @section full
*
* @js

import {
  Button,
  ModalBody,
  ModalFooter
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal: false
  }

  render() {
    return (
      <section>
        <div className='row'>
          <div>
            <Button
              label='Full Modal'
              onClick={() => this.setState({showModal: true})}
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
          </div>
        </div>
        <div>
          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal: false})}
            headerLabel='Default Modal'
            show={this.state.showModal}
            ref={modal1 => this.modal1 = modal1}
            htmlId='modal1'
            size='full'
          >
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                label='Cancel'
                onClick={() => this.modal1.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                label='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal1.closeModal();
                }}
                ariaLabel='Submit Form'
                color='primary'
              />
            </ModalFooter>
          </Modal>
        </div>
      </section>
    );
  }
}
**/
