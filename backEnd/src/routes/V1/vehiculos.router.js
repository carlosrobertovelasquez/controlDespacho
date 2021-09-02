import { Router } from "express";

import {
  createNewVehiculo,
  getVehiculo,
  getVehiculoById,
  deleteVehiculo,
  updateVehiculo,
} from "../../controllers/V1/vehiculos.controller";

const router = Router();

router.get("/api/v1/vehiculos", getVehiculo);
router.get("/api/v1/vehiculos", getVehiculoById);
router.post("/api/v1/vehiculos", createNewVehiculo);
router.get("/api/v1/vehiculos/:id", getVehiculoById);
router.delete("/api/v1/vehiculos/:id", deleteVehiculo);
router.put("/api/v1/vehiculos/:id", updateVehiculo);

export default router;
