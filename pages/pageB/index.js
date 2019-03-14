// pages/pageB/index.js
//引入封装类
const BaseClass = require('../../assets/class/baseClass.js').baseClass;
const assets = require('../../assets/class/baseClass.js').assets;
// 引入广播对象
const NC = assets("notification/notificationCenter.js");

Page(
  BaseClass({

    /**
     * 页面的初始数据
     */
    data: {
      movie_name:'',
      movie_status:'',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.warn("pageA 传来的参数是：");
      console.warn(this.options);
      this.movie_name = options['movie_name'];
      this.setData({
        movie_name: this.movie_name
      })
    },
    // 点击播放按钮
    palyMovie(){
      // 告诉 pageA 播放完成
      NC.post(this, NC.MOVIE_PLAY,"电影看完了");
      this.movie_status = 1;
      this.setData({
        movie_status: this.movie_status
      })
    },
    // 修改语言
    lanChane(e){
      let code = e.currentTarget.dataset.code;
      console.log('language code is: '+code);
      if(code == this.lan_code){
        return;
      }
      this.changeLanguage(code);
    }
  })
)