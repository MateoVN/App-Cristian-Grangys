import { useState } from "react";
import { upDateClient } from "../data/updateclient";
import { ShowAllClients } from "./ShowAllClients";

export function CreateClient(){
    const [refresh, setRefresh] = useState(0)
    const [infoClient, setInfoClient] = useState({
        saldo:0,
        direccion:"",
    })

    const handleChange = (e) => {
        const {name, type, value, checked} = e.target;
        setInfoClient((prev) =>({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleSubmitClient = async (e) => {
        e.preventDefault();

        for(const key in infoClient){
            if(infoClient[key] === ""){
                alert("Todos los campos deben estar completos.");
                return;
            }
        }
        try{
            console.log(infoClient)
            await upDateClient(infoClient)
            setInfoClient({
                saldo:0,
                direccion:"",
            })
            setRefresh(prev => prev +1)
        } catch (error){
            console.error("Error al intentar crear un Cliente", error)
        }
    }
    return(
        <section className="contenedor-del-creadores">
            
            <form onSubmit={handleSubmitClient}>
            <h1>Clientes</h1>
                <label htmlFor="">Dirección</label>
                <input 
                    type="text"
                    name="direccion"
                    id="CreateClient-direccion"
                    value={infoClient.direccion}
                    onChange={handleChange}/>

                <button type="submit">Aceptar</button>
            </form>
            <ShowAllClients refresh={refresh}/>
        </section>
    )
}