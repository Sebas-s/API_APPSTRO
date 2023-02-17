import { getConnection } from "../database/database";

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

const addUser =async(req, res)=>{
try{
    const{name, tipo, email, contraseña } = req.body
}catch{

}

}


const addLanguage = async (req, res) => {
  try {
      const { name, programmers } = req.body;

      if (name === undefined || programmers === undefined) {
          res.status(400).json({ message: "Bad Request. Please fill all field." });
      }

      const language = { name, programmers };
      const connection = await getConnection();
      await connection.query("INSERT INTO language SET ?", language);
      res.json({ message: "Language added" });
  } catch (error) {
      res.status(500);
      res.send(error.message);
  }
};


export const methods = {
  getAllUsers
};
