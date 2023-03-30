/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
      
    alluseraccount : async function(req,res){
       await User.find({})
       .then(result => {
        console.log("data", result);
            res.view('pages/Admin', {data:result})
       })
    }
    
};

