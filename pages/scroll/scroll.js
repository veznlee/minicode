// pages/scroll/scroll.js
Page({
  data: {
    page:1,
    pageSize:5,
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      page:1
    });
    this.getData();
  },
  scroll: function (e) {
    //console.log(e)
  },
  onLoad: function () {
    var that = this;
    this.getData(function(){
      that.setData({
        showLoading:false
      })
    });
  },
  // 滚动到底部
  scrolltolower: function () {
    var that = this;
    this.getData();
  },
  getData: function(callback){
    var that = this;
    var data = {
      pageNo: that.data.page,
      pageSize: that.data.pageSize
    };
    wx.request({
      url: 'http://127.0.0.1/doubanmovie',
      method: 'POST',
      dataType: 'json',
      data: data,
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        that.setData({
          loadMoreLoading: false
        });
        if (res.statusCode == 200){
          var data = res.data;
          if(data.count > 0){
            that.setData({
              page: that.data.page + 1,
              films: that.data.films.concat(data.subjects)
            });
          }else{
            that.setData({
              hasMore: false
            });
          }
        }
        callback && callback();
      }
    })
  },
  viewDetail: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      // url的参数传递
      url: '../detail/detail?id=' + ds.id + '&title=' + ds.title + '&type=ing'
    })
  }
})