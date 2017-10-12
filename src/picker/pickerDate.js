import Picker from './picker';
import getDate from '../util/getDate';

export default class PickerDate {
  constructor(options) {
    this.datePicker = null;
    this.options = {
      data: [],
      title: '',
      selectedIndex: null,
      showCls: 'show'
    };
    this.options = Object.assign(this.options, options);
    this._init();
  };

  _init() {
    // 年月份数组
    let yearArr = getDate.getYear(this.options.startYear, this.options.lastYear).reverse();
    let monthArr = getDate.getMonth();
    let dayArr = getDate.getDay();
    // 年月份数据
    let yearData = getDate.getPickerArr(yearArr, '年');
    let monthData = getDate.getPickerArr(monthArr, '月');
    let dayData = getDate.getPickerArr(dayArr, '日');
    // 默认年月份的索引值
    let yearChange = this.options.defaultYear ? yearData.find((n) => n.text === this.options.defaultYear).value : 0;
    let monthChange = this.options.defaultMonth ? monthData.find((n) => n.text === this.options.defaultMonth).value : 0;
    let dayChange = this.options.defaultDay ? dayData.find((n) => n.text === this.options.defaultDay).value : 0;
    this.datePicker = new Picker({
      data: [yearData, monthData, dayData], // 初始化的数据
      selectedIndex: [yearChange, monthChange, dayChange] // 默认哪个选中
    });
    this.datePicker.on('picker.select', (selectedIndex, selectedVal) => {
      let returnArr = selectedVal.toString().split(',');
//          console.log(yearData[returnArr[0]].value);
//          console.log(monthData[returnArr[1]]);
//          console.log(dayData[returnArr[2]]);
      let valArr = [yearArr[returnArr[0]], monthArr[returnArr[1]], dayArr[returnArr[2]]];
      this.options.selectFun && this.options.selectFun(selectedIndex, valArr);
    });
    this.datePicker.on('picker.change', (index, selectedIndex) => {
      console.log(index);
      console.log('change:' + selectedIndex);
      switch (index) {
        case 0:
          yearChange = selectedIndex;
          break;
        case 1:
          monthChange = selectedIndex;
          break;
        case 2:
          dayChange = selectedIndex;
          break;
      }
      // 得到picker选择器改变后的年月日
      let yearPicker = yearArr[yearChange];
      let monthPicker = monthArr[monthChange];
      let dayPicker = dayArr[dayChange];
      if (index === 0 || index === 1) {
        dayArr = getDate.getDay(yearPicker, monthPicker);
//            debugger;
        dayData = getDate.getPickerArr(dayArr, '日');
        this.datePicker.refillColumn(2, dayData);
      }
      let dataTemp = new Date();
      // 判断参数里面有无超出当前日期重置到当前日期
      if (this.options.reset) {
        // 获取当前时间的年月日
        let currentYear = dataTemp.getFullYear();
        let currentMonth = dataTemp.getMonth() + 1;
        let currentDay = dataTemp.getDate();
        // 判断滑动日期是否超过当前日期
        if (parseInt(yearPicker) === currentYear) {
          if (parseInt(monthPicker) > currentMonth) {
            this.datePicker.scrollColumn(1, currentMonth - 1);
//              this.datePicker.trigger("picker.change",1,currentMonth-1);
            this.datePicker.selectedIndex[1] = currentMonth - 1;
            if (parseInt(dayPicker) > currentDay) {
              this.datePicker.scrollColumn(2, currentDay - 1);
//                this.datePicker.trigger("picker.change",2,currentDay-1);
              this.datePicker.selectedIndex[2] = currentDay - 1;
            }
          }
        }
        this.options.changeFun && this.options.changeFun(index, selectedIndex);
      }
    });
  }

  show () {
    this.datePicker.show();
  }
}
