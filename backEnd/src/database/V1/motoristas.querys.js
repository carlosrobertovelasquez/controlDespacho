import Global from "../../../Global";

export const queriesMotoristas = {
  /*Motoristas*/
  getAllMotorista: "SELECT * FROM DESPACHO.DBO.MOTORISTAS",
  createMotorista:
    "INSERT INTO DESPACHO.DBO.MOTORISTAS(DUI,NOMBRE,LICENCIA,TIPO_LIC,ESTADO)VALUES(@dui,@nombre,@licencia,@tipo_lic,@estado)",
  getMotoristaById: "SELECT * FROM DESPACHO.DBO.MOTORISTAS WHERE id=@Id",
  deleteMotorista: "DELETE DESPACHO.DBO.MOTORISTAS WHERE id=@Id",
  updateMotorista:
    "UPDATE DESPACHO.DBO.MOTORISTAS SET DUI=@dui,NOMBRE=@nombre,LICENCIA=@licencia,TIPO_LIC=@tipo_lic,ESTADO=@estado WHERE id=@Id",
};
