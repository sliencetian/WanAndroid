// pages/regist/regist.js
var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    repassword:''
  },
  loginusername: function (e) {
    that.setData({
      username: e.detail.value
    })
  },
  loginpassword: function (e) {
    that.setData({
      password: e.detail.value
    })
  },
  repassword:function(e){
    that.setData({
      repassword: e.detail.value
    })
  },
  clickLogin: function () {
    if (that.data.username == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
    } else if (that.data.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
    } else if (that.data.repassword == '') {
      wx.showToast({
        title: '请确认密码',
        icon: 'none'
      })
    }  else {
      wx.showLoading({
        title: '注册中...',
      })
      //420315258
      wx.request({
        url: app.globalData.baseUrl + 'user/register',
        method: 'POST',
        data: {
          username: that.data.username,
          password: that.data.password,
          repassword: that.data.repassword
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.hideLoading()
          var result = res.data
          if (result.errorCode == 0) {
            app.globalData.userInfo = result.data
            wx.setStorageSync("userInfo", result.data)
            wx.navigateBack({
              delta: 2
            })
          } else {
            wx.showToast({
              title: result.errorMsg,
              icon: 'none'
            })
          }
        },
        fail: function () {
          wx.hideLoading()
          wx.showToast({
            title: "登录异常",
            icon: 'none'
          })
        }
      })
    }
  },
  clickRegister: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.setNavigationBarTitle({
      title: '注册',
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