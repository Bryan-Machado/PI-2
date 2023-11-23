const jwt = require('jsonwebtoken');

function generateAccessToken(data, options={ expiresIn: '1800s' }){
    return jwt.sign(data, process.env.SECRET_KEY, options);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(req.headers);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, data) =>{
        console.log(err);

        if (err) return res.sendStatus(403);

        req.accessToken = data;

        next();
    });

}

module.exports = {generateAccessToken, authenticateToken}