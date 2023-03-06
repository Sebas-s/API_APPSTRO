import Ajv from 'ajv';
import { getConnection } from "../config/db.config";
import { getToken, getTokenData } from '../config/jwt.config';
import { postUsersSchema } from '../models/user.schema';

const ajv = new Ajv();

const getAllUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("CALL getUsers;");
    result[0] == ""
      ? res.send("Error: 404 not found")
      : res.json(result[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const {
      typeUser,
      firstName,
      lastName,
      email,
      contrasenia,
      user,
    } = req.body;

    const valid = ajv.compile(postUsersSchema);
    const isValid = valid({
      typeUser,
      firstName,
      lastName,
      email,
      contrasenia,
      user
    });
  
    if (!isValid){
      throw new Error(valid.errors[0].message);
    }
  
    const connection = await getConnection();
    await connection.query(
      `call addUser(${typeUser}, '${firstName}', '${lastName}', '${email}', '${contrasenia}', '${user}', @mensaje)`
    );

    const message = await connection.query(`SELECT @mensaje`)

  
    console.log('el mensaje seria',message[0]['@mensaje']);
    message[0]['@mensaje'].includes(firstName)
    ?  res.status(200).json(message[0])
    :  res.send(`Error 404: ${message[0]['@mensaje']}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const methods = {
  getAllUsers,
  addUser
};