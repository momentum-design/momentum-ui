import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@collab-ui/react';
// import Icon from '../Icon';
import IconProperties from './IconProperties';
import IconDownload from './IconDownload';
import { DOWNLOAD_URL } from '../../constants';

export default class IconModal extends React.Component {
  state = {
    availableSizes: [],
    availableColors: [],
    selectedSize: '',
    selectedColor: '',
    selectedIconName: '',
    selectedIconClass: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIcon) {
      const { currentIcon } = nextProps;
      const { sizes, colors, defaultSize, name } = currentIcon;
      this.setState({
        availableSizes: Object.keys(sizes),
        availableColors: Object.keys(colors),
        selectedIconName: `${name}_${defaultSize}`,
        selectedIconClass: `icon-${name}_${defaultSize}`,
        selectedSize: defaultSize,
        selectedColor: 'default',
      });
    }
  }

  closeModal = () => {
    this.props.onClose();
  };

  selectSize = (size) => {
    this.setState({ selectedSize: size }, this.setSelectedIconName);
  }

  selectColor = (color) => {
    this.setState({ selectedColor: color }, this.setSelectedIconName);
  }

  setSelectedIconName = () => {
    const selectedName = (this.state.selectedColor && this.state.selectedColor !== 'default')
      ? `${this.props.currentIcon.name}_${this.state.selectedSize}_${this.state.selectedColor}`
      : `${this.props.currentIcon.name}_${this.state.selectedSize}`;
    const selectedClass = `icon-${this.props.currentIcon.name}_${this.state.selectedSize}`;
    this.setState({
      selectedIconName: selectedName,
      selectedIconClass: selectedClass,
    });
  }

  render() {
    const { currentIcon, isOpen } = this.props;
    const { selectedSize, selectedColor, selectedIconName, selectedIconClass, availableSizes, availableColors } = this.state;
    const iconName = currentIcon && currentIcon.name;
    const iconClasses = `i-modal__icon ${selectedIconClass} icon--${selectedColor} icon-${iconName}`;
    const downloadLinkBase = `${DOWNLOAD_URL}${selectedIconName}/${selectedIconName}`;

    return (
      <Modal
        backdropClickExit
        htmlId="i-modal"
        onHide={this.closeModal}
        show={isOpen}
      >
        <ModalHeader
          showCloseButton
          headerLabel={<h1 className="i-modal__name">{iconName}</h1>}
        />
        <ModalBody>
          <div className="i-modal row">
            <div className={iconClasses} />
            <div className="i-modal__info">
              <p>Select an icon by choosing a size and color below.</p>
              <div className="i-modal__sizes-colors">
                {
                  availableSizes && (
                    <div className="i-modal__sizes">
                      <div className="i-modal__label"><strong>Available Sizes</strong></div>
                      <IconProperties values={availableSizes} selectedValue={selectedSize} onSelect={this.selectSize} />
                    </div>
                  )
                }
                {
                  availableColors && (
                    <div className="i-modal__colors">
                      <div className="i-modal__label"><strong>Available Colors</strong></div>
                      <IconProperties values={availableColors} selectedValue={selectedColor} onSelect={this.selectColor} />
                    </div>
                  )
                }
              </div>
              <div className="i-modal__section">
                <h2>Font Classes and Variables</h2>
                <IconDownload header={selectedIconClass} subheader={<strong>CSS Class Name</strong>} />
                <IconDownload header={`$${selectedIconClass}`} subheader={<strong>SCSS Variable</strong>} />
              </div>
              <div className="i-modal__section downloads">
                <h2>Downloads</h2>
                <IconDownload
                  link={`${downloadLinkBase}_png-svg.zip`}
                  linkDetails={'PNG + SVG'}
                  subheader={
                    <React.Fragment>
                      <strong>Android</strong>&nbsp;<span>mdpi / xhdpi / xxhdpi / xxxhdpi / svg</span>
                    </React.Fragment>
                  }
                />
                <IconDownload
                  link={`${downloadLinkBase}.svg`}
                  linkDetails={'SVG'}
                  subheader={<strong>Windows</strong>}
                />
                <IconDownload
                  link={`${downloadLinkBase}_png.zip`}
                  linkDetails={'PNG'}
                  subheader={
                    <React.Fragment>
                      <strong>iOS + macOS</strong>&nbsp;<span>@1x / @2x / @3x</span>
                    </React.Fragment>
                  }
                />
                <IconDownload
                  link={`${downloadLinkBase}.pdf`}
                  linkDetails={'PDF'}
                />
                <IconDownload
                  link={`${downloadLinkBase}.eps`}
                  linkDetails={'EPS'}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter />
      </Modal>
    );
  }
}

IconModal.propTypes = {
  currentIcon: PropTypes.shape({
    name: PropTypes.string,
    defaultSize: PropTypes.string,
    id: PropTypes.string,
    tags: PropTypes.array,
    sizes: PropTypes.object,
    colors: PropTypes.object
  }),
  onClose: PropTypes.func,
  isOpen: PropTypes.bool
};

IconModal.defaultProps = {
  currentIcon: {
    name: '',
    defaultSize: '',
    id: '',
    tags: [],
    sizes: {},
    colors: {},
  },
  onClose: null,
  isOpen: null
};
