class TokenVerification {
    constructor(status) {
        this.status = status;
    }
}


exports.VerifyToken = (req,res,next) => {

    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        // next();
        return 1;
    } else {
        // Forbidden
        // return 0;
        res.sendStatus(403);
    }
}