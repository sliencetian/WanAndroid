//app.js
var util = require('/utils/util.js')
App({
  globalData: {
    mainColor:"",
    userInfo: null,
    baseUrl: "https://www.wanandroid.com/",
    //收藏的列表ids
    collectids: [],
    cookie:''
  },
  onLaunch: function () {
    var username = wx.getStorageSync("username")
    var password = wx.getStorageSync("password")
    if (this.globalData.userInfo == null && username != '' && password != '') {
      this.refreshInfo(username, password)
    }
  },
  refreshInfo: function (username, password){
    var that = this
    wx.request({
      url: that.globalData.baseUrl + 'user/login',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        var result = res.data
        var cookie = res.cookies.toString()
        if (result.errorCode == 0) {
          that.setUserInfo(res)
        } else {
          console.log("自动登录失败:" + result.errMsg)
        }
      }
    })
  },
  setUserInfo: function (loginResut) {
    console.log('登录成功')
    console.log(loginResut)
    this.globalData.userInfo = loginResut.data.data
    this.globalData.cookie = loginResut.cookies.toString()
    this.globalData.collectids = loginResut.data.data.collectIds
    this.globalData.userInfo.authorUrl = util.generateUserIconByAuthor(this.globalData.userInfo.nickname)
  }
})