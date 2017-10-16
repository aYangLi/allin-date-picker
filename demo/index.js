// import PickerDate from "../src/picker/pickerDate"
var choseEl = document.getElementById('chose');
var resetEl = document.getElementById('reset');
var options = {
  startYear:1900,
  lastYear:2020,
  title: '日期选择',
  defaultYear:'1980年',//默认选中的年份，不传则默认为结束时间
  defaultMonth: '02月',//默认选中的月份，不传则默认为01
  defaultDay: '02日',//默认选中的天，不传则默认为01
  changeFun:function (index,val) {
    console.log('选择器改变了' + index);
    console.log('选择器改变了' + val);
  },
  selectFun:function (index,val) {
    console.log('选择器选择了' + index);
    console.log('选择器选择了' + val);
    var text1 = val[0];
    var text2 = val[1];
    var text3 = val[2];

    choseEl.innerText = text1 + '年 ' + text2 + '月 ' + text3 + '日';
  }

}
var picker = new PickerDate(options);
//console.log(Picker)

choseEl.addEventListener('click', function () {
  picker.show();
});
resetEl.addEventListener('click',function () {
  picker.resetPosition();
})



