// pages/articleList/articleList.js
const app = getApp()
var util = require('../../utils/util.js')
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageList: [],
    pageNumber: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.stopPullDownRefresh()
    wx.setNavigationBarTitle({
      title: '收藏列表',
    })
    that.loadPageList()
  },
  loadPageList: function () {
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.baseUrl + 'lg/collect/list/' + that.data.pageNumber + '/json',
      header:{
        'cookie': app.globalData.cookie,
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        if (res.data.errorCode == 0){
          var resultlist = res.data.data.datas
          var tempList
          if (res.data.data.curPage == 1) {
            tempList = resultlist
          } else {
            tempList = that.data.pageList.concat(resultlist)
          }
          var collectids = app.globalData.collectids
          for (var i in tempList) {
            tempList[i].authorUrl = util.generateUserIconByAuthor(tempList[i].author)
            if (collectids.indexOf(tempList[i].originId) != -1) {
              tempList[i].collect = true
            }
          }
          that.setData({
            pageList: tempList
          })
        } else {

        }
        

      },
      fail: function () {
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
  homeBannerImgTap: function (event) {
    var url = event.currentTarget.id
    wx.navigateTo({
      url: '../../pages/webview/webview?url=' + encodeURIComponent(url),
    })
  }
})