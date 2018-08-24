import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { Input } from '@collab-ui/react';

/**
 * @category controls
 * @component editable-textfield
 * @variations collab-ui-react
 */

class EditableTextfield extends React.Component {
  static displayName = 'EditableTextfield';

  state = {
    isEditing: false,
    inputText: this.props.inputText,
  };
  
  componentDidUpdate = () => {
    if (this.state.isEditing && this.editText) {
      this.editText.focus();
    }
  }

  handleEnter = (e, value) => {
    const { handleDoneEditing } = this.props;
    e.persist();

    this.setState(
      {
        isEditing: false,
        inputText: value,
      },
      () => handleDoneEditing && handleDoneEditing(e, {value})
    );

    e.nativeEvent.stopImmediatePropagation();
  }

  handleBlur = (e, value) => {
    const { handleDoneEditing } = this.props;
    e.persist();
    
    this.setState(
      {
        isEditing: false,
        inputText: value,
      },
      () => handleDoneEditing && handleDoneEditing(e, {value})
    );
  }

  handleEsc = e => {
    this.setState(
      {
        isEditing: false
      }
    );
    e.nativeEvent.stopImmediatePropagation();
  }

  handleClick = () => {
    const { disabled } = this.props;

    if(disabled) {
      return;
    } else {
      this.setState({
        isEditing: true,
      });
    }
  }

  handleKey = () => {
    const { disabled } = this.props;

    if(disabled) {
      return;
    } else {
      this.setState({
        isEditing: true
      });
    }
  }

  handleDoneKeyDown = e => {
    if (e.keyCode === 27) {
      this.handleEsc(e);
    } else if (e.keyCode === 13){
      this.handleEnter(e, e.target.value);
    } 
  }

  render() {
    const {
      alignment,
      buttonClassName,
      buttonProps,
      className,
      ...props
    } = this.props;
    const { isEditing, inputText } = this.state;

    const inputProps = omit({...props}, [
      'disabled',
      'handleDoneEditing',
      'inputText',
    ]);

    return(
      <span
        className={
          'cui-editable-textfield' +
          `${alignment && ` cui-editable-textfield--${alignment}` || ''}`
        }
      >
        {isEditing &&
          <Input
            className={
              'cui-editable-textfield__editing' +
              `${className && ` ${className}` || ''}`
            }
            inputRef={(input) => { this.editText = input; }}
            onDoneEditing={this.handleBlur}
            onKeyDown={this.handleDoneKeyDown}
            value={inputText}
            {...inputProps}
          />
        }
        {!isEditing &&
          <div
            role='button'
            tabIndex={0}
            className={
              'cui-editable-textfield__button' +
              `${buttonClassName && ` ${buttonClassName}` || ''}`
            }
            onClick={this.handleClick}
            onKeyPress={this.handleKey}
            {...buttonProps}
          >
            {inputText || '\u00a0'}
          </div>
        }
      </span>
    );
  }
}

EditableTextfield.propTypes = {
  /**
   * alignment modifier
   */
  alignment: PropTypes.oneOf(['center', 'left', 'right']),
  /**
   * optional props for internal button
   */
  buttonProps: PropTypes.shape({}),
  /**
   * optional css class name for internal button
   */
  buttonClassName: PropTypes.string,
  /**
   * css class names
   */
  className: PropTypes.string,
  /**
   * optional disable
   */
  disabled: PropTypes.bool,
  /**
   * optional function for blur
   */
  handleDoneEditing: PropTypes.func,
  /**
   * text to be shown
   */
  inputText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

EditableTextfield.defaultProps = {
  alignment: 'left',
  buttonClassName: '',
  buttonProps: null,
  className: '',
  disabled: false,
  handleDoneEditing: null,
  inputText: '',
};

export default EditableTextfield;

/**
* @name Default EditableTextfield
*
* @category controls
* @component editable-textfield
* @section default
*
* @js

export default class PlaygroundComponent extends React.Component {
  valueChange = (value) => {
    newValue = value;
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">inputText=(Hello World)</code></p>
            <p><code className="small">{'handleDoneEditing=({(value) => console.log(value)})'}</code></p>
          </h3>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <EditableTextfield
              handleDoneEditing={(e, data) => console.log(e, data)}
              inputText='Hello World'
            />
          </div>

        </div>
        <div className="cui--dark docs-example docs-example--spacing docs-example--dark">

          <h3>
            Props
            <p><code className="small">inputText=(Hello Dark World)</code></p>
            <p><code className="small">alignment=('center')</code></p>
          </h3>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <EditableTextfield alignment='center' inputText='Hello Dark World'/>
          </div>

        </div>
    </div>
    );
  }
}

**/
