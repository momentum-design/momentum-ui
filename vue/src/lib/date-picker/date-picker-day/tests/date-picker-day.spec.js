import { mount } from '@vue/test-utils';
import DatePickerDay from '../index.vue';
import Button from '../../../button/index.vue';
import Vue from 'vue';
import moment from 'moment-timezone';

Vue.component(Button.name, Button);

const TEST_DATE = '2018-04-01';

describe('DatePickerDay', () => {
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
    const selected = moment(TEST_DATE);
    const wrapper = mount(DatePickerDay, {
      propsData: {
        day: day,
        month: 3,
      },
      provide: {
        getSelected: () => selected
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('should apply the right modifier classes', () => {
    it('should apply a modifier, when the date does not belong to current month', () => {
      const container = mount(DatePickerDay, {
        propsData: {
          day: day,
          month: 10,
        },
      });
      expect(container.classes('md-datepicker__day--outside-month')).toEqual(true);
    });

    it('should apply a modifier when the date is selected', () => {
      const container = mount(DatePickerDay, {
        propsData: {
          day: day,
          month: 4,
        },
        provide: {
          getSelected: () => day
        }
      });
      expect(container.classes('md-datepicker__day--selected')).toEqual(true);
    });

    it('should apply a modifier when the date is today`s date', () => {
      const container = mount(DatePickerDay, {
        propsData: {
          day: moment(),
          month: 4,
        },
      });
      expect(container.classes('md-datepicker__day--today')).toEqual(true);
    });

    it('should apply a modifier when the date is in focus', () => {
      const container = mount(DatePickerDay, {
        propsData: {
          day: day,
          month: 4,
        },
        provide: {
          getFocus: () => day
        }
      });
      expect(container.classes('md-datepicker__day--focus')).toEqual(true);
    });
  });

  it('when Day the disabled, should set disabled prop on button', () => {
    const container = mount(DatePickerDay, {
      propsData: {
        day: day,
        month: 4,
        filterDate: () => true
      },
    });
    expect(container.attributes().disabled).toEqual('disabled');
  });

  it('onclick of Day should call the callback in context', () => {
    const onClickFn = jest.fn();
    const container = mount(DatePickerDay, {
      propsData: {
        day: day,
        month: 4,
      },
      provide: {
        getFocus: () => day,
        handleDayClick: onClickFn
      }
    });

    container.trigger('click');
    expect(onClickFn).toHaveBeenCalled();
  });

});

