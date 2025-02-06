import { useEffect, useState } from "react";
import { allOrders } from "../data/allorders";

export function useOrders () {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const Orders = await allOrders();
                const formattedOrders = Orders.map(([ id_hoja, id_cliente, id_medios, pago]) => ({
                    id_hoja,
                    id_cliente,
                    id_medios,
                    pago
                }));

                setOrders(formattedOrders);
            } catch (error){
                console.log("Error al obtener las ordenes", error);
            }
        };

        fetchOrders();
    },[]);

    return orders;
}