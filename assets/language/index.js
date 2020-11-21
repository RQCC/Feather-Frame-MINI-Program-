/*
  国际化文件（默认为中文）
  通过 languageCode 可以修改当前显示的语言
*/ 

const CN = require('cn.js');
const EN = require('en.js');
const JP = require('jp.js');
const CODE_KEY = "goal_language_code";

const LanguageManager = {
  //获取语言
  get language (){
    return [CN, EN, JP][this.languageCode-1];
  },
  // 设置语言code 1:中文 2:英文 3:日文
  set languageCode(code) {
    code = parseInt(code);
    wx.setStorageSync(CODE_KEY, code);
    if (this.onChange) {
      this.onChange(this.languageCode);
    }
  },
  // 获取语言code 如果没有设置默认为1
  get languageCode(){
    return wx.getStorageSync(CODE_KEY) ? wx.getStorageSync(CODE_KEY) : 1;
  }
};

module.exports = LanguageManager;