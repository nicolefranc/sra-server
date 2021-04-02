const {AuthenticationError} = require('apollo-server');

const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = context => {
    const authHeader = context.req.headers.authorization;

    if (!authHeader) throw new AuthenticationError('You must be logged in. An authentication header must be provided.');
    // bearer ....
    const token = authHeader.split(' ')[1];
    
    if (!token) throw new AuthenticationError('Please provide a token of \'Bearer [token]\'');
    
    try{
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
    } catch(err){
        throw new AuthenticationError('invalid/expired token');
    }
}