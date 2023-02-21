import { getConnection } from "../database/database";

const getAllAstros = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("CALL getAllAstros()");
    result[0] == "" ? res.send("Error: 404 not found") : res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getTypeAstros = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("CALL getTypesAstro();");
    result[0] == "" ? res.send("Error: 404 not found") : res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getAstrosByType = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(`call getAstrosByType(${id})`);
    result[0] == "" ? res.send("Error: 404 not found") : res.json(result[0]);
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
    result[0] == "" ? res.send("Error: 404 not found") : res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getAstrosByType,
  getTypeAstros,
  getAstroById,
  getAllAstros,
};
