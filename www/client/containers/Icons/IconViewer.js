import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@momentum-ui/react';
import IconProperties from './IconProperties';
import IconDownload from './IconDownload';
import config from '../../config';

class IconViewer extends React.Component {
  constructor(props) {
    super(props);
    this.rootNode = React.createRef();
  }

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

  closeViewer = () => {
    this.props.onClose();
  };

  selectSize = size => {
    this.setState({ selectedSize: size }, this.setSelectedIconName);
  };

  selectColor = color => {
    this.setState({ selectedColor: color }, this.setSelectedIconName);
  };

  setSelectedIconName = () => {
    const selectedName =
      this.state.selectedColor && this.state.selectedColor !== 'default'
        ? `${this.props.currentIcon.name}_${this.state.selectedSize}_${this.state.selectedColor}`
        : `${this.props.currentIcon.name}_${this.state.selectedSize}`;
    const selectedClass = `icon-${this.props.currentIcon.name}_${
      this.state.selectedSize
    }`;
    this.setState({
      selectedIconName: selectedName,
      selectedIconClass: selectedClass,
    });
  };

  render() {
    const {
      arrowPosition,
      currentIcon
    } = this.props;
    const {
      selectedSize,
      selectedColor,
      selectedIconName,
      selectedIconClass,
      availableSizes,
      availableColors,
    } = this.state;
    const iconName = currentIcon && currentIcon.name;
    const iconClasses = `docs-icons__content--icon ${selectedIconClass} icon--${selectedColor} icon-${iconName}`;
    const downloadLinkBase = `${config.ICONS_DOWNLOADS_URL}/${selectedIconName}/${selectedIconName}`;

    return (
      <div className="docs-icons__viewer" ref={this.rootNode} >
        <div className="docs-icons__viewer--arrow" style={{ left:`${arrowPosition}px` }} />
        <div className="docs-icons__viewer--close">
          <Button
            ariaLabel='Close'
            circle
            className="md-button--none"
            onClick={this.closeViewer}
            size={28}
          >
            <Icon name='icon-cancel_16' />
          </Button>
        </div>
        <div className="docs-icons__viewer--body">
          <div className="docs-icons__header row">{iconName}</div>
          <div className="docs-icons__content row">
            <div className="docs-icons__content--info">
              <div className={iconClasses} />
            </div>
            <div className="docs-icons__content--info">
              {availableSizes && (
                <div className="docs-icons__content--info__section">
                  <h2>Available Sizes</h2>
                  <IconProperties
                    values={availableSizes}
                    selectedValue={selectedSize}
                    onSelect={this.selectSize}
                  />
                </div>
              )}
              {availableColors && (
                <div className="docs-icons__content--info__section docs-icons__content--info__section-colors">
                  <h2>Available Colors</h2>
                  <IconProperties
                    type="color"
                    values={availableColors}
                    selectedValue={selectedColor}
                    onSelect={this.selectColor}
                  />
                </div>
              )}
              <div className="docs-icons__content--info__section">
                <h2>Font Classes and Variables</h2>
                <IconDownload
                  header={selectedIconClass}
                  subheader={'CSS Class Name'}
                />
                <IconDownload
                  header={`$${selectedIconClass}`}
                  subheader={'SCSS Variable'}
                />
              </div>
            </div>
            <div className="docs-icons__content--info">
              <div className="docs-icons__content--info__section">
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
          <div className="docs-icons__viewer--feedback">
            <Link to="/feedback">
              Submit feedback
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

IconViewer.propTypes = {
  arrowPosition: PropTypes.number,
  currentIcon: PropTypes.shape({
    name: PropTypes.string,
    defaultSize: PropTypes.string,
    id: PropTypes.string,
    tags: PropTypes.array,
    sizes: PropTypes.object,
    colors: PropTypes.object,
  }),
  onClose: PropTypes.func,
};

IconViewer.defaultProps = {
  arrowPosition: 0,
  currentIcon: {
    name: '',
    defaultSize: '',
    id: '',
    tags: [],
    sizes: {},
    colors: {},
  },
  onClose: null,
};

IconViewer.displayName = 'IconViewer';

export default IconViewer;
