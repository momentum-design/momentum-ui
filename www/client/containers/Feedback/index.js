import PropTypes from 'prop-types';
import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import {
  AlertContainer,
  Button,
  Icon,
  Input,
  Label,
  Link,
  List,
  ListItem,
  ListItemSection,
  Select,
  SelectOption,
  Spinner
} from '@momentum-ui/react';
import PageHeader from '../../momentum-ui/PageHeader';
import {
  resetFeedback,
  submitFeedback,
  updateFeedback,
} from './actions';

class Feedback extends React.PureComponent {
  constructor(props) {
    super(props);

    this.refFileInput = React.createRef();
    this.refSelectCategory = React.createRef();
    this.refSelectType = React.createRef();
  }

  state = {
    emailValid: false,
    files: [],
    formErrors: { email: '' },
    formValid: false,
    formTouched: false,
    formDisabled: false,
  };

  componentDidUpdate(prevProps, prevState) {
    (this.props !== prevProps || this.state !== prevState)
    && this.validateForm();
  }

  componentWillUnMount() {
    this.props.resetFeedback();
  }

  browseFiles = () => {
    this.refFileInput.current.click();
  };

  getFileExt = ext => {
    const lowerExt = ext.toLowerCase();

    switch(true) {
      case /txt|text/.test(lowerExt):
        return 'text';
      case /image/.test(lowerExt):
        return 'image';
      case /pdf/.test(lowerExt):
        return 'pdf';
      case /video/.test(lowerExt):
        return 'video';
      case /zip|rar/.test(lowerExt):
        return 'zip';
      default:
        return 'missing';
    }
  };

  handleBlur = () => {
    this.setState({
      formTouched: true
    });
  };

  handleEmailInput = e => {
    const value = e.target.value;

    this.handleUpdateForm(e, 'email');
    this.validateEmail('email', value);
  };

  handleFileUploadAdd = e => {
    this.setState({
      files: [
        ...this.state.files,
        ...e.target.files
      ]
    });

    // Must exist to clear DOM
    // If not repeated file names will not upload
    this.refFileInput.current.value = '';
  };

  handleFileUploadRemove = index => {
    this.setState({
      files: this.state.files.filter((ele, idx) => idx !== index)
    });
  };

  handleFormReset = clearSelects => {
    if (clearSelects) {
      this.handleSelectReset(this.refSelectCategory);
      this.handleSelectReset(this.refSelectType);
    }

    this.setState(
      {
        emailValid: false,
        files: [],
        formErrors: { email: '' },
        formValid: false,
        formTouched: false,
        formDisabled: false,
      },
      () => this.props.resetFeedback()
    );
  };

  handleFocus = () => {
    this.setState({
      formTouched: false
    });
  };

  handleSelectReset = ref => {
    ref.current.state.selected = [];
  }

  handleSubmit = e => {
    e && e.preventDefault();
    this.setState({
      formDisabled: true
    });

    const {
      browser,
      category,
      description,
      email,
      library,
      type,
      version
    } = this.props;

    const {
      files
    } = this.state;

    let formData = new FormData();

    formData.append('form_id', 1);
    formData.append('1', email);
    formData.append('3', category);
    formData.append('4', type);
    formData.append('8', description);
    formData.append('file', files);
    if (category == 'code') {
      formData.append('5', library);
      formData.append('6', version);
      formData.append('7', browser);
    }

    this.props.submitFeedback(formData);
  };

  handleUpdateForm = (event, jsonName, ifSelector) => {
    const obj = {
      [jsonName]: ifSelector ? event[0].value : event.target.value
    };

    this.props.updateFeedback(obj);
  };

