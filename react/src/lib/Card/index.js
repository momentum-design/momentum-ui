import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  static displayName = 'Card';
  // constructor (props) {
  // 	super(props);
  //
  // 	this.state = {
  // 		animationClass: ''
  // 	};

  // 	this.closeModal = this.closeModal.bind(this);
  // }

  // componentWillReceiveProps(nextProps){
  //   this.props.show !== nextProps.show
  //   && nextProps.show
  //   && setTimeout(() => {
  //     this.setState({ animationClass: 'in' });
  //   }, 0);
  // }
  //
  // closeModal () {
  // 	this.setState({ animationClass: '' });
  //
  // 	return setTimeout(() => {
  // 		this.props.onHide();
  // 	}, 300);
  // }
  //
  // getModalContent () {
  // 	const {headerLabel, showCloseButton, size} = this.props;
  //
  // 	return (
  // 		<div
  // 			className={`modal-content ${size}`}
  // 		>
  // 			{
  // 				headerLabel
  // 				&&
  // 					<ModalHeader
  // 						showCloseButton={showCloseButton}
  // 						headerLabel={headerLabel}
  // 						onHide={this.closeModal}
  // 					/>
  // 			}
  // 			{this.props.children}
  // 		</div>
  //   );
  // }

  render() {
    const {
      headerLabel,
      label,
      headerBorder,
      headerColor,
      headerAlign,
      sizeNum,
      nav,
      //   className,
      //   size,
      //   backdrop,
      //   backdropClickExit,
      //   escapeExits,
      //   htmlId
    } = this.props;
    //
    // const renderModal = () => {
    // 	return show
    // 	&& (
    // 		<AriaModal
    //       onExit={this.closeModal}
    //       getApplicationNode={() => document.querySelector('#app')}
    // 			dialogClass={
    // 				`reveal-modal` +
    // 				` ${size === 'dialog' ? 'dialog' : 'full'}` +
    // 				` ${size === 'dialog' ? 'fade' : 'reveal-bottom'}` +
    // 				` ${className}` +
    // 				` ${this.state.animationClass}`
    // 			}
    // 			dialogStyle={{
    // 				zIndex: 1051,
    // 				display: 'block',
    // 				visibility: 'visible'
    // 			}}
    //       includeDefaultStyles={false}
    //       titleId={htmlId}
    //       key={1}
    //       underlayStyle={
    //         backdrop
    //         ? {
    //             zIndex: 1040,
    //             display: 'block',
    //             visibility: 'visible'
    //           }
    //         : {}
    //       }
    //       underlayClass={
    //         backdrop
    //         ? (
    //             `reveal-modal-bg fade` +
    //             ` ${this.state.animationClass}`
    //           )
    //         : ''
    //       }
    //       underlayClickExits={backdropClickExit}
    //       escapeExits={escapeExits}
    // 		>
    // 			{this.getModalContent()}
    // 		</AriaModal>
    // 	);
    // };
    const getHeader = () => {
      return (
        <header className={`${(headerAlign && `align-${headerAlign}`) || ''}`}>
          <h4>{headerLabel}</h4>
        </header>
      );
    };

    return (
      <div
        className={
          'cui-card' +
          `${(sizeNum && ` cui-card--${sizeNum}`) || ''}` +
          `${(nav && ' cui-card--nav') || ''}` +
          `${(headerBorder && ' header-border') || ''}` +
          `${(headerColor && ` header-background ${headerColor}`) || ''}`
        }
      >
        <article style={nav && { padding: '1rem', textAlign: 'center' }}>
          {headerLabel && getHeader()}
          <h4>{label}</h4>
        </article>
      </div>
    );
  }
}

Card.defaultProps = {
  header: '',
  headerAlign: null,
  headerBackground: '',
  headerBorder: false,
  headerColor: '',
  headerLabel: '',
  label: '',
  size: '',
  sizeNum: 0,
  nav: false,
  // children: null,
  // show: false,
  // size: 'default',
  // backdrop: true,
  // className: '',
  // showCloseButton: true,
  // headerLabel: '',
  // backdropClickExit: false,
  // escapeExits: true
};

Card.propTypes = {
  // /** Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing. */
  // htmlId: PropTypes.string.isRequired,
  // /**
  //  * Children components
  //  */
  // children: PropTypes.node,
  // /**
  //  * show/hide modal.
  //  */
  // show: PropTypes.bool.isRequired,
  // /**
  //  * callback function invoked on close of the modal. modal can be closed on click of cross button or esc key.
  //  * onHide is mandatory props, if not passed modal can not be closed.
  //  */
  // onHide: PropTypes.func.isRequired,
  // /**
  //  * css class names
  //  */
  // className: PropTypes.string,
  // /**
  //  *  To show/hide backdrop of the modal.
  //  *  if backdrop is false then modal will become normal popup without backdrop and user can perform any action in parent screen.
  //  */
  // backdrop: PropTypes.bool,

  /** @prop Alignment of header | null */
  headerAlign: PropTypes.oneOf(['left', 'center']),
  /** @prop Set visitibility of the header's border | false */
  headerBorder: PropTypes.bool,
  /** @prop Set header color | '' */
  headerColor: PropTypes.string,
  /** @prop Set header's Text | '' */
  headerLabel: PropTypes.string,
  /** @prop Set Card Text | '' */
  label: PropTypes.string,
  /** @prop Set size of the card from list of prefined strings | '' */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  /** @prop Set number to define size | 0 */
  sizeNum: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    /** @prop Sets of Card is used for nav | false */
  nav: PropTypes.bool,

};

export default Card;
