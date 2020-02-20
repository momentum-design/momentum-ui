import { mount } from '@vue/test-utils';
import DatePickerMonth from '../index.vue';
import DatePickerDay from '../../date-picker-day/index.vue';
import DatePickerWeek from '../../date-picker-week/index.vue';
import Button from '../../../button/index.vue';
import Vue from 'vue';
import moment from 'moment-timezone';

Vue.component(Button.name, Button);
Vue.component(DatePickerDay.name, DatePickerDay);
Vue.component(DatePickerWeek.name, DatePickerWeek);

const TEST_DATE = '2018-04-01';

describe('DatePickerMonth', () => {
  let day;

  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Kolkata');
    day = moment(TEST_DATE);
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it('should match snapshot', () => {
    const wrapper = mount(DatePickerMonth, {
      propsData: {
        day: day
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render all days of the month correctly', () => {
    const container = mount(DatePickerMonth, {
      propsData: {
        day: day
      },
    });
    expect(container.findAll(DatePickerWeek)).toHaveLength(5);
    expect(container.findAll(DatePickerDay)).toHaveLength(35);
  });
});

