const resizeColumnDirective = {
    bind: function(el, binding) {
      if (binding.value.disabled) {
        return;
      }

      const mouseDownListener = event => {
        binding.value.dataTable.onColumnResizeStart(event);
        bindDocEvents();
      };

      const docMouseMoveListener = event => {
        binding.value.dataTable.onColumnResize(event);
      };

      const docMouseUpListener = event => {
        binding.value.dataTable.onColumnResizeEnd(event, el);
        unbindDocEvents();
      };

      const bindDocEvents = () => {
        document.addEventListener('mousemove', docMouseMoveListener);
        document.addEventListener('mouseup', docMouseUpListener);
      };

      const unbindDocEvents = () => {
        document.removeEventListener('mousemove', docMouseMoveListener);
        document.removeEventListener('mouseup', docMouseUpListener);
      };
  
      el.className += 'md-data-table__resizable-column';
      const resizeHelper = document.createElement('span');
      resizeHelper.className = 'md-data-table__column-resizer';
      el.appendChild(resizeHelper);
      resizeHelper.addEventListener('mousedown', mouseDownListener);
    }
};
  
export default resizeColumnDirective;