  validateEmail = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;

    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
    fieldValidationErrors.email = emailValid
      ? ''
      : `${value} is not a valid email address.`;

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid
      }
    );
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.emailValid && this.props.category && this.props.type
    });
  };

  renderFileListItems = () => {
    const { files } = this.state;
    const { formDisabled } = this.state;

    return files.map((itm, idx) => {
      let filetype = itm.type;
      let typeicon;
      if (filetype.indexOf('image') > -1) {
        typeicon = 'file-image_32';
      } else if (filetype.indexOf('video') > -1) {
        typeicon = 'file-video_32';
      } else if (filetype.indexOf('text') > -1) {
        typeicon = 'file-text_32';
      } else if (filetype.indexOf('pdf') > -1) {
        typeicon = 'file-pdf_32';
      } else {
        typeicon = 'file-text_32';
      }
      return (
        <ListItem key={idx} itemIndex={idx} label={itm.name} isReadOnly>
          <ListItemSection position="left">
            <Icon name={typeicon} />
          </ListItemSection>
          <ListItemSection position="center">{itm.name}</ListItemSection>
          <ListItemSection position="right">
            <Icon
              name="delete_16"
              disabled={formDisabled}
              onClick={() => this.handleFileUploadRemove(idx)}
            />
          </ListItemSection>
        </ListItem>
      );
    });
  };

  render() {
    const {
      browser,
      category,
      description,
      email,
      isError,
      isLoading,
      isSuccess,
      version,
    } = this.props;

    const {
      emailValid,
      files,
      formErrors,
      formDisabled,
      formTouched,
      formValid,
    } = this.state;

    const renderDoneView = () => {
      return (
        <div className="docs-content-area docs-content-feedback__done">
          <div className="docs-content-feedback__done--image" />
          <h3 className="docs-content-feedback__done--h3">
            Thank you for your feedback!
          </h3>
          <div>
            We will use it wisely.
          </div>
          <Button
            color="gray"
            className="docs-content-feedback__done--button"
            onClick={() => this.handleFormReset()}
          >
            Submit more feedback
          </Button>
        </div>
      );
    };

    const renderFormView = () => (
      <React.Fragment>
        <Media query="(min-width: 1025px)">
          {isDesktop => (
              <PageHeader
                title="Contact Us"
                textAlign="left"
                key='feedback-0'
                collapse={isDesktop}
              />
            )
          }
        </Media>
        <div className="docs-content-area docs-content-feedback">
          <form
            className="md-panel__form"
            name="feedback"
            onReset={() => this.handleFormReset(true)}
          >
            {/** Email Section */}
            <Label
              className="md-panel__title md-panel__form--required"
              htmlFor="email"
              label="Your email for follow-up"
            />
            <Input
              disabled={formDisabled}
              errorArr={
                formTouched && !emailValid && formErrors.email
                  ? [{ error: formErrors.email, type: 'error' }]
                  : []
              }
              htmlId="email"
              name="email"
              onChange={e => this.handleEmailInput(e)}
              onDoneEditing={this.handleBlur}
              onFocus={this.handleFocus}
              placeholder="Email Address"
              type="text"
              value={email}
            />
            {/** Category Section */}
            <Label
              className="md-panel__title md-panel__form--required"
              htmlFor="type"
              label="Is this a design issue or a code issue?"
            />
            <Select
              className="md-panel__form--select"
              defaultValue="Select"
              disabled={formDisabled}
              name="category"
              onSelect={e => this.handleUpdateForm(e, 'category', true)}
              ref={this.refSelectCategory}
            >
              <SelectOption label="Design" value="design" />
              <SelectOption label="Code" value="code" />
            </Select>
            {/** Type Section */}
            <Label
              className="md-panel__title md-panel__form--required"
              htmlFor="type"
              label="Type of issue/request"
            />
            <Select
              className="md-panel__form--select"
              defaultValue="Select"
              disabled={formDisabled}
              name="type"
              onSelect={e => this.handleUpdateForm(e, 'type', true)}
              ref={this.refSelectType}
            >
              <SelectOption label="New Pattern or Component" value="new" />
              <SelectOption label="New Feature or Improvement" value="improvement" />
              <SelectOption label="Bug/Issue" value="bug" />
            </Select>

            {category === 'code' && (
              <React.Fragment>
                {/** Library Section */}
                <Label
                  className="md-panel__title"
                  htmlFor="library"
                  label="Which library?"
                />
                <Select
                  className="md-panel__form--select"
                  defaultValue="Select"
                  disabled={formDisabled}
                  name="library"
                  onSelect={e => this.handleUpdateForm(e, 'library', true)}
                >
                  <SelectOption label="Core (HTML/CSS)" value="core" />
                  <SelectOption label="Icons" value="icons" />
                  <SelectOption label="React" value="react" />
                  <SelectOption label="Angular" value="angular" />
                  <SelectOption label="AngularJS (1.X)" value="angularjs" />
                </Select>
                {/** Version Section */}
                <Label
                  className="md-panel__title"
                  htmlFor="version"
                  label="What version?"
                />
                <Input
                  disabled={formDisabled}
                  htmlId="version"
                  name="version"
                  onChange={e => this.handleUpdateForm(e, 'version')}
                  placeholder="None"
                  type="text"
                  value={version}
                />
                {/** Browser Section */}
                <Label
                  className="md-panel__title"
                  htmlFor="browser"
                  label="What browser/OS?"
                />
                <Input
                  disabled={formDisabled}
                  htmlId="browser"
                  name="browser"
                  onChange={e => this.handleUpdateForm(e, 'browser')}
                  placeholder="None"
                  type="text"
                  value={browser}
                />
              </React.Fragment>
            )}
            {/** Description Section */}
            <Label
              className="md-panel__title"
              htmlFor="description"
              label="Description"
            />
            <textarea
              className="md-input-container md-input md-panel__form--textarea"
              disabled={formDisabled}
              id="description"
              name="description"
              onChange={e => this.handleUpdateForm(e, 'description')}
              placeholder="Describe the issue"
              rows="5"
              type="text"
              value={description}
            />
            {/** Files Section */}
            <input
              accept="image/*, video/*, application/pdf, text/plain"
              id="file"
              multiple
              name="file"
              onChange={this.handleFileUploadAdd}
              ref={this.refFileInput}
              style={{ display: 'none' }}
              type='file'
            />

            {files.length > 0
              ? (
                <React.Fragment>
                  <List className="md-panel__form--files">
                    {this.renderFileListItems()}
                  </List>
                  <Link onClick={this.browseFiles}>
                    <Icon name='icon-plus_16' />
                    &nbsp;
                    Add another file
                  </Link>
                </React.Fragment>
              ) : (
                <Button
                  color="gray"
                  disabled={formDisabled}
                  onClick={this.browseFiles}
                  size="28"
                >
                  Attach a file
                </Button>
              )
            }
            {/** CTA Section */}
            <div className="md-panel__form--buttons">
              <Button
                className="md-panel__form--buttons-margin"
                color="blue"
                disabled={!formValid || formDisabled}
                onClick={this.handleSubmit}
                type="submit"
              >
                {isLoading ? <Spinner /> : 'Submit'}
              </Button>
              <Button
                type="reset"
                color="gray"
                className="md-panel__form--buttons-margin"
                disabled={formDisabled}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
        {isError && (
          <AlertContainer orderNewest={false} />
        )}
      </React.Fragment>
    );

    return isSuccess ? renderDoneView() : renderFormView();
  }
}

const mapStateToProps = state => ({
  ...state.feedbackReducer
});

const mapDispatchToProps = {
  resetFeedback,
  submitFeedback,
  updateFeedback,
};

Feedback.propTypes = {
  browser: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  library: PropTypes.string,
  resetFeedback: PropTypes.func.isRequired,
  submitFeedback: PropTypes.func.isRequired,
  type: PropTypes.string,
  updateFeedback: PropTypes.func.isRequired,
  version: PropTypes.string,
};

Feedback.defaultProps = {
  browser: '',
  category: 'code',
  description: '',
  email: '',
  library: '',
  type: '',
  version:'',
};

Feedback.displayName = 'Feedback';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feedback);
