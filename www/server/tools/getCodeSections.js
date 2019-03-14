const fetch = require('node-fetch');

fetch('http://54.244.26.136/wp-json/wp/v2/pages?per_page=100')
  .then(res => res.json())
  .then(json => {
    const sections = json
      .filter(component => {
        return component.acf && component.acf.codeSections;
      })
      .map(component => {
        let compSections = {};
        compSections.name = component.slug;
        compSections.sections = component.acf.codeSections;
        console.log(compSections); // eslint-disable-line no-console
        return compSections;
      });
    console.log(sections); // eslint-disable-line no-console
  });
