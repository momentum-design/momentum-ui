import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form
} from '@collab-ui/react';
export default class Default extends React.PureComponent {
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