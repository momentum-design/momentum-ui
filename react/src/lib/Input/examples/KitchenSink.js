import React from 'react';
import { Icon, Input, InputSearch } from '@momentum-ui/react';

export default class InputKitchenSink extends React.PureComponent {
  render() {
    const inputs = value => (
      <React.Fragment>
        <Input
          name={`inputSuccess${value}`}
          label="Success"
          htmlId={`inputSuccess${value}`}
          containerSize="small-12"
          value="Error Text"
          messageArr={[
            {
              message: `This is where the success message would be.
              This is where the success message would be.
              This is where the success message would be.
              This is where the success message would be.
              This is where the success message would be.`,
              type: 'success',
            },
          ]}
        />
        <Input
          name={`inputError${value}`}
          label="Error"
          htmlId={`inputError${value}`}
          containerSize="small-12"
          value="Error Text"
          messageArr={[{ message: 'This is where the error message would be.', type: 'error' }]}
        />
        <Input
          name={`inputWarning${value}`}
          label="Warning"
          htmlId={`inputWarning${value}`}
          containerSize="small-12"
          value="Warning Text"
          messageArr={[
            {
              message: 'This is where the warning message would be.',
              type: 'warning',
            },
          ]}
        />
        <Input
          name={`inputDoubleWarning${value}`}
          label="Double Warning"
          htmlId={`inputDoubleWarning${value}`}
          containerSize="small-12"
          value="Double Warning Text"
          messageArr={[
            {
              message: 'This is where the warning message would be.',
              type: 'warning',
            },
            {
              message: 'This is where the warning message would be.',
              type: 'warning',
            },
          ]}
        />
        <Input
          name={`default${value}`}
          label="Default"
          htmlId={`default${value}`}
          containerSize="small-12"
        />
        <Input
          name={`default${value}`}
          label="Default"
          htmlId={`default${value}`}
          containerSize="small-12"
          shape="pill"
        />
        <Input
          name={`Multiline${value}`}
          label="Multiline"
          htmlId={`Multiline${value}`}
          containerSize="small-12"
          multiline
        />
        <Input
          name={`nested${value}`}
          label="Nested 1"
          htmlId={`nested${value}`}
          containerSize="small-12"
          nestedLevel={1}
        />
        <Input
          name={`nested2${value}`}
          label="Nested 2"
          htmlId={`nested2${value}`}
          containerSize="small-12"
          nestedLevel={2}
        />
        <Input
          name={`nested3${value}`}
          label="Nested 3"
          htmlId={`nested3${value}`}
          containerSize="small-12"
          nestedLevel={3}
        />
        <Input
          name={`readOnly${value}`}
          label="Read Only"
          htmlId={`readOnly${value}`}
          containerSize="small-12"
          value="With Placeholder"
          readOnly
        />
        <Input
          name={`disabled${value}`}
          label="Disabled"
          htmlId={`disabled${value}`}
          containerSize="small-12"
          placeholder="With Placeholder"
          disabled
        />
        <Input
          name={`disabledWithValue${value}`}
          label="Disabled Value"
          htmlId={`disabledWithValue${value}`}
          containerSize="small-12"
          value="With Value"
          disabled
        />
        <Input
          name={`disabledro${value}`}
          label="Disabled Read Only"
          htmlId={`disabledro${value}`}
          containerSize="small-12"
          value="Disabled ReadOnly Input"
          disabled
          readOnly
        />
        <Input
          name={`placeholder${value}`}
          label="Placeholder"
          htmlId={`placeholder${value}`}
          containerSize="small-12"
          placeholder="With Placeholder"
        />
        <Input
          name={`clearInput${value}`}
          label="Clear"
          htmlId={`clearInput${value}`}
          containerSize="small-12"
          placeholder="Placeholder Text"
          clear
        />
        <Input
          name={`clearWithValueInput${value}`}
          label="Clear with Value"
          htmlId={`clearWithValueInput${value}`}
          containerSize="small-12"
          value="Clear"
          clear
        />
        <Input
          name={`rightIcon${value}`}
          label="Right Icon"
          htmlId={`rightIcon${value}`}
          containerSize="small-12"
          placeholder="Placeholder Text"
          inputAfter={<Icon name="accessibility_16" />}
        />
        <Input
          name={`leftIcon${value}`}
          label="Left Icon"
          htmlId={`leftIcon${value}`}
          containerSize="small-12"
          placeholder="Placeholder Text"
          inputBefore={<Icon name="accessibility_16" />}
        />
        <Input
          name={`leftIconDisabled${value}`}
          label="Left Icon Disabled"
          htmlId={`leftIconDisabled${value}`}
          containerSize="small-12"
          placeholder="Placeholder Text"
          inputBefore={<Icon name="accessibility_16" />}
          disabled
        />
        <Input
          name={`clearLeftIcon${value}`}
          label="Clear and Left Icon"
          htmlId={`clearLeftIcon${value}`}
          containerSize="small-12"
          placeholder="Placeholder Text"
          inputBefore={<Icon name="accessibility_16" />}
          clear
        />
        <Input
          name={`help${value}`}
          label="Help Text"
          htmlId={`help${value}`}
          containerSize="small-12"
          placeholder="With Placeholder"
          helpText="Help Text"
        />
        <Input
          name={`longHelp${value}`}
          label="Long Help Text"
          htmlId={`longHelp${value}`}
          containerSize="small-12"
          placeholder="With Placeholder"
          helpText={`
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam et quam id ipsum ultrices gravida.
            Donec tempor mattis erat, at suscipit ligula.
            Nullam nec dui laoreet, tempor justo sed, consequat sapien.
            Suspendisse eget odio id eros feugiat sollicitudin id vel eros.
            Nunc mattis ac ligula sit amet consequat.
            Etiam semper felis blandit enim dignissim, a semper diam viverra.
            Praesent quis vehicula libero. Curabitur ut semper lorem, vel iaculis ex.
          `}
        />
        <Input
          name={`inputSecondaryLabel${value}`}
          label="Secondary Label"
          htmlId={`inputSecondaryLabel${value}`}
          containerSize="small-12"
          secondaryLabel="Secondary Label"
        />
        <Input
          name={`inputDisabledSecondaryLabel${value}`}
          label="Disabled Secondary Label"
          htmlId={`inputDisabledSecondaryLabel${value}`}
          containerSize="small-12"
          secondaryLabel="Secondary Label"
          disabled
        />
        <Input
          name={`inputSecondaryHelpLabel${value}`}
          label="Secondary/Help Label"
          htmlId={`inputSecondaryHelpLabel${value}`}
          containerSize="small-12"
          secondaryLabel="Secondary Label"
          helpText="Help Text"
        />
        <Input
          name={`inputSecondaryHelpLabelDisabled${value}`}
          label="Disabled Secondary/Help Label"
          htmlId={`inputSecondaryHelpLabelDisabled${value}`}
          containerSize="small-12"
          secondaryLabel="Secondary Label"
          helpText="Help Text"
          disabled
        />
        <Input
          name={`Filldefault${value}`}
          label="Filled"
          htmlId={`Filldefault${value}`}
          isFilled
          containerSize="small-12"
        />
        <Input
          name={`FillreadOnly${value}`}
          label="Filled Read Only"
          htmlId={`FillreadOnly${value}`}
          isFilled
          containerSize="small-12"
          value="With Placeholder"
          readOnly
        />
        <Input
          name={`Filldisabled${value}`}
          label="Filled Disabled"
          htmlId={`Filldisabled${value}`}
          isFilled
          containerSize="small-12"
          placeholder="With Placeholder"
          disabled
        />
        <Input
          name={`Filldisabledro${value}`}
          label="Filled Disabled Read Only"
          htmlId={`Filldisabledro${value}`}
          containerSize="small-12"
          isFilled
          value="Disabled ReadOnly Input"
          disabled
          readOnly
        />
        <Input
          name={`Fillplaceholder${value}`}
          label="Filled Placeholder"
          htmlId={`Fillplaceholder${value}`}
          isFilled
          containerSize="small-12"
          placeholder="With Placeholder"
        />
        <Input
          name={`FillclearInput${value}`}
          label="Filled Clear"
          htmlId={`FillclearInput${value}`}
          isFilled
          containerSize="small-12"
          placeholder="Placeholder Text"
          clear
        />
        <Input
          name={`filledClearInput${value}`}
          label="Filled Clear with Value"
          htmlId={`filledClearInput${value}`}
          isFilled
          containerSize="small-12"
          value="Clear"
          clear
        />
        <Input
          name={`FillrightIcon${value}`}
          label="Filled Right Icon"
          htmlId={`FillrightIcon${value}`}
          isFilled
          containerSize="small-12"
          placeholder="Placeholder Text"
          inputAfter={<Icon name="accessibility_16" />}
        />
        <Input
          name={`FillleftIcon${value}`}
          label="Filled Left Icon"
          htmlId={`FillleftIcon${value}`}
          isFilled
          containerSize="small-12"
          placeholder="Placeholder Text"
          inputBefore={<Icon name="accessibility_16" />}
        />
        <Input
          name={`FillclearLeftIcon${value}`}
          label="Filled Clear and Left Icon"
          htmlId={`FillclearLeftIcon${value}`}
          isFilled
          containerSize="small-12"
          placeholder="Placeholder Text"
          inputBefore={<Icon name="accessibility_16" />}
          clear
        />
        <Input
          name={`Fillhelp${value}`}
          label="Filled Help Text"
          htmlId={`Fillhelp${value}`}
          isFilled
          containerSize="small-12"
          placeholder="With Placeholder"
          helpText="Help Text"
        />
        <Input
          name={`FillinputSecondaryLabel${value}`}
          label="Filled Secondary Label"
          htmlId={`FillinputSecondaryLabel${value}`}
          isFilled
          containerSize="small-12"
          secondaryLabel="Secondary Label"
        />
        <Input
          name={`FillinputSecondaryHelpLabel${value}`}
          label="Filled Secondary/Help Label"
          htmlId={`FillinputSecondaryHelpLabel${value}`}
          isFilled
          containerSize="small-12"
          secondaryLabel="Secondary Label"
          helpText="Help Text"
        />
        <InputSearch
          name={`defaultInputSearch${value}`}
          htmlId={`defaultInputSearch${value}`}
          containerSize="small-12"
          label="Default Search"
        />
        <InputSearch
          name={`loadingInputSearch${value}`}
          htmlId={`loadingInputSearch${value}`}
          containerSize="small-12"
          label="Loading Search"
          isLoading
        />
        <InputSearch
          name={`searchclear${value}`}
          htmlId={`searchclear${value}`}
          containerSize="small-12"
          label="Search with Clear"
          clear
        />
        <InputSearch
          name={`searchpill${value}`}
          htmlId={`searchpill${value}`}
          containerSize="small-12"
          shape="pill"
          clear
        />
        <InputSearch
          name={`defaultInputSearchFilled${value}`}
          htmlId={`defaultInputSearchFilled${value}`}
          containerSize="small-12"
          label="Search Filled"
          isFilled
        />
        <InputSearch
          name={`filledLoadingInputSearch${value}`}
          htmlId={`filledLoadingInputSearch${value}`}
          containerSize="small-12"
          label="Loading Filled Search"
          isFilled
          isLoading
        />
        <InputSearch
          name={`searchclearFilled${value}`}
          htmlId={`searchclearFilled${value}`}
          containerSize="small-12"
          label="Search with Clear Filled"
          clear
          isFilled
        />
        <InputSearch
          name={`searchpillFilled${value}`}
          htmlId={`searchpillFilled${value}`}
          containerSize="small-12"
          label="Search Pill Filled"
          shape="pill"
          clear
          isFilled
        />
      </React.Fragment>
    );
    return (
      <>
        <div className="row" style={{ padding: '1rem' }}>
          {inputs(1)}
        </div>
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
