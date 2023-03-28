const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

module.exports = {
  
    // Add New User
    addUser : async (req , res) => {

        const account_id = req.query.accountId;

        const email = req.body.email;

        const user = [];

        const findUser = await Account.findOne({_id : account_id})

        for(let i = 0; i<findUser.users.length ; i++){
            user.push(findUser.users[i])
        }
        user.push(email);

        await Account.updateOne({ _id : account_id}).set({
            users : user
        })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ranakartik461@gmail.com',
                pass: 'aduz aypc piie kqkt'
            }
          });

          // Find User Name
          const userDetails = await User.findOne({ id : findUser.createrId})
          
          // Invite the New User Using Mail
          const mailOptions = {
            from: 'ranakartik461@gmail.com',
            to:    email,
            subject: 'Welcome To Expense Manager',
            html: "<h2 style='font-weight:bold;'>"+ `${userDetails.userName}` + '</h2>' + '<h3>like to Invite you to keep track of the expense together via the Expense Manager and Collabrate With them.' + '</h3>' + "<br>" + '<h3>' + "Access Your Group Account Now."+ '</h3>' + "<br>" + "<h4>"+ "Thank & Regards,"+ '<br>' + "Team Expense Manager" + '</h4>' // html body"
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          // For Validation Using Flash Message
         
          req.addFlash('successAddUser', 'User Successfully Added');
          res.redirect(`/transaction/getallTransaction?accountId=${account_id}`);
        
    },

    // Delete Added User
    deleteUser : async (req ,res) => {

        const accountId = req.params.accountId;
        const emailIndex = req.params.emailIndex;

       await Account.findOne({id : accountId}).then(async result => {

        for(let i=0 ; i<result.users.length ; i++){
            if(i == emailIndex){
                result.users.splice(i , i+1);
            }
        }

            await Account.updateOne({ _id : accountId}).set({
                users : result.users
            })

            res.redirect(`/transaction/getallTransaction?accountId=${accountId}`);
        
        }).catch(err => {
            res.status(500).json({
                message : "Error in Delete User"
            })
        })

    },

    // Create New Account
    createAccount : async (req , res) => {

        const token = req.cookies.token;

        if(token){
                
            // GET User Id from Token
                const verifyUser = jwt.verify(token , process.env.JWT_KEY);
                const userId = verifyUser.password;

            await Account.create({createrId : userId   , accountName : req.body.accountName , users : []} ).fetch().then(result => {
                
                    req.addFlash('success', 'A success message.');
                    res.redirect('/account/getallAccount'); 

                }).catch(err => {
                   
                    res.redirect('/account/getallAccount');
                })
        }else{
            res.redirect('404');
        }

    },

    // Delete Account
    deleteAccount : async ( req , res) => {

        const id = req.params.id;

        Account.destroy(id).then(result => {
        
           
            res.redirect('/account/getallAccount');
            
        }).catch(err => {
            res.status(404).json({
                message: "Account Deletion is Failed"
            })
        })
    },

    // Update account
    updateAccount : async ( req , res) => {

       await Account.update({id : req.params.id} , { accountName : req.body.accountName}).then(result => {
            
            res.redirect('/account/getallAccount')

        }).catch(err => {
            res.status(404).json({
                message : 'updation failed'
            })
        })
    },

    getallAccount : async (req , res) => {

       const token = req.cookies.token;

            if(token){
            // Find User id From Token
            const verifyUser = jwt.verify(token , process.env.JWT_KEY);
            const userId = verifyUser.password;

            const emailId = verifyUser.email;
            
            // Using This also Finded a Added users Accounts
            await Account.find({createrId : userId}).then( async result => {

                    const allAccount = await Account.find({});
                    console.log("all account", allAccount)
                    const accounts = [];

                    for(let i=0 ; i< allAccount.length ; i++){

                        for(let j=0 ; j< allAccount[i].users.length ; j++ ){
                            if(emailId == allAccount[i].users[j]){
                                accounts.push(allAccount[i].id)
                            }
                        }
                    }

                    const addedUserAccount = [];
                    for(let i=0 ; i<accounts.length ; i++){

                    const useraccount = await Account.findOne({ id :accounts[i] })
                    addedUserAccount.push(useraccount)
                    }

                    res.view('pages/dashboard' , { addeduserAccount : addedUserAccount , accounts: result});

                }).catch(err => {
                    console.log(err)
                    res.status(505).json({
                        message : "Erron in Get Allaccount"
                    })
                })
            }else{
                res.redirect('404');
            }
    },

    // Get Account By Id
    getAccountByID : async ( req , res) => {
        Account.findOne({id : req.params.id}).exec( (error , account) => {
            if(error){
                res.status(500).json({
                    message : 'Error in Get account'
                })
            }

            res.status(200).json({
                account : account
            })
        })
    }

};

