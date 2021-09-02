import { Router } from "express";

import {
  createNewMotorista,
  getMotoristas,
  getMotoristaById,
  deleteMotorista,
  updateMotorista,
} from "../../controllers/V1/motorista.controller";

const router = Router();

router.get("/api/v1/motoristas", getMotoristas);
router.post("/api/v1/motoristas", createNewMotorista);
router.get("/api/v1/motoristas/:id", getMotoristaById);
router.delete("/api/v1/motoristas/:id", deleteMotorista);
router.put("/api/v1/motoristas/:id", updateMotorista);

export default router;
