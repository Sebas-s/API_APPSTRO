import mysql from "promise-mysql";
import config from "./g.config";

const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    port: config.sqlPort
});

const getConnection = () => {
    return connection;
};

module.exports = {
    getConnection
};
