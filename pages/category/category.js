// pages/category/category.js
import request from '../../service/network.js'
import {
  getCateData
} from '../../service/category.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:1,
    swiperIndex:0,
    dataList: [],
    url_list1:[],
    url_list2: [],
    url_list3: [],
    isShow1:true,
    isShow2: false,
    isShow3: false,
    userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //请求全局数据
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
  

    getCateData().then(res => {
      var arr1 = [];
      var arr2 = [];
      var arr3 = [];
      for (let i = 0; i < res.data.length; i++) {
        //家居展示图
        // const arr1 = [];
        if (res.data[i].typeId == 1) {


          //  console.log(res.data[i]) 
          arr1.push(res.data[i]);
        }

        //野外展示图
        else if (res.data[i].typeId == 2) {

          arr2.push(res.data[i])


        }

        //慢性疾病展示图
        else {


          arr3.push(res.data[i])
        }

      }
      this.setData({
        url_list1: arr1,
        url_list2: arr2,
        url_list3: arr3,
      })
      // console.log(arr1)
      // console.log(arr2)
      // console.log(arr3)

      // if(this.data.id == 1){
      //   this.setData({
      //     url_list: arr1,
      //   })
      // }

      // if(this.data.id == 2){
      //   this.setData({
      //     url_list:arr2
      //   })
      // }

      // if (this.data.id == 3) {
      //   this.setData({
      //     url_list: arr3
      //   })
      // }

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
  swiperChange(e) {
    // console.log(e.detail.current)
    this.setData({
      swiperIndex: e.detail.current,
      // index: this.data.index > 100? this.data.index -20 : this.data.index + 20
    })
  },
  changeid1(e){
    // console.log(e.currentTarget.dataset.id)
    this.setData({
      isShow1:true,
      isShow2:false,
      isShow3:false,
      swiperIndex:0,
    })
  },
  changeid2(e) {
    this.setData({
      isShow2: true,
      isShow3: false,
      isShow1: false,
      swiperIndex: 0,
    })

   
  },
  changeid3(e) {
    this.setData({
      isShow3: true,
      isShow2: false,
      isShow1: false,
      swiperIndex: 0,
    })
  },
  jump(e){
    // console.log(e)
    var hotspot = e.currentTarget.dataset.hotspot;
    var img = e.currentTarget.dataset.img;
    var informationid = e.currentTarget.dataset.informationid;
    var informationname = e.currentTarget.dataset.informationname;
    var introduce = e.currentTarget.dataset.introduce;
    var method = e.currentTarget.dataset.method;
      
      //增加热度
      wx.request({
        url: `https://www.gaoyk.top/information/hot?userId=${this.data.userId}&informationId=${informationid}`, //本地服务器地址
        method: 'POST',
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (res) {
          // console.log("失败");
        }
      })
   

   
    wx.navigateTo({
      url: 'childCops/detile/detile?hotspot=' + hotspot + '&img='+img
        + '&informationid=' + informationid + '&informationname=' + informationname 
        + '&introduce=' + introduce + '&method=' + method,
      
    })



    // var report = e.currentTarget.dataset.report;
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

    // wx.navigateTo({
    //   url: 'childComp/news/news?report=' + report + '&time=' + time + '&title=' + title + '&web=' + web + '&image=' + image + '&image2=' + image2,
    // })
  },
})