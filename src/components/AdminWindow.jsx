import { AdminStock } from "./AdminStock";
import { Mobile } from "./Mobile";
import { OrdersListAdmin } from "./OrdersListAdmin";
import { OrderBuilder } from "./OrderBuilder";
import { UnitSales } from "./UnitSales";
import { Debtors} from "./Debtors"
import "../css/adminwindow.css"
import { useState } from "react";
import { CreateUser } from "./CreateUser";
import { CreateVehicle } from "./CreateVehicle";
import { CreateClient } from "./CreateClient";
import { CreateProduct } from "./CreateProduct";

export function AdminWindow (){
    const [isOrdersVisible, setOrdersVisible] = useState(false);
    const [isUnitSalesVisible, setUnitSalesVisible] = useState(false);
    const [isDebtorsVisible, setDebtorsVisible] = useState(false);
    const [isAdmStockVisible, setAdmStockVisible] = useState(false);
    const [isCreateUser, setCreateUser] = useState(false)
    const [isCreateVehicle, setCreaVehicle] = useState(false)
    const [isCreateClient, setCreatClient] = useState(false)
    const [isCreateProduct, setCreatProduct] = useState(false)
    const [isCreate, setCreate] = useState(false)

    const toggleOrdersSection = () => {
        setOrdersVisible(prev => !prev);
    };
    const toggleUnitSalesSection = () => {
        setUnitSalesVisible(prev => !prev);
    }
    const toggleDebtorsSection = () => {
        setDebtorsVisible(prev => !prev)
    }
    const toggleAdmStockVisible = () => {
        setAdmStockVisible(prev => !prev)
    }
    const toggleCreateUsers = () =>{
        setCreateUser(prev => !prev)
    }
    const toggleCreateVehicle = () => {
        setCreaVehicle(prev => !prev)
    }
    const toggleCreateClient = () => {
        setCreatClient(prev => !prev)
    }
    const toggleCreateProduct = () => {
        setCreatProduct(prev => !prev)
    }
    const toggleCreate= ()=> {
        setCreate(prev => !prev)
    }

    return (
        <main className="container-admin-window">
            <button className="main-button" id="button-orders-adm" onClick={toggleOrdersSection}>
                Pedidos
            </button>
            {isOrdersVisible && (
                <div className="pedidos-general">
                    <section className="section-orders-adm" id="section-orders-adm">
                        <OrderBuilder />
                        <Mobile/>
                    </section>
                    <OrdersListAdmin />
                </div>
            )}

            <button className="main-button" onClick={toggleUnitSalesSection}>Ventas</button>
            {isUnitSalesVisible && (
                <UnitSales/>
            )}

            <button className="main-button" onClick={toggleDebtorsSection}>Deudores</button>
            {isDebtorsVisible && (
                <Debtors/>
            )}

            <button className="main-button" onClick={toggleAdmStockVisible}>Stock</button>
            {isAdmStockVisible && (
                <AdminStock/>
            )}
            <button className="main-button" onClick={toggleCreate}>Crear</button>
            {isCreate &&(
                <div className="boton-de-creadores">
                    <button className="main-button" onClick={toggleCreateUsers}>Crear Usuario</button>
                    {isCreateUser && (
                        <CreateUser/>
                    )}

                    <button className="main-button" onClick={toggleCreateVehicle}>Crear Vehiculo</button>
                    {isCreateVehicle &&(
                        <CreateVehicle/>
                    )}

                    <button className="main-button" onClick={toggleCreateClient}>Crear Cliente</button>
                    {isCreateClient &&(
                        <CreateClient/>
                    )}

                    <button className="main-button" onClick={toggleCreateProduct}>Crear Producto</button>
                    {isCreateProduct &&(
                        <CreateProduct/>
                    )}
                </div>
            )}
        </main>
    )
}