<script>
import assign from 'lodash/assign';
import kebabCase from 'lodash/kebabCase';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import cloneElement from '../utils/cloneElement';

export default {
  name: 'md-list-item',

  data() {
    return {
      activeKey: this.list && this.list.activeEventKey,
      focusKey: this.list && this.list.focusEventKey,
      uid: this.id || uniqueId('md-list-item-')
    }
  },

  render: function (h) {
    const {
      active,
      disabled,
      isReadOnly,
      keyboardKey,
      label,
      link,
      refName,
      separator,
      title,
      ...props
    } = this.$props;

    const keyboardNavKey = kebabCase(keyboardKey || title || label);

    const otherProps = omit({...props}, [
      'focus',
      'focusOnLoad',
      'itemIndex',
      'role',
      'type',
      'value',
    ]);

    const getComponentData = () => ({
      class:
        'md-list-item' +
        `${(this.getType && ` md-list-item--${this.getType}`) || ''}` +
        `${((active || this.activeKey === this.uid) && ` active`) || ''}` +
        `${(disabled && ` disabled`) || ''}` +
        `${(isReadOnly && ` md-list-item--read-only`) || ''}` +
        `${(separator && ` md-list-item--separator`) || ''}`,
      attrs: {
        'aria-current': this.getFocus,
        'data-md-event-key': this.getEventKey,
        role: this.getRole,
        ref: refName,
        ...!isReadOnly && { tabindex: !disabled && this.getFocus ? 0 : -1 },
        ...link && { href: link },
        ...keyboardNavKey && { 'data-md-keyboard-key': keyboardNavKey },
        ...(title || label) && { title: title || label },
        ...otherProps,
      },
      on: {
        ...!isReadOnly && {
          click: this.handleClick,
          keydown: this.handleKeyDown
        },
      },
    });

    const customElement = () => {
      const node = this.$slots.customAnchor[0];
      const data = getComponentData();
      node.data.class = data.class;
      assign(node.data.attrs, data.attrs);
      assign(node.data.on, data.on);

      return cloneElement(
        node,
        h,
        {
          listeners: data.on,
          children: this.$slots.default
            || node.children
            || node.componentOptions && node.componentOptions.children
            || [label]
        }
      );
    };

    const defaultElement = () => h(
      link ? 'a' : 'div',
      getComponentData(),
      this.$slots.default || [label]
    );

    return (
      this.$slots.customAnchor
        ? customElement()
        : defaultElement()
    );

  },

  inject: {
    itemRole: {
      default: null
    },
    itemType: {
      default: null
    },
    list: {
      default: null
    },
    parentKeyDown: {
      default: null
    },
    parentOnSelect: {
      default: null
    }
  },

  props: {
    /** @prop Active prop to help determine styles | false */
    active: Boolean,
    /** @prop Disabled attribute for ListItem to determine styles | false */
    disabled: Boolean,
    /** @prop Unique string used for tracking events among ancestors | '' */
    eventKey: {
      type: String,
      default: ''
    },
    /** @prop Specifies if ListItem should automatically get focus | false */
    focus: Boolean,
    /** @prop Specifies if ListItem should automatically get focus when page loads | false */
    focusOnLoad: Boolean,
    /** @prop Determines if ListItem is clickable | false */
    /** @prop Sets ListItem id | null */
    id: String,
    isReadOnly: Boolean,
    /** @prop ListItem index number | null */
    itemIndex: Number,
    /** @prop Unique string used for keyboard navigation | '' */
    keyboardKey: {
      type: String,
      default: ''
    },
    /** @prop ListItem label text | '' */
    label: {
      type: String,
      default: ''
    },
    /** @prop external link associated input | '' */
    link: {
      type: String,
      default: ''
    },
    /** @prop ListItem ref name | 'navLink' */
    refName: {
      type: String,
      default: 'navLink'
    },
    /** @prop Aria role | 'listitem' */
    role: {
      type: String,
      default: 'listitem'
    },
    /** @prop Prop that controls whether to show separator or not | false */
    separator: Boolean,
    /** @prop ListItem Title | '' */
    title: {
      type: String,
      default: ''
    },
    /** @prop ListItem size | '' */
    type: {
      type: [Number, String],
      default: '',
      validator: function (value) {
        return ['', 'small', 'large', 'xlarge', 'space', 'header', 36, 52, 60].indexOf(value) !== -1
      }
    },
    /** @prop ListItem value for OnSelect value | '' */
    value: {
      type: [Number, String, Object, Array],
      default: ''
    },
  },

  computed: {
    getEventKey() {
      return this.$attrs.id || this.eventKey || this.uid;
    },

    getFocus() {
      return this.focus || this.focusKey === this.getEventKey;
    },

    getRole() {
      return this.itemRole || this.role;
    },

    getType() {
      return this.type || this.itemType;
    },

  },

  created() {
    this.list && this.list.$on('activeChange', this.handleListActiveChange);
  },

  beforeDestroy() {
    this.list && this.list.$off('activeChange');
  },

  beforeMount() {
    if (!this.$slots.default) return;
    const checkAllChildren = this.getChildrenElements(['ListItemSection', 'EventOverlay']);
    const checkSectionChildren = this.getChildrenElements(['ListItemSection']);

    if (!checkAllChildren) {
      return;
    } else if (checkSectionChildren.length > 3) {
      throw new Error(
        `Only 3 ListItemSection components can be used as children. You've used ${
          checkSectionChildren.length
        }`
      );
    }
  },

  mounted() {
    const anchorCount = this.checkElements('A');
    const { refName, focusOnLoad } = this.$props;

    if (anchorCount.count > 1) {
      throw new Error(
        'Only 1 primary child anchor tag may be used with ListItem component'
      );
    } else if (anchorCount.count === 1 && anchorCount.children > 1) {
      throw new Error('Anchor tag can not have sibling');
    }

    focusOnLoad && this.getFocus
      && this.$refs[refName]
      && this.$refs[refName].focus();
  },

  methods: {
    checkElements(tag) {
      const children = Object.values(this.$el.childNodes);

      return this.countDOMChildren(children, tag);
    },

    countDOMChildren(children, tag) {
      return children.reduce(
        (agg, child) => (
          child.tagName === tag
            ? { ...agg, count: (agg.count += 1) }
            : agg
        ), { count: 0, children: children.length }
      );
    },

    getChildrenElements(nameArr) {
      let elementCount = 0;

      this.$slots.default.forEach(child => {
        if (child && (child.type && nameArr.includes(child.type.displayName))) {
          return elementCount++;
        }
      });

      return (
        elementCount && {
          length: elementCount
        }
      );
    },

    handleClick(e) {
      const {
        disabled,
        label,
        value,
      } = this.$props;

      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      }

      const option = { value, label, eventKey: this.getEventKey };
      this.$emit('click', e, option);
      this.parentOnSelect && this.parentOnSelect(e, option);
    },

    handleKeyDown(e) {
      const {
        disabled,
        value,
        label,
      } = this.$props;

      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      }

      this.$emit('keydown', e);
      this.parentKeyDown && this.parentKeyDown(e, { value, label, eventKey: this.getEventKey });
    },

    handleListActiveChange(e) {
      this.activeKey = e.active;
      this.focusKey = e.focus;
    },
  },
};
</script>
