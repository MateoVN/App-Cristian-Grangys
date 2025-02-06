export async function allMobileStockWithOutUnderWay(idHoja) {
    const url = `http://192.168.100.50:8000/hoja/cant-ord/${idHoja}`

    try{
        const response = await fetch(url, {method:"GET",})

        if(!response.ok){
            console.log(response.text())
            throw new Error(`Fetch fail ${response.status}`)
        }

        const formattedData = await response.json()
        if(formattedData && Array.isArray(formattedData) && formattedData.length > 0){
            return formattedData
        } else {
            console.warn("El servidor devolvió un array vacío o un formato inesperado:", formattedData);
            return [];
        }
    } catch (error){
        console.error("Error al obtener los datos del servidor:", error);
        return [];
    }
}