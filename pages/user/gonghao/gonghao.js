// pages/user/gonghao/gonghao.js
const sendAjax = require('../../../utils/sendAjax.js')
var url = require('../../../config.js')
var url2 = 'https://www.gadstru.cn'

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gonghao: '',//输入工号
    pass: '',////输入密码
    // part:'',//输入部门
      typeArray: [
    ],
    type:'',
    typeIndex: 0,
    typeId: 2,
    userInfo:null
  },
  watchID:function(e){
    var gonghao = e.detail.value;
    this.setData({
      gonghao:gonghao
    })
    console.log(this.data.gonghao)
  },
  fenlei() {
    let that = this;


    wx.request({
      method: 'POST',
      url: url2+'/background/user/department', // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json', // 默认值
        'authorization': that.data.userInfo.authorization,
      },
      success(res) {
        console.log(res)
        var typeArray = [];
        that.setData({
          type:res.data.list[0].type
        })
        for (var i = 0; i < res.data.list.length; i++) {
          typeArray.push(res.data.list[i])
        }
        that.setData({
          typeArray: typeArray
        })
         console.log(that.data.typeArray)
      }
    })
  },
  //绑定选择器改变
  // bindPickerChange(e) {
  //   var typeIndex = e.detail.value;

  //   var typeId = this.data.typeArray[typeIndex].id;
  //   var type = this.data.typeArray[typeIndex].type;
  //   this.setData({
  //     typeIndex: typeIndex,
  //     typeId: typeId,
  //     type: type
  //   })


  //   console.log(this.data.type)
 

  // },
  watchPass:function(e){
    var pass = e.detail.value;
    this.setData({
      pass:pass
    })
    console.log(this.data.pass)
  },
  // watchPart: function (e) {
  //   var part = e.detail.value;
  //   this.setData({
  //     part: part
  //   })
  //   console.log(this.data.part)
  // },
  tijiao:function(){
    console.log(String(this.data.gonghao))
    console.log(String(this.data.pass))
if(String(this.data.gonghao).length<1){
       wx.showToast({
       title: '工号长度最少1位！',
       icon: 'none',
       duration: 1500
     })
 
// } else if (String(this.data.pass).length <6 )
// {
//   wx.showToast({
//     title: '密码长度最少6位！',
//     icon: 'none',
//     duration: 1500
//   })
 
}else{
  let that=this;
  let infoOpt = {
    url: '/admin/binding',
    type: 'POST',
    data: {
      department: String(that.data.gonghao),
      password: String(that.data.pass),
// departmentNum:that.data.type,

    },
    header: {
      'content-type': 'application/json',
      'authorization': that.data.userInfo.authorization,
    },
  }
  let infoCb = {}
  infoCb.success = function (data) {
    console.log(data.message)
    wx.showModal({
      title: '提示',
      content: data.message || '处理失败',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          if (data.result) {
            console.log(data.result);
            wx.setStorageSync("isBinding","1");
          //  userinfo.isbound="1";
          //  wx.setStorageSync('userinfo',userinfo);
            
            // wx.navigateBack({
            //   delta: 1
            // })
            // wx.navigateTo({
            //   url: '../../index/index',
            // })
            wx.switchTab({
              url: '/pages/user/index'
            })

          }
        }
      }
    });  
  }
  infoCb.beforeSend = () => {

  }
  sendAjax(infoOpt, infoCb, () => { });
  // console.log(that.data.isshow)
}



  },
  depart(e){
  console.log(e.detail.value);
  this.setData({
    part:e.detail.value
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('userinfo'));
    this.setData({
      userInfo: wx.getStorageSync('userinfo')
    })
    this.fenlei()
 
    console.log(wx.getStorageSync('isBinding'))
    // if (wx.getStorageSync('isBinding')!=2){ //判断用户是否绑定
    //   this.setData({
    //     isshow:1
    //   })
    // }
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
    // if (wx.getStorageSync('isBinding') != 2) { //判断用户是否绑定
    //   this.setData({
    //     isshow: 1
    //   })
    // }
    // var that = this;
    // console.log(that.data.userInfo.isbound);
    // that.setData({
    //   isshow: that.data.userInfo.isbound
    // })
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