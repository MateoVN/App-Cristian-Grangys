/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../css/mobile.css"
import { useMobiles } from "../hooks/useMobiles";
import { useUser } from "../hooks/useUser";
import { useHandleLoadVehicle } from "../hooks/useHandleLoadVehicle";
import { OperatorDropdown } from "./OperatorDropdown";
import { TruckDropdown } from "./TruckDropdown";
import { usePapers } from "../hooks/usePapers";
import { useStore } from "../hooks/store";

export function Mobile() {
    const selectedTruck = useMobiles();
    const selectedOperator = useUser();
    const [trigger, setTrigger] = useState(0);
    const papersData = usePapers(trigger);

    const [selectedOperatorId, setSelectedOperatorId] = useState("");
    const [selectedTruckId, setSelectedTruckId] = useState("");

    const { handleLoadVehicle, modifyPairOperatorMobile, deletePairOperatorMobile} = useHandleLoadVehicle();
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [editData, setEditData] = useState(null);
    const [originalData, setOriginalData] = useState(null); 

    const { orders, fetchOrders, papers, fetchPapers} = useStore()

    useEffect(() => {
        fetchOrders();
        fetchPapers();
      },[trigger, fetchOrders, fetchPapers]);

    const availableOpeators = selectedOperator.filter(
        (operator) => !papersData.some((paper) => paper.idUser === operator.id)
        
    );

    const availableTrucks = selectedTruck.filter(
        (truck) => !papersData.some((paper) => paper.idMobile === truck.id)
    );

    const openEditPopup = (index, item) => {
        setIsEditing(true);
        setCurrentEditIndex(index);
        setOriginalData(item); 
        setEditData(item); 
        setSelectedOperatorId(item.id_user_fk); 
        setSelectedTruckId(item.id_vehiculo); 
        
    };

    const handleEditSubmit = () => {
        
        const updateData = {
            original: originalData, 
            modified: {
                id_user_fk: selectedOperatorId, 
                id_vehiculo: selectedTruckId, 
            }
        };
        modifyPairOperatorMobile(currentEditIndex, updateData, setTrigger, papersData) ;
        setIsEditing(false);
        setCurrentEditIndex(null);
    };
    const assignedPairs = papersData.map((paper) => {
        const operator = selectedOperator.find((op) => op.id === paper.idUser);
        const truck = selectedTruck.find((tr) => tr.id === paper.idMobile);
        return {
            name: operator ? operator.name : "Desconocido",
            truckModel: truck ? truck.trackModel : "Desconocido",
            id_user_fk: paper.idUser,
            id_vehiculo: paper.idMobile,
        };
    });


    return(
        <div>
            <div className="container-title-mobile">
                <h1>Asignar Conductor</h1>
            </div>
            <section className="container-operator-trackmodel">
                
                <div className="operator-trackmodel">
                    <div className="operator-trackmodel-style">
                        <h1>¿Quien conduce el vehiculo?</h1>
                        <OperatorDropdown
                            availableOpeators={availableOpeators}
                            selectedOperatorId={selectedOperatorId} 
                            setSelectedOperatorId={setSelectedOperatorId}
                        />
                        <TruckDropdown 
                            selectedTruckId={selectedTruckId} 
                            setSelectedTruckId={setSelectedTruckId} 
                            availableTrucks={availableTrucks}
                        />
                        <button 
                            onClick={async () => {
                                await handleLoadVehicle(selectedOperatorId, selectedTruckId, setTrigger, papersData);
                                setSelectedOperatorId("");
                                setSelectedTruckId("");
                                setTrigger(prev=> prev+ 1);
                            }}>Cargar Vehiculo</button>
                    </div>
            </div>
            {isEditing &&(
                <div className="popup-edit">
                <h1>Editar Movil</h1>
                {/* Dropdown para seleccionar conductor */}
                <OperatorDropdown
                        availableOpeators={availableOpeators}
                        selectedOperatorId={selectedOperatorId} 
                        setSelectedOperatorId={setSelectedOperatorId}
                    />
        
                {/* Dropdown para seleccionar vehículo */}
                <TruckDropdown 
                        selectedTruckId={selectedTruckId} 
                        setSelectedTruckId={setSelectedTruckId} 
                        availableTrucks={availableTrucks}
                    />
        
                {/* Botones de acción */}
                <button onClick={async () => {
                        handleEditSubmit();
                        setSelectedOperatorId("");
                        setSelectedTruckId("");
                        await fetchOrders();
                        await fetchPapers();
                        }}>Guardar Cambios</button>
                <button onClick={() => {
                        setIsEditing(false);
                        setSelectedOperatorId("");
                        setSelectedTruckId("");
                        }}>Cancelar</button>
            </div>
                )}
                {assignedPairs.map((item, index) =>(
                    <div 
                        key={`${item.id_user_fk}-${item.id_vehiculo}`} 
                        className="list-operator-trackmodel" style={{zIndex: isEditing === true? "-1": "0"}}>
                        <h1>Vehiculo {index + 1}</h1>
                        <p>Nombre del conductor: {item.name}</p>
                        <p>Modelo del Vehiculo: {item.truckModel}</p>
                        <div className="container-buttons-assignedpairs">
                            <button onClick={() => openEditPopup(index, item)}>Modificar</button>
                            <button onClick={async () => {
                                deletePairOperatorMobile(item, setTrigger, papersData);   
                                await fetchOrders();
                                await fetchPapers();
                            }}>Borrar</button>
                        </div>
                        
                    </div>
                    ))
                }


                
            </section>
        </div>
    )
}