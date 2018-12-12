Page({
  data: {
    film: {},
    showLoading: true,
    options: null
  },
  onLoad: function (options) {
    // 获取url传递过来的参数，json对象
    console.log(options);
    var that = this
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + options.id,
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var data = res.data
        that.setData({
          film: data,
          showLoading: false
        })
      }
    })
  }
})
