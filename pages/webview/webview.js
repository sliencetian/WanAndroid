// pages/webview/webview.js
var wxParse = require('../../wxParse/wxParse.js');
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    var loadUrl = decodeURIComponent(options.url)
    if (loadUrl.search('https') == -1){
      loadUrl = loadUrl.replace('http','https')
    }
    console.log('webview')
    console.log(options)
    console.log(options.title)
    wx.setNavigationBarTitle({
      title: options.title,
    })
    wx.showLoading({
      title: '加载中...',
    })
    that.loadHtmlContent(loadUrl)
  },
  loadHtmlContent:function(url){
    wx.request({
      url: url,
      success:function(res){
        wx.hideLoading()
        that.setData({
          content: wxParse.wxParse('article', 'html', res.data, that, 5)
        })
      },
      fail:function(){
        wx.hideLoading()
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

  }
})