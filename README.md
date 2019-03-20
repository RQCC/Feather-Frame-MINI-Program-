** Feather-Frame-MINI-Program
微信小程序的常用功能封装：广播通知、数据请求、国际化文件等

## 一.广播（通知）模块 (assets/notification/notificationCenter.js)

### 方法/Method
 
  注册广播名称/register notification name

      在notificationCenter.js中
      Const NN = {MOVIE_PLAY:"MOVIE_PLAY"}

  添加广播监听

      addObserver(obj, function, notification name);

  发布广播

      post(obj, notifica name, info);

  移除广播监听

      removeObserver(obj, notifica name);
    




### 使用示例
  下载此文件：notificationCenter.js放入项目

    const NC = requir("notificationCenter.js");
    //添加通知：
    function Test (){
      //添加通知
      //NC.MOVIE_PLAY是广播名称 请自行在notificationCenter.js的NN中定义
      NC.addObserver(this, this.playMovie, NC.MOVIE_PLAY);
      //接收到广播触发的函数
      this.playMovie = function(info){
        console.log(" play movie ");
        console.log('广播的信息：'+info);
        //取消广播监听
        NC.removeObserver(this, NC.MOVIE_PLAY);
      }
    }
    Test();
    //发布广播：
    NC.post(this, NC.MOVIE_PLAY,{movie_name:'your name'});

## 二.数据请求模块 (assets/service/*)

### 方法/Method
 
  注册API名称

      在api.js中注册你的api接口，便于管理接口，你也可以不使用
      

 POST请求：
 
      post(api, param, loadingStyle = 1, autoAlertError)
      
 POST 无参数请求：
 
      post(api, loadingStyle = 1, autoAlertError)
      
 GET请求
 
      get(api, param, loadingStyle = 1, autoAlertError)
      
 GET 无参数请求：
 
      get(api, loadingStyle = 1, autoAlertError)
      
 返回值：
 
      promise对象

