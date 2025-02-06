import { useEffect, useState } from "react"
import { useStore } from "../hooks/store"
import { modifyUser } from "../data/modifyuser"
import { deleteUser } from "../data/deleteuser"
import "../css/creadores.css"

export function ShowwAllUsers({refresh}){
    const {users, fetchUsers} = useStore()
    const [trigger, setTrigger]= useState(0)
    const [userToModify, setUserToModify] = useState({
        id: 0,
        rol:0,
        name:"",
        ifisactive:false,
        numberPhone:0,
        password:""
    })
    const [userCopy, setUserCopy]= useState({
        id: 0,
        rol:0,
        name:"",
        ifisactive:false,
        numberPhone:0,
        password:""
    })
    const [isModified, setIsModified] = useState(false)

    useEffect(() => {
        fetchUsers()
    },[refresh, trigger, fetchUsers])

    const handleOnClickModifyUser = async (user) => {
        setUserToModify(user)
        setUserCopy(user)
        setIsModified(true)
    }
    const handleOnChangeModifyUser =(e)=> {
        const { name, value, type, checked } = e.target;
        setUserToModify((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const handleOnClickAccept = async () =>{
        try{
            console.log("el user modificado ", userToModify)
            console.log("el user antes de modificar ", userCopy)
            if(userToModify === userCopy){
                return console.log("No se a registrado modificaciones del usuario")
            }
            if (
                userToModify.name === "" || 
                userToModify.name === null || 
                userToModify.name === undefined || 
                userToModify.rol === 0 || 
                userToModify.rol === null || 
                userToModify.rol === undefined ||
                userToModify.ifisactive === null || 
                userToModify.ifisactive === undefined || 
                userToModify.numberPhone === 0 || 
                userToModify.numberPhone === null || 
                userToModify.numberPhone === undefined ||
                userToModify.password === "" || 
                userToModify.password === null || 
                userToModify.password === undefined
              ) {
                throw new Error("Uno o más campos están vacíos o contienen valores inválidos.");
            }
            console.log("aaaa",userToModify.rol)
            const data = {
                id: userToModify.id,
                username:userToModify.name,
                rol:userToModify.rol === "Administrador" ? 1 : userToModify.rol === "Operario" ? 2 : null,
                disabled:userToModify.ifisactive, 
                phone:userToModify.numberPhone,
                password:userToModify.password
            }
            console.log("la data que se va a cargar en el fetch", data)

            await modifyUser(data)
            setTrigger(prev => prev + 1)
            
        }catch(error){
            console.error("Error al intentar guardar los cambios del Usuario", error)
        }
    }
    const handleOnClickDeleteUser = async (user) =>{
        try{
            if( user === "" ||
                user === null ||
                user === undefined
            ){
                throw new Error("No se a encontrado el vehiculo que se desea eliminar.")
            }
            if (
                user.name === "" || 
                user.name === null || 
                user.name === undefined || 
                user.rol === 0 || 
                user.rol === null || 
                user.rol === undefined ||
                user.ifisactive === null || 
                user.ifisactive === undefined || 
                user.numberPhone === 0 || 
                user.numberPhone === null || 
                user.numberPhone === undefined ||
                user.password === "" || 
                user.password === null || 
                user.password === undefined
              ) {
                throw new Error("Uno o más campos están vacíos o contienen valores inválidos.");
            }
            console.log("el rol", user.rol)
            const data = {
                id: user.id,
                username:user.name,
                rol: user.rol,
                disabled:user.ifisactive, 
                phone:user.numberPhone,
                password:user.password
            }

            await deleteUser(data)
            setTrigger(prev => prev + 1 )
            setUserToModify({
                id: 0,
                rol:0,
                name:"",
                ifisactive:false,
                numberPhone:0,
                password:""
            })
        } catch (error){
            console.log("Error al intentar borrar el Usuario", error)
        }
    }
      return(
        <>  
            <div className="contenedor-de-tablas">
                <table>
                    <thead>
                        <tr>
                            <th>
                                indice
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th> 
                                Rol
                            </th>
                            <th>
                                ¿Esta activo?
                            </th>
                            <th>
                                Numero de Telefono
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
                        {users.map((user, index)=>(
                        <tr key={`ShowwAllUser ${user.id}`}>
                            <td>
                                {index}
                            </td>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.rol}
                            </td>
                            <td>
                                {user.ifisactive}
                            </td>
                            <td>
                                {user.numberPhone}
                            </td>
                            <td>
                                <button onClick={() =>handleOnClickModifyUser(user)}> Modificar </button>
                            </td>
                            <td>
                                <button onClick={() => handleOnClickDeleteUser(user)}> Borrar </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModified &&
                (<section className="contenedor-de-modificadores">
                    <label 
                        htmlFor={`${userToModify.id} ${userToModify.name}`}>Nombre</label>
                    <input 
                        id={`${userToModify.id} ${userToModify.name}`} type="text" 
                        value={userToModify.name}
                        name="name"
                        onChange={handleOnChangeModifyUser}/>
                    <label htmlFor="ShowAllUsers-rol">Categoría del Usuario</label>
                    <select
                        name="rol"
                        id="ShowAllUsers-categoria"
                        value={userToModify.rol === 1? "Administrador": "Operario"}
                        onChange={handleOnChangeModifyUser}
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Operario">Operario</option>
                    </select>
                        
                    <label 
                        htmlFor={`${userToModify.id} ${userToModify.ifisactive}`}>¿Esta activo?</label>
                    <input 
                        id={`${userToModify.id} ${userToModify.ifisactive}`} 
                        checked={userToModify.ifisactive === 0}
                        name="ifisactive"
                        type="checkbox"
                        onChange={handleOnChangeModifyUser}/>
                    <label 
                        htmlFor={`${userToModify.id} ${userToModify.numberPhone}`}>Numero de Telefono</label>
                    <input 
                        id={`${userToModify.id} ${userToModify.numberPhone}`}
                        value={userToModify.numberPhone} 
                        name="numberPhone"
                        type="number" 
                        onChange={handleOnChangeModifyUser}/>
                    <label htmlFor="ShowAllUsers-password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="ShowAllUsers-password"
                        value={userToModify.password}
                        onChange={handleOnChangeModifyUser}
                    />
                    <button onClick={handleOnClickAccept}>Aceptar Modificaciones</button>

                </section>)}
            
        </>
      )
}