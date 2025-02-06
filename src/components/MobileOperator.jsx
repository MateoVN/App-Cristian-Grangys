/* eslint-disable react/prop-types */
import { usePapers } from "../hooks/usePapers";
import { useUser } from "../hooks/useUser";
import { useMobiles } from "../hooks/useMobiles";
import { useState } from "react";
import "../css/mobileoperator.css"

export function MobileOperator ({ setSelectedPaper,selectedPaper }){
        const [trigger, setTrigger] = useState(0)
        const papersData = usePapers(trigger)
        const users = useUser()
        const mobiles = useMobiles()

        const listMobileOperator= papersData.map((paper) =>{
                
            const user = users.find((u) => u.id ===paper.idUser)
            const mobile = mobiles.find((m) => m.id === paper.idMobile)
            return {
                idPaper: paper.id, 
                userName: user ? user.name : "Usuario no encontrado",
                mobileModel: mobile ? mobile.trackModel : "Modelo no encontrado",
            };
                    
         });

        return(
            <section className="container-selector-moviloperator">
                <label id="label-moviloperator" htmlFor="movil">¿Quien lleva el pedido?</label>
                <select
                    name="selector-movil"
                    id="movil"
                    onChange={(e) => setSelectedPaper(Number(e.target.value))}
                    onClick={() => setTrigger((prev) => prev + 1)}
                    value={ selectedPaper || ""}
                >
                    
                    <option value="">Seleccionar Conductor/Vehículo</option>
                    {listMobileOperator.map((item, index) => (
                    <option key={`${item.idPaper}-${index}`} value={item.idPaper}>
                        {item.userName} / {item.mobileModel}
                    </option>
                    ))}
                </select>
            </section>
        )
}