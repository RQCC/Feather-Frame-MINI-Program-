
/*
  持久化存储
  使用方法：
  读取用户token：console.log( commonData.user_token );
  存储用户token：commonData.user_token = “123456ascd”;
*/ 
let commonData = {
  // 存储用户Token
  set user_token(token) {
    wx.setStorageSync("user_token", token);
  },
  // 获取用户Token
  get user_token() {
    let data = wx.getStorageSync("user_token");
    return data ? data : '';
  },
  // 存储的用户微信信息
  set user_info(info) {
    wx.setStorageSync("user_info", info);
  },
  // 获取用户微信信息
  get user_info() {
    let data = wx.getStorageSync("user_info");
    return data ? data : '';
  }
}

module.exports = commonData;