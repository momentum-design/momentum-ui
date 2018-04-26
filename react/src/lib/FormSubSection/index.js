import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category controls
 * @component form
 * @variations collab-ui-react
 **/

const FormSubSection = props => {
  const { label, children, description } = props;

  return (
    <div className="sub-section">
      {label && <h5 className="sub-section__label">{label}</h5>}
      {description && <p className="sub-section__description">{description}</p>}
      {children}
    </div>
  );
};

FormSubSection.propTypes = {
  /**
   * optional label prop type
   */
  label: PropTypes.string,
  /**
   * optional description prop type
   */
  description: PropTypes.string,
  /**
   * optional children prop type
   */
  children: PropTypes.node,
};

FormSubSection.defaultProps = {
  label: '',
  description: '',
  children: null,
};

FormSubSection.displayName = 'FormSubSection';

export default FormSubSection;

/**
* @name Form Sub Section
* @description Forms are useful.
*
* @category controls
* @component form
* @section Form Sub Section
*
* @js

import {
  FormSubSection,
  Input
} from '@collab-ui/react';

export default function Default() {
    return (
      <div className='row'>
        <br />
        <FormSubSection
          label='Subsection Label'
          description='Subsection Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet hendrerit turpis, in accumsan quam.'
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
        </FormSubSection>
      </div>
    );
  }

**/
