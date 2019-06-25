/** @component lightbox */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { Spinner, Tooltip, Icon } from '@momentum-ui/react';

class Lightbox extends React.Component {

  state = {
    viewportDimensions: {
      width: 600,
      height: 600
    },
    zoom: 1
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, true);
    window.addEventListener('resize', this.handleResize, true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index && this.state.zoom > 1 && this.imgWrapper) {
      const viewportNode = this.viewport;
      viewportNode.scrollTop = 0;
      viewportNode.scrollLeft = (this.imgWrapper.offsetWidth - viewportNode.offsetWidth) / 2;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, true);
    window.removeEventListener('resize', this.handleResize, true);
  }

  handleResize = () => {
    const { viewport } = this;
    this.setState({
      viewportDimensions: {
        width: viewport.offsetWidth,
        height: viewport.offsetHeight
      }
    });
  }

  handleKeyDown = e => {
    const { index, pages } = this.props;
    let newIndex;

    switch (e.keyCode) {
      // Escape
      case 27:
        this.handleClose();
        return;
      // left arrow & up arrow
      case 37:
      case 38:
        newIndex = Math.max(index - 1, 0);
        break;
      // right arrow & down arrow
      case 39:
      case 40:
        newIndex = Math.min(index + 1, pages.length - 1);
        break;
      // page up & home
      case 33:
      case 36:
        newIndex = 0;
        break;
      // page down & end
      case 34:
      case 35:
        newIndex = pages.length - 1;
        break;
      // 1 - 9
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        newIndex = Math.min(e.keyCode - 49, pages.length - 1);
        break;
      default:
        return;
    }
    this.triggerPageChange(newIndex, e);
  }

  handleThumbnailClick = index => {
    const { onChange } = this.props;
    onChange && onChange(index);
  }

  triggerPageChange = (index, e) => {
    const { onChange, pages } = this.props;
    const target = this.lightBox && this.lightBox.querySelector(`[data-index="${index}"]`);
    if (index >= 0 && index <= pages.length - 1) {
      onChange && onChange(index);
    }
    e.stopPropagation();
    target && target.scrollIntoViewIfNeeded();
  }

  stopPropagation = e => {
    e.stopPropagation();
  }

  setZoom = increment => {
    const newZoom = this.state.zoom + increment;
    this.setState({
      zoom: newZoom < 0.25 ? 0.25 : newZoom
    });
  }

  handleDownload = () => {
    const { onDownload } = this.props;
    onDownload && onDownload();
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  }

  render() {
    const { pages, index, width, height, tooltips, downloading, info, name, applicationId } = this.props;
    const { zoom, viewportDimensions } = this.state;
    const currentPage = pages[index];
    const showColumn = pages.length > 1;

    const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight, 1);
      return {
        width: Math.round(srcWidth * ratio),
        height: Math.round(srcHeight * ratio)
      };
    };

    const getThumbnails = () => {
      const thumbnails = pages.map((page, idx) => {
        let key = `${idx}:${page.thumb}`;
        let body;

        if (page.decrypting) {
          const scale = width / 150;
          const scaleY = height / scale;
          const style = {
            height: Math.round(scaleY)
          };
          key += ':decrypting';

          body = (
            <div
              className={
                `md-lightbox__thumbnail` +
                `${(!!page.decrypting && ` md-lightbox__thumbnail--decrypting`) || ''}`
              }
              data-index={idx}
              style={style}
            >
              <Icon className="md-lightbox__thumbnail--icon" name="secure_28" />
            </div>
          );
        }
        else {
          body = (
            <img
              alt=""
              className={
                `md-lightbox__thumbnail` +
                `${(!!page.decrypting && ` md-lightbox__thumbnail--decrypting`) || ''}`
              }
              data-index={idx}
              draggable="false"
              onDragStart={() => false}
              src={page.thumb}
            />
          );
        }

        return (
          <div
            className={
              'md-lightbox__thumbnail-wrapper' +
              `${(idx === index && ` md-lightbox__thumbnail-wrapper--selected`) || ''}`
            }
            key={key}
            onClick={() => this.handleThumbnailClick(idx)}
            onKeyPress={() => this.handleThumbnailClick(idx)}
            role="button"
            tabIndex="0"
          >
            {body}
            <div>
              {idx + 1}
            </div>
          </div>
        );
      });
      return (
        <div className="md-lightbox__list">
          {thumbnails}
        </div>
      );
    };

    const getViewport = () => {
      let viewport;
      const dimensions = calculateAspectRatioFit(
        width * zoom,
        height * zoom,
        viewportDimensions.width,
        viewportDimensions.height
      );
      let imageContainerStyles = {
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`
      };

      if (currentPage.content) {
        if (currentPage.fullView) {
          imageContainerStyles = {
              width:  '100%',
              height: '100%',
              overflow: 'hidden'
          };
        }
        viewport = (
          <div
            className="md-lightbox__viewport-content"
            draggable="false"
            onClick={this.stopPropagation}
            onKeyPress={this.stopPropagation}
            onDoubleClick={() => this.setZoom(0.25)}
            onDragStart={() => false}
            role="button"
            tabIndex="0"
          >
            {currentPage.content}
          </div>
        );
      }
      else if (currentPage.image) {
        if (zoom <= 1) {
          /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
          viewport = (
            <img
              alt=""
              className="md-lightbox__viewport-image"
              draggable="false"
              onClick={this.stopPropagation}
              onKeyPress={this.stopPropagation}
              onDoubleClick={() => this.setZoom(0.25)}
              onDragStart={() => false}
              src={currentPage.image}
            />
          );
        }
        else {
          imageContainerStyles = {};
          viewport = (
            <img
              alt=""
              className="md-lightbox__viewport-image"
              draggable="false"
              onClick={this.stopPropagation}
              onKeyPress={this.stopPropagation}
              onDoubleClick={() => this.setZoom(0.25)}
              onDragStart={() => false}
              src={currentPage.image}
              style={{
                maxHeight: height * zoom,
                maxWidth: width * zoom,
                minHeight: height * zoom,
                minWidth: width * zoom
              }}
            />
          );
        }
      }

      return (
        <div
          className="md-lightbox__viewport-wrapper"
          ref={ref => this.imgWrapper = ref}
          style={imageContainerStyles}
        >
          {viewport}
        </div>
      );
    };



    const leftArrowControl = (
      <Tooltip tooltip={tooltips.previous} direction="right-center">
        <div
          className="md-lightbox__page-control md-lightbox__page-control-icon md-lightbox__page-controls--left"
          role="button"
          tabIndex="0"
          onKeyPress={e => this.triggerPageChange(index - 1, e)}
          onClick={e => this.triggerPageChange(index - 1, e)}
          style={{transform: 'rotate(-180deg)'}}
        >
          <Icon name="arrow-right_16" />
        </div>
      </Tooltip>
    );

    const rightArrowControl = (
      <Tooltip tooltip={tooltips.next} direction="left-center">
        <div
          className="md-lightbox__page-control md-lightbox__page-control-icon md-lightbox__page-controls--right"
          role="button"
          tabIndex="0"
          onKeyPress={e => this.triggerPageChange(index + 1, e)}
          onClick={e => this.triggerPageChange(index + 1, e)}
        >
          <Icon name="arrow-right_16" />
        </div>
      </Tooltip>
    );

    const viewportControls = () => {
      const downloadButton = (
        <div
          className="md-lightbox__control md-lightbox__control-download"
          tabIndex="0"
          role="button"
          onClick={this.handleDownload}
          onKeyPress={this.handleDownload}
        >
          <Icon name="download_16"/>
        </div>
      );

      const controlStyle = currentPage.content ? {
        visibility: 'hidden'
      } : {};

      const pageControl = pages.length > 1 ? (
        <div className="md-lightbox__controls md-lightbox__controls--center">
          <Tooltip tooltip={tooltips.previous}>
            <div className="md-lightbox__control"
              onClick={e => this.triggerPageChange(index - 1, e)}
              role="button"
              tabIndex="0"
              onKeyPress={e => this.triggerPageChange(index - 1, e)}
              style={{transform: 'rotate(-180deg)'}}
            >
              <Icon name="arrow-right_16"/>
            </div>
          </Tooltip>
          <span className="md-lightbox__control-value">{`${index + 1} / ${pages.length}`}</span>
          <Tooltip tooltip={tooltips.next}>
            <div className="md-lightbox__control"
              role="button"
              onClick={e => this.triggerPageChange(index + 1, e)}
              tabIndex="0"
              onKeyPress={e => this.triggerPageChange(index + 1, e)}
            >
              <Icon name="arrow-right_16"/>
            </div>
          </Tooltip>
        </div>
      ) : (
        <div className="md-lightbox__controls">
          <span className="md-lightbox__control-value">{index + 1}</span>
        </div>
      );


      return (
        <div
          className="md-lightbox__viewer-controls"
          onClick={this.stopPropagation}
          onKeyPress={this.stopPropagation}
          role="button"
          tabIndex="0"
        >
          <div className="md-lightbox__controls" style={controlStyle}>
            <Tooltip tooltip={tooltips.zoomOut}>
              <div className="md-lightbox__control"
                onClick={() => this.setZoom(-0.25)}
                role="button"
                tabIndex="0"
                onKeyPress={() => this.setZoom(-0.25)}
              >
                  <Icon name="zoom-out_16"/>
              </div>
            </Tooltip>
            <span className="md-lightbox__control-value">{Math.round(zoom * 100)}%</span>
            <Tooltip tooltip={tooltips.zoomIn}>
              <div className="md-lightbox__control"
                role="button"
                onClick={() => this.setZoom(0.25)}
                tabIndex="0"
                onKeyPress={() => this.setZoom(0.25)}
              >
                <Icon name="zoom-in_16"/>
              </div>
            </Tooltip>
          </div>
          {pageControl}
          <div className="md-lightbox__controls" style={controlStyle}>
            <span className="md-lightbox__control-value">{info.size}</span>
            <Tooltip tooltip={downloading ? tooltips.downloading : tooltips.download}>
                { downloading ?
                    <div className="md-lightbox__control md-lightbox__control-spinner">
                      <Spinner size={28}/>
                    </div> :
                    downloadButton
                }
            </Tooltip>
          </div>
        </div>
      );
    };

    return (
      <Modal
        includeDefaultStyles={false}
        getApplicationNode={() => document.querySelector(`#${applicationId}`)}
        onExit={this.handleClose}
        focusDialog={true}
        titleId="md-lightbox"
        dialogClass="md-lightbox"
        underlayClass="md-lightbox__container"
      >
        <div className="md-lightbox__header" ref={ref => this.lightBox = ref}>
          <div className="md-lightbox__header-item--left">
            <div className="md-lightbox__header-meta">
              <div className="md-lightbox__header-sharer">
                {info.sharedBy}
              </div>
              <div className="md-lightbox__header-timestamp">
                {info.sharedOn}
              </div>
            </div>
          </div>
          <div className="md-lightbox__header-item--center">
            <div className="md-lightbox__header-name">
              {name}
            </div>
          </div>
          <div className="md-lightbox__header-item--right">
            <Tooltip popoverProps={{ isContained: true }} tooltip={tooltips.exit} direction="bottom-right">
              <div className="md-lightbox__control"
                onClick={this.handleClose}
                role="button"
                tabIndex="0"
                onKeyPress={this.handleClose}>
                  <Icon name="cancel_16"/>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="md-lightbox__body">
          {showColumn && getThumbnails()}
          <div
            className="md-lightbox__content"
            onClick={this.handleClose}
            onKeyPress={this.handleClose}
            role="button"
            tabIndex="0"
          >
            <div
              className={
                `md-lightbox__viewport` +
                `${(!!currentPage.decrypting && ` md-lightbox__viewport--decrypting`) || ''}`
              }
              ref={ref => this.viewport = ref}
            >
              {
                pages[index].decrypting &&
                <Spinner className="md-lightbox__decrypting-spinner" />
              }
              {getViewport()}
            </div>
            {showColumn && leftArrowControl}
            {showColumn && rightArrowControl}
            {viewportControls()}
          </div>
        </div>
      </Modal>
    );
  }
}

