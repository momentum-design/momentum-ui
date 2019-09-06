import { mount } from '@vue/test-utils';
import ModalFooter from '../index.vue';

describe('ModalFooter', () => {
  it('should match snapshot', () => {
    const wrapper = mount(ModalFooter);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one ModalFooter', () => {
    const wrapper = mount(ModalFooter);

    expect(wrapper.findAll('.md-modal__footer').length).toEqual(1);
  });

  it('should render children', () => {
    const wrapper = mount(ModalFooter, {
      slots: {
        default: '<div class="testingforMF" />'
      }
    });

    expect(wrapper.findAll('.testingforMF').length).toEqual(1);
  });
});

