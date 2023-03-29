
module.exports = {
  tableName : 'transactionexpense',
  attributes: {
    
    account_Id : {
      type : 'string',
      required : true
    },
    transactionuserName : {
      type: 'string',
      required : true
    },
    transactionType : {
      type: 'string',
      required : true
    },
    transactionAmount : {
      type : 'number',
      required : true
    },
    transactionDescription :{
      type : 'string',
      required: true
    }
  },

};

