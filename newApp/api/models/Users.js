module.exports = {
  tableName: 'users',
  adapter: 'mysql',
  autoid:false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id:{},userName:{},password:{},
  }
};