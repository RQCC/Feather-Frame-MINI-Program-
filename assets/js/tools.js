
const tools = {

  // 获取scrollView的高度 top -> menu -> scrollView
  // top_height: top(隐藏部分)的高度rpx  
  // menu_height: 菜单(悬停)的高度rpx
  // item_height: 每个元素的高度rpx
  // menu_elem : 菜单的
  // scroll_ele : scroll view的标签
  scrollFixedSize: function (params, resHandle) {
    if (params['is_booking_list']) {
      let _app = getApp();
      console.log('_app.winHeight = ' + _app.globalData.winHeight);
      this.fixSize(params, _app.globalData.winHeight, resHandle);
      return;
    }
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.fixSize(params, res.windowHeight, resHandle)
      }
    });
  },
  fixSize: function (params, windowHeight, resHandle) {
    let menu_height = params.menu_height;
    let item_height = params.item_height;
    let extra = params.extra;
    let item_max_num = params.item_max_num;
    let menu_elem = params.menu_elem;
    let scroll_ele = params.scroll_ele;

    let win_height = windowHeight;
    let scrol_close_height = '';
    let scrol_spread_height = '';
    let top_spread_height = '';
    console.log(win_height);
    // 获取菜单高度和top的px高度
    let _this = this;
    let query = wx.createSelectorQuery();
    // let scrol_mode = query.select(scroll_ele).
    //   boundingClientRect(function (res) {
    //     console.log(res);
    //   }).exec();

    let model = query.select(menu_elem).
      boundingClientRect(function (res) {
        console.log(res);
        let scale = res.height / menu_height;
        // 额外的高度
        let extra_px = extra * scale;
        // 菜单的px高度
        let menu_height_px = res.height;
        // 计算top的高度 scroll的高度
        let top_height_px = res.top;
        // scroll展开的高度
        let scroll_spread_height = win_height - menu_height_px - extra_px;
        // scroll收起的高度
        let scroll_close_height = win_height - menu_height_px - extra_px - top_height_px;
        // 计算swiper的高度 以及是否需要隐藏
        let item_height_px = item_height * scale;
        // swiper的高度
        let swiper_height = item_height_px * item_max_num;
        // 如果有两个以上的未显示，就需要隐藏top
        let Goal_NeedHide = true;
        if (swiper_height <= scroll_close_height) {
          swiper_height = scroll_close_height;
          Goal_NeedHide = false;
        } else if ((swiper_height - scroll_close_height) / item_height_px < 1) {
          Goal_NeedHide = false;
        }
        // 计算隐藏位置
        let hide_position = 0;
        if (Goal_NeedHide) {
          if (swiper_height <= scroll_spread_height) {
            swiper_height = scroll_spread_height + 10;
          }
          // item_height_px*0.5： 滑动0.5个item时就收起
          hide_position = swiper_height - scroll_close_height - item_height_px * 0.5
        }
        console.log(scroll_close_height + '--' + scroll_spread_height)
        if (resHandle) {
          resHandle(top_height_px, scroll_close_height, scroll_spread_height, swiper_height, hide_position, Goal_NeedHide);
        }
      }).exec();
  },
  // 滑动隐藏 高度动画 Top
  heightAnimation: function (height, time = 250) {
    let top_ani = this.animation(time);
    top_ani.height(height).step();
    return top_ani.export();
  },
  // Y位移动画 Top
  yAnimation: function (y, time = 400) {
    let top_ani = this.animation(time);
    top_ani.translateY(y).step();
    return top_ani.export();
  },
  // 创建Animation
  animation: function (time = 500) {
    return wx.createAnimation({
      duration: time, // 动画执行时间
      timingFunction: 'linear' // 动画执行效果
    });
  }
}


module.exports = {
  model: tools,
}