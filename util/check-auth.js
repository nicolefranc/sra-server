const {AuthenticationError} = require('apollo-server');

const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;

    if(authHeader){
        // beaer ....
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token, process.env.SECRET_KEY);
                return user;
            } catch(err){
                throw new AuthenticationError('invalid/expired token');
            }
        }
        throw new Error('authentication token must be \'Bearer [token]')
    }
    throw new Error('authentication header must be provided')
}