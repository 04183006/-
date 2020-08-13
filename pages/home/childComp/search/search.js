// pages/home/childComp/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    dataList:[],
    show0:false,
    show1: false,
    rdmsg:[],
    gxmsg:[],
    userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
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
                //请求数据
                wx.request({
                  url: 'https://www.gaoyk.top/information/getTen',
                  success:res => {
                    // console.log(res.data.data[0]);
                    var arrlist = [];
                    arrlist.push(res.data.data[0])
                    arrlist.push(res.data.data[1])
                    arrlist.push(res.data.data[2])
                    // console.log(arrlist);
                    that.setData({
                      rdmsg:arrlist,
                    })
                  }
                })
              
                //获取推荐信息
              //  console.log(app.globalData.userId)
                wx.request({
                  url: 'https://www.gaoyk.top/user/recommend?userId=' + res.data.data.userId,
                  success: res=> {
                    // console.log(res)
                    that.setData({
                      gxmsg:res.data.data
                    })
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
  getValue(e){
    // console.log(e.detail.value);
    this.setData({
      value:e.detail.value
    })

    //请求数据每隔1s请求1次数据
    // setTimeout(function(){
     if(this.data.value == ''){
       this.setData({
         show0: false,
         show1:false
       })
     }else{
       wx.request({
         url: 'https://www.gaoyk.top/information/findlike?informationName=' + this.data.value,
         success: (res) => {
           // console.log(res);
           if (res.data.data == null) {
             this.setData({
               show0: true
             })
           } else {
             this.setData({
               dataList: res.data.data,
               show0: false,
               show1:true
             })
            //  console.log(that.data.dataList)
           }
         }
       })   
     }
    
  },
  jump(e){
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