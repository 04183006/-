// pages/change/childCops/js/js.js
// var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that = this;
    //获取用户信息
    wx.login({
      success: function (res) {
        var code = res.code;
        //获取用户信息
        wx.getUserInfo({
          success: (res) => {
            console.log(res)
            var data = {
              img: res.userInfo.avatarUrl,
              userName: res.userInfo.nickName,
              userNumber: code
            }
            // console.log(data)
            //请求openid
            wx.request({
              url: 'https://www.gaoyk.top/user/login',
              data: {
                img: res.userInfo.avatarUrl,
                userName: res.userInfo.nickName,
                userNumber: code
              },
              method: "POST",
              header: {
                "Content-Type": "application/json"
              },
              success: (res) => {
                console.log(res.data.data);
                that.setData({
                  score: options.score
                })

                console.log(res.data.data.userNumber)
                console.log(options.score)
                //向后台发送成绩
                wx.request({
                  url: `https://www.gaoyk.top/user/score?userNumber=${res.data.data.userNumber}&score=${options.score}`,
                  method: "GET",
                  header: {
                    "Content-Type": "application/json"
                  },
                  success: (res) => {
                    console.log(res)
                    console.log("加分")
                    // console.log(`${app.globalData.userId}本次成绩增加${options.score}分！`)
                  },
                  fail: (err) => {
                    console.log(err);
                  }
                })

              },
              fail: (err) => {
                console.log(err);
              }
            })
          }
        })
      }
    })




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  jump() {
    wx.switchTab({
      url: '../../change',
    })
  }
})