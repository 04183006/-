//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  onLoad: function () {
    //获取code
   
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    setTimeout(this.jump,1500)
  },
  jump() {
    wx.switchTab({
      url: '../home/home',
    })
  }
})


