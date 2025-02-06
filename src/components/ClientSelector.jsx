/* eslint-disable react/prop-types */
import "../css/clientselector.css"
export function ClientSelector ({ clients, selectedClientId, setSelectedClientId }){

    return(
        <section className="container-directions-clients">     
            <label htmlFor="directions-clients">Direcciones</label>
            <div>
                <select 
                    className="selector-direction" 
                    id="directions-clients"
                    onChange={(e) => setSelectedClientId(e.target.value)}
                    value={ selectedClientId || ""}
                >
                    <option value="">Seleccione una Direccion</option>

                    {clients.map((item) => (
                        <option key={item.id} value={item.id}>{item.direccion}</option>
                    ))}

                </select>
            </div>
        </section>
    )
}