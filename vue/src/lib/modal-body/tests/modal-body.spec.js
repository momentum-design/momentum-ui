import { mount } from '@vue/test-utils';
import ModalBody from '../index.vue';

describe('ModalBody', () => {
  it('should match snapshot', () => {
    const wrapper = mount(ModalBody);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one ModalBody', () => {
    const wrapper = mount(ModalBody);

    expect(wrapper.findAll('.md-modal__body').length).toEqual(1);
  });

  it('should render children', () => {
    const wrapper = mount(ModalBody, {
      slots: {
        default: '<div class="testingforMB" />'
      }
    });

    expect(wrapper.findAll('.testingforMB').length).toEqual(1);
  });
});

