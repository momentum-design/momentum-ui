import React from 'react';
import PropTypes from 'prop-types';
import FormInfo from '@collab-ui/react/FormInfo';
import FormContent from '@collab-ui/react/FormContent';

/**
 * @category controls
 * @component form
 * @variations collab-ui-react
 **/

const FormSection = props => {
  const { title, description, children } = props;

  return (
    <div className="cui-form__section">
      <FormInfo title={title} description={description} />
      <FormContent>{children}</FormContent>
    </div>
  );
};

FormSection.propTypes = {
  /**
   * optional title prop type
   */
  title: PropTypes.string.isRequired,
  /**
   * optional description prop type
   */
  description: PropTypes.string,
  /**
   * optional children prop type
   */
  children: PropTypes.node,
};

FormSection.defaultProps = {
  description: '',
  children: null,
};

FormSection.displayName = 'FormSection';

export default FormSection;

/**
* @name Form Section
* @description Forms are useful.
*
* @category controls
* @component form
* @section Form Section
*
* @js

import {
  FormSection,
  Input
} from '@collab-ui/react';

export default function Default() {
    return (
      <div className='row'>
        <br />
        <FormSection
          title='Section Title'
          description={`Section Description. Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at. Vestibulum nec erat ut mi sollicitudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet eros id lacus vestibulum vestibulum. Suspendisse fermentum sem sagittis ante venenatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliquam sapien convallis eu. Nulla ut turpis in diam dapibus consequat.`}
        >
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
        </FormSection>
      </div>
    );
  }

**/
