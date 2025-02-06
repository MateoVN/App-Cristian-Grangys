export async function allMobileStock(data) {
    const url = "http://192.168.100.50:8000/carga/mov-stock"

    try{
        const response = await fetch(url, {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data)})

        if(!response.ok){
            console.log(response.text())
            throw new Error(`Fetch fail ${response.status}`)
        }

        const formattedData = await response.json()
        if(formattedData && Array.isArray(formattedData) && formattedData.length > 0){
            return formattedData
        } else {
            console.warn("El servidor devolvió un array vacío o un formato inesperado:", data);
            return [];
        }
    } catch (error){
        console.error("Error al obtener los datos del servidor:", error);
        return [];
    }
}