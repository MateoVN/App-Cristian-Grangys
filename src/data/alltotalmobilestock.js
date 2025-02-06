export async function allTotalMobileStock(id_hoja) {
    const url = `http://192.168.100.50:8000/hoja/all-detail/${id_hoja}`

    try{
        const response = await fetch(url, {method:"GET"});
        if(!response){
            throw new Error(`Fetch faild:${response.status}`)
        }
        const data = await response.json();
        if(Array.isArray(data) && data.length > 0) {
            return data;
        } else {
            console.warn("El servidor devolvió un arreglo vacío o un formato inesperado:", data);
            return [];
        }
        
    } catch (error){
        console.error("Error al obtener datos del servidor:", error)
        return [];
    }

}