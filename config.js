
// var host = "http://192.168.0.156:5000"
// var host = "http://192.168.0.188:8086/"
//var host = "http://192.168.0.188:8080/"
//开发

// var host = "http://192.168.1.112:8080/crazyBird

// var host = "http://192.168.1.103:8080/crazyBird"

//正式
// var host = "http://192.168.1.105:8081/com.crazyBird"
// var host ="http://94.191.106.228:8080/Agriculture"
// var wss ="wss://www.sxscott.com/crazyBird/websocket/"
//本地

var host = "https://www.gadstru.cn/punch"
var wss ="wss://www.sxscott.com/crazyBird/websocket/"
var config = {
  host,wss,
  // 登录地址，用于建立会话
  loginUrl: `${host}/user/login`,

  bindingUrl: `${host}/user/binding`,

  //失误招领图片上传

  uploadFile: `${host}/upload/avatar`,

  //获取手机号
  getphoneUrl: `${host}/user/deciphering`,
  //第三方平台登录
  plantLoginUrl: `${host}/user/account/platform/login`,

  //头像上传
  avatarurl: host + "/upload/avatar",

  // 通用上传
  picurl: host + "/upload/pic",

  // 绑定账号
  bindurl: host + "/user/account/weixinapp/bind"
};

module.exports = config
