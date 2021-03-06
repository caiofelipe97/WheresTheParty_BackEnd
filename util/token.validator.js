let jwt = require('jsonwebtoken');



function verifyTokenEnv(req, res, next) {
    console.log("validando");
    let token = req.headers.authorization;
    if (!token) return res.status(400);
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        console.log(err);
        if(err) return res.status(400);
        req.userId = decoded.id;
        req.houseId = decoded.house;
        next();
    })
}

module.exports = verifyTokenEnv;

