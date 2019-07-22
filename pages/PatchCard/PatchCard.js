
  const sendAjax = require('../../utils/sendAjax.js')
var url = require('../../config.js')
var app = getApp();
var url2 = 'https://www.gadstru.cn'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tempArray: [1, 2, 3, 4],
      year: 0,
      month: 0,
      date: ['日', '一', '二', '三', '四', '五', '六'],
      dateArr: [],
      isToday: '',
      isTodayWeek: false,
      todayIndex: 0,
    animationData:{},
    datenow:[],
    userInfo: null,
    qdflag:2,
    buttonClicked:true,
    systemInfo:'',
    datepatch:[],
    patchflag:3
  },
  //获取补卡中日期
  patch() {
    let that = this;
    wx.request({
      url: url2 + '/punch/admin/Breissue',
      method: "POST",
      data: {
   

      },
      header: {
        'content-type': 'application/json',
        'authorization': that.data.userInfo.authorization,
      },
      success(res) {


   console.log(res)
   var list = [];
      for (var i = 0; i <res.data.list.length; i++) {
        list.push(res.data.list[i].date)
      }
      that.setData({
        datepatch: list,

      })

      // var flag={"已签到"}
      var list = that.data.dateArr;

        for (var i = 0; i < that.data.datepatch.length; i++) {

        for (var j = 0; j < that.data.dateArr.length; j++) {

          if (that.data.datepatch[i] == list[j].isToday) {

            var isToday = list[j].isToday
            var dateNum = list[j].dateNum
            var weight = list[j].weight
            var key = {
              isToday: isToday,
              dateNum: dateNum,
              weight: weight,
              flag: 3 //代表审核中
            }
            list[j] = {};
            list[j] = key;
          }
        }
      }

      that.setData({
        dateArr: list
      })
      console.log(that.data.dateArr)
      }
    })
    
  },
  //获取已签到日期
  date(){
   let that=this;

    let infoOpt = {
      url: '/admin/reissue',
      type: 'POST',
      data: {
      },
      header: {
        'content-type': 'application/json',
        'authorization': that.data.userInfo.authorization,
      },
    }
    let infoCb = {}
    infoCb.success = function (data) {
     
            var list =[];
        for(var i=0;i<data.list.length;i++){
          list.push(data.list[i].date)
        }
        that.setData({
          datenow:list,

        })
   
        // var flag={"已签到"}
        var list=that.data.dateArr;
  
        for(var i=0;i<that.data.datenow.length;i++){
     
          for(var j=0;j<that.data.dateArr.length;j++){
      
            if (that.data.datenow[i]==list[j].isToday){
        
              var isToday=list[j].isToday
              var dateNum = list[j].dateNum
              var weight = list[j].weight
              var key={
                isToday:isToday,
                dateNum:dateNum,
                weight:weight,
                flag:2//代表已签到
              }
            list[j]={};
            list[j]=key;
            }
          }
        }
 
      that.setData({
        dateArr:list
      })

  

    }
    infoCb.beforeSend = () => {
    }
    sendAjax(infoOpt, infoCb, () => { });
  },
  signClick: function () {
  
    var that = this
        //第1步:创建动画实例
    var animation = wx.createAnimation({
      duration: 1000,                     //动画时长   
      timingFunction: "ease",             //线性 
      delay: 0                           //0则不延迟 
    })
        //第2步:将创建的动画实例赋值给当前的动画
    this.animation = animation;
        //第3步:执行动画，Z轴旋转360度
    animation.opacity(1).rotateZ(360).step();
        //第4步:导出动画对象赋值给数据对象
    this.setData({
      animationData: animation.export(),
    })
 
        //设置指定时间后进行页面跳转
    setTimeout(function () {
      wx.navigateTo({
        url: '../Patch/Patch'
      })
    }.bind(this), 800)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res.platform,
        })
        if (res.platform == "devtools") {
              
        } else if (res.platform == "ios") {
        
        } else if (res.platform == "android") {
       
        }
      }
    })
 
    wx.showLoading({
      title: '加载中',
    })
 
 
     app.login()

    that.setData({
      userInfo: wx.getStorageSync('userinfo'),
      buttonClicked:true
    })


    that.date()
    that.patch()
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    that.dateInit();
    if ((month) < 10) {
      that.setData({
        year: year,
        month: month,

        isToday: '' + year + '0'+month + now.getDate()
      })
    } else if (now.getDate() < 10) {
      that.setData({
        year: year,
        month: month,

        isToday: '' + year + month + '0'+now.getDate()
      })
    }
     else if (((month + 1) > 10) || (now.getDate() > 10)) {
      that.setData({
        year: year,
        month: month,

        isToday: '' + year  + month  + now.getDate()
      })
    }
    if (((month + 1) < 10) && (now.getDate() < 10)) {

      that.setData({
        year: year,
        month: month,

        isToday: '' + year  +'0'+month + '0' + now.getDate()
      })
    }

 
    setTimeout(function () {
      wx.hideLoading();
    }.bind(this), 800)
    // that.setData({
    //   year: year,
    //   month: month,
    
    //    isToday: '' + year + month + now.getDate()
    // })
    // console.log(typeof (that.data.isToday))
    // console.log(that.data.isToday==that.data.dateArr[7].isToday)


  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];                       //需要遍历的日历数组数据
    let arrLen = 0;                         //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                 //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    var startWeek;
   
    if (this.data.systemInfo == "devtools") {
              
      startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); 
    } else if (this.data.systemInfo == "ios") {
         
     startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();      //目标月1号对应的星期 
    } else if (this.data.systemInfo == "android") {
    startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();      //目标月1号对应的星期
        }
                       
    let dayNums = new Date(year, nextMonth, 0).getDate();   
   
         //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;

    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        if((month+1)<10){
                 obj = {
          isToday: '' + year +'0'+(month + 1) + num,
          dateNum: num,
          weight: 5
        }
        }
        else if(num<10){
          obj = {
            isToday: '' + year + (month + 1) +'0'+ num,
            dateNum: num,
            weight: 5
          }
        }
        else if (((month + 1) > 10) || (num > 10)) {
          obj = {
            isToday: '' + year + (month + 1) + num,
            dateNum: num,
            weight: 5
          }
        }
        if (((month + 1) < 10)&&(num<10)){
    
            obj = {
          isToday: '' + year +'0'+ (month + 1) + '0'+num,
          dateNum: num,
          weight: 5
        }
        }

      
      } else {
        obj = {};
      }

      dateArr[i] = obj;
    }
  
    
    let that=this;
    var list = dateArr;
 
    for (var i = 0; i < that.data.datenow.length; i++) {

      for (var j = 0; j < list.length; j++) {
   
           if (that.data.datenow[i] == list[j].isToday) {
          
             var isToday = list[j].isToday
             var dateNum = list[j].dateNum
             var weight = list[j].weight
             var key = {
               isToday: isToday,
               dateNum: dateNum,
               weight: weight,
               flag: 2//代表已签到
             }
             list[j] = {};
             list[j] = key;
           }
         

      }
    }
 
    that.setData({
      dateArr: list
    })
 
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      that.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
      } else {
      that.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
   


  },
  /**
   * 上月切换
   */
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
    this.patch();
    
  },
  /**
   * 下月切换
   */
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);

    this.patch();
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
    let that = this;
    wx.showLoading({
      title: '加载中',
    })


    app.login()

    that.setData({
      userInfo: wx.getStorageSync('userinfo'),
      buttonClicked: true
    })


    that.date()
