import { TableAdvanced } from "@/components/table-advanced/TableAdvanced";

export namespace TableAdvancedMock {
  export const SimpleTable: {
    config: TableAdvanced.Config;
    dataCsv: TableAdvanced.Data;
    dataList: TableAdvanced.Data;
    dataList2d: TableAdvanced.Data;
  } = {
    config: {
      isStickyHeader: true,

      cols: {
        isResizable: true,
        define: [
          { id: "c1", title: "Col1", sorter: "byString" },
          { id: "c2", title: "Col2", filters: "forString" },
          { id: "c3", title: "Col3" }
        ]
      }
    },
    dataCsv: {
      csv: `data11, data21, data31
      data12, data22, data32
      data13, data23, data33`
    },
    dataList: {
      list: ["data11", "data21", "data31", "data12", "data22", "data32", "data13", "data23", "data33"]
    },
    dataList2d: {
      list2d: [
        ["data11", "data21", "data31"],
        ["data12", "data22", "data32"],
        ["data13", "data23", "data33"]
      ]
    }
  };

  export const ComplexTable: { config: TableAdvanced.Config; data: TableAdvanced.Data } = {
    config: {
      isStickyHeader: true,

      rows: {
        isDraggable: true,
        selectable: "multiple"
      },

      cols: {
        isDraggable: true,
        isResizable: true,
        collapse: "c1",
        define: [
          {
            groupName: "Group 1",
            children: [
              { id: "c1", title: "Col1f", sorter: "byString", filters: "forString", width: "25%" },
              { id: "c2", title: "Col2s" },
              { id: "c3", title: "Col3" }
            ]
          },
          { id: "c4", title: "Col4h", isHeader: true },
          { id: "c5", title: "Col5s", sorter: "byString" },
          {
            groupName: "group2",
            children: [
              { id: "c6", title: "col6f", width: "25%" },
              { id: "c7", title: "col7", width: "25%" }
            ]
          }
        ]
      }
    },
    data: {
      list2d: [
        ["col _tmp_ 11", "12", "13", "14", "15", "str_tmp2_", "txt _tmp2_ txt"],
        ["_tmp_ col21 sub", "22", "23", "24", "25", "26", "27"],
        ["col31 sub_tmp_", "32", "33", "34", "35", "36", "37"]
      ]
    }
  };

  // ------------------

  export const ShortkeyTable: { config: TableAdvanced.Config; data: TableAdvanced.Data } = {
    config: {
      isStickyHeader: true,

      rows: {
        isDraggable: true,
        selectable: "multiple"
      },

      cols: {
        isResizable: true,
        define: [
          { id: "c1", title: "Group", sorter: "byString", width: "30%", filters: "forString" },
          { id: "c2", title: "Action", sorter: "byString", width: "40%" },
          { id: "c3", title: "Shortcut Key", width: "30%", filters: "forString" }
        ]
      }
    },

    data: {
      list2d: [
        ["Active Task List", "Switch between tasks", "Ctrl + Alt + T"],
        ["Active Task List", "Expand and collapse task list", "Ctrl + Alt + C _info_"],
        ["Agent State", "Available for all channels including call chat email and social channel", "Ctrl + Alt + R"],
        ["Active Agent State List", "Idle for all channels", "Ctrl + Alt + N"],
        ["Application", "Switch between popovers", "Ctrl + Alt + E"],
        ["Application", "Maximize and minimize popover view maximize and minimize", "Ctrl + Alt + Q _warn_"],
        ["Call Handling", "Open the list of chat templates", "Ctrl + Alt + A"],
        ["Call Handling", "Attach a file to the chat", "Ctrl + Alt + S _error_"],
        ["Edit CAD Variables", "Save edited call variable values", "Ctrl + Alt + O"],
        ["Edit CAD Variables", "Revert edited call variable values", "Ctrl + Alt + N _warn_"],
        ["Email Handling", "Send email", "Ctrl + Alt + S"]
      ]
    }
  };
}
