/**
 * BiaogeController
 *
 * @description :: Server-side logic for managing biaoges
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  biaogeData:function (req, res) {
    Biaoge.find({}).exec(function (err,updated){
      var params = _.extend(req.query || {}, req.params || {}, req.body || {});
      console.log(updated);
      if (err) {
        console.log('出错:'+err); //这一行会报错。
      }else{
        res.send(200,{success:true,data:updated});
      }
    });
  }

};

