import {v4 as uuidv4, v4} from 'uuid';

import { getConnection } from "../config/db.config";
import { getToken, getTokenData } from '../config/jwt.config';
import { sendConfirmationMail } from '../config/mail.config';

const getAllUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("CALL getUsers;");
    result[0] == ""
      ? res.send("Error: 404 not found")
      : res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addUser = async (req, res) => {
try{
    const{name, tipo, email, contrasenia } = req.body;

}catch{

}

}

const getSessionAcount = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;

    if (typeof email === 'undefined' || typeof contrasenia === 'undefined')
    res.status(400).json({ message: "Bad Request. Please fill all field." });

    // se conecta y obtiene la session
    const connection = await getConnection();

    const session = await connection.query(`CALL getSessionAcount(${email, contrasenia})`);     

    // manda la session a la app movil o manda la señal de falta de usuario
    session[0] == ""
    ? res.send("Error: 404 not found user")
    : res.json(session[0]);

  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createUnregisterUser = async (req,res) => {

  const {email, fName, lName, contrasenia} = req.body;

  try{
    // genera codigo unico
    const code = uuidv4();

    // schema un nuevo usuario

    // generación de token

    const token = getToken({email, code});

    // envio de correo de confirmacion
    await sendConfirmationMail(email,{fist: fName, last: lName}, token );

    // agrega el usuario schema a la base de datos

    res.status(200).json({msg: '  Usuario Registrado Correctamente'});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const confirmAccount = async (req, res) => {
 
  const { token } = req.params;

  try {

    // verificamos la informacion optenida del token
    const user = getTokenData(token);
    if (!user) res.send('Error 404 Problem with token');

    // verificar la existencia de usuario no verificado
    const connection = await getConnection();

    const valid = await connection.query(`call getSessionValidation(${user.email})`) || null;

    if (!valid) res.send('Usuario ya registrado o inexistente');

    // cambiar status
    await connection.query(`call actualizateSessionStatus(${email})`);
    
    res.status(200).json({message: 'User confimate correcttly'});
  } catch (error) {
    res.status(405).send(error.message);
  }
}

export const methods = {
  getAllUsers,
  getSessionAcount,
  createUnregisterUser,
  confirmAccount
};
