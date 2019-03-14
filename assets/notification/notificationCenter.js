/*
  广播/通知
  广播功能仿造Object-C语言的广播功能，
  通过 addObserver 函数注册广播，表明自己的监听（广播）的身份
  通过 post 发广播
  通过 removeObserver 移除自己监听者的身份

  示例：pageA和pageB中查看
*/

// 存放广播监听者以及触发动作
let ObserverArr = [];

/*
  广播名称注册
  强烈建议⚠️：
  1.使用此广播功能时将广播的名称注册在这处，因为如果发的广播很多很容易重名
  2.而且字符串粘贴复制很容易出错，如果出错又无法报错，对调试造成困难
  3.为了代码的健壮性，需要易于维护

  使用方法：
  NN中的属性将全部复制到NC中，可以通过NC访问到这些注册的名称
  比如 NC.MOVIE_PLAY
*/ 
const NN = {
  MOVIE_PLAY: 'MOVIE_PLAY',
  LAN_CHANGE: "LAN_CHANGE"
}


//广播
let NC = {
  //添加广播监听
  addObserver: function (observer, selector, name, info = '') {
    // 检查是否重复添加
    for (let i = 0; i < ObserverArr.length; i++) {
      if (ObserverArr[i].observer == observer && ObserverArr[i].name == name) {
        return;
      }
    }
    ObserverArr.push({
      observer: observer,//监听者
      selector: selector,//函数
      name: name,//监听的通知名称
      info: info//备用字段
    })
  },
  //发布广播
  ///name： 广播名称
  ///poster：发布者
  ///info：发送的信息
  post: function (poster, name, info = '') {
    console.log('***** notification name is ' + name);
    for (let i = 0; i < ObserverArr.length; i++) {
      let obj = ObserverArr[i];
      if (obj.name == name) {
        let observer = obj.observer;
        let selector = obj.selector;
        obj.selector(info);
      }
    }
  },
  //移除监听者
  removeObserver: function (observer, name) {
    for (let i = 0; i < ObserverArr.length; i++) {
      let obj = ObserverArr[i];
      if (obj.name == name && obj.observer == observer) {
        ObserverArr.splice(i, 1);
        break;
      }
    }
  }
}
NC = Object.assign(NC, NN);
module.exports = NC