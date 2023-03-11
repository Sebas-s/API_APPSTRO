import { config } from "dotenv";

config();

export default {
    domain: process.nextTick.DOMAIN || "",
    host: process.env.HOST || "",
    database: process.env.DB || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
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

