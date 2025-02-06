import { useEffect, useState } from 'react'
import '../css/header.css'
import { useLogin } from '../context/LoginContext';
import { infoUser } from '../data/infouser';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '../utils/username/localStorageUtils';
import { UserDetails } from './header/userdetails';
import { VehicleDetails } from './header/vehicleDetails';

export function Header (){
    const { user } = useLogin(); // Obtener el usuario del contexto
    const [dataHeader, setDataHeader] = useState(()=>{
      const userInfo = getLocalStorageItem("userInfo");
      return userInfo || null;
    }); // Estado para almacenar la información del usuario
  
    const { 
      user: { username = "Sin Asignar" } = {}, 
      vehiculo: { 
        nombre_vehiculo = "Sin Asignar", 
        patente = "Sin Asignar", 
        carga_maxima = 0 
      } = {}
    } = dataHeader || {};

    useEffect(() => {
      removeLocalStorageItem("idHojaUser");
      removeLocalStorageItem("userInfo");

      const fetchUserInfo = async () => {
        try {
          if (user?.access_token) { // Asegurarse de que el token está disponible
            const data = await infoUser(user.access_token); // Obtener datos del usuario
            setLocalStorageItem("idHojaUser", data?.hoja_encabezado?.id_hoja)//Guardamos el idhoja
            setLocalStorageItem("userInfo", data)
            console.log("la data infoUser en el header ", data)
            setDataHeader(data); // Guardar los datos en el estado
          }
        } catch (error) {
          console.error("Error al obtener la información del usuario:", error);
        }
      };
  
      fetchUserInfo();
    }, [user]);

    return(
        <header>
            <section className='icon-header-container'>
                <img 
                src="https://www.grangys.com.ar/img/logo.png" 
                alt="Grangys icon" 
                className='img-grangys'/>
            </section>
            <UserDetails
                username={username}
                vehiculo={nombre_vehiculo}
            />
            <VehicleDetails
                patente={patente}
                cargaMaxima={carga_maxima}
            />
        </header>
    )
}