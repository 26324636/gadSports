// pages/add/add.js
const sendAjax = require('../../utils/sendAjax.js')
var url = require('../../config.js')
var util = require("../../utils/util.js");
var url2 = 'https://www.gadstru.cn'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    simage: '../../images/addjmg.png',
    type: '',
    arr_img: [],
    imgUrls: [],
    typeArray: [
    ],
    typeIndex: 0,
    typeId: 2,
    time: 0,
    runData: [],
    typeIndex: 0,
    bushu: '',//获取微信步数
    timebushu: '',
    disabled: true,
    cishu: '1次',
    accessToken: '',
    date:'',
    userInfo:null,
    buttonClicked:true,
    sq:false,
    show: false,
    show2: true
  },
  //获取运动时间
  input_time: function (e) {
    let that = this;
    if (this.data.type == '步数') {
      var time = e.detail.value.replace('步数', "");
    } else {
      var time = e.detail.value.replace("小", "").replace("时", "") + '小时';
    }

    if (parseFloat(time) > 4 && that.data.type != '步数') {
      wx.showModal({
        title: '温馨提示',
        content: '运动时间不能超过4小时，注意休息哦！',
        success(res) {
          if (res.confirm) {
            that.setData({
              timebushu: ''
            })
          } else if (res.cancel) {
            that.setData({
              timebushu: ''
            })
          }
        }
      })
    } else {
      if (that.data.type == '步数') {
        var resTime = time.replace("步", "") + '步';
      } else {
        var resTime = time.replace("小", "").replace("时", "") + '小时';
      }
      console.log(resTime)
      that.setData({
        timebushu: resTime,
        show: true,
        show2: false
      })
    }

  },
  //绑定选择器改变
  bindPickerChange(e) {
    var typeIndex = e.detail.value;

    var typeId = this.data.typeArray[typeIndex].id;
    var type = this.data.typeArray[typeIndex].type;
    this.setData({
      typeIndex: typeIndex,
      typeId: typeId,
      type: type,
      show: false,
      show2: true
    })


    // console.log(this.data.bushu)
    if (type == "步数") {
      this.setData({
        timebushu: String(this.data.bushu) + '步',
        disabled: true,
        cishu: '1次'
      })
      this.bushu();
    } else {
      this.setData({
        timebushu: '',
        disabled: false,
        cishu: '1次'
      })
    }
  },
  //补卡
  daka: function () {
    let that = this
    let flag1 = false; //步数
    let flag2 = false; //时间
    let flag3 = false; //图片
    let flag4 = true; //步数 时间？？？ 
    if (that.data.arr_img.length <= 0) {
      wx.showToast({
        title: '请上传图片！',
        duration: 1000,
        icon: "none"
      })
      flag3 = false;
    } else {
      flag3 = true;

      if (that.data.timebushu == '') {
        wx.showToast({
          title: '请输入时间/步数',
          duration: 1000,
          icon: "none"
        })
      } else if (that.data.timebushu.indexOf("小时") > 0) {
          flag4 = true;
      } else {
        flag4 = true;
      }
    }
    console.log(that.data.timebushu)

    wx.request({
      method: 'POST',
      url: url2 + '/background/root/sport', // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json', // 默认值
        'authorization': that.data.userInfo.authorization,
      },
      success(res) {
        console.log(res)
        // var typeArray = [];
        for (var i = 0; i < res.data.url.length; i++) {

          if (that.data.timebushu.indexOf("小时") < 0) {
            // console.log("das")
            if (res.data.url[i].type == "步数") {
              // console.log("sss")
              if (parseFloat(that.data.timebushu) < res.data.url[i].criterion) {
                wx.showToast({
                  title: '步数小于' + res.data.url[i].criterion + '，不能补卡！',
                  duration: 1000,
                  icon: "none"
                })
                flag1 = false;
                // that.setData({
                //   timebushu: ''
                // })

              } else {
                flag1 = true;
              }
            }
          } else {
            // console.log(that.data.type)
            if (that.data.type == res.data.url[i].type) {
              if (parseFloat(that.data.timebushu) < res.data.url[i].criterion) {
                console.log(parseFloat(that.data.timebushu))
                console.log(res.data.url[i].criterion)
                wx.showToast({
                  title: res.data.url[i].type + '小于' + res.data.url[i].criterion + '小时，不能补卡！',
                  duration: 1000,
                  icon: "none"
                })
                flag2 = false;
                that.setData({

                  buttonClicked: true
                })
              } else {
                flag2 = true;
                console.log("dsa")

              }
            }

          }
        }
        console.log(that.data.timebushu.indexOf("小时"))
        if (that.data.timebushu.indexOf("小时") < 0) {
          console.log(flag1)
          console.log(flag3)
          console.log(flag4)
          if (flag1 == true && flag3 == true && flag4 == true) {
            wx.request({
              method: 'POST',
              
              url: url2 + '/punch/admin/Audit', // 仅为示例，并非真实的接口地址
              data: {
                type: that.data.type,
                prove: JSON.stringify(that.data.arr_img),
                time: parseFloat(that.data.cishu),
                amount: that.data.timebushu,
                date: that.data.date
              },
              header: {
                'content-type': 'application/json', // 默认值
                'authorization': that.data.userInfo.authorization,
              },
              success(res) {
                console.log(res)
                if (res.data.message == "请耐心等待审核") {
                  wx.showToast({
                    title: '请耐心等待审核',
                    icon: 'none'
                  })
                  var timerName = setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1300)
                }
              }
            })
            that.setData({
              buttonClicked: false
            })


          }
        } else {
          console.log(flag2)
          console.log(flag3)
          console.log(flag4)
          if (flag2 == true && flag3 == true && flag4 == true) {
            wx.request({
              method: 'POST',
              url: url2 + '/punch/admin/Audit', // 仅为示例，并非真实的接口地址
              data: {
                type: that.data.type,
                prove: JSON.stringify(that.data.arr_img),
                time: parseFloat(that.data.cishu),
                amount: that.data.timebushu,
                date: that.data.date
              },
              header: {
                'content-type': 'application/json', // 默认值
                'authorization': that.data.userInfo.authorization,
              },
              success(res) {
                console.log(res)
                if (res.data.message == "请耐心等待审核") {
                  wx.showToast({
                    title: '请耐心等待审核',
                    icon: 'none'
                  })
                  var timerName = setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1300)
                }
              }
            })

            that.setData({
              buttonClicked: false
            })

          }
        }
      }
    })
   
  },

  //获取运动次数
  input_cishu: function (e) {
    let that = this;
    var cishu = e.detail.value.replace('次', "");
    if (parseFloat(cishu) > 3) {
      wx.showModal({
        title: '温馨提示',
        content: '运动次数不能超过三次',
        success(res) {
          if (res.confirm) {
            that.setData({
              cishu: '1次'
            })
          } else if (res.cancel) {
            that.setData({
              cishu: '1次'
            })
          }
        }
      })
    } else {
      var resCishu = cishu.replace('次', "") + '次';
      that.setData({
        cishu: resCishu
      })
    }

  },

  //获取分类选项
  fenlei() {
    let that = this;


    wx.request({
      method: 'POST',
      url: url2 +'/background/root/sport', // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json',
        'authorization': that.data.userInfo.authorization,
        
      },
      success(res) {
  
        var typeArray = [];
        for (var i = 0; i < res.data.url.length; i++) {
          typeArray.push(res.data.url[i])
        }
        if (res.data.url[0].type == "步数") {
          that.bushu();
        }
        that.setData({
          typeArray: typeArray,
          type: typeArray[0].type
        })
        // console.log(that.data.typeArray)
      }
    })
  },
  //添加图片
  addPic: function () {
    var that = this
    var num = that.data.imgUrls.length
    var imgUrls = that.data.imgUrls
    var index = that.data.imgUrls.length;
    if (num < 4) {
      var cnt = 4 - num;
      wx.chooseImage({
        count: cnt,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
         
          var tempFilePaths = res.tempFilePaths
          for (var i = tempFilePaths.length - 1; i >= 0; i--) {
            imgUrls.splice(index, 0, tempFilePaths[i])
          }
          that.setData({
            imgUrls: imgUrls
          })
          console.log(that.data.imgUrls)
          console.log(tempFilePaths)

          for (var i = 0; i < that.data.imgUrls.length; i++) {
            wx.uploadFile({
              url: 'https://www.gadstru.cn/background/upload/avatar',
              filePath: tempFilePaths[i],
              name: 'file',
              formData: {
                picType: 'jpg'
              }, //这里是上传图片时一起上传的数据
              success: (resp) => {
               console.log(resp)
                var img = that.data.arr_img;
                img.push(JSON.parse(resp.data).urlList[0]);
                that.setData({
                  arr_img: img
                })
      
              },
            });
          }




        }
      })
    } else {
      wx.showToast({
        title: '最多上传4张图片噢~',
        icon: 'none'
      })
    }

  },
  //移除图片
  removePic: function (e) {
    var that = this;
    var imgUrls = that.data.imgUrls;

    var index = e.currentTarget.dataset.index;
    imgUrls.splice(index, 1);

    that.setData({
      imgUrls: imgUrls
    })
  },

  //获取运动分类
  getGoodsType: function () {
    var that = this;
    let infoOpt = {
      url: '/secondary/type',
      type: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
        'authorization': that.data.userInfo.authorization,
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {

      var typeArray = [];
      for (var i = 2; i < res.list.length; i++) {
        typeArray.push(res.list[i]);
      }
      that.setData({
        typeArray: typeArray
      })
    }
    infoCb.beforeSend = () => { }
    sendAjax(infoOpt, infoCb, () => { });
  },
  //获取步数
  bushu: function () {
    let that = this;
    wx.login({
      success: resp => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
 

        // 获取用户信息
        wx.getSetting({
          success: res => {
            //  console.log(res);
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: userResult => {
                  var platUserInfoMap = {}
                  platUserInfoMap["encryptedData"] = userResult.encryptedData;
                  platUserInfoMap["iv"] = userResult.iv;
                  wx.setStorageSync("pmap", platUserInfoMap)
                  wx.request({
                    url: url2 +'/punch/admin/login',
                    method: 'POST',
                    data: {
                      platCode: resp.code,
                      platUserInfoMap: platUserInfoMap,
                    },
                    header: {
                      'content-type': 'application/json',
                      'authorization': that.data.userInfo.authorization,
                    },
                    success(res) {
                 
                      wx.getWeRunData({
                        success(resRun) {
                          const encryptedData = resRun
                          // console.info(resRun.iv);
                          // console.log(resp.code)
                          // console.log(resRun.encryptedData)
                          that.setData({
                            accessToken: res.data.sessionKey
                          })
                          wx.request({
                            url: url2 +'/punch/admin/run',
                            data: {
                              encryptedDataStr: resRun.encryptedData,
                              iv: resRun.iv,
                              platCode: res.data.sessionKey
                            },
                            header: {
                              'content-type': 'application/json',
                              'authorization': that.data.userInfo.authorization,
                            },
                            method: 'POST',
                            success: function (resDecrypt) {
                             
                              var runData = JSON.parse(resDecrypt.data.run)
                              var da = runData.stepInfoList.length - 1;
                              // console.log(runData.stepInfoList[0].step);
                              that.setData({
                                bushu: runData.stepInfoList[da].step
                              })
                              // console.log(that.data.bushu);
                              that.setData({
                                timebushu: String(that.data.bushu) + '步'
                              })


                            }
                          });
                        },
                        fail(){
                        
                        that.shouquan()
                        }
                      })

                    }
                  })
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(userResult)
                  }
                }
              })
            }

          }
        })
      }
    })
  },
  shouquan(){
    let that=this;
    if (that.data.sq == false) {
      wx.showModal({
        content: '检测到您没打开Gad打卡的微信步数权限，是否去设置打开？',
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          //点击“确认”时打开设置页面
          if (res.confirm) {
            // console.log('用户点击确认')
            wx.openSetting({
              success: (res) => {
                if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                  //这里是授权成功之后 填写你重新获取数据的js
                  //参考:
                  that.bushu()
                  that.setData({
                    sq: true
                  })
                }
              }
            })
          } else {
            // console.log('用户点击取消')
            that.setData({
              sq: false
            })
            that.shouquan()
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options.date)
    var that = this;
    app.login()

    that.setData({
      userInfo: wx.getStorageSync('userinfo'),
      buttonClicked:true
    })
    that.setData({
      date:options.date
    })
    that.fenlei();
    wx.request({
      method: 'POST',
      url: url2 + '/background/root/sport', // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json', // 默认值
        'authorization': that.data.userInfo.authorization,
      },
      success(res) {
        console.log(res)
        // var typeArray = [];
        // for (var i = 0; i < res.data.url.length; i++) {
        //   typeArray.push(res.data.url[i])
        // }
        // that.setData({
        //   typeArray: typeArray
        // })
        // console.log(that.data.typeArray)
      }
    })

    wx.showLoading({
      title: '加载中...',
    })
    var timerName = setTimeout(function () {
      wx.hideLoading();
    }, 1500)
    // var p=wx.getStorageSync("pmap")
    // console.log(p)



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