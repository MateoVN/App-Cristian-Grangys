import { useEffect } from "react";
import { deletPaper } from "../data/deletepaper";
import { modifyPaper } from "../data/modifypaper";
import { UpDatePaper } from "../data/updatePaper";
import { useStore } from "../hooks/store";

export function useHandleLoadVehicle () {
    const { orders, fetchOrders, papers, fetchPapers} = useStore()
    
        useEffect(() => {
            fetchOrders();
            fetchPapers();
          },[fetchOrders, fetchPapers]);

    const handleLoadVehicle = async (selectedOperatorId, selectedTruckId, setTrigger, papersData) => {
        setTrigger((prev) => prev + 1)
        console.log("Datos de papers actualizados:", papersData)
        if (selectedOperatorId && selectedTruckId) {

            const operatorAlreadyAssigned =papersData.some(
                (item) => item.idUser === parseInt(selectedOperatorId)
            );

            const truckAlreadyAssigned = papersData.some(
                (item) => item.idMobile === parseInt(selectedTruckId)
            )

            if(operatorAlreadyAssigned){
                alert("Este conductor ya está asignado a un vehículo.");
                return;
            }

            if(truckAlreadyAssigned){
                alert("Este vehículo ya está asignado a un conductor");
                return;
            }

            const jsonPaper ={
                id_user_fk: parseInt(selectedOperatorId),
                id_vehiculo: parseInt(selectedTruckId)
            }
           
            try{
                await UpDatePaper(jsonPaper)
                setTrigger((prev) => prev + 1)

            } catch(error){
                console.error("Error al enviar al pedido(hoja):", error);
            }

        } else {
            alert("Por favor selecciona un conductor y un vehículo.");
        }
    };
    const modifyPairOperatorMobile = async (index, updateData, setTrigger, papersData) => {
        setTrigger((prev) => prev + 1)
        
        const { original, modified } = updateData;
        
        const paper = papersData.find((pa)=> pa.idUser === original.id_user_fk && pa.idMobile === original.id_vehiculo)

    
        if (original.id_user_fk === modified.id_user_fk && original.id_vehiculo === modified.id_vehiculo) {
            console.log("No hay cambios para guardar.");
            return;
        }
    
        const newPaper = {
            id_hoja: paper.id,
            fecha: new Date().toISOString().split("T")[0],
            id_user_fk: modified.id_user_fk,
            id_vehiculo: modified.id_vehiculo,
        };
    
        await modifyPaper(newPaper);
        setTrigger((prev) => prev + 1)
    };


    const deletePairOperatorMobile = async (item, setTrigger, papersData) => {
        setTrigger((prev) => prev + 1)
        const paper = papersData.find(
            (pa) => pa.idUser === item.id_user_fk && pa.idMobile === item.id_vehiculo
        );
    
        if (paper) {
            try {
                await deletPaper(paper.id);
                console.log(`Hoja eliminada con ID: ${paper.id}`);
            } catch (error) {
                console.error(`Error al eliminar la hoja con ID ${paper.id}:`, error);
            }
        } else {
            console.error("No se encontró el papel correspondiente para eliminar.");
        }
        fetchOrders()
        fetchPapers()
        setTrigger((prev) => prev + 1)
    };
    return { handleLoadVehicle, modifyPairOperatorMobile, deletePairOperatorMobile };
    
}