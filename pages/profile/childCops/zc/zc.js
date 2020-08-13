// pages/profile/childCops/mymsg/mymsg.js
// var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [],
    show1: false,
    show0: true,
    userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

     //请求用户数据
     var that = this;
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
            that.setData({
              userId:res.data.data.userId
            })
               wx.request({
                url: 'https://www.gaoyk.top/user/getCollection?userId=' + res.data.data.userId,
                success: (res) => {
                  that.setData({
                    commentList: res.data.data,
                  })
                  // console.log(this.data.commentList)
                  if (that.data.commentList) {
                    that.setData({
                      show0: false,
                      show1: true
                    })
                  }
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
  delete(e) {
    console.log(e.currentTarget.dataset.msgid);
    wx.request({
      url: `https://www.gaoyk.top/user/deleteCollection?userId=${this.data.userId}&informationId=${e.currentTarget.dataset.msgid}`, //本地服务器地址
      method:"POST",
      success: (res) => {
        this.onLoad();
        if (this.data.commentList.length == 1) {
          this.setData({
            show0: true,
            show1: false
          })
        }
      }
    })
  },
  jump(e) {
    // console.log(e.currentTarget.dataset);
    var hotspot = e.currentTarget.dataset.hotspot;
    var img = e.currentTarget.dataset.img;
    var informationid = e.currentTarget.dataset.informationid;
    var informationname = e.currentTarget.dataset.informationname;
    var introduce = e.currentTarget.dataset.introduce;
    var method = e.currentTarget.dataset.method;
    // console.log(informationname)

    wx.navigateTo({
      url: '../../../category/childCops/detile/detile?hotspot=' + hotspot + '&img=' + img
        + '&informationid=' + informationid + '&informationname=' + informationname
        + '&introduce=' + introduce + '&method=' + method,

    })
  }
})
