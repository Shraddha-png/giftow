const jwt = require('jsonwebtoken');


function generateToken(user) {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
}

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7); // Slice 'Bearer ' part
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};




const getError = (error) => {
    if (error.response) {
        // Error response from the server
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        if (error.response.data.message) {
            return error.response.data.message;
        }
        return error.response.data;
    }
    if (error.request) {
        // Error request made but no response received
        console.error('Error request:', error.request);
        return 'Network error: No response received from the server';
    }
    // Other errors
    console.error('Error message:', error.message);
    return error.message;
};

module.exports = { generateToken, isAuth, getError };
