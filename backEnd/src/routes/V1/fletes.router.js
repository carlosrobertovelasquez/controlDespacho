import { Router } from "express";

import {
  createFlete,
  createFleteFacturas,
  encabezadoFlete,
  detalleFlete,
  getAllFletes,
  cambioEstado,
  getTodosFletes,
  updateLiquidacionFlete,
  getOperacionesAll,
  reasignarFlete,
} from "../../controllers/V1/fletes.controller";
import { checkAuth } from "../../Middlewares/auth-middleware";
import { handleRequestErrors } from "../../Middlewares/validator-middleware";
import { validateNewUserBody } from "../../validators/v1/users.validator";

const router = Router();

router.post("/api/v1/createFlete", createFlete);
router.post("/api/v1/createFleteFacturas", createFleteFacturas);
router.get("/api/v1/encabezadoFlete/:flete", encabezadoFlete);
router.get("/api/v1/detalleFlete/:flete", detalleFlete);
router.get("/api/v1/getAllFletes", getAllFletes);
router.get("/api/v1/getOperacionesAll", getOperacionesAll);
router.put("/api/v1/updateFleteLiquidacion", updateLiquidacionFlete);
router.get("/api/v1/getTodosFletes", getTodosFletes);
router.put("/api/v1/reasignarFlete", reasignarFlete);
router.put("/api/v1/fleteEstado/:id", cambioEstado);

export default router;
