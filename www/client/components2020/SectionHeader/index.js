import React from 'react';
import PropTypes from 'prop-types';

class SectionHeader extends React.PureComponent {
  render () {
    const {
      className,
      darkTheme,
      title,
      titleElm,
      leadStr,
      leadElm
    } = this.props;

    const titleContainer = (
      <div className='section-header__title'>
        {title && <h1>{title}</h1>}
        {titleElm && titleElm}
      </div>
    )

    const leadContainer = (
      <div className='section-header__lead'>
        {leadStr && (
          <p>{leadStr}</p>
        )}
        {leadElm && leadElm}
      </div>
    );

    return (
      <div className={'site-responsive-row section-header' + (darkTheme ? ' section-header-dark' : '') + (className ? ' ' + className : '')}>
        {(title || titleElm) && titleContainer}
        {(leadElm || leadStr) && leadContainer}
      </div>
    );
  }
}

SectionHeader.defaultProps = {
  className: '',
  darkTheme: false,
  title: '',
  titleElm: null,
  leadElm: null,
  leadStr: '',
};

SectionHeader.propTypes = {
  /** @prop Use dark css themes | '' */
  className: PropTypes.string,
  /** @prop Use dark css themes | false */
  darkTheme: PropTypes.bool,
  /** @prop Title to show | '' */
  title: PropTypes.string,
  /** @prop Title element to show | '' */
  titleElm: PropTypes.element,
  /** @prop Lead text to show | '' */
  leadStr: PropTypes.string,
  /** @prop Lead text to show | '' */
  leadElm: PropTypes.element,
};

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;