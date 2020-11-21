//index.js
//获取应用实例
const app = getApp();
app.CCPage({
  data: {
    dataList: [],
  },
  onLoad: function() {
    this.setData({
      dataList: [{
          type: 1,
          name: '黄瓜'
        },
        {
          type: 2,
          name: '机器人'
        },
        {
          type: 2,
          name: '小兔子'
        },
        {
          type: 1,
          name: '苹果'
        },
      ]
    })


    // console.log(app.aa);
    this.test();
  },
  onFoodBy(e) {
    console.log("food nuy event:")
    console.log(e.detail);
  },
  toyBuy(e) {
    console.log("toy nuy event:")
    console.log(e.detail);

  },
  methods: {
    

  }

})