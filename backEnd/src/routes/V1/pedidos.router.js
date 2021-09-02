import { Router } from "express";

import {
  TcargaPedidos,
  getPedidoById,
  getPedidoDetalleById,
  getPedidoAutorizacion,
  updateEstadoPedido,
} from "../../controllers/V1/pedidos.controller";
import { checkAuth } from "../../Middlewares/auth-middleware";
import { handleRequestErrors } from "../../Middlewares/validator-middleware";
import { validateNewUserBody } from "../../validators/v1/users.validator";

const router = Router();

router.get("/api/v1/pedidos", TcargaPedidos);
router.get("/api/v1/pedido/:pedido", getPedidoById);
router.get("/api/v1/pedidoD/:pedido", getPedidoDetalleById);
router.get("/api/v1/pedidosAutorizacion", getPedidoAutorizacion);
router.post("/api/v1/pedidoCambioEstado/:pedido", updateEstadoPedido);

export default router;
