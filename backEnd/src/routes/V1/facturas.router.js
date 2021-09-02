import { Router } from "express";

import { getFacturasDespacho } from "../../controllers/V1/facturas.controller";
import { checkAuth } from "../../Middlewares/auth-middleware";
import { handleRequestErrors } from "../../Middlewares/validator-middleware";
import { validateNewUserBody } from "../../validators/v1/users.validator";

const router = Router();

//router.post("/api/v1/login", login);
//router.post("/api/v1/users", createNewUser);
router.get("/api/v1/facturasDespacho", getFacturasDespacho);
//router.get("/api/v1/users/:id", getUserById);
//router.delete("/api/v1/users/:id", checkAuth, deleteUser);
//router.put("/api/v1/users/:id", checkAuth, updateUser);

export default router;
