// pages/structure/structure.js
var router = require('../../utils/page-router.js')
var app = getApp()
var that
Page({
  data: {
    /** 
     * 导航数据 
     */
    tabDatas: ['体系','导航'],
    structListData:[],
    naviListData:[],
    /** 
     * 当前激活的当航索引 
     */
    currentActiveNavIndex: 0,
    /** 
     * 上一个激活的当航索引 
     */
    prevActiveNavIndex: -1,
    /** 
     * scroll-view 横向滚动条位置 
     */
    scrollLeft: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.stopPullDownRefresh()
    that.refreshTabData()
  },
  loadStructListData:function(){
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.baseUrl + 'tree/json',
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        console.log(res)
        that.setData({
          structListData: res.data.data
        })
      },
      fail: function () {
        wx.hideNavigationBarLoading()
      }
    })
  },
  loadNaviListData: function () {
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.baseUrl + 'navi/json',
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        console.log(res)
        that.setData({
          naviListData: res.data.data
        })
      },
      fail: function () {
        wx.hideNavigationBarLoading()
      }
    })
  },
  refreshTabData: function () {
    if (that.data.currentActiveNavIndex == 0 && that.data.structListData.length == 0){
      that.loadStructListData()
    } else if (that.data.naviListData.length == 0){
      that.loadNaviListData()
    }
  },

  jumpArticleList:function(item){
    var data = item.currentTarget.dataset.data
    router.articleList(data.id, data.name)
  },

  jumpArticleDetail: function (item) {
    var data = item.currentTarget.dataset.data
    router.webView(data.link, data.title)
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
   * 顶部导航改变事件，即被点击了 
   * 1、如果2次点击同一个当航，则不做处理 
   * 2、需要记录本次点击和上次点击的位置 
   */
  topNavChange: function (e) {
    var nextActiveIndex = e.currentTarget.dataset.currentIndex,
      currentIndex = this.data.currentActiveNavIndex;
    if (currentIndex != nextActiveIndex) {
      this.setData({
        currentActiveNavIndex: nextActiveIndex,
        prevActiveNavIndex: currentIndex
      });
      that.refreshTabData();
    }
  },
  /** 
   * swiper滑动时触发 
   * 1、prevIndex != currentIndex 表示的是用手滑动 swiper组件 
   * 2、prevIndex = currentIndex  表示的是通过点击顶部的导航触发的 
   */
  swiperChange: function (e) {
    var prevIndex = this.data.currentActiveNavIndex,
      currentIndex = e.detail.current;
    this.setData({
      currentActiveNavIndex: currentIndex
    });
    if (prevIndex != currentIndex) {
      this.setData({
        prevActiveNavIndex: prevIndex
      });
    }
    this.scrollTopNav();
    that.refreshTabData()
  },
  /** 
   * 滚动顶部的导航栏 
   * 1、这个地方是大致估算的 
   */
  scrollTopNav: function () {
    /** 
     * 当激活的当航小于4个时，不滚动 
     */
    if (this.data.currentActiveNavIndex <= 3 && this.data.scrollLeft >= 0) {
      this.setData({
        scrollLeft: 0
      });
    } else {
      /** 
       * 当超过4个时，需要判断是向左还是向右滚动，然后做相应的处理 
       */
      var plus = this.data.currentActiveNavIndex > this.data.prevActiveNavIndex ? 60 : -60;
      this.setData({
        scrollLeft: this.data.scrollLeft + plus
      });
    }
    console.info(this.data.currentActiveNavIndex, this.data.prevActiveNavIndex, this.data.scrollLeft);
  }
})  