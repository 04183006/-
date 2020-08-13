// pages/news/news.js
// const app = getApp();
// //引入插件：微信同声传译
// const plugin = requirePlugin('WechatSI');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    report:'',
    web:'',
    title:'',
    time:'',
    imageList: [],
    image:'',
    image2:'',
    first_show:"block",
    second_show:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      report:options.report,
      time: options.time || "2019-04-11",
      web: options.web || "99健康网",
      title: options.title || "春季如何调理脾胃 调理脾胃的养生粥推荐",
      image: options.image || "https://www.gaoyk.top/img/news/19.jpg",
      image2: options.image2 || "https://www.gaoyk.top/img/news/20.jpg",
      //处理数据
    })

    setTimeout(()=>{
      this.setData({
        first_show:"none",
        second_show:"block"
      })
    },1000)
  // console.log(this.data.imageList)
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      imageList: [{ 'url': this.data.image }, { 'url': this.data.image2 }]
    })
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  hear: function (e) {
    var report = e.currentTarget.dataset.report;
    // var time = e.currentTarget.dataset.time;
    // var web = e.currentTarget.dataset.web;
    // var title = e.currentTarget.dataset.title;
    // var image = e.currentTarget.dataset.image;
    // var image2 = e.currentTarget.dataset.image2;
    // console.log(report);
    // console.log(title);
    // console.log(web);
    // console.log(time);
    // console.log(image);
    console.log(e.currentTarget)

    wx.navigateTo({
      url: '../yuyin-wenzi/yuyin-wenzi?report=' + report,
    })
  },
})