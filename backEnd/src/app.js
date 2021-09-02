import express from "express";
import config from "./config";
import cors from "cors";
import usersRouter from "./routes/V1/users.router";
import vehiculoRouter from "./routes/V1/vehiculos.router";
import motoristasRouter from "./routes/V1/motorista.router";
import ayudantesRouter from "./routes/V1/ayudantes.router";
import pedidosRouter from "./routes/V1/pedidos.router";
import ticketRouter from "./routes/V1/tickets.router";
import facturaRouter from "./routes/V1/facturas.router";
import fleteRouter from "./routes/V1/fletes.router";
const app = express();
//setting
app.set("port", config.port);
//middlawares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  usersRouter,
  vehiculoRouter,
  motoristasRouter,
  ayudantesRouter,
  pedidosRouter,
  ticketRouter,
  facturaRouter,
  fleteRouter
);
export default app;
