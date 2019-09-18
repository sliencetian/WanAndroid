var app = getApp()
var util = require('../../utils/util.js')
var that
Page({
  data: {
    /** 
     * 导航数据 
     */
    tabDatas: [],
    tabListDatas: [],
    pageNumbers: [],
    /** 
     * 当前激活的当航索引 
     */
    currentActiveNavIndex: 0,
    activeTab: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activeTab: 'tab-item-' + this.data.currentActiveNavIndex
    })
    that = this
    wx.stopPullDownRefresh()
    that = this
    that.loadTabsData()
  },
  loadTabsData: function () {
    wx.request({
      url: app.globalData.baseUrl + 'wxarticle/chapters/json',
      success: function (res) {
        that.setData({
          tabDatas: res.data.data
        })
        that.refreshTabData()
      }
    })
  },
  scrollToBottom: function () {
    that.loadMoreData()
  },
  loadMoreData: function () {
    var currTab = that.data.tabDatas[that.data.currentActiveNavIndex];
    that.data.pageNumbers[currTab.id] = that.data.pageNumbers[currTab.id] + 1;
    that.loadListDataByTab()
  },
  loadListDataByTab: function () {
    wx.showNavigationBarLoading()
    var currTab = that.data.tabDatas[that.data.currentActiveNavIndex];
    var url = app.globalData.baseUrl + 'wxarticle/list/' + currTab.id +'/'+ that.data.pageNumbers[currTab.id] + '/json';
    wx.request({
      url: url,
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        var resultListData = that.data.tabListDatas
        if (res.data.data.curPage == 0) {
          resultListData[currTab.id] = res.data.data.datas
        } else {
          resultListData[currTab.id] = resultListData[currTab.id].concat(res.data.data.datas)
        }
        var collectids = app.globalData.collectids
        for (var i in resultListData[currTab.id]){
          resultListData[currTab.id][i].authorUrl = util.generateUserIconByAuthor(resultListData[currTab.id][i].author)
          if (collectids.indexOf(resultListData[currTab.id][i].id) != -1) {
            resultListData[currTab.id][i].collect = true
          }
        }
        that.setData({
          tabListDatas: resultListData
        })
      },
      fail: function () {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  refreshTabData: function () {
    var currTab = that.data.tabDatas[that.data.currentActiveNavIndex];
    if (typeof that.data.tabListDatas[currTab.id] == 'undefined') {
      that.data.pageNumbers[currTab.id] = 0;
      that.loadListDataByTab()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var currTab = that.data.tabDatas[that.data.currentActiveNavIndex];
    that.data.pageNumbers[currTab.id] = 0;
    that.loadListDataByTab()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    that.loadMoreData()
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
      });
      that.refreshTabData();
    }
  },
  /** 
   * swiper滑动时触发 
   */
  swiperChange: function (e) {
    var currentIndex = e.detail.current;
    this.setData({
      currentActiveNavIndex: currentIndex
    });
    this.scrollTopNav();
    that.refreshTabData()
  },
  /** 
   * 滚动顶部的导航栏 
   * 1、这个地方是大致估算的 
   */
  scrollTopNav: function () {
    this.setData({
      activeTab: 'tab-item-' + this.data.currentActiveNavIndex
    })
  }
})  