export async function infoUser(token) {
    const url = "http://192.168.100.50:8000/hoja/start"
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    
    try{

        const response = await fetch(url, {
            method:"POST",
            headers:{ "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"},
            body: JSON.stringify({ fecha: formattedDate })});

        if(!response.ok){
            console.log(response.text())
            throw new Error(`Fetch fail ${response.status} `)
        }
        const data = await response.json();
      
        if(data && typeof data === "object" && Object.keys(data).length > 0) {
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