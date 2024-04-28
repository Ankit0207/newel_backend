const jwt = require("jsonwebtoken");


const authMiddleware = async (req, res, next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, "loginSecretKey");
            if (decoded) {
                req.userId = decoded.userID;
                next();
            } else {
                return res.status(400).json({ msg: "user is not authorized" });
            }
        } else {
            return res.status(400).json({ msg: "login to continue" });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


module.exports = { authMiddleware };