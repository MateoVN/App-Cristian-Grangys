import { Orders } from "./Orders";
import { PaymentMethod } from "./PaymentMethod";
import "../css/subindexorders.css"
import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { usePaymentMethods } from "../hooks/usePaymentMethods";
import { useOrderHandler } from "../hooks/useOrderHandler";
import { ClientSelector } from "./ClientSelector";
import { MobileOperator } from "./MobileOperator";
import { useStore } from "../hooks/store";


export function OrderBuilder (){

    const { clients, fetchClients,  orders, fetchOrders} = useStore()
    const products = useProducts();
    const paymentMethod = usePaymentMethods();
    const {handleSubmitOrder, isLoading} = useOrderHandler();

    useEffect(()=>{

        fetchClients();
        fetchOrders();

    },[fetchClients, fetchOrders])

    const [selectedClientId, setSelectedClientId] = useState(null);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
    const [quantities, setQuantities] = useState([]);
    const [paid, setPaid] = useState({
        pago:0
    })

    useEffect(()=>{

        fetchClients();
        fetchOrders();

    },[fetchClients, fetchOrders])
    const handleOnChangePaid = (e) =>{
        const {name, value} = e.target
        setPaid((prev) =>({
            ...prev,
            [name]:value
        }))
    }

   

    return(
        <section className="container-subindexorders">
            <div className="container-title">
                <h1>Crear el Pedido</h1>
            </div>
            <div className="directions-movil">
                <ClientSelector
                    clients={clients}
                    selectedClientId={selectedClientId}
                    setSelectedClientId={setSelectedClientId}/>
                <MobileOperator
                    setSelectedPaper={setSelectedPaper} selectedPaper={selectedPaper}/>
                
            </div>

            <Orders 
                setLocalProducts={products} 
                setLocalQuantities={quantities}
                setModQuantities={setQuantities}
            />
            <div className="container-paymentmethod-paid">
                <PaymentMethod 
                    paymentMethod={paymentMethod}
                    setSelectedPaymentMethodId={setSelectedPaymentMethodId}
                    selectedPaymentMethodId={selectedPaymentMethodId}
                />
                <div className="container-paid">
                    <label htmlFor="orderbuilder-paid-select">¿Esta pago el pedido?</label>
                    <select name="pago" id="orderbuilder-paid-select"
                    onChange={handleOnChangePaid}>
                        <option value="">Seleccione una opcion</option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                    </select>
                </div>
            </div>

            <div className="button-load">
                <button 
                onClick={async () => {
                    await handleSubmitOrder(selectedClientId, selectedPaymentMethodId, quantities, selectedPaper, paid);
                    await fetchOrders();
                    setSelectedClientId(null);
                    setSelectedPaymentMethodId(null);
                    setQuantities([]);
                    setSelectedPaper(null)
                }} 
                disabled={isLoading}>Cargar</button>
            </div>

        </section>
    )
}