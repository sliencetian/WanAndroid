// articleListPage/articleListPage.js
var router = require('../../utils/page-router.js')
var app = getApp()
var that
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    collectids: app.globalData.collectids,
    collect:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail: function (e) {
      var item = e.currentTarget.dataset.item
      router.webView(item.link, item.title)
    },
    listPageScrollToBottom: function (e) {
      this.triggerEvent('customevent', {})
    },
    collect:function(e){
      that = this
      var position = e.currentTarget.dataset.index
      var item = that.data.listData[position]
      var url,tip
      if (item.collect){
        url = app.globalData.baseUrl + 'lg/uncollect_originId/' + item.id + '/json'
        tip = '取消收藏中...'
      } else {
        url = app.globalData.baseUrl + 'lg/collect/' + item.id + '/json'
        tip = '收藏中...'
      }
      wx.showLoading({
        title: tip,
      })
      wx.request({
        url: url,
        method:'post',
        header: {
          'cookie': app.globalData.cookie,
        },
        success:function(res){
          wx.hideLoading()
          var result = res.data
          if (result.errorCode == 0){
            var updateList = that.data.listData
            if (item.collect) {//原来已经收藏
              updateList[position].collect = false
              app.globalData.collectids.pop(updateList[position].id)
              tip = '取消收藏'
            } else {//原来未收藏
              updateList[position].collect = true
              app.globalData.collectids.push(updateList[position].id)
              tip = '收藏成功'
            }
            that.setData({
              listData:updateList
            })
            wx.showToast({
              title: tip,
              icon:'none'
            })
          } else {
            wx.showToast({
              title: '请求失败',
              icon: 'none'
            })
          }
        },
        fail: function () {
          wx.hideLoading()
        }
      })
    }
  }
})
