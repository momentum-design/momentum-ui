<template>
  <div
    class="md-data-table"
    :class="[
      resizableColumns ? 'md-data-table--resizable' : '',
      autoLayout ? 'md-data-table--auto-layout' : '',
      columnDividers ? 'md-data-table--dividers' : '',
      theme ? 'md-data-table--zebra': '',
      containerClass
    ]"
    :style="containerStyle"
    ref="container"
  >
    <div v-if="!scrollable" class="md-data-table__wrapper">
      <table
        :class="tableClass"
        :style="tableStyle"
        ref="table"
      >
        <thead class="md-data-table__thead">
          <slot name="header" :columns="columns" :dataTable="dataTable">
            <tr>
              <th v-for="(column, index) in columns"
                :key="index"
                v-mdResizeColumn="{disabled: !resizableColumns, dataTable: dataTable}"
                v-mdSortColumn="{disabled: !sortable && !customSort, dataTable: dataTable, field: column.field}">
                {{ column.header }}
                <md-data-table-sort-icon v-if="sortable || customSort" :field="column.field" />
              </th>
            </tr>
          </slot>
        </thead>
        <tbody class="md-data-table__tbody">
          <slot
            v-for="(row, index) in data"
            name="body"
            :row="row"
            :columns="columns"
            :dataTable="dataTable"
            :index="index"
          >
            <tr :key="index" v-mdSelectRow="{disabled: !rowSelection, dataTable: dataTable, rowData: row}">
              <td v-for="(column, columnIndex) in columns" :key="columnIndex">
                {{ row[column.field] }}
              </td>
            </tr>
          </slot>
        </tbody>
      </table>
    </div>
    <!-- Scroll Condition -->
    <md-data-table-scroll-view
      v-if="scrollable"
      class="md-data-table__scrollable--wrappper"
      :scrollHeight="scrollHeight">
      <template v-slot:colgroup v-if="resizableColumns">
        <slot name="colgroup" :columns="columns" :dataTable="dataTable">
          <colgroup>
            <col v-for="(column, index) in columns" :key="index" />
          </colgroup>
        </slot>
      </template>
      <template v-slot:header>
        <slot name="header" :columns="columns" :dataTable="dataTable">
          <tr>
            <th v-for="(column, index) in columns"
              :key="index"
              v-mdResizeColumn="{disabled: !resizableColumns, dataTable: dataTable}"
              v-mdSortColumn="{disabled: !sortable && !customSort, dataTable: dataTable, field: column.field}">
              {{ column.header }}
              <md-data-table-sort-icon v-if="sortable || customSort" :field="column.field" />
            </th>
          </tr>
        </slot>
      </template>
      <template v-slot:body>
        <slot
          v-for="(row, index) in data"
          name="body"
          :row="row"
          :columns="columns"
          :dataTable="dataTable"
          :index="index"
        >
          <tr :key="index" v-mdSelectRow="{disabled: !rowSelection, dataTable: dataTable, rowData: row}">
            <td v-for="(column, columnIndex) in columns" :key="columnIndex">
              {{ row[column.field] }}
            </td>
          </tr>
        </slot>
      </template>
    </md-data-table-scroll-view>
    <!-- Resize Helper -->
    <div
      v-if="resizableColumns"
      ref="resizeHelper"
      class="md-data-table__resizer--helper md-data-table__resizer--highlight"
      style="display:none">
    </div>
  </div>
</template>

<script>
import Handler from './handler';
import findIndex from 'lodash/findIndex';
import resizeColumnDirective from './resize-column.directive';
import selectRowDirective from './select-row.directive';
import sortColumnDirective from './sort-column.directive';
import { eventBus } from '../utils/eventBus'

