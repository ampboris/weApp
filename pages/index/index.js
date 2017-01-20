//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // http://mapi.camelliae.com/m/activity-hot
   wx.request({
  url: 'http://m.camelliae.com/recomm/banner', //仅为示例，并非真实的接口地址
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    console.log(123)
    console.log(res)
  }
}) 
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
