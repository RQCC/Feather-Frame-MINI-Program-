/*
  1.数据请求基于微信的wx.request封装,如果是开发支付宝请使用my.request替换
  2.通过外层加入promiss结果以promiss对象的形式返回
  3.数据请求封装了简单的加载动画的功能，通过loadingStyle参数控制
*/
// 用户token，我们经常会用到的
let user_token = "alksjldk989a8sd7adsvu8cvsd";

// 数据请求封装
function FetcherRequest(api, param, loadingStyle, autoAlertError, method) {
  // 注意⚠️⚠️：此处可以设置post请求自动插入token的操作
  // 这样以后每次调用接口就不用传入token了
  // if (user_token && method == "POST") {
  //   if (param) {
  //     param['token'] = user_token;
  //   } else {
  //     param = { 'token': user_token };
  //   }
  // }
  const req = new Promise((resolve, reject) => {
    if (loadingStyle) {
      wx.showLoading();
    }
    wx.request({
      url: api,
      data: param ? param : {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: method,
      success(res) { //成功
        if (loadingStyle == 1) { //自动关闭加载动画
          wx.hideLoading();
        }
        resolve(res.data);
      },
      fail(err) { //失败
        //关闭加载动画
        wx.hideLoading();
        // 显示网络异常
        wx.showModal({
          title: 'Error',
          content: '对不起，服务器或网络错误，请稍后再试或联系工作人员',
        })
        reject('100 error');
      },
      complete() { //完成
      }
    })
  }).then(data => { //正常返回数据
    // 在此处检查数据是否正常，如果不正常通过autoAlertError判断是否显示错误信息
    // 假设status==200是正常数据
    if (data.status != 200 && autoAlertError) {
      wx.showModal({
        title: 'Error',
        content: data.msg
      })
    }
    return data;
  })
  return req;
}


const fetcher = {

  /*
    api:   接口
    param: 参数
    loadingStyle: 加载动画的模式：默认：1
      0:不显示加载动画
      1:自动显示，数据加载完成后关闭 
      2:自动显示，加载完后不关闭（如果开启自动报错将自动关闭）
    autoAlertError: 是否自动报错(当数据请求异常或返回的数据状态 != 200时) 默认为false
    return: Promise对象
  */

  // POST 请求
  post: function(api, param, loadingStyle = 1, autoAlertError) {
    return FetcherRequest(api, param, loadingStyle, autoAlertError, "POST")
  },
  // POST 无参数请求
  post_wp: function(api, loadingStyle = 1, autoAlertError) {
    return FetcherRequest(api, {}, loadingStyle, autoAlertError, "POST");
  },
  // GET 请求
  get: function(api, param, loadingStyle = 1, autoAlertError) {
    return FetcherRequest(api, param, loadingStyle, autoAlertError, "GET");
  },
  // GET 无参数请求
  get_wp: function(api, loadingStyle = 1, autoAlertError) {
    return FetcherRequest(api, {}, loadingStyle, autoAlertError, "GET");
  }
}

module.exports = fetcher;