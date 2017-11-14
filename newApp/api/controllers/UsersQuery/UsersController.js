/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //登陆
  login: function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Users.findOne({userName:params.userName,password:params.password}).exec(function (err,data){
      console.log(err)
      if (err) {
        console.log('出错:'+err); //这一行会报错。
      }else{
        res.send(200,{success:true,data:data});
      }
    });
  },



  reg: function (req, res) {
    return res.json({
      todo: 'reg() is not implemented yet!'
    });
  }
};

