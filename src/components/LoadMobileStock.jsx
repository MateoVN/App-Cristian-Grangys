
import { useStore } from "../hooks/store";
import { getLocalStorageItem, LOCAL_STORAGE_KEYS } from "../utils/username/localStorageUtils";
import { MobileMerchandise } from "./MobileMerchandise";
import { useEffect, useState } from "react";
import "../css/subindexorders.css"
import { upDatePaperExtra } from "../data/updatepaperextra";
import { OrdersWithSubtraction } from "./OrdersWithSubtraction";
import { Link } from "react-router-dom";

export function MobileStock(){
    const {products, fetchProducts, 
        allmobilestockwithoutunderWay, fetchAllMobileStockWithOutUnderWay,
        fetchAllTotalMobileStock, alltotalmobilestock} = useStore()
    const [quantities, setQuantities] = useState([])
    const [detail, setDetail] = useState(false)
    const [trigger, setTrigger] =useState(0)

    useEffect(()=>{
        const idHoja = getLocalStorageItem(LOCAL_STORAGE_KEYS.ID_HOJA_USER)
        fetchProducts()
        fetchAllMobileStockWithOutUnderWay(idHoja)
        fetchAllTotalMobileStock(idHoja)
        
    },[fetchProducts, fetchAllMobileStockWithOutUnderWay, fetchAllTotalMobileStock])

    useEffect(()=>{
        const idHoja = getLocalStorageItem(LOCAL_STORAGE_KEYS.ID_HOJA_USER)
        fetchAllTotalMobileStock(idHoja)
    },[trigger, fetchAllTotalMobileStock])

    const builProducts = allmobilestockwithoutunderWay.map((product)=>{
        const stock = products.find((item)=> item.code === product.codigo)
        return{
            code:stock.code,
            name:stock.name,
            quantity: product ? product.cantidad: 0,
            weight:stock.weight
        }
    })
    const builTotalStock = alltotalmobilestock.map((product)=>{
        const stock = products.find((item)=> item.code === product.codigo)
        return{
            code:stock.code,
            name:stock.name,
            quantity: product ? product.cantidad: 0,
            weight:product ? product.peso: 0,
        }
    })
    

    const handleOnClickLoadStockMobile = async () => {
        try {
            const filteredCodes = Object.keys(quantities).filter((code) => quantities[code]);
            const codes = filteredCodes.join(",");
            const amounts = filteredCodes.map((code) => quantities[code]).join(",");
            if(!amounts || !codes){
                throw new Error("Debe seleccionar un codigo/cantidad para sumar al stock")
            }
            const info = getLocalStorageItem("userInfo");
            const data = {
                id_hoja: info.hoja_encabezado.id_hoja,
                id_user_fk: info.user.id_user,
                id_vehiculo: info.vehiculo.id_trasporte,
                codigos: codes,
                cantidades: amounts,
            };
    
    
            products.forEach((item) => {
                const cantidadquesedescuenta = Object.entries(quantities).find(
                    ([key]) => String(key) === String(item.code)
                ) || { 1: 0 };
                const cantidadenstock = builTotalStock.find(
                    (cant) => String(cant.code) === String(item.code)
                ) || { quantity: 0 };
               const cantidadMinimarequerida =  builProducts.find(
                    (cant) => String(cant.code) === String(item.code)
                ) || { quantity: 0 };
    
                const cantidadDescontar = cantidadquesedescuenta[1] || 0;

                if ( cantidadenstock.quantity + cantidadDescontar < cantidadMinimarequerida.quantity) {
                    setQuantities([])
                    throw new Error(`Error: No se cumple con la cantidad mínima requerida para el código ${item.code}`);
                    
                }
                
            }) ;
    
            await upDatePaperExtra(data);
            setQuantities([])
            setTrigger(prev => prev +1 )
        } catch (error) {
            console.log("Error al cargar el stock móvil:", error);
        }
    };
    return(
        <>  <div className="container-title-mobilestock">
                <h2>Mercaderia Total Necesaria por Pedidos</h2>
            </div>
            
            <MobileMerchandise 
            mergeProductsAndMobileStock={builProducts}/>

            <div className="container-title-mobilestock">
                <h2>Agregar Mercadería de Más</h2>
            </div>
            

            <OrdersWithSubtraction
            setLocalProducts={products} 
            setLocalQuantities={quantities}
            setModQuantities={setQuantities}/>

            {detail &&
            <>
            <div className="container-title-mobilestock">
                <h2>Total Stock en el Vehículo</h2>
            </div>
                
                <MobileMerchandise 
                mergeProductsAndMobileStock={builTotalStock}/>
            </>}
            <div className="container-buttons-mobilestock">  
                <button onClick={handleOnClickLoadStockMobile}>Ingresar Carga</button>
                {!detail ?(
                    <button onClick={() =>setDetail((prev) =>!prev)}>Ver Stock Total</button>):
                    (<button onClick={() =>setDetail((prev) =>!prev)}>Ocultar Stock Total</button>)}
                <button><Link to="/menu">Volver</Link></button>
            </div>
            
        </>
    )
}