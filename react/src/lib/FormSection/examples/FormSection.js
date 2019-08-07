import React from 'react';
import {
  FormSection,
  Input
} from '@momentum-ui/react';

export default function FormSectionDefault() {
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
            messageArr={[]}
          />
        </FormSection>
      </div>
    );
  }