export default {
  name: 'md-data-table',

  data() {
    return {
      dataTable: this,
      dataCount: this.data.length,
      dSelection: this.selection,
      dSortField: this.sortField,
      dSortOrder: this.sortOrder,
      preventPropagation: false,
      selectionKeys: {},
      virtualScrollCb: null,
    }
  },

  provide() {
    return {
      dataTable: this.dataTable,
      eventBus: eventBus,
    }
  },

  directives: {
    mdResizeColumn: resizeColumnDirective,
    mdSelectRow: selectRowDirective,
    mdSortColumn: sortColumnDirective,
  },

  props: {
    /** @prop column's header and field data */
    columns: {
      type: Array,
      required: true
    },
    /** @prop data for the table | [] */
    data: {
      type: Array,
      default: _ => []
    },
    /** @prop allow sort */
    sortable: Boolean,
    /** @prop field being sorted on */
    sortField: String,
    /** @prop sort order, used with sort icons on header | 1 */
    sortOrder: {
      type: Number,
      default: 1
    },
    /** @prop get the row number of which virtual scroll starts load | 0 */
    first: {
      type: Number,
      default: 0
    },
    /** @prop selected items */
    selection: [Array, Object],
    /** @prop css class on the wrapper container div | '' */
    containerClass: {
      type: String,
      default: ''
    },
    /** @prop table columns to allow for resize | false */
    resizableColumns: Boolean,
    /** @prop set css class on table element | '' */
    tableClass: {
      type: String,
      default: ''
    },
    /** @prop provide inline style to table */
    tableStyle: Object,
    /** @prop provide inline style to container div */
    containerStyle: Object,
    /** @prop start of table in ascending or descending order | 1 */
    defaultSortOrder: {
      type: Number,
      default: 1
    },
    /** @prop allow the table body to be scrollable | false */
    scrollable: Boolean,
    /** @prop scroll height of the table | '' */
    scrollHeight: {
      type: String,
      default: ''
    },
    /** @prop number of rows to load by when virtual scrolling */
    numberOfRowsToLoad: Number,
    /** @prop lazy load mode for small sections of data to load instead of entire data | false */
    lazy: Boolean,
    /** @prop virtual scroll on the data table | false */
    virtualScroll: Boolean,
    /** @prop setTimeout delay in handling virtual scroll | 150 */
    virtualScrollDelay: {
      type: Number,
      default: 150
    },
    /** @prop virtual row height | 28 */
    virtualRowHeight: {
      type: Number,
      default: 34
    },
    /** @prop widths of the table and its cells to fit for the content | false */
    autoLayout: Boolean,
    /** @prop dataKey can be used to find rowData from selection, otherwise findIndex will run */
    dataKey: String,
    /** @prop allows for row selection click | false */
    rowSelection: Boolean,
    /**@prop show column dividers css border | false */
    columnDividers: Boolean,
    /**@prop use custom sort function | false */
    customSort: Boolean,
    /**@prop change theme of the data table | null */
    theme: {
      type: String,
      default: ''
    },
  },

  watch: {
    data(val) {
      if (!this.lazy) {
        this.dataCount = val ? val.length : 0;
      }
      this.$nextTick(function() {
        if (this.virtualScroll && this.virtualScrollCb) {
          this.virtualScrollCb();
        }
      });

      eventBus.$emit('dataChange', this.data);
    },
    sortField(val) {
      this.dSortField = val;
      this.$nextTick(function() {
        this.applySort();
      });
    },
    selection(val) {
      this.dSelection = val;
      this.$nextTick(function() {
        if (!this.preventPropagation) {
          this.updateSelectionKeys();
        }
        this.preventPropagation = false;
      });
    },
    dSelection(val) {
      this.$nextTick(function() {
        if (!this.preventPropagation) {
          this.updateSelectionKeys();
        }
        this.preventPropagation = false;
      });
    },
  },

  created() {
    if (this.lazy) {
      this.$emit('lazyLoad', this.lazyData);
    }
  },

  computed: {
    lazyData() {
      return {
        rowNumFirstLoad: this.first,
        numberOfRowsToLoad: this.numberOfRowsToLoad,
        selection: this.dSelection,
        sortField: this.dSortField,
        sortOrder: this.dSortOrder,
      };
    },
  },

  methods: {
    isColumnSorted(field) { // check to see if it has been sorted, used for sort icon
      return this.dSortField === field;
    },

    sort(event) {
      this.dSortOrder = this.dSortField === event.field ? this.dSortOrder * -1 : this.defaultSortOrder;
      this.dSortField = event.field;
      this.applySort();
    },

    applySort() {
      if (this.dSortField && this.dSortOrder) {
        if (this.data) {
          if (this.customSort) {
            this.$emit('sortBy', {
                data: this.data,
                field: this.dSortField,
                order: this.dSortOrder
            });
          } else {
            this.data.sort((data1, data2) => {
              const value1 = data1[this.dSortField];
              const value2 = data2[this.dSortField];
              let result;

              if (value1 === null && value2 !== null) {
                result = -1;
              } else if (value1 !== null && value2 === null) {
                result = 1;
              } else if (value1 === null && value2 === null) {
                result = 0;
              } else if (typeof value1 === 'string' && typeof value2 === 'string') {
                result = value1.localeCompare(value2);
              } else {
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
              }

              return this.dSortOrder * result;
            });
          }
        }

        const sortObj = {
          field: this.dSortField,
          order: this.dSortOrder
        };

        this.$emit('afterSort', sortObj);
      }
    },

    // Resize Methods
    onColumnResizeStart(event) {
      const leftContainer = Handler.getOffset(this.$refs.container).left;
      this.resizerX = event.pageX - leftContainer + this.$refs.container.scrollLeft;
      event.preventDefault();
    },

    onColumnResize(event) {
      const leftContainer = Handler.getOffset(this.$refs.container).left;

      this.$refs.resizeHelper.style.height = this.$refs.container.offsetHeight + 'px';
      this.$refs.resizeHelper.style.top = 0 + 'px';
      this.$refs.resizeHelper.style.left = event.pageX - leftContainer + this.$refs.container.scrollLeft + 'px';
      this.$refs.resizeHelper.style.display = 'block';
    },

    onColumnResizeEnd(event, column) {
      let movedDistance = this.$refs.resizeHelper.offsetLeft - this.resizerX;
      const columnWidth = column.offsetWidth;
      const minWidth = parseInt(column.style.minWidth || 15, 10);

      if (columnWidth + movedDistance < minWidth) {
        movedDistance = minWidth - columnWidth;
      }

      const newColumnWidth = columnWidth + movedDistance;

      if (newColumnWidth >= minWidth) {
        let nextColumn = column.nextElementSibling;

        while (!nextColumn.offsetParent) {
          nextColumn = nextColumn.nextElementSibling;
        }

        if (nextColumn) {
            const nextColumnWidth = nextColumn.offsetWidth - movedDistance;
            const nextColumnMinWidth = nextColumn.style.minWidth || 15;

          if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth, 10)) {

            if (this.scrollable) {
              const scrollableView = this.findParentScrollableView(column);

              // finds element
              const scrollableBodyTable = Handler.findSingle(scrollableView, 'table.md-data-table__scrollable--body-table');
              const scrollableHeaderTable = Handler.findSingle(scrollableView, 'table.md-data-table__scrollable--header-table');

              let resizeColumnIndex;
              let num = 0;
              const columns = column.parentNode.childNodes;

              for (let i = 0; i < columns.length; i++) {
                if (columns[i] === column) {
                  resizeColumnIndex = num;
                }
                if (columns[i].nodeType === 1) {
                  num++;
                }
              }

              // resize both the header and the body to match new width
              this.resizeColumnGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
              this.resizeColumnGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
            } else {
              column.style.width = newColumnWidth + 'px';

              if (nextColumn) {
                nextColumn.style.width = nextColumnWidth + 'px';
              }
            }
          }
        }

        this.$emit('afterColResize', {
          element: column,
          movedDistance: movedDistance
        });
      }
      // hide resize helper line on end
      this.$refs.resizeHelper.style.display = 'none';
    },

    findParentScrollableView(column) {
      if (column) {
        let parent = column.parentElement;

        while (parent && !parent.classList.contains('md-data-table__scrollable--view')) {
          parent = parent.parentElement;
        }

        return parent;
      } else {
        return null;
      }
    },

    resizeColumnGroup(tableSection, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
      if (tableSection) {
        // find colGroup
        const colGroup = tableSection.children[0].nodeName === 'COLGROUP' ? tableSection.children[0] : null;

        if (colGroup) {
          const col = colGroup.children[resizeColumnIndex];
          const nextColumn = col.nextElementSibling;
          col.style.width = newColumnWidth + 'px';

          if (nextColumn && nextColumnWidth) {
            nextColumn.style.width = nextColumnWidth + 'px';
          }
        } else {
          throw new Error('Tables with scroll that resize require a colgroup, refer to example');
        }
      }
    },

    // Virtual Scroll
    handleVirtualScroll(event) {
      this.rowNumFirstLoad = (event.page - 1) * this.numberOfRowsToLoad;
      this.virtualScrollCb = event.callback;

      if (this.virtualScrollTimer) {
        clearTimeout(this.virtualScrollTimer);
      }

      this.virtualScrollTimer = setTimeout(() => {
        this.$emit('lazyLoad', this.lazyData);
      }, this.virtualScrollDelay);
    },

    // Select
    updateSelectionKeys() {
      if (this.dataKey && this.dSelection) {
        this.selectionKeys = {};
        if (this.dSelection instanceof Array) {
          for (const data of this.dSelection) {
            this.selectionKeys[data[this.dataKey]] = 1;
          }
        } else {
          this.selectionKeys[this.dSelection[this.dataKey]] = 1;
        }

        eventBus.$emit('selectionChange', this.dSelection);
      }
    },

    isSelected(rowData) {
      if (rowData && this.dSelection) {
        if (this.dataKey) {
          for (let i = 0; i < this.dSelection.length; i++) {
            if (this.dSelection[i][this.dataKey] === rowData[this.dataKey]) {
              this.selectionKeys[rowData[this.dataKey]] = 1;
            }
          }
          return this.selectionKeys[rowData[this.dataKey]] !== undefined; // found in selection
        } else {
          if (this.dSelection instanceof Array) {
            return findIndex(this.dSelection, rowData) > -1;
          } else {
            return this.dSelection === rowData;
          }
        }
      }
      return false;
    },

    toggleRowsWithCheckbox(event, check) {
      this.dSelection = check ? this.data.slice() : [];
      this.preventPropagation = true;
      this.updateSelectionKeys();
      this.$emit('selectionChange', this.dSelection);
      this.$emit('headerCheckboxToggle', {originalEvent: event, checked: check});
    },

    toggleRowWithCheckbox(event, rowData) {
      this.dSelection = this.dSelection || [];
      const isChecked = this.isSelected(rowData);

      const rowDataKeyValue = this.dataKey ? rowData[this.dataKey] : null;

      this.preventPropagation = true;

      if (isChecked) { // then uncheck from selection
        const checkedIndex = findIndex(this.dSelection, rowData);
        this.dSelection = this.dSelection.filter((val, i) => i !== checkedIndex);
        this.$emit('selectionChange', this.dSelection);
        this.$emit('rowUncheck', {
          originalEvent: event.originalEvent,
          data: rowData,
        });

        if (rowDataKeyValue) {
          delete this.selectionKeys[rowDataKeyValue];
        }

      } else { // add to selection
        this.dSelection = this.dSelection ? [...this.dSelection, rowData] : [rowData];
        this.$emit('selectionChange', this.dSelection);
        this.$emit('rowCheck', {
          originalEvent: event.originalEvent,
          data: rowData,
        });

        if (rowDataKeyValue) {
          this.selectionKeys[rowDataKeyValue] = 1;
        }
      }

      eventBus.$emit('selectionChange', this.dSelection);
    },

    // row click selection
    handleRowClick(event) {
      if (this.rowSelection) {

        this.preventPropagation = true;

        const rowData = event.rowData;
        const selected = this.isSelected(rowData);
        const dataKeyValue = this.dataKey ? rowData[this.dataKey] : null;

        if (selected) { // then unselect to null
          this.dSelection = null;
          this.selectionKeys = {};
          this.$emit('selectionChange', this.dSelection);
          this.$emit('rowUnselect', {
            originalEvent: event.originalEvent,
            data: rowData,
            type: 'row'
          });
        } else { // select
          this.dSelection = rowData;
          this.$emit('selectionChange', this.dSelection);
          this.$emit('rowSelect', {
            originalEvent: event.originalEvent,
            data: rowData,
            type: 'row',
          });

          if (dataKeyValue) {
            this.selectionKeys = {};
            this.selectionKeys[dataKeyValue] = 1;
          }
        }
      }
    },
  },

};
</script>
