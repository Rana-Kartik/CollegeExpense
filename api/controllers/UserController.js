const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Random 6 digit OTP Generator
let otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

module.exports = {
  
    // User Signup
    signUp : async (req ,res) => {

       await User.find({ email : req.body.email}).then((user) => {
        
            // Check the User Email in DB, if already regidtered
            if(user.length >= 1){
                
                res.status(409).json({
                    message : "Already Have a Account Using This Email , Try Another one"
                })
            } else {
                bcrypt.hash(req.body.password , 10 , async (err , hash) => {
                   
                    if(err){
                        return res.status(500).json({
                            error : err,
                        })
                    } else {
                       
                     // User Profile Creation
                     await User.create({userName: req.body.userName , email : req.body.email , password: hash , phoneNumber : '1234567890' , country:'India'}).fetch().then((user) => {

                            const token = jwt.sign(
                                {
                                    email : user.email,
                                    password : user.id,
                                    userName : user.userName
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn : '1h'
                                }
                            )

                            // Send Email Of OTP to User For Verification
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                  user: 'parimaltank132@gmail.com',
                                  pass: 'qorlqlshjnfdleoy'
                                }
                              });
                              
                              const mailOptions = {
                                from: 'parimaltank132@gmail.com',
                                to:  user.email,
                                subject: 'Welcome To Expense Manager',
                                html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body"
                              };
                              
                              transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });
                             res.redirect(`/conformation?token=${token}&userid=${user.id}`)
                        })
                        .catch((err) => {
                            console.log(err);

                            res.status(400).json({
                                error : err,
                                message: 'Auth Fail'
                            })
                        })

                    }
                })
            }

            
        }).catch(error => {

            res.status(500).json({
                message: "Auth Fails",
            })
        })
    },

    // User Login
    
    login : async (req , res) => {

        await User.findOne({email : req.body.email})
        .then(user => {
            if(user.length < 1){
                return res.status(404).json({
                    message : "Auth Fail"
                })
            } else{

                // chech entered userName exist into a database or not.
                 bcrypt.compare(req.body.password , user.password , (err , result) =>{

                    if(err){
                        res.status(401).json({
                            message : "Auth Fails"
                        })
                    }
 
                    if(result){
                        const token = jwt.sign({
                            email: user.email,
                            password:user.id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                     );

                     res.cookie("token" , token , {httpOnly : true }).redirect('/account/getallAccount');
                    } else{
                        req.addFlash('error', 'Invalid Credentials!!!!');
                        res.redirect('/');
                    }
                })
         
          }
        })
        .catch(err => {
            return res.status(400).json({
                message : 'Auth Failed'
            })
        })

    },


    // For Logout 
    logout : async (req , res) => {
        try{
            res.clearCookie('token').redirect('/');
        }catch(err){
            res.status(500).json({
                error : err
            })
        }
    },

    // For User Verification Based ON OTP
    verification : async (req , res) => {

        if(req.body.otp==otp){

            const token = req.query.token;
            const userId = req.query.userid;

            // After Varification Default Acccount Creation
            Account.create({ createrId :  userId, accountName : 'Defult Account' ,userAccountType : 'default' , users : []}).fetch().then(result => {

                res.cookie("token" , token , { httpOnly : true}).redirect(`/account/getallAccount`);
             }).catch(err => {
                 res.status(404).json({
                   err : err,
                   message : 'Default Account Creation is Failed'
                 })
             })
        }
        else{
            res.view('pages/verification');
        }
    },


    // Get User Profile Data
    getuserProfileData : async (req , res) => {
        const token = req.cookies.token;

       const verifyUser = jwt.verify(token , process.env.JWT_KEY);
       const userId = verifyUser.password;

       User.findOne({id : userId}).then(result => {

           res.view('pages/profile' , {result : result});
       }).catch(err => {
           res.status(500).json({
              message : 'error in getUser Profile'
           })
       })

    },

    // Update User Profile
    updateuserProfile : async ( req , res) => {

        const token = req.cookies.token;

        const verifyUser = jwt.verify(token , process.env.JWT_KEY);
        const userId = verifyUser.password;

        const userName  = req.body.userName;
        const phoneNumber = req.body.phoneNumber;
        const country = req.body.country;

        User.update({ id : userId} , { userName : userName , phoneNumber : phoneNumber , country : country}).then(result => {
            req.addFlash('success', 'Profile Successfully Updated');
            res.redirect('/user/profile');
        }).catch(err => {
            res.status(505).json({
                message : "Error in Update Profiel"
            })
        })
    }

};

