/* eslint-disable react/prop-types */
export function OperatorDropdown({ availableOpeators, selectedOperatorId, setSelectedOperatorId}){
    return(
            <select 
                className="select-operator" 
                id="spinner-operator"
                value={selectedOperatorId || ""}
                onChange={(e) => setSelectedOperatorId(e.target.value)}
                >
                    <option value="">Elegir un Conductor</option>
                    {availableOpeators.map((item) =>(
                        <option key={item.id} value={item.id} > 
                        {item.name} 
                        </option>                
                    ))}
            </select>
    )
}