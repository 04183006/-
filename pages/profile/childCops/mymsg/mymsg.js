// pages/profile/childCops/mymsg/mymsg.js
// var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:[],
    show1:false,
    show0:true
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
                  // console.log(res.data.data);
                //  that.setData({
                //    userName:res.data.data.userName,
                //    userId:res.data.data.userId
                //  })

                 wx.request({
                  url: 'https://www.gaoyk.top/user/message?userId=' + res.data.data.userId,
                  success:(res)=>{
                    // console.log(res)
                    that.setData({
                      commentList:res.data.data
                    })
                    if(that.data.commentList){
                      that.setData({
                        show0:false,
                        show1:true
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

    // console.log(app.globalData.userId)  
     
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
  delete(e){
    console.log(e.currentTarget.dataset.msgid);
    wx.request({
      url: 'https://www.gaoyk.top/user/delete?messageId=' + e.currentTarget.dataset.msgid,
      success:(res)=>{
        this.onLoad();
        if (this.data.commentList.length == 1){
          this.setData({
            show0:true,
            show1:false
          })
        }
      }
    })
  }
})