const url = require('../../../config.js')
const sendAjax = require('../../../utils/sendAjax.js')
var url2 = 'https://www.gadstru.cn'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userProposal:"",
    userPhone:"",
    userWxid:"",
    btnColor:true,
    trueDisplay:"none",
    falseDisplay:"none"
  },
  userProposal:function(e){
    var that = this
    
    that.setData({
      userProposal : e.detail.value
    })
    var userPne = that.data.userPhone
    console.log(userPne)
    console.log(e.detail.value)
   
      if (e.detail.value == ""){
        
        that.setData({
          btnColor: true
        })
      
      
      } else if (userPne == "") {
        that.setData({
          btnColor: true
        })
        
        }else {
      that.setData({
        btnColor: false
      })
    }
  },
  userPhone: function (e) {
    var that = this
    that.setData({
      userPhone : e.detail.value
    })
    var userPro = that.data.userProposal
    console.log(userPro)
    console.log(e.detail.value)
    if (e.detail.value == "") {

      that.setData({
        btnColor: true
      })


    } else if (userPro == "") {
      that.setData({
        btnColor: true
      })

    } else {
      that.setData({
        btnColor: false
      })
    }
  },
  userWxid: function (e) {
    var that = this
    that.setData({
      userWxid : e.detail.value
    })
    
  },
 
    tijiao: function() {
      const that = this;
      var phone = that.data.userPhone
      console.log(phone.length)
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(phone)) {
        wx.showModal({
          title: '提示',
          content: '请输入正确的手机号码',
          showCancel: false,
          confirmText: '确认',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      } else {
        console.log(that.data)
        wx.request({
          url: 'https://www.sxscott.com/agriculture/agro/opinionInput',
          method: 'POST',
          data: {
            proposal: that.data.userProposal,
            phone: that.data.userPhone,
            wxid: that.data.userWxid
          },
          header: {
            'content-type': 'application/json'
          },
          success(data) {
            console.log(data);
            wx.showToast({
              title: '提交成功',
              icon: 'success'
            })
            var timer = setTimeout(function () {
              wx.navigateBack()
            }, 2000);

          }
        })

      }
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})