/*
  接口API可以让你很方便的管理接口
  轻松切换线上线下接口

  示例：pageA和pageB中查看
*/

// 本地开发环境
const local = "http://local.miniprogram.cn/api/";
// 线上测试接口
const test = "http://test.miniprogram.cn/api/";
// 正式发布接口
const release = "http://miniprogram.cn/api/";

/// 最终使用的接口
const HOST = test;

let api = {
  // 获取图片链接
  image_url: 'http://img.miniprogram.cn/',
  // 图片尺寸
  size_64: '?imageView2/1/w/64/h/64',
  size_128: '?imageView2/1/w/128/h/126',
  size_256: '?imageView2/1/w/256/h/256',
  // --------------登陆------------登陆
  //用户身份验证
  auth: HOST + 'wechat/auth',
  //登陆 
  login: HOST + 'user/login',
  //发送短信验证码
  send_sms: HOST + 'user/sendsms',
  // 信息
  user_info: HOST + 'user/info',
  // 更新用户信息
  user_update: HOST + 'user/updateInfo',
}

module.exports = api;