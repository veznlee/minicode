//index.js
//获取应用实例
const app = getApp()

/*
 * wx.canIUse(string)
 * 使用 ${API}.${method}.${param}.${options} 或者 ${component}.${attribute}.${option} 方式来调用
 * 
 * ${API} 代表 API 名字
   ${method} 代表调用方式，有效值为return, success, object, callback
   ${param} 代表参数或者返回值
   ${options} 代表参数的可选值
   ${component} 代表组件名字
   ${attribute} 代表组件属性
   ${option} 代表组件属性的可选值
 */


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {
    console.log(this.route)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  viewTap() {
    console.log('view tap')
  },
  ToBaseView() {
    wx.navigateTo({
      url: '../baseview/baseview',
    })
  }
})
