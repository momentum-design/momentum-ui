import React from 'react';

class Example extends React.PureComponent {
  render () {
    const {name, sections} = this.props.item;
    const createSections = sections.map((section, idx) => {
      const { displayName, variations } = section;
      const example = variations && variations.core ? variations.core.example : ''
      return (
        <section className="kitchen-sink__section row" key={`${displayName}-${idx}`}>
          <h3>{displayName}</h3>
          <div dangerouslySetInnerHTML={{__html: example}} />
        </section>
      );
    });
    return (
      <React.Fragment>
        {createSections}
      </React.Fragment>
    );
  }
}

export default Example;
