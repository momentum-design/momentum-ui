import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category controls
 * @component form
 * @variations collab-ui-react
 */

class Form extends React.PureComponent {

  render() {
    const { name, children, ...props } = this.props;

    return (
      <form
        name={name}
        className="cui-form"
        {...props}
      >
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  /** @prop Children node to render inside Form | null */
  children: PropTypes.node,
  /** @prop Form name */
  name: PropTypes.string.isRequired,

};

Form.defaultProps = {
  children: null,
};

Form.displayName = 'Form';

export default Form;

/**
* @name Form
* @description Forms are useful.
*
* @category controls
* @component form
* @section default
*
* @js

import {
  Button,
  Form,
  FormSection,
  FormSubSection,
  Input,
  InputHelper,
  Radio,
  RadioGroup,
} from '@collab-ui/react';

export default function FormDefault() {
    return (
      <div className='row'>
        <br />
        <Form name='offForm'>
          <FormSection
            title='Section Title'
            description={`Section Description. Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at. Vestibulum nec erat ut mi sollicitudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet eros id lacus vestibulum vestibulum. Suspendisse fermentum sem sagittis ante venenatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliquam sapien convallis eu. Nulla ut turpis in diam dapibus consequat.`}
          >
            <FormSubSection
              label='Subsection Label'
              description='Subsection Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet hendrerit turpis, in accumsan quam.'
            >
              <RadioGroup name='radioGroup2'>
                <Radio
                  value='me2'
                  label='me'
                  htmlId='testRadio1.1'
                  onChange={()=>{}}
                />
                <Radio
                  value='you2'
                  label='you'
                  htmlId='testRadio2.1'
                  onChange={()=>{}}
                />
                <Radio
                  value='us2'
                  label='us'
                  htmlId='testRadio3.1'
                  onChange={()=>{}}
                >
                  <InputHelper message={'I\'m here to help'} />
                </Radio>
              </RadioGroup>
              <Input
                htmlId='testMe2'
                value='testMe2'
                name='testMe2'
                label='First Input'
                disabled
                placeholder='Disabled Input'
                onChange={() => {}}
                inputHelpText='Field Must be Disabled'
                errorArr={[]}
              />
            </FormSubSection>
            <FormSubSection
              label='Subsection Label'
              description='Another One.'
            >
              <Button
                ariaLabel='Click to Do Nothing'
                className='btn--primary'
                onClick={() => {}}
              >
                Click to Do Nothing
              </Button>
            </FormSubSection>
          </FormSection>
        </Form>
      </div>
    );
  }

**/
