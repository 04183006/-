// pages/profile/childCops/gx/gx.js
// var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userId:'',
    message:'',
    submitShow:false,
    value0:''
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
                console.log(res.data.data);
               that.setData({
                 userName:res.data.data.userName,
                 userId:res.data.data.userId
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
  getMsg(e){
    // console.log(e.detail.value);
    this.setData({
      message: e.detail.value
    })
  },
  submit(){
    // var user = this.data.user;
    var message = this.data.message;
    // console.log(this.data.user)
    // console.log(this.data.message)
    wx.request({
      url: `https://www.gaoyk.top/user/addtip?userId=${this.data.userId}&msg=${message}`,
      method:'POST',
      success:res => {
        this.setData({
          submitShow:true
        })
        this.schidden();
        console.log(res);
        this.setData({
          value0:''
        })

      },
      fail:res => {
        console.log(res)
      }
    })
  },
    //隐藏收藏
    schidden(){
      var that = this;
       setTimeout(function(){
        that.setData({
          submitShow: false
        })
  
      },2000);
    },
})