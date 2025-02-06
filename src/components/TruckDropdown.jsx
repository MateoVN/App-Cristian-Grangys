/* eslint-disable react/prop-types */
export function TruckDropdown ({selectedTruckId, setSelectedTruckId, availableTrucks}){
    return(
        <select 
            className="select-trackmodel"
            id="spinner-trackmodel" 
            value={selectedTruckId || ""}
            onChange={(e) => setSelectedTruckId(e.target.value)}
            >
            <option value="">Selecione un Vehiculo</option>
            {availableTrucks.map((item) =>(
                <option key={item.id} value={item.id}>{item.trackModel}</option>
            ))}
        </select>
    )
}