/**
 * 通过调用可以获取本月，近三个月，今年的日期
 * @param obj
 * @constructor
 */

function DateHelp(obj) {
  /*var obj = {
   date:'2015-02-01',//从此日期开始计算
   type:'month',//以年月日向前计算：年（year），月（month），日（day）
   value:'14',//向前计算的数值，年月日
   format:'yyyy/mm/dd'//日期格式
   }*/

  this.date = obj.date;
  this.type = obj.type;
  this.value = obj.value == undefined ? obj.value : 0;
  this.format = obj.format == undefined ? obj.format : 'yyyy-MM-dd';

  //日期和非日期格式获取年月日
  if (this.date instanceof Date) {
    //处理传进来的是日期函数的

    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
  } else {
    //处理传入的是非日期函数的

    this.year = this.date.substr(0, 4);
    this.month = this.date.substr(5, 2);
    this.day = this.date.substr(8, 2);
  }

}

DateHelp.prototype.beforeDate = function (type, value) {

  var _type = type || this.type,
    _value = value || this.value,
    _year = this.year,
    _month = this.month,
    _day = this.day;

  if (_type == 'year' || _type == '年') {
    _year -= _value;
  } else if (_type == 'month' || _type == '月') {
    _year -= parseInt(_value / 12);
    _month -= _value % 12;
    if (_month <= 0) {
      _year -= 1;
      _month += 12;
    }
  } else if (_type == 'day' || _type == '日') { //还未想好 只考虑减少7天的情况 如何值为0会出现报错 找不到的情况
    // console.log(_value)
    _day -= value;
    if (_day <= 0) {
      _month -= 1;
      if (_month <= 0) {
        _year -= 1;
        _month += 12;
      }
      if (_month == 1 || _month == 3 || _month == 5 || _month == 7 || _month == 8 || _month == 10 || _month == 12) {
        _day += 31;
      } else {
        _day += 30;
      }
    }
  } else if (_type == 'quarter' || _type == '季') {
    if (_month > 0 && _month <= 3) {
      _month = 1;
      _day = 1;
    } else if (_month > 3 && _month <= 6) {
      _month = 4;
      _day = 1;
    } else if (_month > 6 && _month <= 9) {
      _month = 7;
      _day = 1;
    } else if (_month > 9 && _month <= 12) {
      _month = 9;
      _day = 1;
    }
  }

  var date = new Date(_year, _month - 1, _day)
  return this.formatDate(date, this.format);
}

DateHelp.prototype.formatDate = function (date, fmt) {

  var o = {
    "M+": date.getMonth() + 1,     //月份
    "d+": date.getDate(),     //日
    "h+": date.getHours(),     //小时
    "m+": date.getMinutes(),     //分
    "s+": date.getSeconds(),     //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()    //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
DateHelp.prototype.getToday = function () {//获取当天
  return this.beforeDate('day', 0);
}
DateHelp.prototype.getThreeDays = function () {//获取前三天
  return this.beforeDate('day', 3);
}
DateHelp.prototype.getWeek = function () {//获取前一周
  return this.beforeDate('day', 7) + "/" + this.beforeDate('day', 0);
}
DateHelp.prototype.getMonth = function () {//获取一个月
  return this.beforeDate('month', 1) + "/" + this.beforeDate('day', 0);
}
DateHelp.prototype.quarter = function () {
  return this.beforeDate('quarter')
}
DateHelp.prototype.getThisMonth = function () {

  var first = new Date(this.year, this.month - 1);
  var last = new Date(this.year, this.month, 0);

  return this.formatDate(first, this.format) + "/" + this.formatDate(last, this.format);
}

DateHelp.prototype.getThreeMonth = function () {

  return this.beforeDate('month', 3) + "/" + this.beforeDate('day', 0);
}

DateHelp.prototype.getThisYear = function () {

  var first = new Date(this.year, 0, 1);
  var last = new Date(this.year, 11, 31);

  return this.formatDate(first, this.format) + "/" + this.formatDate(last, this.format);
}


/*
 //示例
 var myDate = new DateHelp({
 date:'2015-02-01',//从此日期开始计算
 format:'yyyy/MM/dd'
 });
 var myDate = new DateHelp({
 date:new Date(),//从此日期开始计算
 format:'yyyy/MM/dd'
 });
 console.log(myDate.getToday());*/
export {DateHelp}
