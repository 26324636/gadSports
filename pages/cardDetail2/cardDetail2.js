// pages/cardDetail/cardDetail.js
var url2 = 'https://www.gadstru.cn'
Page({

  /**
   * 页面的初始数据
   */
  data: {
id:'',
userInfo:null,
    amount:'',
    duration:'',
    prove:[],
    distance:'0.00',
    avatar:'',
    userName:'',
    isshow:2,
    danwei:'千米',
    date:''
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.prove // 需要预览的图片http链接列表  
    })
  },
card(){
  let that = this;
  // that.setData({
  //   avatar: this.data.userInfo.avatar,
  //   userName: this.data.userInfo.userName
  // })
  console.log(that.data.userInfo.authorization)
  wx.request({
    url: url2 +'/punch/admin/AllClock',
    method: "POST",
    data: {
      timer: that.data.date
    },
    header: {
      'content-type': 'application/json',
      'authorization': that.data.userInfo.authorization,
    },
    success(res) {
      console.log(res)
      var distance = parseFloat(res.data.amount)
      var xiaoshi = String(res.data.amount)
      console.log(xiaoshi)
       console.log(distance)
      console.log(JSON.parse(res.data.prove))
      

        console.log((Math.round(distance / 100) / 10).toFixed(1))

      if (res.data.prove=="[]"){ //判断有没有图片
        that.setData({
          isshow:0
        })
      }else{
        that.setData({
          isshow: 1
        })
      }


        if (xiaoshi.indexOf("小时") >= 0) {
          xiaoshi = "步数" + xiaoshi;
          that.setData({
            danwei: "小时",
            distance: distance.toFixed(2)

          })
        } else {
          var d = (Math.round(distance / 100) / 10).toFixed(2)
          that.setData({
            danwei: "千米",
            distance: d
          })
        }
       that.setData({
         amount: res.data.amount,
         duration: res.data.duration,
         prove: JSON.parse(res.data.prove) ,

       })
       console.log(that.data.distance)
      
  
    }
  })
  // wx.request({
  //   url: 'http://106.12.4.246:8080/punch/admin/page',
  //   method: "POST",
  //   data: {
  //     current: '',
  //     id: that.data.id,

  //   },
  //   header: {
  //     'content-type': 'application/json',
  //     'authorization': that.data.userInfo.authorization,
  //   },
  //   success(res) {
  //     console.log(res)
  //     var distance = parseInt(res.data.list[0].amount)
  //     var xiaoshi = String(res.data.list[0].amount)
  //     console.log(xiaoshi)
    
  //     console.log(JSON.parse(res.data.list[0].prove))
   
 
  //       console.log((Math.round(distance / 100) / 10).toFixed(1))
   
  //     if (res.data.list[0].prove=="[]"){ //判断有没有图片
  //       that.setData({
  //         isshow:0
  //       })
  //     }else{
  //       that.setData({
  //         isshow: 1
  //       })
  //     }
      
  //     if (res.data.message == "暂时没有数据") {
  //       wx.showToast({
  //         title: '暂时没有数据，赶紧去打卡吧',
  //         duration: 2000
  //       })
  //     } else {

  //       if (xiaoshi.indexOf("小时") >= 0) {
  //         xiaoshi = "步数" + xiaoshi;
  //         that.setData({
  //           danwei: "小时",
  //           distance: distance.toFixed(2)

  //         })
  //       } else {
  //         var d = (Math.round(distance / 100) / 10).toFixed(2)
  //         that.setData({
  //           danwei: "千米",
  //           distance: d
  //         })
  //       }
  //      that.setData({
  //        amount: res.data.list[0].amount,
  //        duration: res.data.list[0].duration,
  //        prove: JSON.parse(res.data.list[0].prove) ,
        
  //      })
  //      console.log(that.data.distance)
  //     }


  //   }
  // })

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    console.log(options.date)

    this.setData({
      date:options.date,
      userInfo: wx.getStorageSync('userinfo')
    })

this.card()
    

    // console.log(this.data.prove)
    // setTimeout(function () {
    //   wx.hideLoading();
    // }.bind(this), 800)
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