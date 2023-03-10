import { config } from "dotenv";

config();

export default {
    domain: process.nextTick.DOMAIN || "",
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || "",
    privateK: process.env.JWTPRIVATEKEY || ""
};

export const mailCredencials = {
    user: process.env.MAILUSER || "",
    sericeClient : process.env.MAILCLIENTID || "",
    privateKey: process.env.MAILPRIVATE || "",
    accesToken: process.env.ACCESSTOKEN || ""
}

export const setAccessToken =  (newToken) => {
    process.env.ACCESSTOKEN = newToken;
};

