import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Icon
} from '@collab-ui/react';
export default class Default extends React.PureComponent {
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