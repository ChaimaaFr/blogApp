const jwt = require("jsonwebtoken");



const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: " admin access required" });
    }
       //res.status(200).json({ message: " admin access succesfully" });
         
       return next();

   
};


module.exports = isAdmin;
