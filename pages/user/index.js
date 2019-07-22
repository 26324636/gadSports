var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
var url2 = 'https://www.gadstru.cn'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    show: false,
    number: null,
    isbound:''
 
  },
  tobind: function () {
    console.log(this.data.isbound)
    if (this.data.isbound == "2" || this.data.isbound == 2) {
      wx.navigateTo({
        url: 'gonghao/gonghao',
      })
    } else {
      wx.navigateTo({
        url: 'banding/banding',
      })

    }

  },

  tojilu: function () { //记录
    wx.navigateTo({
      url: '../Record/Record',
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    var that = this
    app.login()

    that.setData({
      userInfo: wx.getStorageSync('userinfo')
    })
    that.setData({
      isbound: wx.getStorageSync("isBinding")
    })
    // console.log(wx.getStorageSync("isBinding")) 
    // that.setData({
    //   isbound: wx.getStorageSync("isBinding")
    // })
    // console.log(that.data.isbound)
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      isbound: wx.getStorageSync("isBinding")
    })
    // var that = this
    // app.login()

    // that.setData({
    //   userInfo: wx.getStorageSync('userinfo')
    // })
    // console.log(wx.getStorageSync("isBinding"))
    // that.setData({
    //   isbound: wx.getStorageSync("isBinding")
    // })
    // console.log(that.data.isbound)
 
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // var that = this
    // app.login()

    // that.setData({
    //   userInfo: wx.getStorageSync('userinfo')
    // })
    // console.log(wx.getStorageSync("isBinding"))
    // that.setData({
    //   isbound: wx.getStorageSync("isBinding")
    // })
    // console.log(that.data.userInfo)
    // wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})