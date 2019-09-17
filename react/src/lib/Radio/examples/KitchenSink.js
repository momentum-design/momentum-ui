import React from 'react';
import { InputHelper, Radio, RadioGroup } from '@momentum-ui/react';

export default class RadioKitchenSink extends React.PureComponent {
  render() {
    const radios = value => (
      <>
        <RadioGroup name={`radioGroup${value}`} values={['one']}>
          <Radio
            name={`radioGroup${value}`}
            value="zero"
            key="zero"
            label="Radio Example"
            htmlId={`radio${value}`}
          />
          <Radio
            name={`radioGroup${value}`}
            value="one"
            key="one"
            label="Radio Checked Example"
            htmlId={`radioChecked${value}`}
          />
          <Radio
            name={`radioGroup${value}`}
            value="two"
            key="two"
            label="Radio Example with help text"
            htmlId={`radioHelp${value}`}
          >
            <InputHelper message="This is help text for the Radio component" />
          </Radio>
        </RadioGroup>

        <RadioGroup name={`radioGroupDisabled${value}`} values={['one']}>
          <Radio
            name={`radioGroupDisabled${value}`}
            value="zero"
            key="zero"
            label="Disabled Radio Example"
            htmlId={`radioDisabled${value}`}
            disabled
          />
          <Radio
            name={`radioGroupDisabled${value}`}
            value="one"
            key="one"
            label="Disabled Radio Checked Example"
            htmlId={`radioDisabledChecked${value}`}
            disabled
          />
          <Radio
            name={`radioGroupDisabled${value}`}
            value="two"
            key="two"
            label="Disabled Radio Example with help text"
            htmlId={`radioDisabledHelp${value}`}
            disabled
          >
            <InputHelper message="This is help text for the Radio component" />
          </Radio>
        </RadioGroup>

        <RadioGroup name={`radioGroupReadonly${value}`} values={['one']}>
          <Radio
            name={`radioGroupReadonly${value}`}
            value="zero"
            key="zero"
            label="Readonly Radio Example"
            htmlId={`radioReadonly${value}`}
            readonly
          />
          <Radio
            name={`radioGroupReadonly${value}`}
            value="one"
            key="one"
            label="Readonly Radio Checked Example"
            htmlId={`radioReadonlyChecked${value}`}
            readonly
          />
          <Radio
            name={`radioGroupReadonly${value}`}
            value="two"
            key="two"
            label="Readonly Radio Example with help text"
            htmlId={`radioReadonlyHelp${value}`}
            readonly
          >
            <InputHelper message="This is help text for the Radio component" />
          </Radio>
        </RadioGroup>

        <RadioGroup name={`radioGroupNested${value}`} values={['one']}>
          <Radio
            name={`radioGroupNested${value}`}
            value="zero"
            key="zero"
            label="Nested Radio Example"
            htmlId={`radioNested${value}`}
            nestedLevel={0}
          />
          <Radio
            name={`radioGroupNested${value}`}
            value="one"
            key="one"
            label="Nested Radio Checked Example"
            htmlId={`radioNestedChecked${value}`}
            nestedLevel={1}
          />
          <Radio
            name={`radioGroupNested${value}`}
            value="two"
            key="two"
            label="Nested Radio Example with help text"
            htmlId={`radioNestedHelp${value}`}
            nestedLevel={2}
          >
            <InputHelper message="This is help text for the Radio component" />
          </Radio>
          <Radio
            name={`radioGroupNested${value}`}
            value="three"
            key="three"
            label="Nested Radio Example with help text"
            htmlId={`radioNestedHelp2${value}`}
            nestedLevel={3}
          >
            <InputHelper message="This is help text for the Radio component" />
          </Radio>
        </RadioGroup>
      </>
    );
    return (
      <>
        <div className="row" style={{ padding: '1rem' }}>
          {radios(1)}
        </div>
        <div className="md--dark row" style={{ backgroundColor: 'black', padding: '1rem' }}>
          {radios(2)}
        </div>
        <div className="md--contrast">
          <div className="row" style={{ padding: '1rem' }}>
            {radios(3)}
          </div>
          <div className="md--dark row" style={{ backgroundColor: 'black', padding: '1rem' }}>
            {radios(4)}
          </div>
        </div>
      </>
    );
  }
}
