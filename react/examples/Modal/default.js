import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@collab-ui/react';
export default class Default extends React.PureComponent {
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