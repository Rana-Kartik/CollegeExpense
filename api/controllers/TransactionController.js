
module.exports = {
  
  // Add Transaction
  addTransaction : async (req , res) =>{

    const account_Id = req.params.accountId;
    const transactionType = req.body.transactionType;
    const transactionAmount = req.body.transactionAmount;
    const transactionDescription = req.body.transactionDescription;

    // Find Account
    const accountDetails = await Account.findOne({id : account_Id });
    const userId = accountDetails.createrId;

    // Find Username of Account
    const userDetails = await User.findOne({id : userId});
    const transactionuserName = userDetails.userName;
  
    Transaction.create({account_Id : account_Id , transactionuserName : transactionuserName , transactionType: transactionType , transactionAmount : transactionAmount , transactionDescription : transactionDescription}).fetch()
    .then((result) => {

        req.addFlash('success', 'Transaction Successfully Added');
        res.redirect(`/transaction/getallTransaction?accountId=${account_Id}`);
        
    }).catch(err => {
        res.status(500).json({
            error : err,
            message : "Transaction Failed"
        })
    })

  },

  // Get Transactions
  getallTransaction : async (req , res) => {

    const account_Id = req.query.accountId;

   await Transaction.find({ account_Id : account_Id}).sort('createdAt DESC').then(async (result) => {

       const userAccountDetails = await Account.findOne({ id : account_Id})
       const addedUserDetails = userAccountDetails.users;

        res.view('pages/transaction' , { transaction : result , users :  addedUserDetails});

    }).catch(err => {
        res.status(500).json({
            err : err,
            message : 'Error in Get Blog'
        })
    })
  },

  // Get Transaction By Id
  getTransactionById : (req , res) => {

    Transaction.find(req.params.id).then((result) => {

        res.view('transaction' , { transaction : result});

    }).catch(err => {
        res.status(500).json({
            err : err,
            message : 'Error in Get Blog'
        })
    })
  },

   // Delete Transaction
  deleteTransaction : async (req , res ) => {

    const transactionId = req.params.transactionId;
    const accountId = req.params.accountId;

   await Transaction.destroy(transactionId).then((result) => {
       
        req.addFlash('successdelete', 'Deleted Transaction Successfully');
        res.redirect(`/transaction/getallTransaction?accountId=${accountId}`);

    }).catch((err) =>{
        res.status(500).json({
            message : "Transaction Deletion Failed"
        })
    })
  },

   // Update Transaction 
  updateTransaction : async (req , res) => {

    const transactionId = req.params.transactionId;
    const account_Id =  req.params.accountId;
    const transactionuserName = req.body.transactionuserName;
    const transactionType = req.body.transactionType;
    const transactionAmount = req.body.transactionAmount;
    const transactionDescription = req.body.transactionDescription;


   await Transaction.update({ id : transactionId} , {account_Id : account_Id , transactionuserName : transactionuserName , transactionType : transactionType , transactionAmount : transactionAmount , transactionDescription : transactionDescription}).then((result) => {

        req.addFlash('success', 'Transaction Successfully Updated');
        res.redirect(`/transaction/getallTransaction?accountId=${account_Id}`);

    }).catch(err => {
        res.status(400).json({
            message : 'Transaction Updation Failed'
        })
    })

  },

  search: async function(req,res){
        const searchtransaction = req.body.transactionType
        console.log("transaction select",searchtransaction)
        Transaction.find({transactionType : searchtransaction})
        .then(data => {
            console.log("transactiontype" , data);
            res.status(200).json({
                statusCode : 200,
                data : data
            })
        })
  }

};