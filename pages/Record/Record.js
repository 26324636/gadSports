// pages/daka/daka.js
var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
let app = getApp()
var url2 = 'https://www.gadstru.cn'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    list: [],
    current:1,
    totalPage:0,
   
  },

record(){
  let that = this;
  // console.log(that.data.userInfo.authorization)
  wx.request({
    url: url2+'/punch/admin/page',
    method: "POST",
    data: {
       current:that.data.current,
       id:'',
       
    },
    header: {
      'content-type': 'application/json',
      'authorization': that.data.userInfo.authorization,
    },
    success(res) {
      // console.log(res)
      if(res.data.message=="暂时没有数据"){
        wx.showToast({
          title: '暂时没有数据，赶紧去打卡吧',
          duration:2000,
          icon:'none'
        })
      }else{
        wx.showLoading({
          title: '加载中',
        })
         var list =that.data.list;
     
        for (var i = 0; i < res.data.list.length; i++) {
          list.push(res.data.list[i])
        
      }

      that.setData({
        list: list,
        totalPage:res.data.totalPage
      })
        setTimeout(function () {
          wx.hideLoading();
        }.bind(this), 800)
      //  console.log(that.data.list)
      }
    
      
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      userInfo: wx.getStorageSync('userinfo'),
      current:1
    })
this.record()
 
  },
detail:function(event){
  // console.log(event.currentTarget.id);
  wx.navigateTo({
    url: '../cardDetail/cardDetail?id=' + event.currentTarget.id
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    app.login()

    that.setData({
      userInfo: wx.getStorageSync('userinfo'),
      current: 1
    })
    // that.record()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      current: (this.data.current + 1)
    })
 
    if (this.data.current > this.data.totalPage) {

    } else {
      this.record()
    }
 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})