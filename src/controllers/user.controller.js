import Ajv from "ajv";
import { sequelize } from "../config/db.config";
import { postUsersSchema } from "../models/user.schema";

const ajv = new Ajv();

const getAllUsers = async (req, res) => {
  try {
    const result = await sequelize.query("CALL getUsers;", {
      type: sequelize.QueryTypes.RAW,
    });
    result[0] == "" ? res.send("Error: 404 not found") : res.json(result[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const { typeUser, firstName, lastName, email, contrasenia, user } =
      req.body;

    const valid = ajv.compile(postUsersSchema);
    const isValid = valid({
      typeUser,
      firstName,
      lastName,
      email,
      contrasenia,
      user,
    });

    if (!isValid) {
      throw new Error(valid.errors[0].message);
    }

    await sequelize.query(
      `call addUser(${typeUser}, '${firstName}', '${lastName}', '${email}', '${contrasenia}', '${user}', @mensaje)`,
      {
        type: sequelize.QueryTypes.RAW,
      }
    );
    const message = await sequelize.query(`SELECT @mensaje`);

    console.log("el mensaje seria", message);
    message[0][0]["@mensaje"].includes(firstName)
      ? res.status(200).json(message[0][0])
      : res.send(`Status 200: ${message[0][0]["@mensaje"]}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getAllUsers,
  addUser,
};
