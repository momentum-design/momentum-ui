<script>
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import cloneElement from '../../utils/cloneElement';
import { Fragment } from 'vue-fragment'

export default {
  name: 'md-sidebar-nav-item',

  components: { Fragment },

  data() {
    return {
      expanded2: this.expanded,
    }
  },

  provide() {
    return {
      level: this.getHeaderLevel()
    }
  },

  inject: {
    level: {
      default: null
    },
    sidebar: {
      default: null
    },
    primary: {
      default: true
    },
    secondary: {
      default: false
    },
    tertiary: {
      default: false
    },
  },

  render(h) {
    const {
      className,
      icon,
      keyboardKey,
      title,
      ...props
    } = this.$props;
    const { expanded2 } = this.$data;

    const otherProps = omit({...props}, [
      'expanded',
    ]);

    const getIcon = () => {
      if (icon) {
        return (
          <md-icon
            name={icon}
            sizeOverride
            size={this.secondary ? 20 : 16}
          />
        );
      } else {
        return this.$slots.icon;
      }
    };

    const getSection = id => {
      const clickFunc = () => { this.$slots.default ? this.handleNavToggle() : false; }

      if (!this.$slots.title) {
        return (
          <md-list-item
            class={className}
            id={id}
            keyboardKey={keyboardKey || title}
            onClick={clickFunc}
            {...{props: otherProps}}
          >
            {
              (icon || this.$slots.icon)&&
              <md-list-item-section position='left'>
                {getIcon()}
              </md-list-item-section>
            }
            <md-list-item-section position='center'>
              {title}
            </md-list-item-section>
            {
              this.$slots.default &&
              <md-list-item-section position='right'>
                {
                  expanded2
                  ? <md-icon name='arrow-up_12' />
                  : <md-icon name='arrow-down_12' />
                }
              </md-list-item-section>
            }
          </md-list-item>
        )
      } else {
        const section = cloneElement(this.$slots.title[0], h, {
            props: {
              id: id
            }
        });
        if (section.componentOptions) {
          section.componentOptions.listeners = {
            click: clickFunc
          };
        }
        if (section.data) {
          section.data.on = {
            click: clickFunc
          };
          section.data.nativeOn = {
            click: clickFunc
          };
        }
        
        return section;
      }
    };

    return (
      <fragment name="sidebar-nav-item">
        {getSection(uniqueId('md-sidebar__nav-item-'))}
        {
          this.$slots.default &&
          <div class={
            'md-sidebar-nav__group' +
            ` md-sidebar-nav__group--${this.getHeaderLevel()}` +
            ` md-sidebar-nav__group--${(!this.$slots.default || expanded2) ? 'expanded' : 'collapsed'}`
          }>
            {this.$slots.default}
          </div>
        }
      </fragment>
    );
  },

  props: {
    /** @prop Optional CSS class string | '' */
    className: {
      type: String,
      default: ''
    },
    /** @prop Set navigation expanded or collapsed | false */
    expanded: Boolean,
    /** @prop Icon for the title | null */
    icon: String,
    /** @prop Unique string used for keyboard navigation | '' */
    keyboardKey: {
      type: String,
      default: ''
    },
    /** @prop Title for the side navigation | '' */
    title: {
      type: String,
      default: ''
    },
  },

  mounted() {
    this.setParentContext();
  },

  methods: {
    handleNavToggle() {
      this.expanded2 = !this.expanded2;
    },

    setExpanded() {
      this.expanded2 = this.expanded;
    },

    getHeaderLevel() {
      if (!this.level || this.level === 'primary') {
        return 'secondary';
      } else if (this.level === 'secondary') {
        return 'tertiary';
      }
    },

    setParentContext() {
      const nextLevel = this.$slots.default && this.getHeaderLevel() || 'primary';

      nextLevel
      && this.sidebar
      && this.sidebar.setSidebarLevel
      && this.sidebar.setSidebarLevel(nextLevel);
    },
  },
};
</script>
