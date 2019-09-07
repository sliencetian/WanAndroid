export function articleList(cid,title){
  wx.navigateTo({
    url: '../../pages/articleList/articleList?cid=' + cid + '&title=' + title,
  })
};
export function articleDetail(cid) {
  wx.navigateTo({
    url: '../../pages/articleList/articleList?cid=' + cid,
  })
};
export function webView(url,title){
  wx.navigateTo({
    url: '../../pages/webview/webview?url=' + encodeURIComponent(url)+'&title='+title,
  })
};
export function collect() {
  wx.navigateTo({
    url: '../../pages/myCollect/myCollect',
  })
};
export function about() {
  wx.navigateTo({
    url: '../../pages/about/about',
  })
};
module.export={
  articleList: articleList,
  articleDetail: articleDetail,
  webView: webView,
}