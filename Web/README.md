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
(2)存储cookie和存储session