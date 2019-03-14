/*
baseClass是对page的轻量化封装
可以称为一个简单的中间件
这种轻量化的封装会极大的减少你在编程过程中的工作量
你也可以根据我的思路随意删改
*/ 

// 引入一些常用的对象，并放入data字段中，方便调用，省去频繁的引入操作
// 接口
let API = require("../service/api.js");
// 数据请求
let Fetcher = require("../service/server.js");
// 路由
let Router = require("../router/index.js");
// 多语言
let LanguageManager = require("../language/index.js");
// 本地化数据
let CommonData = require("../commonData/index.js");
//广播
let NC = require("../notification/notificationCenter.js");

const baseClass = function (params) {
  /*
  origin_data会在你使用baseClass的时候自动插入
  page的data中；
  插入操作是在page的onLoad函数执行时进行的
  */ 
  let origin_data = {
    data: {
      // 图片下载链接
      image_url: '',
      // 传入的页面参数
      options: '',
      // api
      api: '',
      // 路由
      router: '',
      // 数据请求
      fetcher: '',
      // 常用本地数据
      commonData: '',
      // 语言的管理对象
      languageManager: '',
      // 当前获取的语言
      language: '',
      // 语言的code
      lan_code: ''
    },
    onLoad: function (options) {
      // 存储传来的数据
      if (options) {
        this.options = options;
        this.setData({
          options: this.options
        })
      }

      this.api = API;
      this.image_url = API.image_url;
      this.router = Router;
      this.fetcher = Fetcher;
      this.languageManager = LanguageManager;
      this.language = LanguageManager.language;
      this.lan_code = LanguageManager.languageCode;
      this.commonData = CommonData;
      
      this.setData({
        api: this.api,
        router: this.router,
        fetcher: this.fetcher,
        language: this.language,
        lan_code: this.lan_code,
        image_url: this.image_url,
        commonData: this.commonData,
        languageManager: this.languageManager
      })
      // 监听语言改变的广播
      NC.addObserver(this,this.refreshLanguage,NC.LAN_CHANGE);
      //
      this.on_load(options);
    },

    // 初始化  代替你在使用baseClass定义的onLoad
    // 别担心，其功能和原始的onLoad功能一样
    on_load: function (options) { },

    // 修改语言：1:中文 2:英文 3:日文
    // 你也可以自定义，具体可见 assets/language/index.js
    changeLanguage: function (code) {
      if (this.lan_code == code){
        return;
      }
      LanguageManager.languageCode = code;
      // 发出语言改变的广播，通知所有baseClass刷新
      NC.post(this, NC.LAN_CHANGE);
    },
    // 刷新语言
    refreshLanguage:function(){
      this.language = this.languageManager.language;
      this.lan_code = this.languageManager.languageCode;
      this.setData({
        language: this.language,
        lan_code: this.lan_code,
      });
      // 如果你需要监听语言的改变并做一些
      // 其他事情，请在page中重写此函数
      this.languageChanged();
    },
    // 如果你需要监听语言的改变并做一些
    // 其他事情，请在page中重写此函数
    languageChanged:function(){},
  };

  // 赋能给你自己定义的函数和data字段
  if (!params) {
    return origin_data;
  }
  for (var key in params) {
    if (key == 'onLoad') {
      origin_data.on_load = params[key];
      continue;
    }
    if (key == 'data') {
      Object.assign(origin_data[key], params[key]);
      continue;
    }
    origin_data[key] = params[key];
  }
  return origin_data;
}


// 获取assets中的资源
// 例如引入baseClass.js，应传入：'class/baseClass.js'
// 注意⚠️：此函数不能在assets中的js中使用
const assets = function (path) {
  let _path = 'assets/' + path;
  let count = 10;
  let model = '';
  let not_found = true;

  while (not_found) {
    not_found = false;
    try {
      model = require(_path)
    } catch (error) {
      not_found = true;
      _path = ('../' + _path);
    }
    if (count < 0) {
      console.error("对不起，没有找到资源：" + path);
      console.error("请确认您的资源名称和路径已经正确填写！例如引入baseClass.js，应传入：'class/baseClass.js'");
      not_found = false;
    }
    --count;
  }
  return model;
}


module.exports = {
  baseClass,
  assets,
};
