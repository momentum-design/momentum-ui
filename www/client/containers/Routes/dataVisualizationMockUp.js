const chartsExamples = require('../../generated/markdown/chartsList');
let PK = 1401;
let OID = 10000;
let ID = 20000;

let examples = Object.keys(chartsExamples);
let mockup = {
  attr: "",
  children: [],
  classes: "analysis_20",
  description: "",
  id: PK,
  object: "page",
  object_id: OID++,
  object_slug: "charts",
  order: 22,
  parent: 0,
  path: "charts",
  target: "",
  title: "Charts",
  type: "post_type",
  type_label: "Page",
  url: "https://wp.momentum.design/dataVisualization/",
  xfn: ""
};
/*
mockup.children.push({
  attr: "",
  classes: "",
  description: "",
  id: ID++,
  object: "page",
  object_id: OID++,
  object_slug: "dataVisualization",
  order: 23,
  parent: PK,
  path: "dataVisualization",
  target: "",
  title: "Overview",
  type: "post_type",
  type_label: "Page",
  url: "https://wp.momentum.design/components/",
  xfn: ""
});
*/
examples.map(item => {
  let thisParentId = ID++;
  let child = {
    attr: "",
    children: [],
    classes: "",
    description: "",
    id: thisParentId,
    object: "page",
    object_id: OID++,
    object_slug: item,
    order: 23,
    parent: PK,
    path: "charts/" + item,
    target: "",
    title: item.replace(/^[a-z]/, function (word) {
      return word.toUpperCase();
    }).replace('_',' '),
    type: "post_type",
    type_label: "Page",
    url: "https://wp.momentum.design/components/" + item,
    xfn: ""
  };
  let markdowns = chartsExamples[item];
  for (let i = 0, l = markdowns.length; i < l; i++) {
    let _filename = markdowns[i].fileName.replace(/.js$/,'');
    child.children.push({
      attr: "",
      classes: "",
      description: "",
      id: ID++,
      object: "page",
      object_id: OID++,
      object_slug: _filename,
      order: 23,
      parent: thisParentId,
      path: "charts/" + item + "/" + _filename,
      target: "",
      title: _filename.replace(/^[a-z]/, function (word) {
        return word.toUpperCase();
      }),
      type: "post_type",
      type_label: "Page",
      url: "https://wp.momentum.design/components/" + item+ "/" + _filename,
      xfn: ""
    });
  }
  mockup.children.push(child);
});

export default mockup;
