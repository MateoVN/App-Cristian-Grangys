import { endOfTheDay } from "../../data/endoftheday";
import { validateUserData } from "./localStorageUtils";
import { toggleUnderWay } from "./toggleUnderWay";

export const handleOnClickEndDay = async (setUnderWay) =>{
    const data = validateUserData();
    if (!data) return;

    try{
      const update = await endOfTheDay(data);
      
      if (update === 1) {
        toggleUnderWay(setUnderWay);
      }

    }catch (error){
      console.error("Error al actualizar el estado de en marcha:", error);
      alert("Hubo un problema al procesar tu solicitud.");
    }
  };