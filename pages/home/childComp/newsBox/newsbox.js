// pages/home/w-swiper/swiper.js
// components/w-swiper/w-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    news: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
  * 监听页面跳转
  */
    jumpDetails: function (e) {
      var report = e.currentTarget.dataset.report;
      var time = e.currentTarget.dataset.time;
      var web = e.currentTarget.dataset.web;
      var title = e.currentTarget.dataset.title;
      var image = e.currentTarget.dataset.image;
      var image2 = e.currentTarget.dataset.image2;
      wx.navigateTo({
        // url:'childComp/news/news?report=' + report +'&time=' + time +'&title=' +title +'&web=' + web +'&image='+image +'&image2='+image2,
        url:`childComp/news/news?report=${report}&time=${time}&title=${title}&image=${image}&image2=${image2}&web=${web}`
      })
    },
  }
})
