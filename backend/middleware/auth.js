const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).send({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;

        next();

    }
    catch (err) {
        return res.status(401).send({ message: "Invalid Token" });
    }

}

module.exports = auth;