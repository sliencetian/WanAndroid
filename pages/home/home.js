// pages/home/home.js
const app = getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    pageList:[],
    pageNumber:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh()
    that = this
    that.loadBannerData()
    that.loadPageList()
  },

  loadBannerData:function(){
    wx.request({
      url: app.globalData.baseUrl +'banner/json',
      success:function(res){
        that.setData({
          banner: res.data.data
        })
      }
    })
  },
  loadPageList:function(){
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.baseUrl + 'article/list/'+that.data.pageNumber+'/json',
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        var resultlist = res.data.data.datas
        var tempList
        if(res.data.currPage == 1){
          tempList = resultlist
        } else {
          tempList = that.data.pageList.concat(resultlist)
        }
        that.setData({
          pageList: tempList
        })
        
      },
      fail:function(){
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
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
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    that.setData({
      pageNumber: 0,
    })
    that.loadPageList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = that.data.pageNumber + 1;
    that.setData({
      pageNumber: page
    })
    that.loadPageList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  homeBannerImgTap:function(event){
    var data = event.currentTarget.dataset.data
    console.log(data)
    wx.navigateTo({
      url: '../../pages/webview/webview?url=' + encodeURIComponent(data.url) + '&title=' + data.title,
    })
  }
})