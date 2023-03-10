import { sequelize } from "../config/db.config";
import { postAstroSchema } from "../models/astro.schema";
const Ajv = require("ajv");
const ajv = new Ajv();

const getAllAstros = async (req, res) => {
  try {
    const results = await sequelize.query("CALL getAllAstros()", {
      type: sequelize.QueryTypes.RAW,
    });
    results === undefined
      ? res.send("Error: 404 not found")
      : res.json(results);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getTypeAstros = async (req, res) => {
  try {
    const results = await sequelize.query("CALL getTypesAstro();", {
      type: sequelize.QueryTypes.RAW,
    });
    results == "" ? res.send("Error: 404 not found") : res.json(results);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getAstrosByType = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await sequelize.query(`call getAstrosByType(${id})`, {
      type: sequelize.QueryTypes.RAW,
    });

    results == "" ? res.send("Error: 404 not found") : res.json(results);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getAstroById = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await sequelize.query(`call findAstroById(${id});`, {
      type: sequelize.QueryTypes.RAW,
    });

    results == "" ? res.send("Error: 404 not found") : res.json(results);
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

    await sequelize.query(
      `call addNewAstro('${name_astro}',${typpeAstro},'${description}','${imgUrl}',${mainComposition},${distance})`,
      {
        type: sequelize.QueryTypes.RAW,
      }
    );

    res.status(200);
    res.send("El astro ha sido insertado correctamente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/*const results = await sequelize.query("",{
      type: sequelize.QueryTypes.RAW,
    });
    
    results == "" ? res.send("Error: 404 not found") : res.json(results);
    
    */

const deleteAstroById = async (req, res) => {
  try {
    const { id } = req.params;
    await sequelize.query(`call deleteAstroById(${id})`, {
      type: sequelize.QueryTypes.RAW,
    });
    res.status(200).json({ message: "Astro deleted correctly" });
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
