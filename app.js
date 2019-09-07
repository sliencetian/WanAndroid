//app.js
App({
  globalData: {
    mainColor:"",
    userInfo: null,
    baseUrl:"https://www.wanandroid.com/"
  },
  onLaunch: function () {
    var userInfo = wx.getStorageSync("userInfo")
    console.log('userInfo:')
    console.log(userInfo)
    if (userInfo != null || userInfo != '') {
      this.globalData.userInfo = userInfo
    }
  }
})