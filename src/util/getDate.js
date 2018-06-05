/**
 * @Desc：获取时间
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * 如何使用，自己看。very简单！
 *
 * Created by liChenYang on 2017/8/21.
 */
class GetDate {
  // 获取年份数组，startYear为初始年数，lastYear为结束年数，如果不传lastYear，默认为当前年份
  getYear (startYear, lastYear) {
    if (startYear && lastYear) {
      startYear = parseInt(startYear);
      lastYear = parseInt(lastYear);
    }
    if (startYear > lastYear) {
      let temp = startYear;
      startYear = lastYear;
      lastYear = temp;
    }
    let yearArr = [];
    for (let i = startYear; i <= lastYear; i++) {
      i = i + '';
      yearArr.push(i);
    }
    return yearArr;
  }
  // 获取十二个月份
  getMonth () {
    let monthArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    return monthArr;
  }
  // 传入年月，获取当月天数，不传默认获取31天
  getDay (year, month) {
    let dayArr = [];
    let lastDay = 31;
    if (year && month) {
      year = parseInt(year);
      month = parseInt(month, 10);
      lastDay = new Date(year, month, 0);
      lastDay = lastDay.getDate();
    }
    for (let i = 1; i <= lastDay; i++) {
      i = i < 10 ? '0' + i : i + '';
      dayArr.push(i);
      i = parseInt(i);
    }
    return dayArr;
  }
  // 把数组转换为picker需要的数组
  getPickerArr (arr, temp) {
    let pickerArr = [];
    if (arr) {
      arr.map(function (item, index) {
        let objTemp = {
          'text': item + temp,
          'value': index
        };
        pickerArr.push(objTemp);
      });
    }
    return pickerArr;
  }
}
export default new GetDate();
