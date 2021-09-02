import { checkSchema } from "express-validator";

export const validateNewUserBody = checkSchema({
  name: {
    isString: true,
    rtrim: {
      options: "",
    },
    isLength: {
      options: {
        min: 2,
      },
    },
    errorMessage: "No se Permite espacios en Blanco",
  },
  email: {
    isEmail: true,
    rtrim: {
      opacity: "",
    },
    isLength: {
      options: {
        min: 4,
      },
    },
    errorMessage: "Formato de Correo invalido",
  },
});
