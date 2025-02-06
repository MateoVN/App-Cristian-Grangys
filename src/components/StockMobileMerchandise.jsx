import { Link } from "react-router-dom";
import { MobileMerchandise } from "./MobileMerchandise";
import "../css/stockmobilemerchandise.css"
import { useEffect} from "react";
import { useStore } from "../hooks/store";
import { validateUserData } from "../utils/username/localStorageUtils";


export function StockMobileMerchandise () {
    const {allmobilestock, fetchAllMobileStock, products,fetchProducts} = useStore();

    useEffect(()=>{
        const data = validateUserData()
        fetchAllMobileStock(data)
        fetchProducts()
 
    },[fetchProducts,fetchAllMobileStock]);


    const mergeProductsAndMobileStock = products.map((product) =>{
        const stock = allmobilestock.find((item)=> item.codigo === product.code);

        return{
        code:product.code,
        name:product.name,
        quantity:stock ? stock.cantidad: 0,
        weight:stock ? stock.peso : 0
        }
    });
    const mergeProductsAndMobileStockavailable = products.map((product) =>{
        const stock = allmobilestock.find((item)=> item.codigo === product.code);

        return{
        code:product.code,
        name:product.name,
        quantity:stock ? stock.libre: 0,
        weight:stock ? stock.peso : 0
        }
    });


    return (
        <>
            <div className="container-title-stockmobilemerchandise">
                <h2> Stock de Mercaderia Total en el Vehiculo </h2>
            </div>
            

            <MobileMerchandise 
            mergeProductsAndMobileStock={mergeProductsAndMobileStock}/>

            <div className="container-title-stockmobilemerchandise">
                <h2> Mercaderia de Mas Aparte del Pedido </h2>
            </div>

            <MobileMerchandise
             mergeProductsAndMobileStock={mergeProductsAndMobileStockavailable}/>
             
            <button id="button-back-stockmobilemerchandise"><Link to="/menu">Volver</Link></button>
        </>
    )
}