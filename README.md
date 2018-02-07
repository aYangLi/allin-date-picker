# allin-date-picker

简洁轻便好使的时间选择器。

## 依赖
依赖better-picker.js=>better-scroll.js,原生es6语法实现。

## 如何使用

### 通过npm引入 ###

安装allin-date-picker

```shell
npm install allin-date-picker --save-dev
```
引入allin-date-picker

```javascript
import PickerDate from 'pickerDate'
```

>如果不支持import, 请使用

```javascript
var PickerDate = require('pickerDate')
```

html 部分：

```javascript
<div id="name">点我选择</div>
```

JS 部分：
```javascript
var nameEl = document.getElementById('name');
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
nameEl.addEventListener('click', function () {
	pickerDate.show();
});
```

### 编程接口
show (next)

显示筛选器，next 为筛选器显示后执行的回调函数。

hide ()

隐藏筛选器，一般来说，筛选器内部已经实现了隐藏逻辑，不必主动调用。

resetPosition()

重置选择器恢复初始默认选项

## 如何构建
allin-date-picker的源码是基于webpack构建的

首先，clone项目源码
```bash
git clone https://github.com/aYangLi/allin-date-picker.git
```

安装依赖
```bash
cd allin-date-picker
npm install
```
测试demo页

```bash
npm run dev
```
打开浏览器访问如下地址, 查看效果

> localhost:9090

线上 demo 访问，查看效果：

[线上效果地址](http://www.yculcy.cn/allin-date-picker/)
