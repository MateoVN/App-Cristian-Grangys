import { useEffect, useState } from "react";
import { allUsers } from "../data/alluser";


export function useUser (){
    const [selectedOperator, setSelectedOperator] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const users = await allUsers();
                const fomattedUsers = users.map(([id, name, ifisactive, numberPhone]) =>({
                    id,
                    name,
                    ifisactive,
                    numberPhone
                }));

                setSelectedOperator(fomattedUsers);
            } catch (error){
                console.log("Error al obtener los users", error);
            }
        };

        fetchUsers();
    },[]);

    return selectedOperator;
}