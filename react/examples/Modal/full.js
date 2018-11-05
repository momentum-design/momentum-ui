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