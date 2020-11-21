// pages/shopDetail/index.js

const app = getApp()

const Tools = require("../../assets/js/tools.js").model

/*是否收起 true：收起 false：展开*/
let Goal_IsClose = false;
/*下拉的次数*/
let Goal_DownNum = 0;
/*下拉一次之后开始的计时器*/
let Goal_DownTimer = 0;
/*下拉一次之后的有效期时间 超过这个时间将重置下拉次数*/
let Goal_PullNumResetTime = 3000;
/*是否正在进行动画 ，如果正在进行，不做任何操作*/
let Goal_AnimationDoing = false;
/* 是否需要隐藏*/
let Goal_NeedHide = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // test num
    test_num:0,
    // test arr
    test_arr:[],

    /*上半部分 的高度*/
    topHeight: 200,
    /*上半部分 的动画：可以收起的部分*/
    topAnimation: '',
    /*滚动视图 展开时的高度*/
    scrollSpreadHeight: 500,
    /*滚动视图 收起时的高度*/
    scrollCloseHeight: 203,
    /*滚动视图 的动画*/
    scrollViewAnimation: '',
    /*swiper的高度*/
    swiperHeight: '',
    /*触发隐藏的位置*/
    hidePosition: '',

  },
  onLoad: function (options) {
    this.test_num = 10;
    this.setData({
      test_num: this.test_num
    })
    let arr = [];
    for (let i = 0; i < this.test_num;i++){
      arr.push(i);
    }
    this.test_arr = arr;
    this.setData({
      test_arr: this.test_arr
    })
    this.prepareScrollData(this.test_num);
  },
  // ------------------滚动--------------------滚动
  // 向下滑动
  bindScrollToUpper: function (e) {
    // console.log(e);
    // Top视图已展开/正在进行动画/不需要隐藏，不做任何操作
    if (!Goal_IsClose || Goal_AnimationDoing || !Goal_NeedHide) {
      return;
    }
    Goal_DownNum++;
    if (Goal_DownTimer) {
      clearTimeout(Goal_DownTimer);
    }
    console.log('Goal_DownNum=' + Goal_DownNum);
    if (Goal_DownNum >= 2) {
      // 如果在三秒内第二次下拉就展开
      console.log('触发成功！！');
      this.setShow(false);
      if (this.Goal_DownTimer) {
        clearTimeout(this.Goal_DownTimer);
      }
    } else {
      let _this = this;
      this.Goal_DownTimer = setTimeout(function () {
        Goal_DownNum = 0
        console.log('clean num')
      }, Goal_PullNumResetTime)
    }
  },
  // 向上划动
  bindScrollToLower: function (e) {

    console.log(e);
    // 已滚动视图展开/正在进行动画/不需要隐藏，不做任何操作
    if (Goal_IsClose || Goal_AnimationDoing || !Goal_NeedHide) {
      return;
    }
    this.setShow(true);
  },
  // 收起或展开顶部视图 true：收起  false：展开
  setShow: function (is_close) {
    Goal_IsClose = is_close;
    this.topAnimation = Tools.heightAnimation(Goal_IsClose ? 0 : this.topHeight);
    this.scrollViewAnimation = Tools.heightAnimation(Goal_IsClose ? this.scrollSpreadHeight : this.scrollCloseHeight);
    this.setData({
      topAnimation: this.topAnimation,
      scrollViewAnimation: this.scrollViewAnimation,
    })
    // 动画执行完之后
    let _this = this;
    Goal_AnimationDoing = true;
    setTimeout(function () {
      Goal_DownNum = 0;
      Goal_AnimationDoing = false;
      console.log('********OVER*************')
    }, 300)
  },
  // 准备滚动收起顶部的数据
  prepareScrollData: function (max_num) {
    console.log(max_num);
    // return;
    let _this = this;
    let params = {
      top_height: 500,
      menu_height: 100,
      item_height: 200,
      extra: 0,
      item_max_num: max_num,
      menu_elem: '#menu',
      scroll_ele: '#scroll',
    }
    Tools.scrollFixedSize(params,
      function (top_height, scroll_c_h, scroll_s_h, swiper_height, hide_position, need_hide) {
        // console.log(top_height + '--' + scroll_c_h + '--' + scroll_s_h);
        console.log(swiper_height + '--' + hide_position);
        // console.log(need_hide);
        Goal_NeedHide = need_hide;
        _this.topHeight = top_height;
        _this.hidePosition = hide_position;
        _this.swiperHeight = swiper_height;
        _this.scrollCloseHeight = scroll_c_h;
        _this.scrollSpreadHeight = scroll_s_h;
        _this.setData({
          topHeight: _this.topHeight,
          swiperHeight: _this.swiperHeight,
          hidePosition: _this.hidePosition,
          scrollCloseHeight: _this.scrollCloseHeight,
          scrollSpreadHeight: _this.scrollSpreadHeight,
        })
      });
  }
})