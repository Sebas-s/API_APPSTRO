import { getConnection } from "../config/db.config";
import { postAstroSchema } from '../models/astro.schema';

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
    res.status(500);
    res.send(error.message);
  }
};

const postAstro = async (req, res) => {
  try {
    const {
      name_astro,
      typpeAstro,
      description,
      imgUrl,
      mainComposition,
      distance,
    } = req.body;
    console.log(req.body);
    const validate = ajv.compile(postAstroSchema);
    const isValid = validate({
      name_astro,
      typpeAstro,
      description,
      imgUrl,
      mainComposition,
      distance,
    });

    if (!isValid) {
      throw new Error(validate.errors[0].message);
    }
    const connection = await getConnection();
    await connection.query(
      `call addNewAstro('${name_astro}',${typpeAstro},'${description}','${imgUrl}',${mainComposition},${distance})`
    );
    res.status(200);
    res.send("El astro ha sido insertado correctamente");
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
    res.status(500).send(error.message);
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
