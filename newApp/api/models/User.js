module.exports = {
  tableName: 'user', //表的名字
  adapter: 'mysql',
  autoid:false,
  autoCreatedAt: false,//创建时间
  autoUpdatedAt: false, //修改时间
  attributes: {
    id:{columnName: 'uid'},email:{},nicheng:{},paw:{},
  }
};
