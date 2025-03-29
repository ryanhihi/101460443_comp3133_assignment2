const jwt = require('jsonwebtoken');
const CFG = require('./config');

const auth = (req, res, next) => {
    try {
        const header = req.header('Authorization');
        if (!header)
            throw Error('No authorization provided.');

        const token = header.replace('Bearer ', '');
        if (!token) 
            throw Error('Authorization is empty.');

        req.user_id = jwt.verify(token, CFG.SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ message: `${error.message} Access denied.` });
    }
};

module.exports = auth;
