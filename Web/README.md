1.安装NodeJs V4.5(https://nodejs.org/dist/v4.5.0/node-v4.5.0-x64.msi)
2.安装CNPM国内淘宝镜像(命令:npm install -g cnpm --registry=https://registry.npm.taobao.org)
3.安装bower全局NPM依赖(命令:cnpm install bower -g)
4.初始化bower依赖(命令:bower install)


（1）通过ajax 请求把菜单menu.json放在了本地内容
```
 $http({
        url: 'json/menu.json',
        method: 'GET',
        contentType: "application/json; charset=utf-8"
    }).success(function (data, header, config, status) {
        $scope.userlists=data
    }).error(function (data, header, config, status) {
        //处理响应失败
    });

```
(2)存储cookie存储 sessionStorage存储和localStorage存储
```
        localStorage.localInfo='{"msg":"登录成功！","success":true,"displayName":"localStorage存储"}';
        sessionStorage.sessionInfo='{"msg":"登录成功！","success":true,"displayName":"sessionStorage存储"}';
        var cookie = $.cookie("attr","cookie存储"); //存储
        
        var loginInfo = localStorage.localInfo || sessionStorage.localInfo;
        var sessionInfo = localStorage.sessionInfo || sessionStorage.sessionInfo;
        
        if(loginInfo != undefined){
            $('#localUser').html(JSON.parse(loginInfo).displayName);//ocalStorage存储在页面显示
        }
        if(sessionInfo != undefined){
            $('#sessionUser').html(JSON.parse(sessionInfo).displayName);//ocalStorage存储在页面显示
        }
        if(cookie != undefined){
            $('#cookieUser').html($.cookie('attr')); //cookie读取内容
        }
// html绑定
  <     <span style="color: red" id="localUser"></span>
        <span style="color: #0d7fdd" id="sessionUser"></span>
        <span style="color: brown" id="cookieUser"></span>
```
(3)表格的 增加 删除 修改 查询   批量删除  