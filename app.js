//app.js
var url = require('config.js')
App({
  onLaunch: function () {
    // wx.setStorageSync("userinfo", null)
    // wx.setStorageSync("accessToken",'')
    // wx.setStorageSync("isBinding", '')
    this.login()
  
    this.test();
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
          wx.hideTabBar({

          })

        } else {
          wx.showTabBar({

          })
        }
      }
    })
  },

  login() {
    var that = this;
    console.log("我执行了")
    // 登录
    wx.login({
      success: resp => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(resp);
        var that = this;
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
                  // console.log(platUserInfoMap)
                  // console.log(resp.code)
                  wx.request({
                    url:'https://www.gadstru.cn/punch/admin/login',
                    method: 'POST',
                    data: {
                      platCode: resp.code,
                      platUserInfoMap: platUserInfoMap,
                    },
                    header: {
                      'content-type': 'application/json',
                    },
                    success(res) {
                      console.log(res)
                      if (res.data.code == 200) {
                        // console.log(res.data.isbound)
                        
                        // console.log(res.data.authorization)
                        wx.setStorageSync("userinfo", res.data)
                        wx.setStorageSync("accessToken", res.data.authorization)
                        wx.setStorageSync("isBinding", res.data.isbound)
                       
                      }

                    }
                  })
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(userResult)
                  }
                }
              })
            } else {
              wx.redirectTo({
                url: "/pages/start/start"
              })
            }

          }
        })
      }
    })
  },


  globalData: {
    userInfo: null,
    content: [],
  }


})