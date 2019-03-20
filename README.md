
** Feather-Frame-MINI-Program

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


