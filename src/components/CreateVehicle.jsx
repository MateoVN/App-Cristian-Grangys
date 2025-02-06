import { useState } from "react"
import { upDateVehicle } from "../data/updatevehicle";
import { ShowAllVehicles } from "./ShowAllVehicles";

export function CreateVehicle(){
    const [refresh, setRefresh] = useState(0)
    const [infoVehicle, setInfoVehicle] = useState({
        trackModel: "", 
        patent: "", 
        loadCapacity: 0,
    });
    
    const handleChange= (e) =>{
        const {name, value, type, checked} = e.target;
        setInfoVehicle((prevData) => ({
            ...prevData,
            [name]:type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmitVehicle = async (e) =>{
        e.preventDefault();
        for(const key in infoVehicle){
            if(infoVehicle[key] === ""){
                alert("Todos los campos deben estar completos.");
                return;
            }
        }

        try{
            const data = {
                nombre_vehiculo:infoVehicle.trackModel,
                patente:infoVehicle.patent, 
                carga_maxima:parseInt(infoVehicle.loadCapacity, 10),
            }

            await upDateVehicle(data);
            setInfoVehicle({
                trackModel: "", 
                patent: "", 
                loadCapacity: 0,
            })
            setRefresh(prev => prev + 1 )
        } catch (error){
            console.error("Error al crear un vehiculo ", error)
        }
    };

    return(
        <section className="contenedor-del-creadores">
            
            <form onSubmit={handleSubmitVehicle}>
                <h1>Crear Vehiculo</h1>
                <label htmlFor="CreateVehicle-trackModel">Modelo del Vehiculo</label>
                <input 
                    type="text"
                    name="trackModel"
                    id="CreateVehicle-trackModel"
                    value={infoVehicle.trackModel}
                    onChange={handleChange} />

                <label htmlFor="CreateVehicle-loadCapacity">Carga Maxima del Vehiculo</label>
                <input 
                    type="number"
                    name="loadCapacity"
                    id="CreateVehicle-loadCapacity"
                    value={infoVehicle.loadCapacity}
                    onChange={handleChange} />
                <label htmlFor="CreateVehicle-patent">Patente</label>
                <input 
                    type="number"
                    name="patent"
                    id="CreateVehicle-patent"
                    value={infoVehicle.patent}
                    onChange={handleChange} />
                <button type="submit">Aceptar</button>
            </form>
            <ShowAllVehicles refresh={refresh}/>
        </section>
    )
}