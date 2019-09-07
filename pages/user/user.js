// pages/user/user.js
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if(app.globalData.userInfo != null){
      that.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },

  login:function(){
    if (that.data.userInfo == null){
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      wx.showModal({
        content: '退出登录?',
        success:function(res){
          if(res.confirm){
            that.setData({
              userInfo:null
            })
            app.globalData.userInfo = null
            wx.setStorageSync("userInfo", null)
          }
        }
      })
    }
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
    if (app.globalData.userInfo != null){
      that.setData({
        userInfo: app.globalData.userInfo
      })
    }
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