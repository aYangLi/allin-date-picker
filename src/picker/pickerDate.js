/**
 * @Desc：基于better-picker的时间选择器；
 * @Usage:
  //需要初始化选择器
  var options = {
    startYear:1990,   // 开始时间(默认1980)
    lastYear:2020,    // 结束时间，不传默认为当前年份
    title: '',    // 选择器标题,默认空
    reset：true，//是否超出当前日期回滚到当前日期(默认false)；
    defaultYear:'1980',//默认选中的年份，不传则默认为当天
    defaultMonth:'1',//默认选中的月份，不传则默认为当天
    defaultDay:'1',//默认选中的天，不传则默认为当天
    changeFun:function (index,val) {
        index（改变的是那一列；0-年；1-月；2-日）
        val（改变那一列的索引值）
    },//当一列滚动停止的时候
    selectFun:function (index,val) {
        index（选择的索引数组）
        val（选择的值的数组）
    }，//当用户点击确定的时候，
    valueChangeFun: function (index,val){
        index（选择的索引数组）
        val（选择的值的数组）
    }，当用户点击确定的时候，如果本次选择的数据和上一次不一致，
    cancelFun:function () {
      当用户点击取消的时候触发
    }
  }
  var picker = new PickerDate(options);
 * @Notify：
 * @Depend：better-picker.js
 *
 * Created by lichenyang on 2017/10/12.
 * update by lichenyang on 2018/06/05
 */
import Picker from 'better-picker';
import getDate from '../util/getDate.js';

export default class PickerDate {
  constructor(options) {
    this.datePicker = null;
    this.yearArr = [];
    this.monthArr = [];
    this.dayArr = [];
    let dataTemp = new Date();
    // 获取当前时间的年月日
    let currentYear = dataTemp.getFullYear();
    let currentMonth = dataTemp.getMonth() + 1;
    let currentDay = dataTemp.getDate();
    this.config = {
      startYear: 1980, // 开始时间,不传默认为1980
      lastYear: currentYear, // 结束时间，不传默认为当前年份
      currentYear, // 当前年份
      currentYearIndex: 0, // 当前年份的索引
      currentMonth, // 当前月份
      currentMonthIndex: 0, // 当前月份的索引
      currentDay, // 当前天数
      currentDayIndex: 0, // 当前天数的索引
      title: '', // 选择器标题
      reset: false, // 是否超出当前日期回滚到当前日期，默认false；
      yearOrder: false, // 年份是否正序，默认false
      defaultYear: currentYear, // 默认选中的年份，不传则默认为当天
      defaultYearIndex: 0, // 默认选中的年份的索引
      defaultMonth: currentMonth, // 默认选中的月份，不传则默认为当天
      defaultMonthIndex: 0, // 默认选中的月份的索引。
      defaultDay: currentDay, // 默认选中的天，不传则默认为当天
      defaultDayIndex: 0 // 默认选中的天份的索引
    };
    this.options = Object.assign(this.config, options);
    this._init();
  };

