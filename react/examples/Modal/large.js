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