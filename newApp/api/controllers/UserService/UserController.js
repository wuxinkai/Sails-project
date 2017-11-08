/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//页面路由跳转

//链接数据库的表引入进来

//不用在在这里引用所有内容是全局性的，

//访问内容  需要端口号     文件件名字   文件名  文件里的属性名
// http://localhost:1337/UserService/User/zhuce


 // User = require('../../models/User'); //数据库的表字段都在models 文件夹 里

module.exports = {

  zhuce: function (req, res) {

    //(一) 渲染模板方式
    // res.view({data:{name:'login'}});    //该方式会默认去找views/user/login.ejs文件
    //res.view('hello',{data:{name:'test123'}});//指定页面views/hello.ejs

    //(二)接收参数的方式；
    // (1) var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    //(2) var params = req.allParams();//获取所有的参数
    //（3）
    //（三）增删改查
    //(1)添加
    var params = req.allParams();//获取所有的参数
    // User.create(params).exec(function (err,created){
    //   console.log(err);
    //   console.log(created);     //返回的是创建的对象
    // });

    //（2）修改
    // User.update({uid:1},params).exec(function (err,updated){
    //   if (err) {
    //     console.log('出错:'+err) //这一行会报错。
    //   }else{
    //     //console.log(updated)
    //   }
    // });
    //（3）删除
    // User.query('delete from user where uid=?',[6],function(err,results){
    //   // console.log('错误:'+err);
    //   console.log(results);
    // });
    //(4)查询
    //findOne 查询一条； 是对象
    // User.findOne({email:'1'}).exec(function (err,updated){
    //   if (err) {
    //     console.log('出错:'+err); //这一行会报错。
    //   }else {
    //     console.log(updated);
    //     res.send(200, {success: true, data: updated});
    //   }
    // });

    //find 查询结果集合
    User.find({}).exec(function (err,updated){
      var params = _.extend(req.query || {}, req.params || {}, req.body || {});

      console.log(params);

      if (err) {
        console.log('出错:'+err); //这一行会报错。
      }else{
        res.send(200,{success:true,data:updated});
      }
    });

  },

};



