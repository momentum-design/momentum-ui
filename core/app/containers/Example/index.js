import React from 'react';

class Example extends React.PureComponent {
  render () {
    const { sections } = this.props.item;
    const createSections = sections.map((section, idx) => {
      const { name, variations } = section;
      const example = variations && variations.core ? variations.core.example : ''
      return (
        <section className="kitchen-sink__section row" key={`${name}-${idx}`}>
          <h3>{name}</h3>
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
