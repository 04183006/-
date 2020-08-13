// pages/home/home.js
import request from '../../service/network.js'
import {getHomeLBT,getHomeNews} from '../../service/home.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    LBTimage:[],
    newsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userId)
    //1.请求我们的轮播图数据
    getHomeLBT().then(res => {
     const banners = res.data;
     //保存数据
     this.setData({
       LBTimage:banners
     })
      console.log(res.data);
   }),
   //2.请求新闻数据
      getHomeNews().then(res => {
        const news = res.data;
        //保存数据
        this.setData({
          newsList: news
        })
        console.log(res.data);
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
  jump(){
    wx.navigateTo({
      url: './childComp/search/search',
    })
  }
})