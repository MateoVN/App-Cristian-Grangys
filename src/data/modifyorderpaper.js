export async function modifyOrderPaper({data}) {
    const url = "http://192.168.100.50:8000/orders/up-movil"

    try{
        const response = await fetch(url, {
            method:"PUT",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify(data),});

        if(!response.ok){
            throw new Error(`Fetch fail ${response.status}`);
        }      
    }catch(error){
        console.error("Error al obtener los datos del servidor;", error);
        return [];
    }
    
}