import { getConnection } from "../database/database";

const getAstros = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM astro");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getTypeAstros = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM typeastro");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getAstroById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(`call findAstroById(${id});`);
    if (result[0] == "") {
      console.log(res[0]);
      return res.send("Error: 404 not found");
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getAstros,
  getTypeAstros,
  getAstroById,
};
