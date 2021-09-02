import { Router } from "express";

import {
  createNewAyudante,
  getAyudantes,
  getAyudanteById,
  deleteAyudante,
  updateAyudante,
  getAyudantesActivos,
} from "../../controllers/V1/ayudantes.controller";

const router = Router();

router.get("/api/v1/ayudantes", getAyudantes);
router.get("/api/v1/ayudantesActivos", getAyudantesActivos);
router.post("/api/v1/ayudantes", createNewAyudante);
router.get("/api/v1/ayudantes/:id", getAyudanteById);
router.delete("/api/v1/ayudantes/:id", deleteAyudante);
router.put("/api/v1/ayudantes/:id", updateAyudante);

export default router;
