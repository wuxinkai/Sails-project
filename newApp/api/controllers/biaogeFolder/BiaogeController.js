/**
 * BiaogeController
 *
 * @description :: Server-side logic for managing biaoges
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //查询
  biaogeData:function (req, res) {
    Biaoge.find({}).exec(function (err,updated){
      var params = _.extend(req.query || {}, req.params || {}, req.body || {});
      if (err) {
        console.log('出错:'+err); //这一行会报错。
      }else{
        res.send(200,{success:true,data:updated});
      }
    });
  },
//插入表格
  biaogeInsert:function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    params = params.condition;
    var sql2 = "insert into biaoge(name1,name2,name3,name4,name5,name6,name7,name8,name9) values('"+params.a1+"','"+params.a1+"','"+params.a3+"','"+params.a4+"','"+params.a5+"','"+params.a6+"','"+params.a7+"','"+params.a8+"','"+params.a9+"')"; //'"+username+"' 要加单引号
    console.log(sql2);
    Biaoge.query(sql2, function (error, results, fields) {
      if (error){
        console.log(error)
      }else {
        res.send(200,{success:true,data:results});
      }
    });
  },

//删除内容

  biaogeDelete:function (req, res) {
    var params2 = _.extend(req.query || {}, req.params || {}, req.body || {});
    params2= params2.condition.id;
    var  sql = "delete from biaoge where id="+params2+";";
    Biaoge.query(sql,function (err,rows) {
      if (err){
        console.log(err);
      }else {
        console.log(rows)
        res.send(200,{success:true});
      }
    });
  }
};

