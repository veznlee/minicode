//app.js

// App() 函数用来注册一个小程序。接受一个 Object 参数，其指定小程序的生命周期回调等。
App({
  // 小程序初始化完成时（全局只触发一次）
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录获取code
    wx.login({
      success: res => {
        console.log(res)

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.request()
      }
    })

    // 获取用户当前的授权状态，返回值中只会出现小程序已经向用户请求过的权限
    wx.getSetting({
      success: res => { // 接口调用成功的回调函数
        if (res.authSetting['scope.userInfo']) {

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 用户授权结果
              // console.log(res.authSetting)

              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: res => { // 接口调用失败的回调函数

      },
      complete: res => { // 接口调用结束的回调函数（调用成功、失败都会执行）

      }
    })
  },
  // 生命周期回调—监听小程序显示	小程序启动，或从后台进入前台显示时
  onShow: function() {

  },
  // onHide	Function	生命周期回调—监听小程序隐藏	小程序从前台进入后台时
  // onError	Function	错误监听函数	小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息
  // onPageNotFound	Function	页面不存在监听函数	小程序要打开的页面不存在时触发，会带上页面信息回调该函数
  // 其他	Any	开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问

  // app全局数据，在其他页面通过getApp获取app实例，然后获取数据	const app = getApp()；app.globalData++；
  globalData: {
    userInfo: null
  }
})