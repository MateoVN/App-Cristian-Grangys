import { useEffect, useState } from "react"
import { useStore } from "../hooks/store"
import { modifyMobile } from "../data/modifyMobile";
import { deleteMobile } from "../data/deletemobile";
import "../css/creadores.css"

export function ShowAllVehicles({refresh}){
    const {truckModels ,fetchTruckModels} = useStore()
    const [trigger, setTrigger] = useState(0)
    const [mobileModify, setMobileModify] = useState({
        id: 0, 
        patent: "", 
        trackModel: "", 
        loadCapacity: 0,
        patent_hash:""
    });
    const [mobileCopy, setMobileCopy] = useState({
        id: 0, 
        patent: "", 
        trackModel: "", 
        loadCapacity: 0,
        patent_hash: ""
    });
    const [isModified, setIsModified] = useState(false)

    useEffect(() => {
        fetchTruckModels()

    },[refresh, trigger, fetchTruckModels]);
    
    const handleOnClickModifyMobile= async (mobile) =>{
        setMobileModify(mobile)
        setMobileCopy(mobile)
        setIsModified(true)
    }

    const handleOnChangeModifyUser = (e) => {
        const{name, value} = e.target;
        setMobileModify((prevData) =>({
            ...prevData,
            [name]:value
        }));
    }

    const handleOnClickAccept = async () =>{
        try{
            console.log("el mobile modificado ", mobileModify)
            console.log("el mobile antes de modificar ", mobileCopy)
            if(mobileModify === mobileCopy){
                return console.log("No se ha registrado modificaciones en el vehiculo")
            }
            if(
                mobileModify.patent === "" ||
                mobileModify.patent === null ||
                mobileModify.patent === undefined ||
                mobileModify.trackModel === "" ||
                mobileModify.trackModel === null ||
                mobileModify.trackModel === undefined ||
                mobileModify.loadCapacity === 0 ||
                mobileModify.loadCapacity === null ||
                mobileModify.loadCapacity === undefined ||
                mobileModify.patent_hash === "" ||
                mobileModify.patent_hash === null ||
                mobileModify.patent_hash === undefined 
            ){
                throw new Error("Uno o más campos están vacíos o contienen valores inválidos.");
            }
            const data = {
                id_trasporte: mobileModify.id,
                patente:mobileModify.patent, 
                nombre_vehiculo:mobileModify.trackModel,
                carga_maxima:mobileModify.loadCapacity,
                patent_hash:mobileModify.patent_hash
            }
            const idMobile = data.id_trasporte

            console.log("la data que se va a cargar en el fetch", data)

            await modifyMobile(data, idMobile)
            setTrigger(prev => prev + 1 )
            setIsModified(false)
            setMobileCopy({
                id: 0, 
                patent: "", 
                trackModel: "", 
                loadCapacity: 0,
                patent_hash: ""
            })
            setMobileModify({
                id: 0, 
                patent: "", 
                trackModel: "", 
                loadCapacity: 0,
                patent_hash: ""
            })
        }catch (error) {
            console.error("Error al intentar guardar los cambios en Vehiculo", error)
        }
    }
    const handleOnClickDeleteMobile = async (mobile) =>{
        try{
            if( mobile === "" ||
                mobile === null ||
                mobile === undefined
            ){
                throw new Error("No se a encontrado el vehiculo que se desea eliminar.")
            }
            const idMobile = mobile.id
            if( idMobile === "" ||
                idMobile === null ||
                idMobile === undefined ||
                idMobile === 0
            ){
                throw new Error("No se a encontrado el vehiculo que se desea eliminar.")
            }
            if(
                mobile.patent === "" ||
                mobile.patent === null ||
                mobile.patent === undefined ||
                mobile.trackModel === "" ||
                mobile.trackModel === null ||
                mobile.trackModel === undefined ||
                mobile.loadCapacity === 0 ||
                mobile.loadCapacity === null ||
                mobile.loadCapacity === undefined ||
                mobile.patent_hash === "" ||
                mobile.patent_hash === null ||
                mobile.patent_hash === undefined 
            ){
                throw new Error("Uno o más campos están vacíos o contienen valores inválidos.");
            }
            const data = {
                id_trasporte: mobile.id,
                patente:mobile.patent, 
                nombre_vehiculo:mobile.trackModel,
                carga_maxima:mobile.loadCapacity,
                patent_hash:mobile.patent_hash
            }

            await deleteMobile(data,idMobile)
            setTrigger(prev => prev + 1 )
            setMobileModify({
                id: 0, 
                patent: "", 
                trackModel: "", 
                loadCapacity: 0,
                patent_hash: ""
            })
        } catch (error){
            console.log("Error al intentar borrar el Vehiculo", error)
        }

    }

    return(
        <>
            <div className="contenedor-de-tablas">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Indice
                            </th>
                            <th>
                                Patente
                            </th>
                            <th>
                                Modelo del Vehiculo
                            </th>
                            <th>
                                Capacidad de Carga
                            </th>
                            <th>
                                Modificar
                            </th>
                            <th>
                                Borrar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {truckModels.map((mobile, index)=>(
                        <tr key={`ShowAllVehicles ${mobile.id}`}>
                            <td>
                                {index}
                            </td>
                            <td>
                                {mobile.patent}
                            </td>
                            <td>
                                {mobile.trackModel}
                            </td>
                            <td>
                                {mobile.loadCapacity}
                            </td>
                            <td>
                                <button onClick={() => handleOnClickModifyMobile(mobile)}> Modificar </button>
                            </td>
                            <td>
                                <button onClick={() => handleOnClickDeleteMobile(mobile)}> Borrar </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModified  && (
                <section className="contenedor-de-modificadores">
                    <label htmlFor={`${mobileModify.id} ${mobileModify.trackModel}`}>Modelo del vehiculo</label>
                    <input 
                        id={`${mobileModify.id} ${mobileModify.trackModel}`}
                        type="text"
                        value={mobileModify.trackModel}
                        name="trackModel"
                        onChange={handleOnChangeModifyUser} />
                    <label htmlFor={`${mobileModify.id} ${mobileModify.patent}`}>Patente del Vehiculo</label>
                    <input 
                        id={`${mobileModify.id} ${mobileModify.patent}`}
                        type="text"
                        value={mobileModify.patent}
                        name="patent"
                        onChange={handleOnChangeModifyUser} />
                    <label htmlFor={`${mobileModify.id} ${mobileModify.loadCapacity}`}>Capacidad de Carga</label>
                    <input 
                        id={`${mobileModify.id} ${mobileModify.loadCapacity}`}
                        type="number"
                        value={mobileModify.loadCapacity}
                        name="loadCapacity"
                        onChange={handleOnChangeModifyUser} />
                    <button onClick={handleOnClickAccept}>Aceptar Modificaciones</button>
                </section>
            )}
        </>
    )
}