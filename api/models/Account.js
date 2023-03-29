
module.exports = {
  tableName : 'accountexpense',
  attributes: {

    createrId:{
      model : 'user'
      // type : 'string',
      // required : true
    },
    accountName:{
      type: 'string',
      required : true
    },
    users : 
      {
        type : 'json',
        columnType : 'array',
        required : true
      }
  },

};

