import Global from "../../../Global";

export const queriesVehiculos = {
  getAllVehiculo: "SELECT * FROM DESPACHO.DBO.VEHICULOS",
  createNewVehiculos:
    "INSERT INTO DESPACHO.DBO.VEHICULOS(placa,modelo,kinicial,kfinal,estado,ano,propio,combustible) values(@placa,@modelo,@kinicial,@kfinal,@estado,@ano,@propio,@combustible)",
  getVehiculoById: "SELECT * FROM DESPACHO.VEHICULOS WHERE id=@Id",
  deleteVehiculo: "DELETE  DESPACHO.VEHICULOS WHERE id=@Id",
  updateVehiculos:
    "UPADATE DESPACHO.DBO.USERS SET placa=@placa,modelo=@modelo,kinicial=@kinicial,kfinal=@kfinal,estado=@estado,ano=@ano,propio=@propio,combustible=@combustible WHERE id=@Id ",
};
