import { getConnection } from "../config/db.config";
const Ajv = require("ajv");
const ajv = new Ajv();

const postAstroSchema = {
  type: "object",
  properties: {
    name_astro: { type: "string", minLength: 1 },
    typpeAstro: { type: "integer", minimum: 1 },
    description: { type: "string", minLength: 10 },
    imgUrl: { type: "string", minLength: 10 },
    mainComposition: { type: "integer", minimum: 1 },
    distance: { type: "number", minimum: 4 },
  },
  required: [
    "name_astro",
    "typpeAstro",
    "description",
    "imgUrl",
    "mainComposition",
    "distance",
  ],
  additionalProperties: false,
};


const getAllAstros = async ( res) => {
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
    result[0] == ""
      ?  res.send("Error: 404 not found")
      : res.json(result[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAstroById = async (req,res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    await connection.query(`call deleteAstroById(${id})`);
    res.status(200).json({ message: 'Astro deleted correctly'});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getAstrosByType,
  getTypeAstros,
  getAstroById,
  deleteAstroById,
  getAllAstros,
  postAstro,
};
