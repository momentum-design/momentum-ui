import { shallowMount } from '@vue/test-utils';
import DatePickerWeek from '../index.vue';
import DatePickerDay from '../../date-picker-day/index.vue';
import Button from '../../../button/index.vue';
import Vue from 'vue';
import moment from 'moment-timezone';

Vue.component(Button.name, Button);
Vue.component(DatePickerDay.name, DatePickerDay);

const TEST_DATE = '2018-04-01';

describe('DatePickerWeek', () => {
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
    const container = shallowMount(DatePickerWeek, {
      propsData: {
        day: day,
        month: 3,
      },
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render a div', () => {
    const container = shallowMount(DatePickerWeek, {
      propsData: {
        day: day,
        month: 3,
      },
    });
    expect(container.findAll('.md-datepicker__week').length).toEqual(1);
  });

  it('should render 7 Day components', () => {
    const container = shallowMount(DatePickerWeek, {
      propsData: {
        day: day,
        month: 3,
      },
    });
    expect(container.findAll(DatePickerDay)).toHaveLength(7);
  });
});

