//index.js
//获取应用实例

const app = getApp();
app.CCPage({
  data: {
    motto: 'Hello World',
    color: '1',
    ccnum: '100',
  },
  onLoad: function() {
    // console.log(app.aa);
    // console.log(this.ccnum);
    this.ccnum = 100;
    // console.log(this);
    this.test();
  },
  test: function() {

    const apiList = [
      {
        interval: 2000,//超时时间
        retryTimes: 3,//重试次数
        name: 'getHoliday',//名称
        apiName: '/v1/config/holiday',//api地址
        method: 'POST',//请求类型get/post
        params: {//参数表：
          post: [
            {
              param: 'app_key',//参数名称
              isNeed: 1,//是否必须传，1:是 0:否
            },
            {
              param: 'sign',
              isNeed: 1,
            },
            {
              param: 'year',
              isNeed: 1,
            },
            {
              param: 'ticket',
              isNeed: 0,
            },
          ],
        },
        get signKey() {
          return getParKeys(this.params.post);
        },
      },
      {
        interval: 2000,
        retryTimes: 3,
        name: 'getPhoneInfo',
        apiName: '/v1/oauth/getPhoneInfo',
        method: 'POST',
        params: {
          post: [
            {
              param: 'app_key',
              isNeed: 1,
            },
            {
              param: 'sign',
              isNeed: 1,
            },
            {
              param: 'iv',
              isNeed: 1,
            },
            {
              param: 'encrypted_data',
              isNeed: 1,
            },
            {
              param: 'ticket',
              isNeed: 0,
            },
          ],
        },
        get signKey() {
          return getParKeys(this.params.post);
        },
      }]
    console.log(apiList[0].signKey);
    console.log(apiList[1].signKey);
  }
})

function getParKeys(params) {
  // console.log('come in!');
  // console.log(params);
  // console.log(typeof params);
  if (typeof params != 'object') return;
  // console.log('DO');
  var keys = [];
  console.log(params.length);
  for (var i = 0; i < params.length; i++) {
    // console.log(params[i])
    // console.log(params[i].param)
    keys.push(params[i].param);
  }
  return keys;
}