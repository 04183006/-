// pages/category/childCops/detile/detile.js
import request from '../../../../service/network.js'
// var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scmsg:'',
    imgList: [
      { url: "/assets/category/dianzan_2.png" },
      { url: "/assets/category/sc.png" },
    ],
    userId:'',
    scshow:false,
    number: 0,
    data222: '',
    hotspot: '',
    img: '',
    informationId: '',
    informationName: '',
    introduce: '',
    method: '',
    comment: [],
    chooseSize: false,
    animationData: {},
    first_show: "block",
    second_show: 'none',
    comment2: '',
    parseList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取用户信息
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
                that.setData({
                  userId:res.data.data.userId
                })
              },
              fail: (err) => {
                // console.log(err);
              }
            })
          }
        })
      }
    })
  



    that.setData({
      hotspot: options.hotspot,
      img: options.img,
      informationId: options.informationid,
      informationName: options.informationname,
      introduce: options.introduce,
      method: options.method,
      informationId: options.informationid
    })



    function getComment() {
      return request({
        url: `/comment/findByInformationId?informationId=${options.informationid}`
      })
    }
    getComment().then(res => {

      this.setData({
        comment: res.data
      })
      // console.log(this.data.comment)
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  change_show() {
    // console.log("image ok")

    this.setData({
      first_show: "none",
      second_show: "block"
    })
  },
  getMSG(e) {
    // console.log(e);
    this.setData({
      comment2: e.detail.value
    })
  },
  push_comment(e) {
    console.log(e);
    console.log(this.data.comment);
    if (this.data.comment2 == '') {
      // console.log("请输入评论");
    } else {
      //提交最新评论

      console.log(this.data.comment2)
      console.log(this.data.informationId)
      // console.log(app.globalData.userNumber)
      // wx.getUserInfo({
      //   success:(res)=>{
      //     console.log(res);
      //   }
      // })
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      prevPage.onLoad(prevPage.options)
      // this.data.getComment();
      wx.request({
        url: 'https://www.gaoyk.top/user/comment',
        data: {
          commentMsg: this.data.comment2,
          informationId: this.data.informationId,
          userId: this.data.userId
        },
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          // console.log(res);
          // console.log("提交评论成功");
          // 刷新评论
          function getComment() {
            return request({
              url: `/comment/findByInformationId?informationId=${e.currentTarget.dataset.id}`
            })
          }
          getComment().then(res => {
            this.setData({
              comment: res.data
            })
            console.log(this.data.comment)
          })

          //恢复textarea的空状态
          this.setData({
            data222: ''
          })
        },
        fail: (err) => {
          // console.log(err);
        }
      })
    }

  },
  //收藏按钮
  sctap(){
    var that = this;
    that.setData({
      scshow:true
    })
    
   
    
  },
  //隐藏收藏
  schidden(){
    var that = this;
     setTimeout(function(){
      that.setData({
        scshow: false
      })

    },2000);
  },
  //发送收藏请求
  scRequset(){
    console.log(this.data.informationId);
    // console.log(app.globalData.userId);
    wx.request({
      url: `https://www.gaoyk.top/user/addCollection?userId=${this.data.userId}&informationId=${this.data.informationId}`,
      method:"POST",
      success:(res) => {
        console.log(res.data.status);
        if (res.data.status == "success"){
          this.setData({
            scmsg:"收藏成功！"
          })
          this.sctap();
          this.schidden();
        }
        else{
          this.setData({
            scmsg: "您已收藏！"
          })
          this.sctap();
          this.schidden();
        }
        
      },
      fail:res => {
        console.log(res);
      }
    })
  },

  parseAdd(e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.conmentid);
    // console.log(e.currentTarget.dataset.userid);
    // console.log(app.globalData.userId);

    wx.request({
      url: `https://www.gaoyk.top/user/praise?commentId=${e.currentTarget.dataset.conmentid}&userId=${e.currentTarget.dataset.userid}&praiseUserId=${this.data.userId}`,
      method:"POST",
      success:(res)=>{
        // console.log(res)
        // console.log("点赞成功");
        this.setData({
          number: 2
        })
        // 刷新评论
        function getComment() {
          return request({
            url: `/comment/findByInformationId?informationId=${e.currentTarget.dataset.id}`
          })
        }
        getComment().then(res => {
          this.setData({
            comment: res.data
          })
          // console.log(this.data.comment)
        })
      }
    })
  }

})