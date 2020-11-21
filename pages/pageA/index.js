// pages/pageA/index.js

/*
小测试：
1. 广播测试：（ 涉及：nofiticationCenter.js ）
  点击pageA的播放‘观看’进入pageB，点击pageB页面的‘观看’按钮，会发一个
  广播给pageA，告诉pageA‘电影’已经看完
2. 数据请求处理：( 涉及： server.js  commonData.js )
  在pageA中点击数据请求，会发一个请求，并会有报错信息，报错信息是在server.js
  中封装的弹窗，server.js也支持自动显示或关闭加载动画，
  详情查assets/servie/server.js
3. 通过广播修改所有页面的语言显示：（ 涉及：language.js  notifications.js baseClass.js ）
  在 baseClass 代码中，changeLanguage中有一个广播发出，接收广播的函数
  也在baseClass中：refreshLanguage() ，这样保证了无论在外部哪个地方调用
  changeLanguage 函数，都会使所有已加载的页面修改界面语言
  如果你需要在此时做些其他事情，请在page中重写 languageChanged 函数
4. 路由 router 的使用
5. baseClass 的使用
*/

//引入封装类
const BaseClass = require('../../assets/class/baseClass.js').baseClass;
// 引入资源管理函数
const assets = require('../../assets/class/baseClass.js').assets;
// 使用资源管理函数引入
const NC = assets("notification/notificationCenter.js");

Page(
  BaseClass({

    /**
     * 页面的初始数据
     */
    data: {
      movie_status: 0,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      // 放入测试token
      this.commonData.user_token = "1234qwer";
      // 添加影片观看完成的监听
      NC.addObserver(this, this.moviePlay, NC.MOVIE_PLAY);
    },
    // 广播监听函数
    moviePlay(info) {
      console.warn("广播的信息：");
      console.warn(info);

      this.movie_status = 1;
      this.setData({
        movie_status: this.movie_status
      })
      // 如果不想再次接收广播，可以移除监听
      // NC.removeObserver(this, NC.MOVIE_PLAY);
    },
    //点击播放按钮
    playAction() {
      this.router.push('../pageB/index', {
        movie_name: this.language.movie_name
      });
    },
    // 获取用户数据
    fetchData() {
      // 你可在 server.js 中配置自动添加token功能
      // 减少参数的书写
      this.fetcher.post(this.api.user_info, {
          token: this.commonData.user_token
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            //do something
          } else {
            //do something
          }
        });
    },
    // 监听语言改变：
    languageChanged: function() {
      console.warn("此函数：languageChanged 在语言改变时被调用");
    }
  })
)




















