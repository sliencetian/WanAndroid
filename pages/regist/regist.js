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
    repassword: '',
    isShowPassword: false,
    isShowRePassword:false
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
          if (res.data.errorCode == 0) {
            app.setUserInfo(res)
            wx.setStorageSync("username", that.data.username)
            wx.setStorageSync("password", that.data.password)
            wx.navigateBack({
              delta: 2
            })
          } else {
            wx.showToast({
              title: res.data.errorMsg,
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
  clearInput: function (e) {
    var type = e.currentTarget.dataset.type
    if (type == 'username') {
      this.setData({
        username: ""
      })
    } else if (type == 'password'){
      this.setData({
        password: ""
      })
    } else {
      this.setData({
        repassword: ""
      })
    }
  },
  showHidePassword: function (e) {
    var type = e.currentTarget.dataset.type
    if (type == 'password') {
      this.setData({
        isShowPassword: !this.data.isShowPassword
      })
    } else {
      this.setData({
        isShowRePassword: !this.data.isShowRePassword
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