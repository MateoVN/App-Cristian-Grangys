import { useEffect, useState } from "react";
import { allClients } from "../data/allclient";

export function useClients(trigger) {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {

                const clientsData = await allClients();
                const formattedClients = clientsData.map(([id, direccion]) => ({
                    id,
                    direccion,
                }));
                setClients(formattedClients);
            } catch (error) {
                console.error("Error al obtener los clientes", error);
            }
        };

        fetchClients();
    }, [trigger]);


    return clients;
}