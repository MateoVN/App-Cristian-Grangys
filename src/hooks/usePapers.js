import { useEffect, useState } from "react";
import { AllPapers } from "../data/allPapers";

export function usePapers(trigger){
    const [papersData, setPapersData] = useState([])

    useEffect(() => {

    
        const fetchPapersData = async () => {
            try {
                const papers = await AllPapers();
                const formattedPapers = papers.map(([id, date, idUser, idMobile]) => ({
                    id,
                    date,
                    idUser,
                    idMobile,
                }));
                    setPapersData(formattedPapers);

            } catch (error) {
                console.error("Error al obtener papers:", error);
            }
        };
        
        fetchPapersData()

    }, [trigger]);

    return papersData;
}
