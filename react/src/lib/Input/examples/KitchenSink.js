import React from 'react';
import { Input, SearchInput } from '@momentum-ui/react';

export default class InputKitchenSink extends React.PureComponent {
  render() {
    const inputs = value => (
      <>
        <Input
          name={`inputSuccess${value}`}
          label="Success"
          htmlId={`inputSuccess${value}`}
          inputSize="small-12"
          value="Success Text"
          errorArr={[{ error: 'This is where the success message would be.', type: 'success' }]}
        />
        <Input
          name={`inputError${value}`}
          label="Error"
          htmlId={`inputError${value}`}
          inputSize="small-12"
          value="Error Text"
          errorArr={[{ error: 'This is where the error message would be.', type: 'error' }]}
        />
        <Input
          name={`inputWarning${value}`}
          label="Warning"
          htmlId={`inputWarning${value}`}
          inputSize="small-12"
          value="Warning Text"
          errorArr={[
            {
              error: 'This is where the warning message would be.',
              type: 'warning',
            },
          ]}
        />
        <Input
          name={`inputDoubleWarning${value}`}
          label="Double Warning"
          htmlId={`inputDoubleWarning${value}`}
          inputSize="small-12"
          value="Double Warning Text"
          errorArr={[
            {
              error: 'This is where the warning message would be.',
              type: 'warning',
            },
            {
              error: 'This is where the warning message would be.',
              type: 'warning',
            },
          ]}
        />
        <Input
          name={`default${value}`}
          label="Default"
          htmlId={`default${value}`}
          inputSize="small-12"
        />
        <Input
          name={`default${value}`}
          label="Pill"
          htmlId={`default${value}`}
          inputSize="small-12"
        />
        <Input
          name={`Multiline${value}`}
          label="Multiline"
          htmlId={`Multiline${value}`}
          inputSize="small-12"
          multiline
        />
        <div className="row">
          <Input
            name={`nested${value}`}
            label="Nested 1"
            htmlId={`nested${value}`}
            inputSize="small-6"
            nestedLevel={1}
          />
        </div>
        <div className="row">
          <Input
            name={`nested2${value}`}
            label="Nested 2"
            htmlId={`nested2${value}`}
            inputSize="small-6"
            nestedLevel={2}
          />
        </div>
        <div className="row">
          <Input
            name={`nested3${value}`}
            label="Nested 3"
            htmlId={`nested3${value}`}
            inputSize="small-6"
            nestedLevel={3}
          />
        </div>
        <Input
          name={`readOnly${value}`}
          label="Read Only"
          htmlId={`readOnly${value}`}
          inputSize="small-12"
          value="With Placeholder"
          readOnly
        />
        <Input
          name={`disabled${value}`}
          label="Disabled"
          htmlId={`disabled${value}`}
          inputSize="small-12"
          placeholder="With Placeholder"
          disabled
        />
        <Input
          name={`disabledWithValue${value}`}
          label="Disabled Value"
          htmlId={`disabledWithValue${value}`}
          inputSize="small-12"
          value="With Value"
          disabled
        />
        <Input
          name={`disabledro${value}`}
          label="Disabled Read Only"
          htmlId={`disabledro${value}`}
          inputSize="small-12"
          value="Disabled ReadOnly Input"
          disabled
          readOnly
        />
        <Input
          name={`placeholder${value}`}
          label="Placeholder"
          htmlId={`placeholder${value}`}
          inputSize="small-12"
          placeholder="With Placeholder"
        />
        <Input
          name={`clearInput${value}`}
          label="Clear"
          htmlId={`clearInput${value}`}
          inputSize="small-12"
          placeholder="Placeholder Text"
          value="Press or click the clear icon to clear this input"
          clear
        />
        <Input
          name={`rightIcon${value}`}
          label="Right Icon"
          htmlId={`rightIcon${value}`}
          inputSize="small-12"
          placeholder="Placeholder Text"
        />
        <Input
          name={`leftIcon${value}`}
          label="Left Icon"
          htmlId={`leftIcon${value}`}
          inputSize="small-12"
          placeholder="Placeholder Text"
        />
        <Input
          name={`leftIconDisabled${value}`}
          label="Left Icon Disabled"
          htmlId={`leftIconDisabled${value}`}
          inputSize="small-12"
          placeholder="Placeholder Text"
          disabled
        />
        <Input
          name={`clearLeftIcon${value}`}
          label="Clear and Left Icon"
          htmlId={`clearLeftIcon${value}`}
          inputSize="small-12"
          placeholder="Placeholder Text"
          clear
          value="Press or click the clear icon to clear this input"
        />
        <Input
          name={`help${value}`}
          label="Help Text"
          htmlId={`help${value}`}
          inputSize="small-12"
          placeholder="With Placeholder"
          inputHelpText="Help Text"
        />
        <Input
          name={`inputSecondaryLabel${value}`}
          label="Secondary Label"
          htmlId={`inputSecondaryLabel${value}`}
          inputSize="small-12"
          secondaryLabel="Secondary Label"
        />
        <Input
          name={`inputDisabledSecondaryLabel${value}`}
          label="Disabled Secondary Label"
          htmlId={`inputDisabledSecondaryLabel${value}`}
          inputSize="small-12"
          secondaryLabel="Secondary Label"
          disabled
        />
        <Input
          name={`inputSecondaryHelpLabel${value}`}
          label="Secondary/Help Label"
          htmlId={`inputSecondaryHelpLabel${value}`}
          inputSize="small-12"
          secondaryLabel="Secondary Label"
          inputHelpText="Help Text"
        />
        <Input
          name={`inputSecondaryHelpLabelDisabled${value}`}
          label="Disabled Secondary/Help Label"
          htmlId={`inputSecondaryHelpLabelDisabled${value}`}
          inputSize="small-12"
          secondaryLabel="Secondary Label"
          inputHelpText="Help Text"
          disabled
        />

        <Input
          name={`FilledInputSuccess${value}`}
          label="Filled Success"
          htmlId={`filledInputSuccess${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          value="Success Text"
          errorArr={[{ error: 'This is where the success message would be.', type: 'success' }]}
        />
        <Input
          name={`FilledInputError${value}`}
          label="Filled Error"
          htmlId={`filledInputError${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          value="Error Text"
          errorArr={[{ error: 'This is where the error message would be.', type: 'error' }]}
        />
        <Input
          name={`FilledInputWarning${value}`}
          label="Filled Warning"
          htmlId={`filledInputWarning${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          value="Warning Text"
          errorArr={[
            {
              error: 'This is where the warning message would be.',
              type: 'warning',
            },
          ]}
        />
        <Input
          name={`FilledInputDoubleWarning${value}`}
          label="Filled Double Warning"
          htmlId={`filledInputDoubleWarning${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          value="Double Warning Text"
          errorArr={[
            {
              error: 'This is where the warning message would be.',
              type: 'warning',
            },
            {
              error: 'This is where the warning message would be.',
              type: 'warning',
            },
          ]}
        />
        <Input
          name={`FilledIefault${value}`}
          label="Filled Default"
          htmlId={`filledIefault${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
        />
        <Input
          name={`FilledIefault${value}`}
          label="Filled Pill"
          htmlId={`filledIefault${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
        />
        <Input
          name={`FilledIultiline${value}`}
          label="Filled Multiline"
          htmlId={`filledIultiline${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          multiline
        />
        <div className="row">
          <Input
            name={`FilledIested${value}`}
            label="Filled Nested 1"
            htmlId={`filledIested${value}`}
            inputClassName="md-input--filled"
            inputSize="small-6"
            nestedLevel={1}
          />
        </div>
        <div className="row">
          <Input
            name={`FilledIested2${value}`}
            label="Filled Nested 2"
            htmlId={`filledIested2${value}`}
            inputClassName="md-input--filled"
            inputSize="small-6"
            nestedLevel={2}
          />
        </div>
        <div className="row">
          <Input
            name={`FilledIested3${value}`}
            label="Filled Nested 3"
            htmlId={`filledIested3${value}`}
            inputClassName="md-input--filled"
            inputSize="small-6"
            nestedLevel={3}
          />
        </div>
        <Input
          name={`FilledIeadOnly${value}`}
          label="Filled Read Only"
          htmlId={`filledIeadOnly${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          value="With Placeholder"
          readOnly
        />
        <Input
          name={`FilledIisabled${value}`}
          label="Filled Disabled"
          htmlId={`filledIisabled${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          placeholder="With Placeholder"
          disabled
        />
        <Input
          name={`FilledIisabledWithValue${value}`}
          label="Filled Disabled Value"
          htmlId={`filledIisabledWithValue${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          value="With Value"
          disabled
        />
        <Input
          name={`FilledIisabledro${value}`}
          label="Filled Disabled Read Only"
          htmlId={`filledIisabledro${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          value="Disabled ReadOnly Input"
          disabled
          readOnly
        />
        <Input
          name={`FilledIlaceholder${value}`}
          label="Filled Placeholder"
          htmlId={`filledIlaceholder${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          placeholder="With Placeholder"
        />
        <Input
          name={`FilledIlearInput${value}`}
          label="Filled Clear"
          htmlId={`filledIlearInput${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          placeholder="Placeholder Text"
          value="Press or click the clear icon to clear this input"
          clear
        />
        <Input
          name={`FilledIightIcon${value}`}
          label="Filled Right Icon"
          htmlId={`filledIightIcon${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          placeholder="Placeholder Text"
        />
        <Input
          name={`FilledIeftIcon${value}`}
          label="Filled Left Icon"
          htmlId={`filledIeftIcon${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          placeholder="Placeholder Text"
        />
        <Input
          name={`FilledIeftIconDisabled${value}`}
          label="Filled Left Icon Disabled"
          htmlId={`filledIeftIconDisabled${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          placeholder="Placeholder Text"
          disabled
        />
        <Input
          name={`FilledIlearLeftIcon${value}`}
          label="Filled Clear and Left Icon"
          htmlId={`filledIlearLeftIcon${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          placeholder="Placeholder Text"
          clear
          value="Press or click the clear icon to clear this input"
        />
        <Input
          name={`FilledIelp${value}`}
          label="Filled Help Text"
          htmlId={`filledIelp${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          placeholder="With Placeholder"
          inputHelpText="Help Text"
        />
        <Input
          name={`FilledInputSecondaryLabel${value}`}
          label="Filled Secondary Label"
          htmlId={`filledInputSecondaryLabel${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          secondaryLabel="Secondary Label"
        />
        <Input
          name={`FilledInputDisabledSecondaryLabel${value}`}
          label="Filled Disabled Secondary Label"
          htmlId={`filledInputDisabledSecondaryLabel${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          secondaryLabel="Secondary Label"
          disabled
        />
        <Input
          name={`FilledInputSecondaryHelpLabel${value}`}
          label="Filled Secondary/Help Label"
          htmlId={`filledInputSecondaryHelpLabel${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          secondaryLabel="Secondary Label"
          inputHelpText="Help Text"
        />
        <Input
          name={`FilledInputSecondaryHelpLabelDisabled${value}`}
          label="Filled Disabled Secondary/Help Label"
          htmlId={`filledInputSecondaryHelpLabelDisabled${value}`}
          inputClassName="md-input--filled"
          inputSize="small-12"
          secondaryLabel="Secondary Label"
          inputHelpText="Help Text"
          disabled
        />

        <SearchInput
          name={`defaultSearchInput${value}`}
          htmlId={`defaultSearchInput${value}`}
          inputSize="small-12"
          label="Default Search"
        />
        <SearchInput
          name={`loadingSearchInput${value}`}
          htmlId={`loadingSearchInput${value}`}
          inputSize="small-12"
          label="Loading Search"
        />
        <SearchInput
          name={`searchclear${value}`}
          htmlId={`searchclear${value}`}
          inputSize="small-12"
          label="Search with Clear"
          clear
        />
        <SearchInput
          name={`searchpill${value}`}
          htmlId={`searchpill${value}`}
          inputSize="small-12"
          type="pill"
          clear
        />
        <SearchInput
          name={`defaultSearchInputFilled${value}`}
          htmlId={`defaultSearchInputFilled${value}`}
          inputSize="small-12"
          label="Search Filled"
          inputClassName="md-input--filled"
        />
        <SearchInput
          name={`filledLoadingSearchInput${value}`}
          htmlId={`filledLoadingSearchInput${value}`}
          inputSize="small-12"
          label="Loading Filled Search"
          inputClassName="md-input--filled"
        />
        <SearchInput
          name={`searchclearFilled${value}`}
          htmlId={`searchclearFilled${value}`}
          inputSize="small-12"
          label="Search with Clear Filled"
          clear
          inputClassName="md-input--filled"
        />
        <SearchInput
          name={`searchpillFilled${value}`}
          htmlId={`searchpillFilled${value}`}
          inputSize="small-12"
          label="Search Pill Filled"
          type="pill"
          clear
          inputClassName="md-input--filled"
        />
      </>
    );
    return (
      <>
        <div className="row" style={{ padding: '1rem' }}>{inputs(1)}</div>
        <div className="md--dark row" style={{ backgroundColor: 'black', padding: '1rem' }}>
          {inputs(2)}
        </div>
        <div className="md--contrast">
          <div className="row" style={{ padding: '1rem' }}>
            {inputs(3)}
          </div>
          <div className="md--dark row" style={{ backgroundColor: 'black', padding: '1rem' }}>
            {inputs(4)}
          </div>
        </div>
      </>
    );
  }
}
