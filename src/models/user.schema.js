export const postUsersSchema = {
    type: "object",
    properties: {
      typeUser: { type: "integer", minimum: 1 },
      firstName: { type: "string", minLength: 3 },
      lastName: { type: "string", minLength: 3 },
      email: { type: "string", minLength: 5 },
      contrasenia: { type: "string", minLength: 8 },
      user: { type: "string", minLength: 3 },
    },
    required: [
        "typeUser",
        "firstName",
        "lastName",
        "email",
        "contrasenia",
        "user",
    ],
    additionalProperties: true,
  };