  _init() {
    const that = this;
    // 年月份数组
    this.yearArr = this.options.yearOrder ? getDate.getYear(this.options.startYear, this.options.lastYear) : getDate.getYear(this.options.startYear, this.options.lastYear).reverse();
    this.monthArr = getDate.getMonth();
    this.dayArr = getDate.getDay(this.options.defaultYear, this.options.defaultMonth);
    // 年月份数据
    let yearData = getDate.getPickerArr(this.yearArr, '年');
    let monthData = getDate.getPickerArr(this.monthArr, '月');
    let dayData = getDate.getPickerArr(this.dayArr, '日');
    // 默认年月份的索引值
    this.options.defaultYearIndex = yearData.find((n) => {
      return Number.parseInt(n.text) === Number.parseInt(that.options.defaultYear);
    }).value;
    this.options.defaultMonthIndex = monthData.find((n) => {
      return Number.parseInt(n.text) === Number.parseInt(that.options.defaultMonth);
    }).value;
    this.options.defaultDayIndex = dayData.find((n) => {
      return Number.parseInt(n.text) === Number.parseInt(that.options.defaultDay);
    }).value;
    // 当前年月份的索引值（如果超出当前日期回滚到当前日期的话）
    if (this.options.reset) {
      this.options.currentYearIndex = yearData.find((n) => {
        return Number.parseInt(n.text) === that.options.currentYear;
      }).value;
      this.options.currentMonthIndex = monthData.find((n) => {
        return Number.parseInt(n.text) === that.options.currentMonth;
      }).value;
      this.options.currentDayIndex = dayData.find((n) => {
        return Number.parseInt(n.text) === that.options.currentDay;
      }).value;
    }
    this.datePicker = new Picker({
      data: [yearData, monthData, dayData], // 初始化的数据
      selectedIndex: [this.options.defaultYearIndex, this.options.defaultMonthIndex, this.options.defaultDayIndex], // 默认哪个选中
      title: this.options.title
    });
    this.datePicker.on('picker.select', (selectedIndex, selectedVal) => {
      this._restoreDefault().then(() => {
        let returnArr = selectedVal.toString().split(',');
        let valArr = [this.yearArr[returnArr[0]], this.monthArr[returnArr[1]], this.dayArr[returnArr[2]]];
        this.options.selectFun && this.options.selectFun(selectedIndex, valArr);
      });
    });
    this.datePicker.on('picker.cancel', () => {
      this.options.cancelFun && this.options.cancelFun();
    });
    this.datePicker.on('picker.valuechange', (selectedIndex, selectedVal) => {
      this._restoreDefault().then(() => {
        let returnArr = selectedVal.toString().split(',');
        let valArr = [this.yearArr[returnArr[0]], this.monthArr[returnArr[1]], this.dayArr[returnArr[2]]];
        this.options.valueChangeFun && this.options.valueChangeFun(selectedIndex, valArr);
      });
    });
    this.datePicker.on('picker.change', (index, selectedIndex) => {
      console.log(index);
      console.log('change:' + selectedIndex);
      this._restoreDefault().then(() => {
        if (index === 0 || index === 1) {
          this.dayArr = getDate.getDay(this.yearArr[that.datePicker.wheels[0].selectedIndex], this.monthArr[that.datePicker.wheels[1].selectedIndex]);
          dayData = getDate.getPickerArr(this.dayArr, '日');
          this.datePicker.refillColumn(2, dayData);
        }
        this.options.changeFun && this.options.changeFun(index, selectedIndex);
      });
      // 得到picker选择器改变后的年月日
    });
  }

  _restoreDefault() {
    const that = this;
    return new Promise((resolve, reject) => {
      // 判断参数里面有无超出当前日期重置到当前日期
      if (this.options.reset) {
        let yearPicker = this.yearArr[that.datePicker.wheels[0].selectedIndex];
        let monthPicker = this.monthArr[that.datePicker.wheels[1].selectedIndex];
        let dayPicker = this.dayArr[that.datePicker.wheels[2].selectedIndex];
        // 判断滑动日期是否超过当前日期
        if (parseInt(yearPicker) === that.options.currentYear || parseInt(yearPicker) > that.options.currentYear) {
          if (parseInt(yearPicker) > that.options.currentYear) {
            this.datePicker.scrollColumn(0, this.options.currentYearIndex);
            this.datePicker.selectedIndex[0] = this.options.currentYearIndex;
          }
          if (parseInt(monthPicker) > that.options.currentMonth || parseInt(monthPicker) === that.options.currentMonth) {
            if (parseInt(monthPicker) > that.options.currentMonth) {
              this.datePicker.scrollColumn(1, this.options.currentMonthIndex);
              this.datePicker.selectedIndex[1] = this.options.currentMonthIndex;
            }
            if (parseInt(dayPicker) > that.options.currentDay) {
              this.datePicker.scrollColumn(2, this.options.currentDayIndex);
              this.datePicker.selectedIndex[2] = this.options.currentDayIndex;
            }
          }
        }
      }
      resolve();
    });
  }

  show(next) {
    this.datePicker.show(next && next);
  }

  hide() {
    this.datePicker.hide();
  }

  resetPosition() {
    this.datePicker.selectedIndex[0] = this.options.defaultYearIndex;
    this.datePicker.selectedIndex[1] = this.options.defaultMonthIndex;
    this.datePicker.selectedIndex[2] = this.options.defaultDayIndex;
  }
}
