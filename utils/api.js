const baseUrl = "https://www.wanandroid.com/"

export function request(){
  var cookie = wx.getStorageSync("cookie").toString()
  console.log('cookie:'+cookie)
  wx.request({
    url: baseUrl+'',
    header:{

    },
    success:function(res){

    },
    fail:function(){

    }
  })
}

module.export = {
  request: request
}