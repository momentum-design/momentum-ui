<script>
import cloneElement from '../../utils/cloneElement';

export default {
  name: 'md-tab-content',

  render: function (h) {
    const setPanels = this.$slots.default && this.$slots.default.map((child, idx) => {
      return cloneElement(child, h, {
        props: {
          active: this.activeIndex === idx ? true : false
        }
      });
    });

    return (
      <div class="md-tab__content">{setPanels}</div>
    )
  },

  props: {
    /** @prop Determines the initial active index | null */
    activeIndex: Number,
  }
};
</script>
