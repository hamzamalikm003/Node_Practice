const jwt = require("jsonwebtoken");


const Auth = async (req, res, next) => {
  try {
      // Fetch Token
      const bearerHeader=req.headers['authorization'];
      if(!bearerHeader){
        return res.status(401).json({message:"Auth Failed"})
      }
      token=bearerHeader.split(' ')[1];
      if(!token){
        return res.status(401).json({message:"Auth Failed"})
      }
      // local storage
      const decoded=jwt.verify(token,"secretwebkey");
      req.user=decoded.user;
    
      next();
  } catch (err) {
    res.status(401).send("unauthorized user");
    console.log(err);
  }
};

module.exports = Auth;
