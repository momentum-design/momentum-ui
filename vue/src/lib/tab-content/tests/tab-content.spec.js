import { mount } from '@vue/test-utils';
import TabContent from '../index.vue';

describe('TabContent', () => {
  it('should match snapshot', () => {
    const container = mount(TabContent);
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one TabContent', () => {
    const container = mount(TabContent);

    expect(container.classes('md-tab__content')).toEqual(true);
  });

  it('should render children', () => {
    const container = mount(TabContent, {
      slots: {
        default: `<div class="testingforTC" />`
      }
    });

    expect(container.findAll('.testingforTC').length).toEqual(1);
  });
});

