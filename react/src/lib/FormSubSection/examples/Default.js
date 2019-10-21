import React from 'react';
import { FormSubSection, Input } from '@momentum-ui/react';

export default function FormSubSectionDefault() {
  return (
    <div className="row">
      <br />
      <FormSubSection
        label="Subsection Label"
        description="Subsection Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet hendrerit turpis, in accumsan quam."
      >
        <Input
          htmlId="testMe2"
          value="testMe2"
          name="testMe2"
          label="First Input"
          disabled
          placeholder="Disabled Input"
          onChange={() => {}}
          helpText="Field Must be Disabled"
          messageArr={[]}
        />
      </FormSubSection>
    </div>
  );
}
