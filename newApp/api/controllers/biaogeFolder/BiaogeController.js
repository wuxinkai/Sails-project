/**
 * BiaogeController
 *
 * @description :: Server-side logic for managing biaoges
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Q = require('q');


//获取数据count
function getBiaoge(params) {

  var defer = Q.defer(); //两个sql同时查询 返回到一个对象里
  //查询数据  分页查询sql
  var sql = "SELECT * FROM biaoge LIMIT "+(params.condition.index-1)*params.condition.total+","+params.condition.total;
  Biaoge.query(sql, [], function (err, data) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(data);
    }
  });
  return defer.promise;
};
//获取数据集合
function getBiaogeList(params) {
  var defer = Q.defer();
  var sql = "SELECT count(*) as totalCount FROM biaoge "; //返回一共多少条
  Biaoge.query(sql, [], function (err, data) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(data);
    }
  });
  return defer.promise;
};

module.exports = {
//查询
  biaogeData:function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Q.all([getBiaoge(params), getBiaogeList(params)]).then(function (result) {
      var  biaoList  = result[0]; //接收数据库返回来的多少条数据
      var  biaoCount= result[1]; //接受回来 的总条数
      return res.json({
        result: {
          success: true,
          list: biaoList,
          count: biaoCount
        }
      });
    }, function (err) {
      res.send(500, {success: false, msg: '查询数据失败', err: err});
    });
  },

//插入表格
  biaogeInsert:function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    params = params.condition;
    var sql2 = "insert into biaoge(name1,name2,name3,name4,name5,name6,name7,name8,name9) values('"+params.a1+"','"+params.a1+"','"+params.a3+"','"+params.a4+"','"+params.a5+"','"+params.a6+"','"+params.a7+"','"+params.a8+"','"+params.a9+"')"; //'"+username+"' 要加单引号
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

