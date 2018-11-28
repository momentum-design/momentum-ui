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
      renderTo,
      show,
      size,
      ...props
    } = this.props;

    const modalContent = (
      <div className="cui-modal__content">
        <div className="cui-modal__flex-container">
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

Modal.propTypes = {
  /** @prop application DOM id, used to set aria-hidden to true when modal is open */
  applicationId: PropTypes.string.isRequired,
  /** @prop Determines the visibility and ability to edit the backdrop of the Modal | true */
  backdrop: PropTypes.bool,
  /** @prop To enable/disable clicking on underlay to exit modal | false */
  backdropClickExit: PropTypes.bool,
  /** @prop Children nodes to render inside the Modal | null */
  children: PropTypes.node,
  /** @prop Optional css class names | '' */
  className: PropTypes.string,
  /** @prop To enable/disable escape to exit modal | true */
  escapeExits: PropTypes.bool,
  /** @prop To set focus to the entire modal rather than elements within modal | true */
  focusDialog: PropTypes.bool,
  /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
  htmlId: PropTypes.string.isRequired,
  /** @prop Icon node to be rendered for Dialog | null */
  icon: PropTypes.element,
  /** @prop Callback function invoked when user clicks on cross button or esc key */
  onHide: PropTypes.func.isRequired,
  /** @prop To render to an element other than the browser window | null */
  renderTo: PropTypes.string,
  /** @prop Show/hide modal */
  show: PropTypes.bool.isRequired,
  /** @prop Size of the modal | 'default' */
  size: PropTypes.oneOf(['large', 'medium', 'default', 'small', 'full', 'dialog']),
};

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

Modal.displayName = 'Modal';

export default Modal;

/**
* @component modal
* @section default
* @react

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@collab-ui/react';

export default class ModalDefault extends React.PureComponent {
  state = {
    showModal: false,
    showModal2: false,
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <Button
            children='Default/Medium Modal'
            onClick={() => this.setState({showModal: true})}
            ariaLabel='Open Modal'
            color='primary'
          />
          <Button
            children='Default/Medium Modal with Message'
            onClick={() => this.setState({showModal2: true})}
            ariaLabel='Open Modal 2'
            color='primary'
          />

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

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal2: false})}
            show={this.state.showModal2}
            ref={modal2 => this.modal2 = modal2}
            htmlId='modal2'
            backdropClickExit
          >
            <ModalHeader
              headerLabel='Default Modal'
              message='To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite.'
              showCloseButton
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
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
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal2.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}

**/

/**
* @component modal
* @section small
* @react

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form
} from '@collab-ui/react';

export default class ModalSmall extends React.PureComponent {
  state = {
    showModal3: false,
    showModal4: false,
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <Button
            children='Small Modal'
            onClick={() => this.setState({showModal3: true})}
            ariaLabel='Open Modal'
            color='primary'
          />
          <Button
            children='Small Modal with Message'
            onClick={() => this.setState({showModal4: true})}
            ariaLabel='Open Modal'
            color='primary'
          />

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

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal4: false})}
            show={this.state.showModal4}
            ref={modal4 => this.modal4 = modal4}
            size='small'
            htmlId='modal4'
          >
            <ModalHeader
              headerLabel='Small Modal'
              showCloseButton
              message='To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite.'
            />
            <ModalBody>
              <form ref={moform2 => this.moform2 = moform2} />
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
                  e.preventDefault;
                  this.modal4.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}
**/

/**
* @component modal
* @section large
* @react

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@collab-ui/react';

export default class ModalLarge extends React.PureComponent {
  state = {
    showModal5: false,
    showModal6: false,
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <Button
            children='Large Modal'
            onClick={() => this.setState({showModal5: true})}
            ariaLabel='Open Modal'
            color='primary'
          />
          <Button
            children='Large Modal with Message'
            onClick={() => this.setState({showModal6: true})}
            ariaLabel='Open Modal'
            color='primary'
          />

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal5: false})}
            show={this.state.showModal5}
            ref={modal5 => this.modal5 = modal5}
            htmlId='modal5'
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

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal6: false})}
            show={this.state.showModal6}
            ref={modal6 => this.modal6 = modal6}
            htmlId='modal6'
            size='large'
          >
            <ModalHeader
              headerLabel='Large Modal'
              showCloseButton
              message='To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite. To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite.'
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal6.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal6.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}
**/

/**
* @component modal
* @section full
* @react

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@collab-ui/react';

export default class ModalFull extends React.PureComponent {
  state = {
    showModal7: false,
    showModal8: false,
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <Button
            children='Full Modal'
            onClick={() => this.setState({showModal7: true})}
            ariaLabel='Open Modal'
            color='primary'
          />
          <Button
            children='Full Modal with Message'
            onClick={() => this.setState({showModal8: true})}
            ariaLabel='Open Modal'
            color='primary'
          />

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal7: false})}
            show={this.state.showModal7}
            ref={modal7 => this.modal7 = modal7}
            htmlId='modal7'
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
                onClick={() => this.modal7.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal7.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal8: false})}
            show={this.state.showModal8}
            ref={modal8 => this.modal8 = modal8}
            htmlId='modal8'
            size='full'
          >
            <ModalHeader
              headerLabel='Full Modal'
              showCloseButton
              message='To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite.'
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal8.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal8.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}
**/

/**
* @component dialog
* @section dialog
* @react

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Icon
} from '@collab-ui/react';

export default class Dialog extends React.PureComponent {
  state = {
    showDialog: false,
    showModalInternal: false
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <Button
            children='Dialog Modal'
            onClick={() => this.setState({showDialog: true})}
            ariaLabel='Open Modal'
            color='primary'
          />
          <Button
            children='Render To Div'
            onClick={() => this.setState({showModalInternal: true})}
            ariaLabel='Open Modal'
            color='primary'
          />

          <Modal
            icon={<Icon name="warning_72" color="$yellow"/>}
            applicationId='app'
            onHide={() => this.setState({showDialog: false})}
            show={this.state.showDialog}
            ref={modalDialog => this.modalDialog = modalDialog}
            size='dialog'
            htmlId='modalDialog'
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
                onClick={() => this.modalDialog.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                onClick={() => this.modalDialog.closeModal()}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

        <div id='render-to-modal'/>

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
      </div>
    );
  }
}

**/