that.patch()
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    that.dateInit();
    if ((month) < 10) {
      that.setData({
        year: year,
        month: month,

        isToday: '' + year + '0' + month + now.getDate()
      })
    } else if (now.getDate() < 10) {
      that.setData({
        year: year,
        month: month,

        isToday: '' + year + month + '0' + now.getDate()
      })
    }
    else if (((month + 1) > 10) || (now.getDate() > 10)) {
      that.setData({
        year: year,
        month: month,

        isToday: '' + year + month + now.getDate()
      })
    }
    if (((month + 1) < 10) && (now.getDate() < 10)) {

      that.setData({
        year: year,
        month: month,

        isToday: '' + year + '0' + month + '0' + now.getDate()
      })
    }

    setTimeout(function () {
      wx.hideLoading();
    }.bind(this), 800)
    // that.setData({
    //   year: year,
    //   month: month,

    //    isToday: '' + year + month + now.getDate()
    // })
    // console.log(typeof (that.data.isToday))
    // console.log(that.data.isToday==that.data.dateArr[7].isToday)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var animation = wx.createAnimation({
      duration: 10,
      timingFunction: "ease", //线性 
      delay: 0, //0则不延迟 
    })
    this.animation = animation;
        //重置动画为原始状态,将原始状态赋值给数据对象进行保存
    animation.opacity(1).rotateZ(0).step();
    this.setData({
      animationData: animation.export(),
    })
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
  lookHuoDong:function(el){

    let year = String(this.data.year) ;
    let month = String(this.data.month);
    let nowdate = String(el.currentTarget.dataset.datenum);

    
    var date;
    if (parseInt(month) <10){

      date = year + '-0' + month + '-' + nowdate
    } 
    if (parseInt(nowdate)<10){
    
      date = year +'-'+month + '-0' + nowdate
    }
    if ((parseInt(month) < 10) && (parseInt(nowdate) < 10)){

      date = year + '-0' + month + '-0' + nowdate;
    }
    
    if ((parseInt(month) > 10) && (parseInt(nowdate)>10)){
      
      date = year + '-' + month + '-' + nowdate
    }
    
    

    let that = this;
    that.setData({
      buttonClicked: false
    })
    wx.request({
      url: url2 +'/punch/admin/checkClock',
      method: "POST",
      data: {
        timer: date

      },
      header: {
        'content-type': 'application/json',
        'authorization': that.data.userInfo.authorization,
      },
      success(res) {
     
       if(res.data.message=="未来的日期"){
       
       } else if (res.data.message == "今天的日期")
       {
         wx.request({
           url: url2 +'/punch/admin/AllClock',
           method: "POST",
           data: {
             timer: date

           },
           header: {
             'content-type': 'application/json',
             'authorization': that.data.userInfo.authorization,
           },
           success(res) {
         
        
             if(res.data.code=="200"){
        
               wx.navigateTo({
                 url: '../cardDetail2/cardDetail2?date=' + date
               })
             }else{
               wx.navigateTo({
                 url: '../add/add'
               })
             }
             
           }
         })
     
     
       }
       else{
           wx.request({
             url: url2 +'/punch/admin/AllClock',
      method: "POST",
      data: {
        timer: date

      },
      header: {
        'content-type': 'application/json',
        'authorization': that.data.userInfo.authorization,
      },
      success(res) {
    
        if(res.data.code=="200"){
              wx.navigateTo({
           url: '../cardDetail2/cardDetail2?date='+date
         })
        }else{
          wx.navigateTo({
            url: '../Patch/Patch?date=' + date
          })
        }
      }
    })
       }
      }
    })

    // wx.navigateTo({
    //        url: '../Patch/Patch?date='+date
    //      })
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