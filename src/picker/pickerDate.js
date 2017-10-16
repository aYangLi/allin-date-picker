/**
 * @Desc：基于better-picker的时间选择器；
 * @Usage:
            //需要初始化选择器
            var picker = new PickerDate(options);
            var options = {
              startYear:1990,   开始时间
              lastYear:2020,    结束时间，不传默认为当前年份
              title: '日期选择',    选择器标题
              reset：true，//是否超出当前日期回滚到当前日期；
              defaultYear:'1980',//默认选中的年份，不传则默认为结束时间
              defaultMonth:'01',//默认选中的月份，不传则默认为01
              defaultDay:'01',//默认选中的天，不传则默认为01
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
 * @Notify：
 * @Depend：better-picker.js
 *
 * Created by lichenyang on 2017/10/12.
 */
import Picker from 'better-picker';
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
    this.yearChageIndex = yearChange;
    let monthChange = this.options.defaultMonth ? monthData.find((n) => n.text === this.options.defaultMonth).value : 0;
    this.monthChangeIndex = monthChange;
    let dayChange = this.options.defaultDay ? dayData.find((n) => n.text === this.options.defaultDay).value : 0;
    this.dayChangeIndex = dayChange;
    this.datePicker = new Picker({
      data: [yearData, monthData, dayData], // 初始化的数据
      selectedIndex: [yearChange, monthChange, dayChange] // 默认哪个选中
    });
    this.datePicker.on('picker.select', (selectedIndex, selectedVal) => {
      let returnArr = selectedVal.toString().split(',');
      let valArr = [yearArr[returnArr[0]], monthArr[returnArr[1]], dayArr[returnArr[2]]];
      this.options.selectFun && this.options.selectFun(selectedIndex, valArr);
    });
    this.datePicker.on('picker.valuechange', (selectedIndex, selectedVal) => {
      let returnArr = selectedVal.toString().split(',');
//          console.log(yearData[returnArr[0]].value);
//          console.log(monthData[returnArr[1]]);
//          console.log(dayData[returnArr[2]]);
      let valArr = [yearArr[returnArr[0]], monthArr[returnArr[1]], dayArr[returnArr[2]]];
      this.options.valueChangeFun && this.options.valueChangeFun(selectedIndex, valArr);
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

  hide () {
    this.datePicker.hide();
  }

  resetPosition () {
    this.datePicker.selectedIndex[0] = this.yearChageIndex;
    this.datePicker.selectedIndex[1] = this.monthChangeIndex;
    this.datePicker.selectedIndex[2] = this.dayChangeIndex;
  }
}
