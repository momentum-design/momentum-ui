const sortColumnDirective = {
  bind: function(el, binding) {
    if (binding.value.disabled) {
      return;
    }
    
    const handleClick = event => {
      binding.value.dataTable.sort({
          originalEvent: event,
          field: binding.value.field
      });
    };

    el.className += 'md-data-table__sortable-column';
    el.addEventListener('click', handleClick);
  }
};

export default sortColumnDirective;
