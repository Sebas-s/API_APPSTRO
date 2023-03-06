export const postAstroSchema = {
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