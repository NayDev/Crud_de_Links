require('dotenv').config();

const jwt = require('jsonwebtoken');

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const options = { expiresIn: '30 minutes' };
const refreshOptions = { expiresIn: '30 days' };

const generateJwt = (playload) => { //Gera o Token

    return jwt.sign(playload, tokenPrivateKey, options);
};

const generateRefreshJwt = (playload) => { // Token
    return jwt.sign(playload, refreshTokenPrivateKey, refreshOptions);
};

const verifyJwt = (token) => { //Verifica o Token
    return jwt.verify(token, tokenPrivateKey);
};

const verifyRefreshJwt = (token) => { //Verifica o Token
    return jwt.verify(token, refreshTokenPrivateKey);
};


const getTokenFromHeaders = (headers) => {

    const token = headers['authorization'];

    return token ? token.slice(7, token.length) : null;

};

module.exports = { generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt, getTokenFromHeaders };