import React from 'react';
import PropTypes from 'prop-types';
/** Library that manages Tabbing and Accessibility for Modal
 *   https://github.com/davidtheclark/react-aria-modal
 */
import AriaModal from 'react-aria-modal';

/**
 * @category containers
 * @component modal
 * @variations collab-ui-react
 */

class Modal extends React.Component {
  static displayName = 'Modal';

  static childContextTypes = {
    handleClose: PropTypes.func
  };
  
  state = {
    animationClass: this.props.show ? 'in' : '',
  };

  getChildContext = () => {
    return {
      handleClose: e => this.closeModal(e)
    };
  };

  componentDidUpdate(prevProps) {
    prevProps.show !== this.props.show 
      && this.props.show
      && this.setAnimationState(true);
  }

  closeModal = e => {
    this.setAnimationState();

    return setTimeout(() => {
      this.props.onHide(e);
    }, 300);
  }

  setAnimationState = isOpen => {
    this.setState({ animationClass: isOpen ? 'in' : '' });
  }

  render() {
    const {
      applicationId,
      backdrop,
      backdropClickExit,
      children,
      className,
      escapeExits,
      focusDialog,
      htmlId,
      icon,
      renderTo,
      show,
      size,
      ...props
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
          <div className="cui-modal__content--left-pane">
            {icon}
          </div>
        )}
        <div className="cui-modal__content--right-pane">
          {children}
        </div>
      </div>
    );

    const RenderModal = renderTo
      ? AriaModal.renderTo(`#${renderTo}`)
      : AriaModal;

    const getModal = () => {
      return show
        && 
        <RenderModal
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
          {...props}
        >
          {modalContent}
        </RenderModal>;
      };

    return (
      getModal()
    );
  }
}

Modal.defaultProps = {
  backdrop: true,
  backdropClickExit: false,
  children: null,
  className: '',
  escapeExits: true,
  focusDialog: true,
  icon: null,
  renderTo: null,
  show: false,
  size: 'default',
};

Modal.propTypes = {
    /**
   * application DOM id, used to set aria-hidden to true when modal is open.
   */
  applicationId: PropTypes.string.isRequired,
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
   * Children components
   */
  children: PropTypes.node,
  /**
   * css class names
   */
  className: PropTypes.string,
  /**
   *  To enable/disable escape to exit modal
   *
   */
  escapeExits: PropTypes.bool,
  /**
   * To set focus to the entire modal rather than elements within modal
   */
  focusDialog: PropTypes.bool,
  /** Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing. */
  htmlId: PropTypes.string.isRequired,
  /**
   * Icon node to be rendered for Dialog
   */
  icon: PropTypes.element,
  /**
   * callback function invoked on close of the modal. modal can be closed on click of cross button or esc key.
   * onHide is mandatory props, if not passed modal can not be closed.
   */
  onHide: PropTypes.func.isRequired,
  /**
   * To render to an element other than the window
   */
  renderTo: PropTypes.string,
  /**
   * show/hide modal.
   */
  show: PropTypes.bool.isRequired,
  /**
   * size of the modal.
   */
  size: PropTypes.oneOf(['large', 'medium', 'default', 'small', 'full', 'dialog']),
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
  ModalFooter,
  ModalHeader
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
              children='Default/Medium Modal'
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
            show={this.state.showModal}
            ref={modal1 => this.modal1 = modal1}
            htmlId='modal1'
            backdropClickExit
          >
            <ModalHeader
              headerLabel='Default Modal'
              showCloseButton
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal1.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal1.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
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
  ModalHeader,
  Icon
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal2: false,
    showModalInternal: false
  }

  render() {
    return (
      <section>
        <div className='row'>
          <div>
            <Button
              children='Dialog Modal'
              onClick={() => this.setState({showModal2: true})}
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
            <Button
              children='Render To Div'
              onClick={() => this.setState({showModalInternal: true})}
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
            show={this.state.showModal2}
            ref={modal2 => this.modal2 = modal2}
            size='dialog'
            htmlId='modal2'
          >
            <ModalHeader
              headerLabel='Dialog Modal'
            />
            <ModalBody>
              <span>I'm just a dialog box</span>
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal2.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                onClick={() => this.modal2.closeModal()}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>
        </div>
        <div id='render-to-modal'/>
        <div>
          <Modal
            icon={<Icon name="warning_72" color="$yellow"/>}
            applicationId='app'
            onHide={() => this.setState({showModalInternal: false})}
            show={this.state.showModalInternal}
            ref={ref => this.modalInternal = ref}
            size='dialog'
            htmlId='modalInternal'
            renderTo='render-to-modal'
          >
            <ModalHeader
              headerLabel='Dialog Modal'
            />
            <ModalBody>
              <span>I'm just a dialog box</span>
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modalInternal.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                onClick={() => this.modalInternal.closeModal()}
                ariaLabel='Submit Form'
                color='blue'
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
  ModalHeader,
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
              children='Small Modal'
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
            show={this.state.showModal3}
            ref={modal3 => this.modal3 = modal3}
            size='small'
            htmlId='modal3'
          >
            <ModalHeader
              headerLabel='Small Modal'
              showCloseButton
            />
            <ModalBody>
              <form ref={moform2 => this.moform2 = moform2} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal3.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault;
                  this.modal3.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
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
* @name Large Modal
* @description Modal with large size.
* @category containers
* @component modal
* @section large
*
* @js

import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal4: false
  }

  render() {
    return (
      <section>
        <div className='row'>
          <div>
            <Button
              children='Large Modal'
              onClick={() => this.setState({showModal4: true})}
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
          </div>
        </div>
        <div>
          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal4: false})}
            show={this.state.showModal4}
            ref={modal4 => this.modal4 = modal4}
            htmlId='modal4'
            size='large'
          >
            <ModalHeader
              headerLabel='Large Modal'
              showCloseButton
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal4.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal4.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
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
  ModalFooter,
  ModalHeader
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal4: false
  }

  render() {
    return (
      <section>
        <div className='row'>
          <div>
            <Button
              children='Full Modal'
              onClick={() => this.setState({showModal4: true})}
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
          </div>
        </div>
        <div>
          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal4: false})}
            show={this.state.showModal4}
            ref={modal5 => this.modal5 = modal5}
            htmlId='modal5'
            size='full'
          >
            <ModalHeader
              headerLabel='Full Modal'
              showCloseButton
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal5.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal5.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>
        </div>
      </section>
    );
  }
}
**/
