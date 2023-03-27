
module.exports =  {
  tableName : 'user',
  attributes: {

   userName : {
     type : 'string',
     required: true  
   },
   email : {
    type : 'string',
    unique : true
   },
   password : {
    type: 'string'
   },
   userAccounts : {
    collection: 'account',
    via: 'createrId'
   },
   phoneNumber : {
     type : 'number',
     required: true
   },
   country : {
    type : 'string',
    required : true
   }
  },
};
