// import PickerDate from "../src/picker/pickerDate"
var nameEl = document.getElementById('chose');
var options = {
  startYear:1990,
  lastYear:2020,
  title: '日期选择',
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

    nameEl.innerText = text1 + ' ' + text2 + ' ' + text3;
  }

}
var picker = new PickerDate(options);
//console.log(Picker)

nameEl.addEventListener('click', function () {
  picker.show();
});



