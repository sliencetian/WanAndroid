function gotoArticleListPage(cid){
  wx.navigateTo({
    url: '../pages/articleList/articleList?cid=' + cid,
  })
};
function gotoArticleDetailPage(cid) {
  wx.navigateTo({
    url: '../pages/articleList/articleList?cid=' + cid,
  })
};
function gotoWebViewPage(url,title){
  wx.navigateTo({
    url: '../pages/webview/webview?url=' + encodeURIComponent(url)+'title'+title,
  })
};