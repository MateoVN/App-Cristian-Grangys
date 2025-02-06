import { Link } from "react-router-dom";
import { Header } from "./Header"
import '../css/menu.css'
import { useEffect, useMemo, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem, LOCAL_STORAGE_KEYS} from "../utils/username/localStorageUtils";
import { ActionButton } from "./username/ActionButton";
import { handleOnClickEndDay } from "../utils/username/handleOnClickEndDay.JS";
import { handleOnClickUnderWay } from "../utils/username/handleOnClickUnderWay";
import { checkVehicleStatus } from "../data/checkvehiclestatus";

export function Menu() {

  const [underway, setUnderWay] = useState(true); // Valor predeterminado inicial
  const idCarga = useMemo(() => {
    return getLocalStorageItem(LOCAL_STORAGE_KEYS.USER_INFO)?.carga;
  }, []);
  useEffect(() => {
    
    const fetchUnderwayStatus = async () => {
      if (typeof window !== "undefined") {
        console.log("EL ID CARGA", idCarga)
        const estado= await checkVehicleStatus(idCarga)
        const storedValue = estado.estado === 0? true: estado.estado === 1? false: getLocalStorageItem(LOCAL_STORAGE_KEYS.UNDERWAY);
        setUnderWay(storedValue !== null ? storedValue : true);
      }
    };
  
    fetchUnderwayStatus();
  }, [idCarga]);

  useEffect(()=>{
    setLocalStorageItem(LOCAL_STORAGE_KEYS.UNDERWAY, underway);
  },[underway]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "underWay") {
        setUnderWay(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (

    <section className="container-menu">
      <Header/> {/* Pasar los datos al Header */}
      <nav className="menu-nav">
        <h1>Menú Principal</h1>
        <ul>
          <li><Link to="/pedidos">Pedidos</Link></li>
          {underway ? 
            (<li><Link to="/stock-del-movil">Cargar stock</Link></li>):
            (<li><Link to="/stock">Consultar Stock</Link></li>)}
          <li><Link to="/">Salir</Link></li>
        </ul>
        <ActionButton
          underway={underway}
          onStart={() => handleOnClickUnderWay(setUnderWay)}
          onEnd={() => handleOnClickEndDay(setUnderWay)}
        />
      </nav>
    </section>
  );
}