//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("app.js");
   this.userLogin();
   
  },
  globalData: {
     userId:'',
     img:'',
     userName:'',
     score:'',
     userNumber:''
  },
  userLogin:function(){
    var that = this;
    var promise = new Promise((resolve,reject) =>{
      wx.login({
        success: function (res) {
          var code = res.code;
          //获取用户信息
          wx.getUserInfo({
            success: (res) => {
              // console.log(res)
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
                  that.globalData.userId = res.data.data.userId; 
                  that.globalData.img = res.data.data.img;
                  that.globalData.userName = res.data.data.userName;
                  that.globalData.score = res.data.data.score;
                  that.globalData.userNumber = res.data.data.userNumber;
                },
                fail: (err) => {
                  console.log(err);
                }
              })
            }
          })
        }
      })
    })
    return promise;
  }
})