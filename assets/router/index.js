/*
路由是基于 wx.navigate 简单的封装
配合BaseClass使用，方便调用
主要更新点是页面之间的参数传递以数组的方式，一目了然

示例：pageA和pageB中查看
*/
const router = {
  // 添加新页面
  // url：page路径
  // params传的参数
  push: function (url, params) {
    let url_params = this.urlParams(params);
    wx.navigateTo({
      url: url + url_params,
    })
  },
  // 返回 delta：返回的层数 不传默认为 1
  back: function (delta = 1) {
    wx.navigateBack({
      delta: delta
    });
  },
  // 重定向
  // url：page路径   params：传的参数
  redirect: function (url, params) {
    let url_params = this.urlParams(params);
    wx.redirectTo({
      url: url + url_params,
    })
  },
  // 获取当前的pages
  getCurrentPages: function () {
    return wx.getCurrentPages();
  },
  // 把url和params拼接一起
  urlParams: function (params) {
    if (!params) {
      return '';
    }
    let content = '';
    let index = 0;
    for (var key in params) {
      if (index == 0) {
        content += '?' + key + '=' + params[key];
      } else {
        content += '&' + key + '=' + params[key];
      }
      index++;
    }
    return content;
  }
}

module.exports = router;