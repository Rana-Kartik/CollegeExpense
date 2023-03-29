
module.exports.routes = {

  '/': { view: 'pages/login'},
  
  // User Login , Signup , Log out
  '/signup': {view: 'pages/signup'},
  'get /forgotpassword' : {view : 'pages/ForgotPassword'},
  'get /changepassword' : {view : 'pages/changepassword'},
  'get /admin' : {view : 'pages/Admin'},
  'POST /user/signup' : 'UserController.signUp',
  'POST /user/login' : 'UserController.login',
  'GET /user/logout' : 'UserController.logout',
  'GET /user/profile' : 'UserController.getuserProfileData',
  'POST /user/updateprofile' : 'UserController.updateuserProfile',
  'POST /changepassword' : 'UserController.changepassword',
  'POST /forgotpassword' : 'UserController.forgotpassword',

  // Email Verifiaction
  '/conformation' : { view : 'pages/verification'},
  'POST /user/verification' : 'UserController.verification',

   // NEW User add
  'POST /user/adduser' : 'AccountController.addUser',
  'POST /user/deleteuser/:accountId/:emailIndex' : 'AccountController.deleteUser',  


// Transaction Section
  
  // ADD Transaction
  'POST /transaction/addtransaction/:accountId':  'TransactionController.addTransaction',

  // Get All Transaction Details
  'GET /transaction/getallTransaction' : 'TransactionController.getallTransaction',

  // Delete Transaction
  'POST /transaction/deleteTransaction/:transactionId/:accountId' : 'TransactionController.deleteTransaction',

  // Get Transaction Details By ID
  'GET /transaction/getTransaction/:id' : 'TransactionController.getTransactionById',

  'POST /transaction/search' : 'TransactionController.search',


  // Update the Transaction By Id
  'POST /transaction/updateTransaction/:transactionId/:accountId' : 'TransactionController.updateTransaction',


  // Account Section
 
  // Create Account
  'POST /account/createaccount' : 'AccountController.createAccount',

  // Delete Account
  'POST /account/deleteAccount/:id' : 'AccountController.deleteAccount',

  // Update Account
  'POST /account/updateAccount/:id' : 'AccountController.updateAccount',

  // Get all Account
  'GET /account/getallAccount' : 'AccountController.getallAccount',

  

  // Get account by Id
  'GET /account/getAccountByID/:id' : 'AccountController.getAccountByID',

};