import addClass from 'dom-helpers/class/addClass';
import hasClass from 'dom-helpers/class/hasClass';
import removeClass from 'dom-helpers/class/removeClass';

const selectedClassName = 'md-data-table__row--selected';

const setSelectedClass = (el, val1, val2) => {
  if (val1 === val2) {
    if (!hasClass(el, selectedClassName)) addClass(el, selectedClassName);
  } else {
    if (hasClass(el, selectedClassName)) removeClass(el, selectedClassName);
  }
}

const selectRowDirective = {
    bind: function(el, binding) {
      if (binding.value.disabled) {
        return;
      }

      const handleClick = event => {
        binding.value.dataTable.handleRowClick({
          originalEvent: event,
          rowData: binding.value.rowData,
        });
      };
  
      el.tabIndex = 0;
      el.className += 'md-data-table__row';
      setSelectedClass(el, binding.value.rowData, binding.value.dataTable.selection);
      el.addEventListener('click', handleClick);
    },

    update: function(el, binding) {
      setSelectedClass(el, binding.value.rowData, binding.value.dataTable.selection);
    }
  };
  
  export default selectRowDirective;
  