
  const sendAjax = require('../../utils/sendAjax.js')
var url = require('../../config.js')
var app=getApp();
var url2 ='https://www.gadstru.cn'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgurl: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    zhuangtai:'',//存储运动状态
    sum:0,//存储运动次数
    ammount:'',
    // animationData: {},
    monthlist:null,
    weeklist:null,
    userInfo:null,
    enable:0,//判断打卡能不能用,
    buttonClicked:true,
    isshow:null,
    isshow2:null,
    yundong:''
  },
  test: function () {
    var that = this;
    wx.request({
      url: 'https://www.gadstru.cn/background/root/hide',
      method: "post",
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data.code)
        if (res.data.code == 1) {
       that.setData({
         isshow:false,
         isshow2:true
       })
          wx.hideTabBar({

          })
        } else {
          that.setData({
            isshow: true,
            isshow2:false
          })
          wx.showTabBar({

          })
        }
        console.log(that.data.isshow)
      }
    })
   
  },
  signClick: function () {

    var that = this
    console.log(that.data.enable)
    if(that.data.enable==2){
      //第1步:创建动画实例
      // var animation = wx.createAnimation({
      //   duration: 1000,                     //动画时长   
      //   timingFunction: "ease",             //线性 
      //   delay: 0                           //0则不延迟 
      // })
      // //第2步:将创建的动画实例赋值给当前的动画
      // this.animation = animation;
      // //第3步:执行动画，Z轴旋转360度
      // animation.opacity(1).rotateZ(360).step();
      // //第4步:导出动画对象赋值给数据对象
      // this.setData({
      //   animationData: animation.export(),
      // })
     
      //设置指定时间后进行页面跳转
      that.setData({
        buttonClicked:false
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../add/add'
        })
      }.bind(this), 800)
    }else if(that.data.enable==1){
      wx.showToast({
        title: '您已经打过卡了哦！',
        icon: 'none',
        duration: 2000
      })
      


    }

  },
  //获取月排名
  month(){
    let that = this;
    wx.request({
      url: url2+'/punch/admin/month',
      method: "POST",
      data: {

      },
      header: {
        'content-type': 'application/json',
        'authorization': that.data.userInfo.authorization,
      },
      success(res) {
       
         var list=[];
         if(res.data.list.length>=3){
           for (var i = 0; i < 3; i++) {
             list.push(res.data.list[i])
           }
         }else{
           for (var i = 0; i < res.data.list.length; i++) {
             list.push(res.data.list[i])
           }
         }
     
        that.setData({
          monthlist:list
        })
       
      }
    })
  },
  //获取周排名
  week() {
    let that = this;
    wx.request({
      url: url2+'/punch/admin/week',
      method: "POST",
      data: {

      },
      header: {
        'content-type': 'application/json',
        'authorization': that.data.userInfo.authorization,
      },
      success(res) {
         
        var list = [];
        if (res.data.list.length >= 3) {
          for (var i = 0; i < 3; i++) {
            list.push(res.data.list[i])
          }
        } else {
          for (var i = 0; i < res.data.list.length; i++) {
            list.push(res.data.list[i])
          }
        }
        that.setData({
          weeklist: list
        })
     
      }
    })
  },
  //获取用户总次数
  allcishu(){
    let that=this;
    console.log(that.data.userInfo.authorization)
    wx.request({
      url: url2+'/punch/admin/time',
      method: "POST",
      data: {

      },
      header: {
        'content-type': 'application/json',
      'authorization': that.data.userInfo.authorization,
      },
      success(res) {
        console.log(res)
        that.setData({
        sum:res.data.sum
      })
      
      }
    })

  },
  //获取轮播图
  lunbo() {
  console.log("lunbo")
    let that=this;
    
    wx.request({
      url: url2+'/background/root/slideshowShow', 
      method:"POST",
      data: {
   
      },
      header: {
        'content-type': 'application/json',
        'authorization': that.data.userInfo.authorization, // 默认值
      },
      success(res) {
   
        var imgurl=[]
    
        for(var i=0;i<res.data.url.length;i++){
          imgurl.push(res.data.url[i])
        }
        that.setData({
          imgurl:imgurl
        })

        
      }
    })
  },
  //判断用户是否打卡
