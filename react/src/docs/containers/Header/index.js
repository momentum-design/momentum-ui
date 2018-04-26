import React from 'react';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    hero: PropTypes.bool,
    textAlign: PropTypes.string,
    textColor: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    description: '',
    hero: false,
    textAlign: '',
    textColor: '',
    color: '',
  };

  render() {
    const {
      title,
      description,
      hero,
      textAlign,
      textColor,
      color,
    } = this.props;

    const leadElement = () => {
      return description ? (
        <h3 className={hero ? 'hero__lead' : 'page-header__lead'}>
          {description}
        </h3>
      ) : (
        ''
      );
    };

    const titleElement = () => {
      return (
        <h1 className={hero ? 'hero__title' : 'page-header__title'}>{title}</h1>
      );
    };

    return (
      <div
        className={
          (hero
            ? hero === 'center' ? 'text-center' : 'hero hero--fluid'
            : 'page-header') +
          ' ' +
          (textAlign === 'left' ? 'page-header--left' : '') +
          ' ' +
          (textColor === 'light' ? 'hero--dark' : '')
        }
        style={{ backgroundColor: color }}
      >
        <div
          className={
            'page-header__container ' +
            (textAlign === 'left' ? 'page-header--left' : '')
          }
        >
          {titleElement()}
          {leadElement()}
        </div>
      </div>
    );
  }
}
