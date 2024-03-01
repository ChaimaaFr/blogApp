const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {   
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }
        jwt.verify(token.split(' ')[1], 'secretkey', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Failed to authenticate token" });
            }
            req.userId = decoded.userId;
            next();
        });
    } 
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
