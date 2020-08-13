// pages/home/childComp/fashion/fashion.js
import request from '../../../../service/network.js'
import { getTopTen} from '../../../../service/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top10_list:[],
    index:1,
    title:{
      name:"排名",
      title:"相关搜索",
      hot:"热度"
    },
    color_list: ['rgb(247, 110, 31)', "rgb(247, 137, 64)", "rgb(253, 172, 117)", "black", "black", "black", "black", "black", "black", "black",]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      getTopTen().then((res) => {
        
        this.setData({
          top10_list: res.data
        })
        // console.log(this.data.top10_list)
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

  }
})