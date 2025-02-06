export async function allSalesYear() {
    const url = "http://192.168.100.50:8000/sales/year-codes"

    try{

        const response = await fetch(url, {method:"GET"},);

        if(!response.ok){
            throw new Error(`Fetch fail ${response.status} ${response.statusText}`)
        }
        const data = await response.json();
      
        if(Array.isArray(data.list) && data.list.length > 0) {
            return data.list;
        } else {
            console.warn("El servidor devolvió un arreglo vacío o un formato inesperado:", data);
            return [];
        }
    } catch (error){
        console.error("Error al obtener los datos del servidor:", error);
        return [];
    }
}
export async function allSalesYearQuantitiesAndPreice() {
    const url = "http://192.168.100.50:8000/sales/year-codes"

    try{

        const response = await fetch(url, {method:"GET"},);

        if(!response.ok){
            throw new Error(`Fetch fail ${response.status} ${response.statusText}`)
        }
        const data = await response.json();
      
        if(Array.isArray(data.list) && data.list.length > 0) {
            console.log(data)
            return data;
        } else {
            console.warn("El servidor devolvió un arreglo vacío o un formato inesperado:", data);
            return [];
        }
    } catch (error){
        console.error("Error al obtener los datos del servidor:", error);
        return [];
    }
}