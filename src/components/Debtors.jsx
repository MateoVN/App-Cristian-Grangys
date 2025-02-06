import { useEffect, useId, useState } from "react";
import "../css/debtors.css"
import { useStore } from "../hooks/store";
import { upDatePay } from "../data/updatePay";

export function Debtors () {
    const {alldebtors, fetchAllDebtors} = useStore()
    const [ trigger, setTrigger] = useState(0)

    useEffect(() => {

        fetchAllDebtors()
    },[trigger, fetchAllDebtors])
 
    const [isOnDateOrders, setIsOnDateOrders] = useState(false)
    const [isOnOrders, setIsOnOrders] = useState(false)
    const [isOnPayment, setIsOnPayment] = useState(false)
    const [allOrders, setAllOrders] = useState([])
    const [debs, setDebs] = useState([])
    const [amountToPay, setAmountToPay] = useState({
        pago:0
    })

    const idSerchDebtorForName = useId();
    const handleOnClickAdress = async (deb) => {
        console.log("el onclick ", deb)
        try{
            if( deb === null ||
                deb === undefined ||
                deb === "" 
            ){
                throw new Error("El cliente esta vacio no se encuentra")
            }
            setDebs(deb)
            setIsOnDateOrders(true)
        }catch(error){
            console.error("Erro al intentar ver las deudas del cliente", error)
        }
    }
    const handleOnClickOrder = async (order) => {
        try{
            if( order === null ||
                order === undefined ||
                order === "" 
            ){
                throw new Error("El cliente esta vacio no se encuentra")
            }
            setAllOrders(order)
            setIsOnOrders(true)
        }catch(error){
            console.error("Erro al intentar ver la order", error)
        }
    }
    const handleOnClickMakePay = async (deb) =>{
        console.log("el onclick ", deb)
        try{
            if( deb === null ||
                deb === undefined ||
                deb === "" 
            ){
                throw new Error("El cliente esta vacio no se encuentra")
            }
            setDebs(deb)
            setIsOnPayment(true)
        }catch(error){
            console.error("Erro al intentar ver las deudas del cliente", error)
        }
    }
    const handleOnChangeAmountPay = (e) => {
        const {name, value} =  e.target
        setAmountToPay((prev) =>({
            ...prev,
            [name]:value,
        }))

    }
    const handleOnClickPay = async (deb) => {
        try{
            if( deb === null ||
                deb === undefined ||
                deb === "" ||
                amountToPay === 0 ||
                amountToPay === null ||
                amountToPay === undefined
            ){
                throw new Error("El cliente esta vacio no se encuentra")
            }
            if( amountToPay === 0 ||
                amountToPay === null ||
                amountToPay === undefined ||
                amountToPay < 0
            ){
                throw new Error("El pago no puede estar vacio, ser cero, negativo o estar indefinido")
            }
            const data = {
                id_cliente: parseInt(deb.id_cliente, 0),
                pago: parseInt(amountToPay.pago, 0)
            }
            console.log("el data de handleOnClickPay ", data)
            await upDatePay(data)
            
            setTrigger(prev => prev +1)
        }catch(error){
            console.error("Erro al intentar HACER UN PAGO", error)
        }
    }
    return(
        <section className="container-debtors" style={{display:"flex", flexDirection:"column"}}>
            <div style={{display:"flex", flexDirection:"row"}}>
                <div className="container-table">
                    <table>
                        <thead>
                            <tr>
                                
                            </tr>
                            <tr>
                                <th> Indice</th>
                                <th>Direccion del Cliente</th>
                                <th>Saldo</th>
                                <th>¿Desea ingresar un pago?</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        {alldebtors.map((deb, index) => (
                        <tbody key={deb.id}>
                            <tr>
                                <td>{index +1}</td>
                                <td >{deb.direccion}</td>
                                <td>{deb.saldo}</td>
                                <td><button onClick={() => handleOnClickMakePay(deb)}>Hacer Pago</button></td>
                                <td ><button onClick={() => handleOnClickAdress(deb)}>Detalle</button></td>
                            </tr>
                        </tbody>
                        ))}
                    </table>
                </div>
                <div className="container-searchclient-and-amountpaid">
                    <div className="container-serch-client">
                        <label htmlFor={idSerchDebtorForName}>Buscar cliente por direccion</label>
                        <input id={idSerchDebtorForName} type="text" />
                    </div>
                    {isOnPayment &&(
                        <div className="container-amount-paid-for">
                            
                            <label htmlFor="">Monto pagado por: {debs.direccion}</label>
                            <input 
                            type="number"
                            name="pago"
                            value={amountToPay.pago}
                            onChange={handleOnChangeAmountPay} />
                            <button onClick={() => handleOnClickPay(debs)}>Pago</button>
                        </div>
                    )}
                </div>
            </div>
            
            {isOnDateOrders && (
                    <div className="container-table">
                        <h2>{debs.direccion}:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>id de pedido</th>
                                <th>Valor total de la venta</th>
                                <th>Cantidad adeudad</th>
                                <th>Pago</th>
                                <th>Fecha</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>  
                        {debs.pedidos.map((deb, index)=>(
                            <tbody key={index}>
                            <tr>
                                <td>{deb.id_pedido}</td>
                                <td>{deb.pagos[index][0]}</td>
                                <td>{deb.pagos[index][0] - deb.pagos[index][1]}</td>
                                <td>{deb.pagos[index][1]}</td>
                                <td>{deb.pagos[index][2]}</td>
                                <td><button onClick={() =>handleOnClickOrder(debs)}>Detalle</button></td>
                            </tr>
                        </tbody>
                        ))}
                        
                    </table>
                </div>
            )}
            {isOnOrders && (
                <div className="container-table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Codigo
                                </th>
                                <th>
                                    Nombres 
                                </th>
                                <th>
                                    Cantidades
                                </th>
                            </tr>
                        </thead>
                        {allOrders.pedidos.map((order,index) =>(
                            <tbody key={`allOrders ${index+20}`}>
                            <tr>
                                <td>
                                    {order.detalle[index][0]}
                                </td>
                                <td>
                                    {order.detalle[index][1]}
                                </td>
                                <td>
                                    {order.detalle[index][2]}
                                </td>
                            </tr>
                        </tbody>
                        ))}
                    </table>
                </div>
            )}
            
        </section>
    )
}