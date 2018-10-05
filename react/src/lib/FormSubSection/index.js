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
  /** @prop Children node to render inside FormSubSection | null */
  children: PropTypes.node,
  /** @prop Optional FormSubSection description text | '' */
  description: PropTypes.string,
  /** @prop Optional FormSubSection label text | '' */
  label: PropTypes.string,
};

FormSubSection.defaultProps = {
  children: null,
  description: '',
  label: ''
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
