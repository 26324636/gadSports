var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
var app = getApp()
Page({
  data: {
    userInfo: null,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    platUserInfoMap: {},
    code: "",
    sessionKey: '',
    cloudsShow:false
  },
  onLoad: function () {

  },

  bindGetUserInfo: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中',

    })
    if (e.detail.userInfo) {
      // console.log(e.detail.userInfo)
      
      app.login()
      that.setData({
        userInfo: wx.getStorageSync('userinfo'),
      })
   

      // wx.showToast({
      //   title: '',
      //   icon: 'loading',
      //   duration: 1500
      // })
   

      var timer = setTimeout(function () {
        wx.hideLoading();
        wx.switchTab({
          url: '/pages/index/index'
        })
      },1500)
    }
    else {
      //用户按了拒绝按钮
      wx.hideLoading();
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }
})