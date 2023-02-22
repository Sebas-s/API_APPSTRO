import jwt from 'jsonwebtoken';

import { privateK } from './g.config';


export const getToken = (data) => {
    return jwt.sign({
        data
    }, privateK , { expiresIn: '3 days'});
};

export const getTokenData = (tk) => {
    jwt.verify(tk, privateK)
    .then((decoded) => {
        return decoded;

    }).catch((error) => {
        console.log(error.message);
        return null;
    });

};

