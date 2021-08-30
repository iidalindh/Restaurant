const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    const token = req.cookies.token;
    console.log(token)
    if (!token) return res.status(401).json({
        message: 'Access denied. No token provided.'
    });

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(decoded)
        if (decoded.role !== "admin")
            return res.status(401).json({
                message: 'Access denied. Bad token provided.'
            });
        req.user = decoded;
        next()
    } catch (ex) {
        return res.status(401).json({
            message: 'Access denied. Bad token provided.'
        });
    }
}
