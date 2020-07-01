const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp, accountSignIn } = require('../validators/account');
const { getMessage } = require('../helpers/validator');
const { generateJwt, generateRefreshJwt, verifyRefreshJwt, getTokenFromHeaders } = require('../helpers/jwt');



const router = express.Router();

const saltRounds = 10;

router.post('/sign-in', accountSignIn, async(req, res) => {

    const { email, password } = req.body;

    const account = await Account.findOne({ where: { email: email } });


    //validar a senha
    const match = account ? bcrypt.compareSync(password, account.password) : null;
    if (!match) return res.jsonBadRequest(null, getMessage('account.signin.invalid'));


    const token = generateJwt({ id: account.id });
    const refreshtoken = generateRefreshJwt({ id: account.id, version: account.jwtVersion });


    return res.jsonOK(account, getMessage('account.signin.success'), { token, refreshtoken });
});

router.post('/sign-up', accountSignUp, async(req, res) => {

    const { email, password } = req.body;

    const account = await Account.findOne({ where: { email: email } });
    if (account) return res.jsonBadRequest(null, getMessage('account.signup.email_exists'));

    const hash = bcrypt.hashSync(password, saltRounds)
    const newAccount = await Account.create({ email, password: hash });

    const token = generateJwt({ id: newAccount.id });
    const refreshtoken = generateRefreshJwt({ id: newAccount.id, version: newAccount.jwtVersion });

    return res.jsonOK(newAccount, getMessage('account.signup.success'), { token, refreshtoken });
});


router.post('/refresh', async(req, res) => {

    const token = getTokenFromHeaders(req.headers);

    if (!token) {
        return res.jsonUnauthorized(null, 'Invalid Token');
    }
    try {

        const decoded = verifyRefreshJwt(token);
        const account = await Account.findByPk(decoded.id);

        if (!account) return res.jsonUnauthorized(null, 'Invalid Token');

        if (decoded.version !== account.jwtVersion) {
            return res.jsonUnauthorized(null, 'Invalid Token');
        }

        const meta = {
            token: generateJwt({ id: account.id }),
        };

        return res.jsonOK(null, null, meta);

    } catch (error) {
        return res.jsonUnauthorized(null, 'Invalid Token');
    }
});
module.exports = router;