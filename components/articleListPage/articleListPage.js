// articleListPage/articleListPage.js
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail: function (item) {
      var url = item.currentTarget.id
      wx.navigateTo({
        url: '../../pages/webview/webview?url=' + encodeURIComponent(url),
      })
    },
    collect:function(item){
      console.log(item.currentTarget.id)
    }
  }
})