isdaka(){
  console.log(this.data.userInfo.authorization)
  let that=this;

  wx.request({
    url: url2+'/punch/admin/clockIn',
    method: "POST",
    data: {

    },
    header: {
      'content-type': 'application/json',
      'authorization': that.data.userInfo.authorization,
    },
    success(res) {
    console.log(res)
      if (res.data.message == "未打卡") {
        that.setData({
          enable: 2
        })

      } else {
        that.setData({
          enable: 1
        })
      }
    if(res.data.code=="401"){
      // wx.showToast({
      //   title: '检测到你未绑定工号，请绑定！',
      //   icon:"none",
      //   duration:1300
      // })
      that.setData({
        zhuangtai: "未打卡",
        ammount: res.data.amount,
        yundong:res.data.type
      })

      // setTimeout(function () {
      //   wx.navigateTo({
      //     url: '../user/gonghao/gonghao'
      //   })
      // }.bind(this), 1300)
    
    }else{
      that.setData({
        zhuangtai: res.data.message,
        ammount: res.data.amount,
        yundong: res.data.type
        
      })
    }
    
  
   
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;


    wx.showLoading({
      title: '加载中...',

    })
      app.login()
    console.log(wx.getStorageSync('userinfo'))
    console.log(wx.getStorageSync("isBinding"))
    that.test();

 
 
    console.log(that.data.isshow)
   
      if (wx.getStorageSync("isBinding") == 2) {
        console.log("dsadas")
        wx.showModal({
          title: '温馨提示',
          content: '请绑定工号！',
          success(res) {
            if (res.confirm) {


              wx.navigateTo({
                url: '../user/gonghao/gonghao'
              })

            } else {
              wx.navigateTo({
                url: '../user/gonghao/gonghao'
              })
            }
          }
        })

      } else {
        that.setData({
          userInfo: wx.getStorageSync('userinfo'),
          buttonClicked: true
        })





        that.isdaka()
        that.allcishu()
        that.lunbo()
        that.month()
        that.week()
      }
    
    setTimeout(function () {
      wx.hideLoading();
    }.bind(this), 1500)

 
  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  let that=this;


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.showLoading({
      title: '加载中...',

    })

    app.login()
    console.log(wx.getStorageSync('userinfo'))
    console.log(wx.getStorageSync("isBinding"))
    that.test();

      if (wx.getStorageSync("isBinding") == 2) {
        // console.log("dsadas")
        // wx.showModal({
        //   title: '温馨提示',
        //   content: '请绑定工号！',
        //   success(res) {
        //     if (res.confirm) {


        //       wx.navigateTo({
        //         url: '../user/gonghao/gonghao'
        //       })

        //     } else {
        //       wx.navigateTo({
        //         url: '../user/gonghao/gonghao'
        //       })
        //     }
        //   }
        // })

      } else {
        that.setData({
          userInfo: wx.getStorageSync('userinfo'),
          buttonClicked: true
        })





        that.isdaka()
        that.allcishu()
        that.lunbo()
        that.month()
        that.week()
      }
    



    setTimeout(function () {
      wx.hideLoading();
    }.bind(this), 1000)
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // var animation = wx.createAnimation({
    //   duration: 10,
    //   timingFunction: "ease", //线性 
    //   delay: 0, //0则不延迟 
    // })
    // this.animation = animation;
    // //重置动画为原始状态,将原始状态赋值给数据对象进行保存
    // animation.opacity(1).rotateZ(0).step();
    // this.setData({
    //   animationData: animation.export(),
    // })
    
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