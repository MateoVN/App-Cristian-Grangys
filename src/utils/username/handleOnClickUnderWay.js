import { validateUserData } from "./localStorageUtils";
import { underWay } from "../../data/underway"
import { toggleUnderWay}  from "./toggleUnderWay"

export const handleOnClickUnderWay = async (setUnderWay) =>{
    const data = validateUserData();
    if (!data) return;
    try{
        console.log("aaaa",data)
      const update = await underWay(data);
      
      if (update === 1) {
        toggleUnderWay(setUnderWay);
      }

    }catch (error){
      console.error("Error al actualizar el estado de en marcha:", error);
      alert("Hubo un problema al procesar tu solicitud.");
    }
  };