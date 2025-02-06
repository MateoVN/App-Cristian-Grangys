import { useEffect, useState } from "react"
import { useStore } from "../hooks/store"
import { modifyClient } from "../data/modifyclient"
import { deleteClient } from "../data/deleteclient"


export function ShowAllClients({refresh}){
    const {clients, fetchClients} = useStore()
    const [trigger, setTrigger] = useState(0)
    const [isModified, setIsModified] = useState(false)
    const [clientModify, setClientModify] = useState({
        id:0,
        direccion:"",
        saldo: 0
    })
    const [clientCopy, setClientCopy] = useState({
        id:0,
        direccion:"",
        saldo: 0
    })
    

    useEffect(() => {
        fetchClients()
    },[refresh, trigger, fetchClients])

    const handleOnChangeClients = (e) => {
        const {name, value} = e.target
        setClientModify((prev) =>({
            ...prev,
            [name]:value
        }))
    }
    const handleOnClickModifyClient = async (client) => {
        setClientModify(client)
        setClientCopy(client)
        setIsModified(true)
    }
    const handleOnClickAccept = async () =>{
        try{
            console.log("el client modificado ", clientModify)
            console.log("el client antes de modificar ", clientModify)
            if(clientModify === clientCopy){
                return console.log("No se a registrado modificaciones del cliente");
            }

            if(
                clientModify.direccion === "" ||
                clientModify.direccion === null ||
                clientModify.direccion === undefined ||
                clientModify.id === 0 ||
                clientModify.id === null ||
                clientModify.id === undefined                 
            ){
                throw new Error("Uno o más campos están vacíos o contienen valores inválidos.");
            }

            const data = {
                id:clientModify.id,
                direccion:clientModify.direccion,
                saldo:clientModify.saldo
            }
            const idClient = data.id
            console.log("la data que se va a cargar en el fetch", data)

            await modifyClient(data, idClient)
            setTrigger(prev => prev + 1)
            setClientModify({
                id:0,
                direccion:"",
                saldo: 0
            })
            setClientCopy({
                id:0,
                direccion:"",
                saldo: 0
            })
            setIsModified(false)
        }catch (error) {
            console.log("Error al intentar guardar los datos del cliente", error)
        }
    }
    const handleOnClickDeleteClient = async (client) =>{
        try{
            if( client === "" ||
                client === null ||
                client === undefined
            ){
                throw new Error("No se a encontrado el vehiculo que se desea eliminar.")
            }
            if(
                client.direccion === "" ||
                client.direccion === null ||
                client.direccion === undefined               
            ){
                throw new Error("Uno o más campos están vacíos o contienen valores inválidos.");
            }
            const data = {
                id:client.id,
                direccion:client.direccion,
                saldo:client.saldo
            }

            await deleteClient(data)
            setTrigger(prev => prev + 1 )
            setClientModify({
                id:0,
                direccion:"",
                saldo: 0
            })
        } catch (error){
            console.log("Error al intentar borrar el Cliente", error)
        }
    }

    return(
        <>
        
        <div className="contenedor-de-tablas">
            
            <table>
                <thead>
                    <tr>
                        <th>indice</th>
                        <th>
                            Direccion
                        </th>
                        <th>
                            Saldo
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
                    {clients.map((client, index)=>(
                    <tr key={client.id}>
                        <td>
                            {index}
                        </td>
                        <td>
                            {client.direccion}
                        </td>
                        <td>
                            {client.saldo}
                        </td>
                        <td>
                            <button onClick={() =>handleOnClickModifyClient(client)}> Modificar </button>
                        </td>
                        <td>
                            <button onClick={() =>handleOnClickDeleteClient(client)}> Borrar </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {isModified &&(
        <section className="contenedor-de-modificadores">
            <label htmlFor={`${clientModify.id} ${clientModify.direccion}`}>Direccion</label>
            <input 
                id={`${clientModify.id} ${clientModify.direccion}`}
                name="direccion"
                value={clientModify.direccion}
                type="text"
                onChange={handleOnChangeClients} />
            <button onClick={handleOnClickAccept}>Aceptar Modificaciones</button>
        </section>
        )}
        </>
    )
}