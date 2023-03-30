const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {

    try{

      const token = req.cookies.token;
      if(!token){
          return res.redirect('/login')
      }
        const decoded = jwt.verify(token, 'secret'); 
        req.userData = decoded;
        req.id = decoded
        proceed();
      } catch(error){
          return res.redirect('/login');
      }
  
  };