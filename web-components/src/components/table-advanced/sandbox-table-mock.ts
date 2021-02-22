import { TableAdvanced } from "./TableAdvanced";

export namespace TableMock {
  export const CONF: TableAdvanced.Config = {
    cols: {
      define: [
        { id: "col1", title: "Col1" },
        { id: "col2", title: "Col3" },
        { id: "col3", title: "Col4" }
      ]
    }
  };

  export const DATA: TableAdvanced.Data = {
    list2d: [
      ["data11", "data21", "data31"],
      ["data12", "data22", "data32"],
      ["data13", "data23", "data33"]
    ]
  };

  export const CSV: TableAdvanced.Data = {
    csv: `data11, data21, data31
          data12, data22, data32
          data13, data23, data33`
  };

  export const CSV_AGENTX =
    "Group, Action, Shortcut Key \n Active Task List, Switch between tasks, Ctrl + Alt + T \n Active Task List, Expand and collapse task list, Ctrl + Alt + C \n Agent State, Available for all channels including call chat email and social channel, Ctrl + Alt + R \n Active Agent State List, Idle for all channels, Ctrl + Alt + N \n Application, Switch between popovers, Ctrl + Alt + E \n Application, Maximize and minimize popover view maximize and minimize, Ctrl + Alt + Q \n Call Handling, Open the list of chat templates, Ctrl + Alt + A \n Call Handling, Attach a file to the chat, Ctrl + Alt + S \n Edit CAD Variables, Save edited call variable values, Ctrl + Alt + O \n Edit CAD Variables, Revert edited call variable values, Ctrl + Alt + N \n Email Handling, Send email, Ctrl + Alt + S \n Email Handling, Reply, Ctrl + Alt + O";

  export const COMPLEX: { config: TableAdvanced.Config; data: TableAdvanced.Data } = {
    config: {
      isStickyHeader: true,

      rows: {
        isDraggable: true,
        selectable: "multiple"
      },

      cols: {
        isDraggable: true,
        isResizable: true,
        define: [
          {
            groupName: "Group 1",
            children: [
              { id: "Col 1", title: "Col1f", sorter: "byString", filters: "forString" },
              { id: "Col2", title: "Col2s" },
              { id: "Col3", title: "Col3" }
            ]
          },
          { id: "col4", title: "Col4h", isHeader: true },
          { id: "col5", title: "Col5s", sorter: "byString" },
          {
            groupName: "group2",
            children: [
              { id: "col6", title: "col6f" },
              { id: "col7", title: "col7" }
            ]
          }
        ]
      }
    },
    data: {
      list2d: [
        ["col _tmp_ 11", "12", "13", "14", "15", "str_tmp2_", "txt _tmp2_ txt"],
        ["_tmp_ col21 sub", "22", "23", "24", "25", "26", "27"],
        ["col31", "32", "33", "34", "35", "36", "37"]
      ]
    }
  };
}
