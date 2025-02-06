export async function deleteOrder(idOrder) {
    const url =`http://192.168.100.50:8000/orders/delete/${idOrder}`
    
    try{
        const response = await fetch(url, {
            method:"DELETE",
            headers:{"Content-Type": "application/json"},
        });
        if (!response.ok){
            throw new Error(`Fetch fail ${response.status}`)
        }
    } catch (error){
        console.error('Error al eliminar la hoja:', error);
        throw error;
    }
}