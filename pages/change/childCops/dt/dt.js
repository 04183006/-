// pages/change/chidCops/dt/dt.js
var Data = require("./tiku.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradetext: '成绩：',
    grade: 0,//成绩
    questionnum: 10,//总数
    questions: Data.questions,//题库
    index: 0,//下标
    isShow:false,
    select_Show:false,
    right_Show:false,
    wrong_Show:false,
    canAnswer: '',//是否可以答题
    dtstyleColorList: ["rgb(236, 232, 232)", 'rgb(236, 179, 179)', 'rgb(198, 230, 165)', 'rgb(167, 204, 235)', 'rgb(219, 167, 235)', 'rgb(235, 167, 167)', 'rgb(235, 231, 167)', 'rgb(167, 235, 226)', 'rgb(236, 179, 179)', 'rgb(198, 230, 165)']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(Data)
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
  //选项点击操作
  select: function (e) {
    //获取点击元素的id
    var select = e.currentTarget.dataset.id;
    //获取点击问题的正确答案
    var right_answer = Data.questions[this.data.index].right_answer;
    //答案正确
    if (select == right_answer) {
      this.setData({
        grade: this.data.grade + 10,//得分+1
      })
    this.setData({
      right_Show:true,
      select_Show: true
    })


      // console.log("答案正确");

      // app.globalData.grade = this.data.grade;
    }else{
      this.setData({
        wrong_Show: true,
        select_Show: true
      })
      // console.log("答案错误");
    }
    //不是最后一道题，跳转下一题
    if (this.data.index < this.data.questionnum - 1) {
      // console.log("不是最后一道题")
      setTimeout(()=>{
        this.NextQuestion();
      },1500)
    }
    //最后一道题
    else if (this.data.index == this.data.questionnum - 1) {
      this.setData({
        canAnswer: 'true'//禁止答题
      })
      setTimeout(() => {
        this.GoEnd();
      },1000)
    }
  },

  // 切换题目
  NextQuestion: function () {
    //不是最后一道题
    if (this.data.index < this.data.questionnum - 1) {
      this.setData({
        index: this.data.index + 1,
        right_Show:false,
        wrong_Show:false,
        select_Show: false
      })
    }
    //最后一道题
    if (this.data.index == this.data.questionnum - 1) {
      this.setData({
        index: this.data.index,
       
      })
      // console.log("答题结束");
    }
  },
  // //跳转结束页面
  GoEnd: function () {
    this.setData({
      right_Show: false,
      wrong_Show: false,
      select_Show: false
     
    })
    wx.redirectTo({
      url: '../js/js?score='+this.data.grade,
    })
  },
  //提示显示
  tichange(){
    if(this.data.isShow == false){
      console.log("123")
        this.setData({
          isShow:true,
          select_Show: true
        })
    }else{
      this.setData({
        isShow: false,
        select_Show: false
      })
    }
    
  }
})