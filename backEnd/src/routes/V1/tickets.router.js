import { Router } from "express";

import {
  getActualizarTcargaPedido,
  getMaxTicket,
  createTicket,
  createTicketPedido,
  getTicketAll,
  cambioEstado,
  getTicketDetallePedidoById,
  getTicketDetalleProductoById,
  getTicketImpresion,
  getTicketById,
  getTicketTodos,
  getTicketsPreparador,
  getListaTicketsPreparador,
  getPreparoTicketid,
  getInsertPrepraro,
  getUpdatePrepraro,
  getInsertReviso,
  getRevisoTicketid,
  getUpdateReviso,
} from "../../controllers/V1/tickets.controller";
import { checkAuth } from "../../Middlewares/auth-middleware";
import { handleRequestErrors } from "../../Middlewares/validator-middleware";
import { validateNewUserBody } from "../../validators/v1/users.validator";

const router = Router();

router.get("/api/v1/ticketProductos/:id", getTicketDetalleProductoById);
router.get("/api/v1/ticketPedidos/:id", getTicketDetallePedidoById);
router.get("/api/v1/getRevisoTicketid/:id", getRevisoTicketid);

router.get("/api/v1/getPreparoTicketid/:id", getPreparoTicketid);
router.get("/api/v1/getInsertPreparo/:id", getInsertPrepraro);
router.get("/api/v1/getInsertReviso/:id", getInsertReviso);

router.post("/api/v1/listaTicketPreparador/:id", getListaTicketsPreparador);
router.get("/api/v1/getTicketsPreparador/:id", getTicketsPreparador);
router.get("/api/v1/ticketById/:id", getTicketById);
router.get("/api/v1/ticketImpresion/", getTicketImpresion);
router.post("/api/v1/getUpdatePrepraro/", getUpdatePrepraro);
router.post("/api/v1/getUpdateReviso/", getUpdateReviso);
router.post("/api/v1/createTicket", createTicket);
router.post("/api/v1/createTicketPedidos", createTicketPedido);
router.get("/api/v1/maxticket", getMaxTicket);
router.get("/api/v1/getTicketAll", getTicketAll);
router.get("/api/v1/getTicketTodos", getTicketTodos);
router.put("/api/v1/ticket/:pedido", getActualizarTcargaPedido);
router.put("/api/v1/ticketEstado/:id", cambioEstado);

export default router;
