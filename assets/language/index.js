/*
  国际化文件（默认为中文）
  通过 languageCode 可以修改当前显示的语言
  配合 baseClass 可以轻易同步修改所有界面显示
*/ 

const CODE_KEY = "goal_language_code";

const LanguageManager = {

  //获取语言
  get language (){
    var lan = '';
    if (this.languageCode == 1) {
      lan = require('cn.js');
    } else if (this.languageCode == 2) {
      lan = require('./en.js');
    } else if (this.languageCode == 3) {
      lan = require('./jp.js');
    }
    return lan;
  },

  // 设置语言code
  set languageCode(code) {
    code = parseInt(code);
    wx.setStorageSync(CODE_KEY, code);
    if (this.onChange) {
      this.onChange(this.languageCode);
    }
  },

  // 获取语言code
  get languageCode(){
    return wx.getStorageSync(CODE_KEY) ? wx.getStorageSync(CODE_KEY) : 1;
  },
};

module.exports = LanguageManager;