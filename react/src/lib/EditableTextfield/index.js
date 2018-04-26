import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@collab-ui/react';

/**
 * @category controls
 * @component editable-textfield
 * @variations collab-ui-react
 */

export default class EditableTextfield extends React.Component {
  static displayName = 'EditableTextfield';

  state = {
    isEditing: false,
    inputText: this.props.inputText,
  };

  componentDidUpdate = () => {
    if (this.state.isEditing && this.editText) {
      this.editText.refs.editTextfield.focus();
    }
  }

  onDoneEditing = (value) => {
    const { onDoneEditing } = this.props;

    this.setState({
      isEditing: false,
      inputText: value,
    });

    if (onDoneEditing) {
      onDoneEditing(value);
    }
  }

  editClick = () => {
    const { disabled } = this.props;

    if(disabled) {
      return;
    } else {
      this.setState({
        isEditing: true,
      });
    }
  }

  editKey = (e) => {
    const { disabled } = this.props;

    e.stopPropagation();
    e.preventDefault();

    if(disabled) {
      return;
    } else {
      this.setState({
        isEditing: true
      });
    }
  }

  onDoneKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.setState({
        isEditing: false,
      });
    } else if (e.keyCode === 13) {
      this.onDoneEditing(e.target.value);
    }
  }

  render() {
    const { className } = this.props;

    if(this.state.isEditing) {
      return (
        <Input
          className={
            `cui-editable-textfield` +
            ' cui-editable-textfield__editing' +
            `${(className && ` ${className}`) || ''}`
          }
          ref={(input) => { this.editText = input; }}
          defaultValue={this.state.inputText}
          htmlId='editText'
          name='editText'
          onDoneEditing={(value) => this.onDoneEditing(value)}
          onKeyDown={(e) => this.onDoneKeyDown(e)}
        />
      );
    } else {
      return (
        <span
          role='button'
          tabIndex={0}
          className={
            `cui-editable-textfield` +
            ' cui-editable-textfield__span' +
            `${(className && ` ${className}`) || ''}`
          }
          onClick={() => this.editClick()}
          onKeyPress={(e) => this.editKey(e)}
        >
          {this.state.inputText}
        </span>
      );
    }
  }
}

EditableTextfield.propTypes = {
  /**
   * css class names
   */
  className: PropTypes.string,
  /**
   * text to be shown
   */
  inputText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * optional disable
   */
  disabled: PropTypes.bool,
  /**
   * optional function for blur
   */
  onDoneEditing: PropTypes.func,
};

EditableTextfield.defaultProps = {
  className: '',
  inputText: '',
  disabled: false,
  onDoneEditing: null,
};


/**
* @name Default EditableTextfield
* @description default
*
* @category controls
* @component editable-textfield
* @section default
*
* @js

export default class PlaygroundComponent extends React.Component {
  consoleChange = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div>
        <div className="docui-example docui-example--spacing" style={{padding: '16px'}}>
          <EditableTextfield inputText='Hello World' onDoneEditing={(value) =>this.consoleChange(value)}/>
        </div>
        <div className='cui--dark docs-example--dark' style={{padding: '16px'}}>
          <EditableTextfield inputText='Hello Dark World'/>
        </div>
    </div>
    );
  }
}

**/