Lightbox.propTypes = {
  /** @prop ID for Lightbox query lookup */
  applicationId: PropTypes.string.isRequired,
  /** Determines if info is decrypting | false */
  decrypting: PropTypes.bool,
  /** @prop Optional downloading css styling | false */
  downloading: PropTypes.bool,
  /** @prop Set Height value of Lightbox */
  height: PropTypes.number.isRequired,
  /** @prop Initial index of start page | 0 */
  index: PropTypes.number,
  /** @prop Lightbox information Object | {} */
  info: PropTypes.shape({
    sharedBy: PropTypes.string,
    sharedOn: PropTypes.string,
    size: PropTypes.string
  }),
  /** @prop Required name prop for Lightbox */
  name: PropTypes.string.isRequired,
  /** @prop Callback function invoked by user when interact with Lightbox | null */
  onChange: PropTypes.func,
  /** @prop Callback function invoked by user closing the Lightbox | null */
  onClose: PropTypes.func,
  /** @prop Callback function invoked by the download action of Lightbox | null */
  onDownload: PropTypes.func,
  /** @prop Array of Lightbox pages */
  pages: PropTypes.array.isRequired,
  /** @prop Collection of predefined tootips for various Lightbox actions | { download: 'Download', etc } */
  tooltips: PropTypes.shape({
    download: PropTypes.string,
    downloading: PropTypes.string,
    exit: PropTypes.string,
    previous: PropTypes.string,
    next: PropTypes.string,
    zoomIn: PropTypes.string,
    zoomOut: PropTypes.string
  }),
  /** @prop Set Width value for Lightbox */
  width: PropTypes.number.isRequired,
};

Lightbox.defaultProps = {
  decrypting: false,
  downloading: false,
  index: 0,
  info: {},
  name: '',
  onChange: null,
  onClose: null,
  onDownload: null,
  tooltips: {
    download: 'Download',
    downloading: 'Downloading...',
    exit: 'Exit',
    previous: 'Previous',
    next: 'Next',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out'
  },
};

Lightbox.displayName = 'Lightbox';

export default Lightbox;
