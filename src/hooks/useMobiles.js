import { useEffect, useState } from "react";
import { allMobiles } from "../data/allmobiles";

export function useMobiles (){
    const [selectedTruck, setSelectedTruck] = useState([]);
    useEffect(()=>{
            const fetchMobiles = async () => { 
                try{
                    const mobile = await allMobiles();
                    const formattedMobile = mobile.map(([id, patent, trackModel, loadCapacity]) =>({
                        id, 
                        patent, 
                        trackModel, 
                        loadCapacity
                    }));
                    
                    setSelectedTruck(formattedMobile)
                }catch(error){
                    console.log("Error al obtener los moviles", error)
                }
            };
    
            fetchMobiles();
        },[]);
        
        return selectedTruck;
}