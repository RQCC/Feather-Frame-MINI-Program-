// components/food/food.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  created() {
    console.log('this is food components!');
  },

  /**
   * 组件的方法列表
   */
  methods: {
    foodBy(){
      this.triggerEvent('foodBy' ,'你大爷')
    },
  }
})