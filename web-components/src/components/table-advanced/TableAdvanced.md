# Advanced Table Component

This will render "classic" HTML `<table>` described in `config` property and filled with `data`.

## Properties

| Name     | Type                | Description                                       |
| :------- | :------------------ | :------------------------------------------------ |
| `config` | [`Config`](#config) | Table columns configuration object **[required]** |
| `data`   | [`Data`](#data)     | Table rows data **[required]**                    |

### Config

Configure columns and additional features here. Number of columns must match parsed data row length.

```ts
type Config = {
  // will make table "fixed" on scroll
  isStickyHeader?: boolean;

  cols: {
    // REQUIRED - Please see "Column Definition" downstairs
    define: Column[];
    isDraggable?: boolean;
    isResizable?: boolean;
    // column with this ID will be collapsed
    collapse?: ColId;
  };

  rows?: {
    isDraggable?: boolean;
    selectable?: "none" | "single" | "multiple";
  };

  // Please see "Templates" downstairs
  cellTemplates?: Record<string, CellTemplate>;

  default?: {
    // set default "filter" and "sorting" fro all columns that has this props undefined
    col?: ColumnDefaults;

    // column with this ID will be sorted on table creation
    sort?: {
      colId: ColId;
      order: SortOrder;
    };

    // column with this ID will be sorted on table creation
    filter?: {
      colId: ColId;
      input: string;
      selectedIndex: number;
    };
  };

  // will add caption and summary to table (accessibility)
  head?: {
    caption?: string;
    summary?: string;
    tableDescription?: string;
  };
};
```

### Column Definition

You **need** to define columns of your table. Number of columns must correspond to provided [`Data`](#data).  
You can define column:

```ts
type Column = {
  // please provide unique ID
  id: string;
  title: string;
  width?: string;
  sorter?: "byString" | "byNumber" | SortComparator;
  // see "custom filters" downstairs
  filters?: "forString" | "forNumber" | Filter.Options[];
  // this will make column <th scope="row"> not <td>
  isHeader?: boolean;
};
```

Or column group:

```ts
type ColumnGroup = {
  groupName: string;
  children: Column[];
};
```

### Custom filters for column

Here is an example how to define your own set of filters for column.

```ts
import { Filter } from "./src/filter"; // Keep type import as a relative path

const config: TableAdvanced.Config = {
  cols: {
    define: [
      {
        id: "col1",
        title: "Title",
        filters: [
          Filter.OPTIONS.contains,
          Filter.OPTIONS.notContains,
          {
            label: "Second Char is",
            input: { placeholder: "Second char", maxlength: 1 },
            predicate: (content, input) => (content.length > 1 ? content[1] == input : false)
          }
        ]
      }
    ]
  }
};
```

## Data

Data is **required** property and can be provided in form of:  
  
`string[][]` - outer array is *rows* inner array is *columns*. Inner arrays must contain number of elements that is equal to **column** definitions.  
`string[]` - must contain number of elements equal to **rows \* columns**.  
`string` - in CSV format with number of columns equal to **column** definitions.

- if you have `string[][]` with [3][10] elements you need to define 3 columns and you will get 10 rows
- if you have `string[]` with [4] elements you need to define 1 or 2 or 4 columns an you will get 4, 2, 1 rows correspondingly

## Templates

Templates feature will give you ability to customize any cell of your table with HTML.

First you need to set anchors in your data. In this example they are **_tmp_** and **_tmpCb_**.

```ts
const data = {
  list2d: [
    ["sample _tmp_ text", "1", "_tmp_"],
    ["_tmpCb_ sample text", "1", "2"]
  ]
};
```

Provide `<templates>` for that anchors.

```html
<md-table-advanced .config="${conf}" .data="${data}">
  <template id="template1">
    <div>template content</div>
  </template>

  <template id="template2">
    <span class="sp"></span>
    <button>btn</button>
  </template>
</md-table-advanced>
```

templates configuration

```ts
const conf: TableAdvanced.Config = {
  cols: {
    define: [
      { id: "col1", title: "Col 1" },
      { id: "col2", title: "Col 2" },
      { id: "col3", title: "Col 3" }
    ]
  },
  cellTemplates: {
    _tmp_: { templateName: "template1" },
    _tmpCb_: {
      templateName: "template2",
      // by default template is inserted to anchor position inside cell text
      // with this option cell content will be replaced by template content
      contentUse: "replace",
      // here you can use vanilla JS to do anything
      templateCb: ({ fragment, content, row, col }) => {
        const span = fragment.querySelector<HTMLElement>(".sp")!;
        const button = fragment.querySelector<HTMLButtonElement>("button")!;

        span.innerText = `${content}[${row},${col}]`;
        button.addEventListener("click", () => console.log("click"));
      }
    }
  }
};
```

### How filtering and sorting works with templates

Say for example your template will look like this:

```html
<template id="t1"><img src="url"/></template>
```

There is no way to sort or filter it properly. So for sorting and filtering we are using cell content(`string`) instead.

- for example you have `"sample _t1_ text"` cell content. `"sample text"` will be used.

Along with `templateCb` you can use `contentCb`. This will let you customize cell content.

```ts
const conf: TableAdvanced.Config = {
  cellTemplates: {
    _tmp_: {
      templateName: "t1",
      contentCb: ({ content, row, col }) => `${content}[${row}][${col}]`
    }
  }
};
```

## Events

TableAdvanced can fire `md-table-advanced-change` event.

```ts
type ChangeEvent = Event & {
  detail:
    | { type: "filter-on"; filter: Filter.Options; input: string }
    | { type: "filter-off"; filter: Filter.Options }
    | { type: "sort"; order: SortOrder }
    | { type: "select"; index: number }
    | { type: "multi-select"; rows: number[] }
    | { type: "expand"; row: number }
    | { type: "collapse"; row: number };
};
```
